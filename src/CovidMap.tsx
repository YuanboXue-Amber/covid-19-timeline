import React, { Component } from 'react';
import * as d3 from 'd3';
import { ColoredMap, IBasicMap } from './ColoredMap';
import { countryNameIDtable, prop } from './CountryNameIDtable';
import { DateSlider } from './DateSlider';
import { ColorLegendVertical } from './ColorLegendVertical';
import { isNullOrUndefined } from 'util';
import './CovidMap.css';
// tslint:disable-next-line: no-var-requires
const topojson = require('topojson-client');

export interface IWorldData {
  countryId: string;
  countryGeo: any;
  infected: number;
}

export class CovidMap extends Component<{}, {sliderProps: any}> {
  state = {
    sliderProps: undefined,
  };

  dataDownloaded = false;

  worldGeo: any;
  worldCovid: Map<string, any> = new Map();
  startDate: Date | undefined;
  endDate: Date | undefined;

  colorScaleMax = 10000;
  colorScale: any;
  coloredMap: any;
  colorNonInfacted = '#ffffff';

  // sphereColor = '#3bb9b950';
  sphereColor = '#3bb9b99a';

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
      d3.csv('https://covid.ourworldindata.org/data/ecdc/total_cases.csv'),
    ]);

    // worldGeo.id is country. worldGeo.geometry contains type Polygon and coordinates array
    this.worldGeo = (topojson.feature(worldTopo, worldTopo.objects.countries)).features;

    worldCovid.sort((d1: any, d2: any) => {
      const date1 = new Date(d1.date);
      const date2 = new Date(d2.date);
      return date1.getTime() - date2.getTime();
    });
    this.startDate = new Date(worldCovid[0].date);
    this.endDate = new Date(worldCovid[worldCovid.length - 1].date);

    let yesterdayDataPerCountry: any = null;
    for (const day of worldCovid) {
      // iterate through each country to fill in blank data
      for (const country in day) {
        if (Object.prototype.hasOwnProperty.call(day, country)) {
          if (country === 'date') { continue; }
          const infected = day[country];
          if (infected === '') {
            // no data for today, check yesterday
            if (yesterdayDataPerCountry === null) {
              day[country] = 0;
            } else {
              day[country] = yesterdayDataPerCountry[country];
            }
          }
        }
      }
      const date = new Date(day.date);
      this.worldCovid.set(this.constructWorldCovidKey(date), day);
      yesterdayDataPerCountry = day;
    }

    this.dataDownloaded = true;
    this.colorScale = this.createColorScale();
    this.drawBasicMapSVG();
  }

  createColorScale() {
    const colorScaleMax = this.colorScaleMax;
    const logScale = d3.scaleLog()
      .domain([1, colorScaleMax]);
    const colorScale = d3.scaleSequential(
        (d) => d === 0 ? this.colorNonInfacted : d3.interpolateReds(logScale(d)));
    return colorScale;
  }

  drawBasicMapSVG() {
    if (isNullOrUndefined(this.dataDownloaded)) {
      return;
    }

    const width = 1024;
    const height = 768;
    const svg = d3.select('#CovidMap')
      .selectAll('.svg-container').data([null]).join('div')
        .classed('svg-container', true)
        .selectAll('svg').data([null]).join('svg')
          .classed('svg-content-responsive', true)
          .attr('viewBox', `0 0 ${width} ${height}`)
          .attr('preserveAspectRatio', `xMinYMin meet`);

    const zoomG = svg
      .selectAll('.zoom-container').data([null]).join('g')
      .attr('class', 'zoom-container');

    zoomG
      .selectAll('.title').data([null]).join('text')
        .attr('class', 'title')
        .text('COVID-19 Outbreak Across the World')
        .attr('font-size', '1.5em')
        .attr('font-family', 'sans-serif')
        .attr('transform', `translate(270, 50)`);

    const tooltip = d3.select('#CovidMap').selectAll('.country-tooltip').data([null]).join('div')
      .attr('class', 'country-tooltip')
      .style('opacity', 0);

    // Grouping everything in the map
    const mapG = zoomG
      .selectAll('.map').data([null]).join('g')
        .attr('class', 'map');
    const basicMapProps: IBasicMap = {
      selector: mapG,
      projection: d3.geoNaturalEarth1().scale(125),
      worldGeo: this.worldGeo,
      countryColor: this.colorNonInfacted,
      sphereColor: this.sphereColor,
      tooltip,
    };
    const map = new ColoredMap(basicMapProps);
    this.coloredMap = map;

    // draw color legend
    const colorLegendG = zoomG
      .selectAll('.colorLegend').data([null]).join('g')
        .attr('class', 'colorLegend')
        .attr('transform', 'translate(210, 270) scale(0.5, 0.5)');

    let clickedDomain: any;
    const onClick = (d: [number, number] | null) => {
      clickedDomain = d;
      map.hilightingMap(clickedDomain);
      colorLegend.clickableLegend(clickedDomain);
    };

    const colorLegend = new ColorLegendVertical({
      selector: colorLegendG,
      colorScale: this.colorScale,
      colorScaleMax: this.colorScaleMax,
      onClick,
      clickedDomain,
    });

    // draw slider
    const sliderG = zoomG
      .selectAll('.slider').data([null]).join('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(200, 450) scale(0.5, 0.5)');
    const sliderProps = {
      selector: sliderG,
      startDate: this.startDate as Date,
      endDate: this.endDate as Date,
      sliderWidth: 1200,
      tickOffset: 10,
      handleRadius: 10,
      handleTextOffset: -20,
      onSliderDragged: this.colorMapByDay.bind(this),
    };

    // set starting state as the latest day
    this.colorMapByDay(this.endDate as Date);

    // zoom
    const zoom = d3
      .zoom()
      .scaleExtent([1, 8])
      .on('zoom', () => {
        zoomG.attr('transform', d3.event.transform);
      });
    svg.call(zoom as any); // somehow, when it is mapG.call, panning by drag became really hard

    // re-render now that all datas are loaded
    this.setState({
      sliderProps,
    });
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
      if (!isNullOrUndefined(id)) {
        const countryData: IWorldData | undefined = map.get(id);
        if (!isNullOrUndefined(countryData)) {
          countryData.infected = Number(todayWorldCovid[country]);
          map.set(id, countryData);
        }
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
