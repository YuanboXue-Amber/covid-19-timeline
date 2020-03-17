import * as d3 from 'd3';
import './ColoredMap.css';
import { IWorldData } from './CovidMap';
import { isNullOrUndefined } from 'util';

export interface IBasicMap {
  selector: any;
  projection: any;
  worldGeo: any;
  countryColor: string;
  sphereColor: string;
  tooltip: any;
}

export class ColoredMap {
  basicMapProps: IBasicMap;
  pathGenerator: any;

  defaultStrokeWidth = '0.02px';
  coloredStrokeWidth = '0.3px';

  tooltipHide = (tooltip: any) => {
    tooltip.style('opacity', 0);
  }
  tooltipShow = (tooltip: any, d: any) => {
    tooltip
      .transition()
      .style('opacity', 1);
    let text;
    if (!isNullOrUndefined(d.infected)) {
      text = `${d.countryGeo.properties.name}: ${d.infected}`;
    } else {
      text = d.properties.name;
    }
    tooltip
      .style('left', d3.event.pageX + 'px')
      .style('top', d3.event.pageY + 'px')
      .text(text);
  }

  constructor(props: IBasicMap) {
    this.basicMapProps = props;
    this.renderBasicMap(this.basicMapProps);
  }

  renderTooltip(countries: any) {
    const tooltip = this.basicMapProps.tooltip;
    countries
      .on('click', (d: any) => {
        this.tooltipShow(tooltip, d);
      })
      .on('mouseover', (d: any) => {
        this.tooltipShow(tooltip, d);
      })
      .on('mouseout',  (d: any) => {
        this.tooltipHide(tooltip);
      });
  }

  coloringMap(colorScale: any, worldData: IWorldData[]) {
    const mapG = this.basicMapProps.selector;

    const countries = mapG
      .selectAll('.country')
      .data(worldData, (d: IWorldData) => d.countryId)
      .join('path')
        .attr('class', 'country')
        .attr('d', (d: IWorldData) => this.pathGenerator(d.countryGeo))
        .attr('fill', (d: IWorldData) => colorScale(d.infected))
        .attr('stroke-width', (d: IWorldData) => d.infected === 0 ? this.defaultStrokeWidth : this.coloredStrokeWidth);

    this.renderTooltip(countries);
  }

  hilightingMap( range: [number, number] | null) {
    const mapG = this.basicMapProps.selector;

    // eslint-disable-next-line
    const countries = mapG.selectAll('.country')
      .attr('opacity', (d: IWorldData) => {
        if (range === null) {
          return 1;
        }
        if (d.infected >= range[0] && d.infected <= range[1]) {
          return 1;
        } else {
          return 0.2;
        }
      });
  }

  renderBasicMap(props: IBasicMap) {
    const {selector, projection, worldGeo, countryColor, sphereColor} = props;

    // map generator
    const pathGenerator = d3.geoPath(projection);
    this.pathGenerator = pathGenerator;

    // draw sphere to the map
    const mapG = selector;
    mapG.selectAll('.sphere').data([null]).join('path')
      .attr('class', 'sphere')
      .attr('d', (d: any) => pathGenerator({ type: 'Sphere' }))
      .attr('fill', sphereColor);

    const countries = mapG.selectAll('.country').data(worldGeo, (d: any) => d.id).join('path')
      .attr('class', 'country')
      .attr('d', (d: any) => pathGenerator(d))
      .attr('fill', countryColor)
      .attr('stroke-width', this.defaultStrokeWidth);

    this.renderTooltip(countries);

    return mapG;
  }

}
