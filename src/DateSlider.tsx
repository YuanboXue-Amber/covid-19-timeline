import React, { Component } from 'react';
import * as d3 from 'd3';
import './DateSlider.css';

const formatDate = d3.timeFormat('%d %b');

export interface IDateSliderProps {
  selector: any;
  startDate: Date;
  endDate: Date;
  sliderWidth: number;
  tickOffset: number;
  handleRadius: number;
  handleTextOffset: number;
  onSliderDragged: (date: Date) => void;
}

export class DateSlider extends Component<IDateSliderProps, {}>  {
  // used by slider
  timeScale: any;
  handle: any;
  handleText: any;

  // used by play button
  playInterWidth: any;
  cursorMoving = false;
  buttonTimer: any;
  currentCursorWidth = 0;

  buttonPlayColor = '#cb1c1ede';
  buttonPauseColor = '#696969';

  constructor(props: Readonly<IDateSliderProps>) {
    super(props);

    this.initDateSlider.bind(this);
    this.updateDateSlider.bind(this);

    const timeScale = d3
      .scaleTime()
      .domain([this.props.startDate, this.props.endDate])
      .range([0, this.props.sliderWidth])
      .clamp(true);
    this.timeScale = timeScale;
  }

  componentDidMount() {
    const buttonG = this.props.selector
      .selectAll('.button').data([null]).join('g')
        .attr('class', 'button');
    buttonG
      .selectAll('rect').data([null]).join('rect')
        .attr('height', '50')
        .attr('width', '120')
        .attr('x', '0')
        .attr('y', '0')
        .attr('rx', '10')
        .attr('transform', 'translate(-150, -30)')
        .attr('fill', this.buttonPlayColor);
    buttonG
      .selectAll('text').data([null]).join('text')
        .attr('fill', 'white')
        .attr('transform', 'translate(-90, 5)')
        .style('text-anchor', 'middle')
        .text('Play');

    buttonG
      .on('mouseover', () => {
        buttonG.select('rect').transition().attr('fill', this.buttonPauseColor);
      })
      .on('mouseout', () => {
        if (buttonG.text() === 'Play') {
          buttonG.select('rect').transition().attr('fill', this.buttonPlayColor);
        }
      });

    buttonG.on('click', () => {
      if (buttonG.text() === 'Pause') {
        this.cursorMoving = false;
        clearInterval(this.buttonTimer);
        buttonG.select('rect').transition().attr('fill', this.buttonPlayColor);
        buttonG.select('text').transition().text('Play');
      } else {
        this.cursorMoving = true;
        this.buttonTimer = setInterval(playButtonStep, 100);
        buttonG.select('rect').transition().attr('fill', this.buttonPauseColor);
        buttonG.select('text').transition().text('Pause');
      }
    });

    const playButtonStep = () => {
      this.updateDateSlider(this.timeScale.invert(this.currentCursorWidth));
      this.currentCursorWidth += this.playInterWidth; // move 1 day per step
      if (this.currentCursorWidth > this.props.sliderWidth + this.playInterWidth) {
        this.cursorMoving = false;
        this.currentCursorWidth = 0;
        clearInterval(this.buttonTimer);
        // timer = 0;
        buttonG.select('rect').transition().attr('fill', this.buttonPlayColor);
        buttonG.select('text').transition().text('Play');
      }
    };

    this.initDateSlider();
  }

  updateDateSlider (h: Date) {
    // update position and text of label according to slider scale
    this.handle
      .attr('cx', this.timeScale(h));
    this.handleText
      .attr('x', this.timeScale(h))
      .text(formatDate(h));

    this.props.onSliderDragged(h);
  }

  initDateSlider () {
    const selector = this.props.selector;

    selector.selectAll('.track').data([null]).join('line')
      .attr('class', 'track');
    selector.selectAll('.track-inset').data([null]).join('line')
      .attr('class', 'track-inset');
    const trackOverlay = selector.selectAll('.track-overlay').data([null]).join('line')
      .attr('class', 'track-overlay');
    selector.selectAll('line')
      .attr('x1', this.timeScale.range()[0])
      .attr('x2', this.timeScale.range()[1]);

    trackOverlay.call(
      d3.drag()
        .on('start.interrupt', () => selector.interrupt())
        .on('start drag', () => {
          this.currentCursorWidth = d3.event.x;
          this.updateDateSlider(this.timeScale.invert(this.currentCursorWidth));
        }),
    );

    // draw ticks, one per week, no more than 15 ticks
    const nDays = Math.floor((this.props.endDate.getTime() - this.props.startDate.getTime())
      / (1000 * 60 * 60 * 24));
    const nWeeks = Math.floor(nDays/7);
    const nTicks = nWeeks > 15 ? 15 : nWeeks;
    this.playInterWidth = this.props.sliderWidth / ((nDays + 1));
    selector
      .insert('g', '.track-overlay')
        .attr('class', 'ticks')
        .attr('transform', `translate(0, ${this.props.tickOffset})`)
        .selectAll('text')
        .data(this.timeScale.ticks(nTicks))
        .join('text')
          .attr('x', this.timeScale)
          .attr('y', 10)
          .attr('text-anchor', 'middle')
          .text((d: Date) => formatDate(d));

    // handle on the slider
    this.handle = selector
      .insert('circle', '.track-overlay')
        .attr('class', 'handle')
        .attr('r', this.props.handleRadius)
        .attr('cx', this.timeScale(this.props.endDate));

    // text lable on handle
    this.handleText = selector
      .append('text')
      .attr('class', 'handleText')
      .attr('text-anchor', 'middle')
      .attr('x', this.timeScale(this.props.endDate))
      .text(formatDate(this.props.endDate))
      .attr('transform', `translate(0, ${this.props.handleTextOffset})`);
  }

  render() {
    return <div id="DateSlider" />;
  }
}
