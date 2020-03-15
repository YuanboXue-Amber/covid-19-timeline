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
  playButtonSelection: any;
  cursorMoving = false;
  buttonTimer: any;
  currentCursorWidth = 0;

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
    this.playButtonSelection = d3.select('#play-button');

    this.playButtonSelection.on('click', () => {
      const button = this.playButtonSelection;
      if (button.text() === 'Pause') {
        this.cursorMoving = false;
        clearInterval(this.buttonTimer);
        button.text('Play');
      } else {
        this.cursorMoving = true;
        this.buttonTimer = setInterval(playButtonStep, 100);
        button.text('Pause');
      }
    });

    const playButtonStep = () => {
      this.updateDateSlider(this.timeScale.invert(this.currentCursorWidth));
      this.currentCursorWidth += this.playInterWidth; // move 1 tick per step
      if (this.currentCursorWidth > this.props.sliderWidth + this.playInterWidth) {
        this.cursorMoving = false;
        this.currentCursorWidth = 0;
        clearInterval(this.buttonTimer);
        // timer = 0;
        this.playButtonSelection.text('Play');
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

    // draw ticks, one per week
    const nDays = Math.floor((this.props.endDate.getTime() - this.props.startDate.getTime())
      / (1000 * 60 * 60 * 24 * 7));
    this.playInterWidth = this.props.sliderWidth / ((nDays + 1) * 7);
    selector
      .insert('g', '.track-overlay')
        .attr('class', 'ticks')
        .attr('transform', `translate(0, ${this.props.tickOffset})`)
        .selectAll('text')
        .data(this.timeScale.ticks(nDays))
        .join('text')
          .attr('x', this.timeScale)
          .attr('y', 10)
          .attr('text-anchor', 'middle')
          .text((d: Date) => formatDate(d));

    // handle on the slider
    this.handle = selector
      .insert('circle', '.track-overlay')
        .attr('class', 'handle')
        .attr('r', this.props.handleRadius);

    // text lable on handle
    this.handleText = selector
      .append('text')
      .attr('class', 'handleText')
      .attr('text-anchor', 'middle')
      .text(formatDate(this.props.startDate))
      .attr('transform', `translate(0, ${this.props.handleTextOffset})`);
  }

  render() {
    return <div id="DateSlider">
            <button id="play-button">Play</button>
           </ div>;
  }
}
