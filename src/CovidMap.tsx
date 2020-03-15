import React, { Component } from 'react';
import * as d3 from 'd3';
import { ColoredMap, IBasicMap } from './ColoredMap';
import { countryNameIDtable, prop } from './CountryNameIDtable';
import { colorLegendVertical } from './ColorLegendVertical';
import { DateSlider } from './DateSlider';
import { isNullOrUndefined } from 'util';
// tslint:disable-next-line: no-var-requires
const topojson = require('topojson-client');

export interface IWorldData {
  countryId: string;
  countryGeo: any;
  infected: number;
}

export class CovidMap extends Component<{}, {dataDownloaded: boolean, colorScaleMax: number, sliderProps: any}> {
  state = {
    dataDownloaded: false,
    colorScaleMax: 10000,
    sliderProps: undefined,
  };

  worldGeo: any;
  worldCovid: Map<string, any> = new Map();
  startDate: Date | undefined;
  endDate: Date | undefined;

  dataDownloaded = false;
  colorScaleMax = 10000;

  colorScale: any;

  coloredMap: any;

  constructor() {
    super({});

    this.drawBasicMapSVG.bind(this);
    this.getWorldData();
  }

  constructWorldCovidKey(date: Date) {
    return `${date.getUTCDate()}/${date.getUTCMonth() + 1}`;
  }

  async getWorldData() {
    const [worldTopo, worldCovid]  = await Promise.all([
      d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
      d3.csv('https://covid.ourworldindata.org/data/total_cases.csv'),
    ]);

    // worldGeo.id is country. worldGeo.geometry contains type Polygon and coordinates array
    this.worldGeo = (topojson.feature(worldTopo, worldTopo.objects.countries)).features;

    worldCovid.forEach((day: any) => {
      const date = new Date(day.date);
      this.worldCovid.set(this.constructWorldCovidKey(date), day);
      if (isNullOrUndefined(this.startDate) || this.startDate.getTime() > date.getTime()) {
        this.startDate = date;
      }
      if (isNullOrUndefined(this.endDate) || this.endDate.getTime() < date.getTime()) {
        this.endDate = date;
      }
    });

    this.colorScale = this.createColorScale();
    this.drawBasicMapSVG();
  }

  createColorScale() {
    const colorScaleMax = this.state.colorScaleMax;
    const logScale = d3.scaleLog()
      .domain([1, colorScaleMax]);
    const colorScale = d3.scaleSequential(
        (d) => d3.interpolateReds( d === 0 ? d : logScale(d)) );
    return colorScale;
  }

  drawBasicMapSVG() {
    if (isNullOrUndefined(this.state.dataDownloaded)) {
      return;
    }

    const width = 960;
    const height = 800;
    const svg = d3.select('#CovidMap')
      .selectAll('svg').data([null]).join('svg')
        .attr('height', height)
        .attr('width', width);

    const basicMapProps: IBasicMap = {
      selector: svg,
      projection: d3.geoNaturalEarth1(),
      worldGeo: this.worldGeo,
      countryColor: '#b5f16b',
      sphereColor: '#3bb9b9bd',
    };
    const map = new ColoredMap(basicMapProps);
    this.coloredMap = map;

    // draw color legend
    const colorLegendG = svg
      .selectAll('.colorLegend').data([null]).join('g')
        .attr('class', 'colorLegend')
        .attr('transform', 'translate(80, 250)');
    colorLegendVertical({
      selector: colorLegendG,
      colorScale: this.colorScale,
      colorWidth: 20, colorHeight: 5, textwidth: 90,
      colorScaleMax: this.state.colorScaleMax,
    });

    const sliderG = svg
      .selectAll('.slider').data([null]).join('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(100, 500)');
    const sliderProps = {
      selector: sliderG,
      startDate: this.startDate as Date,
      endDate: this.endDate as Date,
      sliderWidth: 800,
      tickOffset: 10,
      handleRadius: 10,
      handleTextOffset: -10,
      onSliderDragged: this.colorMapByDay.bind(this),
    };
    this.setState({
      dataDownloaded: true,
      colorScaleMax: this.state.colorScaleMax,
      sliderProps,
    }); // re-render
  }

  colorMapByDay(date: Date) {
    // change color of map everyday
    const todayWorldCovid = this.worldCovid.get(this.constructWorldCovidKey(date));
    if (!isNullOrUndefined(todayWorldCovid)) {
      const worldData = this.combineWordGeoAndCovid(this.worldGeo, todayWorldCovid);
      this.coloredMap.coloringMap(this.colorScale, worldData);
    }
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
      if (!isNullOrUndefined(countryData)) {
        countryData.infected = Number(todayWorldCovid[country]);
        map.set(id, countryData);
      }
    });
    return Array.from(map.values());
  }

  render() {
    if (!isNullOrUndefined(this.state.sliderProps)) {
      const sliderProps = this.state.sliderProps as any;
      return <div id="CovidMap">
              <DateSlider {...sliderProps} />
             </ div>;
    }
    return <div id="CovidMap"/>;
  }
}
