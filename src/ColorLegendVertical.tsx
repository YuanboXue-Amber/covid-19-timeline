
import * as d3 from 'd3';

interface IColorLegendVerticalProps {
  selector: any;
  colorScale: any;
  colorWidth: number;
  colorHeight: number;
  textwidth: number;
  colorScaleMax: number;
}

export function colorLegendVertical(props: IColorLegendVerticalProps) {

  const { selector, colorScale, colorWidth, colorHeight, textwidth, colorScaleMax } = props;

  const ColorLegendVerticalG = selector
    .selectAll('#ColorLegendVertical').data([1]).join('g')
      .attr('id', 'ColorLegendVertical');

  const data = d3.range(0, colorScaleMax, colorScaleMax / 30);
  const n = data.length;

  // background
  ColorLegendVerticalG
    .selectAll('rect').data([null]).join('rect')
      .attr('height', (n + 2) * colorHeight)
      .attr('width', textwidth)
      .attr('x', '1')
      .attr('fill', 'white')
      .attr('opacity', '0.7')
      .attr('ry', colorHeight);

  const labels = ColorLegendVerticalG
    .selectAll('g').data(data).join('g')
      .attr('class', 'ColorLegendVertical-label')
      .attr('transform', (d: any, i: number) =>
        `translate(${colorWidth / 2}, ${(i + 1) * colorHeight})`);
      // .attr('cursor', 'pointer');

  labels
    .selectAll('rect').data((d: number) => [d]).join('rect')
      .attr('width', colorWidth)
      .attr('height', colorHeight)
      .attr('fill', (d: number) => colorScale(d));

  ColorLegendVerticalG.selectAll('.text0')
    .data(['0']).join('text')
      .attr('class', 'text0')
      .text((d: string) => d)
      .attr('font-size', colorWidth * 0.75)
      .attr('x', colorWidth * 1.75)
      .attr('y', colorWidth * 0.75);

  ColorLegendVerticalG.selectAll('.textMax')
    .data([`>${colorScaleMax}`]).join('text')
      .attr('class', 'textMax')
      .text((d: string) => d)
      .attr('font-size', colorWidth * 0.75)
      .attr('x', colorWidth * 1.75)
      .attr('y', (n + 1) * colorHeight);
}
