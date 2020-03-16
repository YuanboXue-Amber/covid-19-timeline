
import * as d3 from 'd3';

interface IColorLegendVerticalProps {
  selector: any;
  colorScale: any;
  colorScaleMax: number;
}

interface IGradientData {
  number: number; offset: string; color: string;
}

export function colorLegendVertical(props: IColorLegendVerticalProps) {

  const { selector, colorScale, colorScaleMax } = props;

  const backgroundWidth = 130;
  const backgroundHeight = 220;
  const barMargin = {top: 10, left: 15};
  const barWidth = 30;
  const barHeight = 200;
  const fontsize = 20;

  const ColorLegendVerticalG = selector
    .selectAll('#ColorLegendVertical').data([1]).join('g')
      .attr('id', 'ColorLegendVertical');

  // background
  ColorLegendVerticalG
    .selectAll('rect').data([null]).join('rect')
      .attr('height', backgroundHeight)
      .attr('width', backgroundWidth)
      .attr('x', '1')
      .attr('fill', 'white')
      .attr('opacity', '0.7')
      .attr('ry', barMargin.top);

  // create gradient data
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
  const defs = ColorLegendVerticalG
    .selectAll('defs').data([null]).join('defs');

  const gradient = defs.selectAll('linearGradient').data([null]).join('linearGradient')
    .attr('id', 'svgGradient')
    .attr('x1', '0%')
    .attr('x2', '0%')
    .attr('y1', '0%')
    .attr('y2', '100%');

  gradient.selectAll('stop').data(gradientData).join('stop')
    .attr('offset', (d: IGradientData) => d.offset)
    .attr('stop-color', (d: IGradientData) => d.color);

  // use gradient
  const rect = ColorLegendVerticalG.selectAll('.gradient-rect').data([null]).join('rect')
    .attr('class', 'gradient-rect')
    .attr('fill', 'url(#svgGradient)')
    .attr('transform', `translate(${barMargin.left}, ${barMargin.top})`)
    .attr('width', barWidth)
    .attr('height', barHeight);

  // add text
  ColorLegendVerticalG.selectAll('.text0')
    .data(['0']).join('text')
      .attr('class', 'text0')
      .text((d: string) => d)
      .attr('font-size', fontsize)
      .attr('x', barWidth + barMargin.left + fontsize / 2)
      .attr('y', barMargin.top + fontsize / 2);

  ColorLegendVerticalG.selectAll('.textMax')
    .data([`>${colorScaleMax}`]).join('text')
      .attr('class', 'textMax')
      .text((d: string) => d)
      .attr('font-size', fontsize)
      .attr('x', barWidth + barMargin.left + fontsize / 2)
      .attr('y', barMargin.top + barHeight);
}
