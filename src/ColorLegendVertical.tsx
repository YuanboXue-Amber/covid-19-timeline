
export interface IColorLegendVerticalProps {
  selector: any;
  colorScale: any;
  colorScaleMax: number;
  onClick: any;
  clickedDomain: [number, number | undefined];
}

interface IGradientData {
  number: number; offset: string; color: string;
}

export class ColorLegendVertical {
  props: IColorLegendVerticalProps;

  backgroundWidth = 175;
  backgroundHeight = 230;
  barMargin = {top: 25, left: 15};
  barWidth = 30;
  barHeight = 180;
  fontsize = 18;

  colorLegendVerticalG: any;

  constructor(props: IColorLegendVerticalProps) {
    this.props = props;
    this.colorLegendVerticalG = this.props.selector
      .selectAll('#ColorLegendVertical').data([1]).join('g')
        .attr('id', 'ColorLegendVertical');
    this.background();
    this.gradientLegend();
    this.clickableLegend(this.props.clickedDomain);
  }

  background() {
    this.colorLegendVerticalG
      .selectAll('rect').data([null]).join('rect')
        .attr('height', this.backgroundHeight)
        .attr('width', this.backgroundWidth)
        .attr('x', '1')
        .attr('fill', 'white')
        .attr('opacity', '0.7')
        .attr('ry', 10);
  }

  gradientLegend() {
    const colorScaleMax = this.props.colorScaleMax;
    const colorScale = this.props.colorScale;

    const gradientData: IGradientData[] = [];
    const size = 10;
    const offset = colorScaleMax / size;
    for (let i = 0; i < size; ++ i) {
      const currNum = 0 + offset * i;
      gradientData.push({
        number: currNum,
        offset: `${currNum / colorScaleMax * 100}%`,
        color: colorScale(currNum),
      });
    }

    // gradient
    const defs = this.colorLegendVerticalG.selectAll('defs').data([null]).join('defs');
    const gradient = defs.selectAll('linearGradient').data([null]).join('linearGradient')
      .attr('id', 'svgGradient')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%');

    gradient.selectAll('stop').data(gradientData).join('stop')
      .attr('offset', (d: IGradientData) => d.offset)
      .attr('stop-color', (d: IGradientData) => d.color);

    // gradient scale
    // eslint-disable-next-line
    const rect = this.colorLegendVerticalG.selectAll('.gradient-rect').data([null]).join('rect')
      .attr('class', 'gradient-rect')
      .attr('fill', 'url(#svgGradient)')
      .attr('transform', `translate(${this.barMargin.left}, ${this.barMargin.top})`)
      .attr('width', this.barWidth)
      .attr('height', this.barHeight);

    // gradient scale text
    this.colorLegendVerticalG.selectAll('.text0')
      .data(['0']).join('text')
        .attr('class', 'text0')
        .attr('text-anchor', 'middle')
        .text((d: string) => d)
        .attr('font-size', this.fontsize)
        .attr('x', this.barWidth / 2 + this.barMargin.left)
        .attr('y', this.barMargin.top * 0.75);

    this.colorLegendVerticalG.selectAll('.textMax')
      .data([`>${colorScaleMax}`]).join('text')
        .attr('class', 'textMax')
        .attr('text-anchor', 'middle')
        .text((d: string) => d)
        .attr('font-size', this.fontsize)
        .attr('x', this.barWidth / 2 + this.barMargin.left + this.fontsize / 2)
        .attr('y', this.barMargin.top + this.barHeight + this.fontsize);

  }

  clickableLegend(clickedDomain: any) {
    const colorScaleMax = this.props.colorScaleMax;
    const buttonWidth = 20;
    const buttonHeight = 20;
    const clickableG = this.colorLegendVerticalG.selectAll('.clickable').data([null]).join('g')
      .attr('class', 'clickable');

    const clickableRanges = [[1, 9], [10, 99], [100, 999], [1000, 9999], [colorScaleMax, 7530000000]];
    const interval = (this.backgroundHeight - this.barMargin.top * 2) / clickableRanges.length;
    const ticksGroups = clickableG.selectAll('.clickable-ticks').data(clickableRanges).join('g')
      .attr('class', 'clickable-ticks')
      .attr('transform', (d: any, i: number) => `translate(${this.barMargin.left * 2 + this.barWidth}, ${this.barMargin.top * 1.25 + interval * i})`)
      .attr('cursor', 'pointer')
      .attr('opacity', (d: any) =>
          (!clickedDomain || (d[0] === clickedDomain[0] && d[1] === clickedDomain[1]))
          ? 1
          : 0.2,
        )
      .on('click', (d: any) =>
          this.props.onClick((clickedDomain && (d[0] === clickedDomain[0] && d[1] === clickedDomain[1])) ? null : d),
        );

    ticksGroups.selectAll('rect').data((d: any) => [d]).join('rect')
      .attr('fill', (d: any[]) => this.props.colorScale(d[0]) )
      .attr('ry', buttonWidth / 4)
      .attr('width', buttonWidth)
      .attr('height', buttonHeight);
    ticksGroups.selectAll('text').data((d: any) => [d]).join('text')
      .attr('font-size', this.fontsize)
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'hanging')
      .attr('transform', `translate(${buttonWidth * 1.2}, 0)`)
      .text((d: any[]) => d[0] === colorScaleMax ? `>${colorScaleMax}` : `${d[0]}-${d[1]}`);
  }

}
