import * as d3 from 'd3';
import './ColoredMap.css';
import { IWorldData } from './CovidMap';

export interface IBasicMap {
  selector: any;
  projection: any;
  worldGeo: any;
  countryColor: string;
  sphereColor: string;
}

export class ColoredMap {
  basicMapProps: IBasicMap;
  pathGenerator: any;

  constructor(props: IBasicMap) {
    this.basicMapProps = props;
    this.renderBasicMap(this.basicMapProps);
  }

  coloringMap(colorScale: any, worldData: IWorldData[]) {
    const mapG = this.basicMapProps.selector;

    const countries = mapG
      .selectAll('.country')
      .data(worldData, (d: IWorldData) => d.countryId)
      .join('path')
        .attr('class', 'country')
        .attr('d', (d: IWorldData) => this.pathGenerator(d.countryGeo))
        .attr('fill', (d: IWorldData) => colorScale(d.infected));

    countries.selectAll('title').data((d: any) => [d]).join('title')
      .text((d: any) => `${d.countryGeo.properties.name}: ${d.infected}`); // set hover text
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

    const countries = mapG.selectAll('.country').data(worldGeo).join('path')
      .attr('class', 'country')
      .attr('d', (d: any) => pathGenerator(d))
      .attr('fill', countryColor);

    countries.selectAll('title').data((d: any) => [d]).join('title')
      .text((d: any) => `${d.properties.name}`); // set hover text

    return mapG;
  }

}