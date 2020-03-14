import React, { Component } from 'react';
import * as d3 from 'd3';
import { ColoredMap } from './ColoredMap';
import { countryNameIDtable, prop } from './CountryNameIDtable';
import { colorLegendVertical } from './ColorLegendVertical';
// tslint:disable-next-line: no-var-requires
const topojson = require('topojson-client');

export interface IWorldData {
  countryId: string;
  countryGeo: any;
  infected: number;
}

export class CovidMap extends Component<{}, {}> {
  worldGeo: any;
  worldCovid: any[] = [];

  componentDidMount() {
    this.drawBasicMapSVG();
  }

  async getWorldData() {
    const [worldTopo, worldCovid]  = await Promise.all([
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
      d3.csv('https://covid.ourworldindata.org/data/total_cases.csv'),
    ]);

    // worldGeo.id is country. worldGeo.geometry contains type Polygon and coordinates array
    this.worldGeo = (topojson.feature(worldTopo, worldTopo.objects.countries)).features;

    worldCovid.sort((a1: any, a2: any) => {
      return new Date(a1.date).getTime() - new Date(a2.date).getTime();
    });
    this.worldCovid = worldCovid;
    const dateBegin = new Date(worldCovid[0].date);
    const dateFinish = new Date(worldCovid[worldCovid.length - 1].date);
  }

  async drawBasicMapSVG() {
    await this.getWorldData();

    const width = 960;
    const height = 800;
    const svg = d3.select('#CovidMap')
      .selectAll('svg').data([null]).join('svg')
        .attr('height', height)
        .attr('width', width);

    const basicMapProps = {
      selector: svg,
      projection: d3.geoNaturalEarth1(),
      worldGeo: this.worldGeo,
      countryColor: '#b5f16b',
      sphereColor: '#3bb9b9bd',
    };
    const map = new ColoredMap(basicMapProps);
    this.colorMapByDay(svg, map);
  }

  colorMapByDay(svg: any, map: ColoredMap) {
    const colorScaleMax = 10000;
    const logScale = d3.scaleLog()
      .domain([1, colorScaleMax]);
    const colorScale = d3.scaleSequential(
        (d) => d3.interpolateReds( d === 0 ? d : logScale(d)) );

    // draw color legend
    const colorLegendG = svg
      .selectAll('.colorLegend').data([null]).join('g')
        .attr('class', 'colorLegend')
        .attr('transform', 'translate(80, 250)');
    colorLegendVertical({
      selector: colorLegendG,
      colorScale, colorWidth: 20, colorHeight: 5, textwidth: 90, colorScaleMax,
    });

    // change color of map everyday
    const worldData = this.combineWordGeoAndCovid(this.worldGeo, this.worldCovid[50]);
    map.coloringMap(colorScale, worldData);
  }

  combineWordGeoAndCovid(worldGeo: any, todayWorldCovid: any): IWorldData[] {
    const map = new Map<number, IWorldData>();
    worldGeo.forEach((countryGeo: any) => {
      map.set(countryGeo.id, {
        countryId: countryGeo.id,
        countryGeo,
        infected: 0,
      });
    });

    Object.keys(todayWorldCovid).forEach((country: any) => {
      const id = prop(countryNameIDtable, country);
      const countryData: IWorldData | undefined = map.get(id);
      if (countryData) {
        countryData.infected = Number(todayWorldCovid[country]);
        map.set(id, countryData);
      }
    });
    return Array.from(map.values());
  }

  render() {
    return <div id="CovidMap"/>;
  }
}
