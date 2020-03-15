(this["webpackJsonpcoronavirus-map-client"]=this["webpackJsonpcoronavirus-map-client"]||[]).push([[0],{104:function(t,e,a){},106:function(t,e,a){},107:function(t,e,a){},111:function(t,e,a){},113:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),i=a(62),l=a.n(i),o=(a(104),a(18)),c=a.n(o),s=a(64),d=a(63),u=a(6),h=a(7),p=a(13),f=a(12),v=a(3),m=a(14),g=a(0),b=(a(106),function(){function t(e){Object(u.a)(this,t),this.basicMapProps=void 0,this.pathGenerator=void 0,this.basicMapProps=e,this.renderBasicMap(this.basicMapProps)}return Object(h.a)(t,[{key:"coloringMap",value:function(t,e){var a=this;this.basicMapProps.selector.selectAll(".country").data(e,(function(t){return t.countryId})).join("path").attr("class","country").attr("d",(function(t){return a.pathGenerator(t.countryGeo)})).attr("fill",(function(e){return t(e.infected)})).selectAll("title").data((function(t){return[t]})).join("title").text((function(t){return"".concat(t.countryGeo.properties.name,": ").concat(t.infected)}))}},{key:"renderBasicMap",value:function(t){var e=t.selector,a=t.projection,r=t.worldGeo,n=t.countryColor,i=t.sphereColor,l=g.e(a);this.pathGenerator=l;var o=e;o.selectAll(".sphere").data([null]).join("path").attr("class","sphere").attr("d",(function(t){return l({type:"Sphere"})})).attr("fill",i),o.selectAll(".country").data(r).join("path").attr("class","country").attr("d",(function(t){return l(t)})).attr("fill",n).selectAll("title").data((function(t){return[t]})).join("title").text((function(t){return"".concat(t.properties.name)}));var c=g.n().scaleExtent([1,8]).on("zoom",(function(){o.attr("transform",g.c.transform)}));return e.call(c),o}}]),t}()),y={date:null,Andorra:null,Bahrain:null,"Saint Barthlemy":null,"Saint Vincent and the Grenadines":null,Worldwide:null,Gibraltar:null,Guernsey:null,"French Guiana":null,International:null,"Faeroe Islands":null,Jersey:null,Liechtenstein:null,Maldives:null,Malta:null,"San Marino":null,"Saint Martin (French part)":null,Martinique:null,Monaco:null,"French Polynesia":null,Reunion:null,Singapore:null,Vatican:null,Afghanistan:"004","South Africa":"710",Albania:"008",Algeria:"012","Bosnia and Herzegovina":"070","United Arab Emirates":"784","Saudi Arabia":"682",Argentina:"032",Armenia:"051",Australia:"036",Austria:"040",Azerbaijan:"031",Bangladesh:"050",Belarus:"112",Belgium:"056",Bhutan:"064",Bolivia:"068",Brazil:"076",Brunei:"096",Bulgaria:"100",Cambodia:"116",Cameroon:"120",Canada:"124",Chile:"152",China:"156",Colombia:"170",Croatia:"191",Cuba:"192",Cyprus:"196","Cote d'Ivoire":"384",Denmark:"208",Ecuador:"218",Egypt:"818",Estonia:"233","Burkina Faso":"854",Finland:"246",France:"250",Georgia:"268",Germany:"276",Greece:"300",Guyana:"328",Honduras:"340",Hungary:"348",Iceland:"352",India:"356",Indonesia:"360",Iran:"364",Iraq:"368",Ireland:"372",Israel:"376",Italy:"380",Jamaica:"388",Japan:"392",Jordan:"400","United Kingdom":"826","South Korea":"410",Kuwait:"414","Sri Lanka":"144",Latvia:"428",Lebanon:"422",Lithuania:"440",Luxembourg:"442",Macedonia:"807",Malaysia:"458",Mexico:"484",Moldova:"498",Mongolia:"496",Morocco:"504",Nepal:"524",Netherlands:"528",Nigeria:"566",Norway:"578",Oman:"512",Pakistan:"586",Palestine:"275",Panama:"591",Paraguay:"600",Peru:"604",Philippines:"608",Poland:"616",Portugal:"620",Qatar:"634","Czech Republic":"203","Democratic Republic of Congo":"180","Dominican Republic":"214","Costa Rica":"188",Romania:"642",Russia:"643",Senegal:"686",Serbia:"688",Slovakia:"703",Slovenia:"705",Spain:"724","United States":"840",Sweden:"752",Switzerland:"756",Thailand:"764",Togo:"768",Tunisia:"788",Turkey:"792",Ukraine:"804",Vietnam:"704","New Zealand":"554"};a(107);var x=g.m("%d %b"),S=function(t){function e(t){var a;Object(u.a)(this,e),(a=Object(p.a)(this,Object(f.a)(e).call(this,t))).timeScale=void 0,a.handle=void 0,a.handleText=void 0,a.playInterWidth=void 0,a.cursorMoving=!1,a.buttonTimer=void 0,a.currentCursorWidth=0,a.initDateSlider.bind(Object(v.a)(a)),a.updateDateSlider.bind(Object(v.a)(a));var r=g.k().domain([a.props.startDate,a.props.endDate]).range([0,a.props.sliderWidth]).clamp(!0);return a.timeScale=r,a}return Object(m.a)(e,t),Object(h.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props.selector.selectAll(".button").data([null]).join("g").attr("class","button");e.selectAll("rect").data([null]).join("rect").attr("height","50").attr("width","120").attr("x","0").attr("y","0").attr("rx","10").attr("transform","translate(-150, -30)").attr("fill","#cb1c1ede"),e.selectAll("text").data([null]).join("text").attr("fill","white").attr("transform","translate(-90, 5)").style("text-anchor","middle").text("Play"),e.on("mouseover",(function(){e.select("rect").transition().attr("fill","#696969")})).on("mouseout",(function(){"Play"===e.text()&&e.select("rect").transition().attr("fill","#cb1c1ede")})),e.on("click",(function(){"Pause"===e.text()?(t.cursorMoving=!1,clearInterval(t.buttonTimer),e.select("rect").transition().attr("fill","#cb1c1ede"),e.select("text").transition().text("Play")):(t.cursorMoving=!0,t.buttonTimer=setInterval(a,100),e.select("rect").transition().attr("fill","#696969"),e.select("text").transition().text("Pause"))}));var a=function(){t.updateDateSlider(t.timeScale.invert(t.currentCursorWidth)),t.currentCursorWidth+=t.playInterWidth,t.currentCursorWidth>t.props.sliderWidth+t.playInterWidth&&(t.cursorMoving=!1,t.currentCursorWidth=0,clearInterval(t.buttonTimer),e.select("rect").transition().attr("fill","#cb1c1ede"),e.select("text").transition().text("Play"))};this.initDateSlider()}},{key:"updateDateSlider",value:function(t){this.handle.attr("cx",this.timeScale(t)),this.handleText.attr("x",this.timeScale(t)).text(x(t)),this.props.onSliderDragged(t)}},{key:"initDateSlider",value:function(){var t=this,e=this.props.selector;e.selectAll(".track").data([null]).join("line").attr("class","track"),e.selectAll(".track-inset").data([null]).join("line").attr("class","track-inset");var a=e.selectAll(".track-overlay").data([null]).join("line").attr("class","track-overlay");e.selectAll("line").attr("x1",this.timeScale.range()[0]).attr("x2",this.timeScale.range()[1]),a.call(g.b().on("start.interrupt",(function(){return e.interrupt()})).on("start drag",(function(){t.currentCursorWidth=g.c.x,t.updateDateSlider(t.timeScale.invert(t.currentCursorWidth))})));var r=Math.floor((this.props.endDate.getTime()-this.props.startDate.getTime())/6048e5);this.playInterWidth=this.props.sliderWidth/(7*(r+1)),e.insert("g",".track-overlay").attr("class","ticks").attr("transform","translate(0, ".concat(this.props.tickOffset,")")).selectAll("text").data(this.timeScale.ticks(r)).join("text").attr("x",this.timeScale).attr("y",10).attr("text-anchor","middle").text((function(t){return x(t)})),this.handle=e.insert("circle",".track-overlay").attr("class","handle").attr("r",this.props.handleRadius),this.handleText=e.append("text").attr("class","handleText").attr("text-anchor","middle").text(x(this.props.startDate)).attr("transform","translate(0, ".concat(this.props.handleTextOffset,")"))}},{key:"render",value:function(){return n.a.createElement("div",{id:"DateSlider"})}}]),e}(r.Component),j=a(4),M=(a(111),a(112)),C=function(t){function e(){var t;return Object(u.a)(this,e),(t=Object(p.a)(this,Object(f.a)(e).call(this,{}))).state={dataDownloaded:!1,colorScaleMax:1e4,sliderProps:void 0},t.worldGeo=void 0,t.worldCovid=new Map,t.startDate=void 0,t.endDate=void 0,t.dataDownloaded=!1,t.colorScaleMax=1e4,t.colorScale=void 0,t.coloredMap=void 0,t.drawBasicMapSVG.bind(Object(v.a)(t)),t.getWorldData(),t}return Object(m.a)(e,t),Object(h.a)(e,[{key:"constructWorldCovidKey",value:function(t){return"".concat(t.getUTCDate(),"/").concat(t.getUTCMonth()+1)}},{key:"getWorldData",value:function(){var t=Object(d.a)(c.a.mark((function t(){var e,a,r,n,i=this;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([g.g("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),g.a("https://covid.ourworldindata.org/data/total_cases.csv")]);case 2:e=t.sent,a=Object(s.a)(e,2),r=a[0],n=a[1],this.worldGeo=M.feature(r,r.objects.countries).features,n.forEach((function(t){var e=new Date(t.date);i.worldCovid.set(i.constructWorldCovidKey(e),t),(Object(j.isNullOrUndefined)(i.startDate)||i.startDate.getTime()>e.getTime())&&(i.startDate=e),(Object(j.isNullOrUndefined)(i.endDate)||i.endDate.getTime()<e.getTime())&&(i.endDate=e)})),this.colorScale=this.createColorScale(),this.drawBasicMapSVG();case 10:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"createColorScale",value:function(){var t=this.state.colorScaleMax,e=g.i().domain([1,t]);return g.j((function(t){return g.f(0===t?t:e(t))}))}},{key:"drawBasicMapSVG",value:function(){if(!Object(j.isNullOrUndefined)(this.state.dataDownloaded)){var t=g.l("#CovidMap").selectAll(".svg-container").data([null]).join("div").classed("svg-container",!0).selectAll("svg").data([null]).join("svg").classed("svg-content-responsive",!0).attr("viewBox","0 0 ".concat(1024," ").concat(768)).attr("preserveAspectRatio","xMinYMin meet");t.selectAll(".title").data([null]).join("text").attr("class","title").text("COVID-19 Outbreak Across the World").attr("font-size","1.5em").attr("font-family","sans-serif").attr("transform","translate(270, 50)");var e={selector:t.selectAll(".map").data([null]).join("g").attr("class","map"),projection:g.d().scale(125),worldGeo:this.worldGeo,countryColor:"#fff5f0",sphereColor:"#3bb9b9bd"},a=new b(e);this.coloredMap=a,function(t){var e=t.selector,a=t.colorScale,r=t.colorWidth,n=t.colorHeight,i=t.textwidth,l=t.colorScaleMax,o=e.selectAll("#ColorLegendVertical").data([1]).join("g").attr("id","ColorLegendVertical"),c=g.h(0,l,l/30),s=c.length;o.selectAll("rect").data([null]).join("rect").attr("height",(s+2)*n).attr("width",i).attr("x","1").attr("fill","white").attr("opacity","0.7").attr("ry",n),o.selectAll("g").data(c).join("g").attr("class","ColorLegendVertical-label").attr("transform",(function(t,e){return"translate(".concat(r/2,", ").concat((e+1)*n,")")})).selectAll("rect").data((function(t){return[t]})).join("rect").attr("width",r).attr("height",n).attr("fill",(function(t){return a(t)})),o.selectAll(".text0").data(["0"]).join("text").attr("class","text0").text((function(t){return t})).attr("font-size",.75*r).attr("x",1.75*r).attr("y",.75*r),o.selectAll(".textMax").data([">".concat(l)]).join("text").attr("class","textMax").text((function(t){return t})).attr("font-size",.75*r).attr("x",1.75*r).attr("y",(s+1)*n)}({selector:t.selectAll(".colorLegend").data([null]).join("g").attr("class","colorLegend").attr("transform","translate(200, 300) scale(0.5, 0.5)"),colorScale:this.colorScale,colorWidth:20,colorHeight:5,textwidth:90,colorScaleMax:this.state.colorScaleMax});var r={selector:t.selectAll(".slider").data([null]).join("g").attr("class","slider").attr("transform","translate(200, 450) scale(0.5, 0.5)"),startDate:this.startDate,endDate:this.endDate,sliderWidth:1200,tickOffset:10,handleRadius:10,handleTextOffset:-20,onSliderDragged:this.colorMapByDay.bind(this)};this.setState({dataDownloaded:!0,colorScaleMax:this.state.colorScaleMax,sliderProps:r})}}},{key:"colorMapByDay",value:function(t){var e=this.worldCovid.get(this.constructWorldCovidKey(t));if(!Object(j.isNullOrUndefined)(e)){var a=this.combineWordGeoAndCovid(this.worldGeo,e);this.coloredMap.coloringMap(this.colorScale,a)}}},{key:"combineWordGeoAndCovid",value:function(t,e){var a=new Map;return t.forEach((function(t){a.set(t.id,{countryId:t.id,countryGeo:t,infected:0})})),Object.keys(e).forEach((function(t){var r=y[t],n=a.get(r);Object(j.isNullOrUndefined)(n)||(n.infected=Number(e[t]),a.set(r,n))})),Array.from(a.values())}},{key:"render",value:function(){if(!Object(j.isNullOrUndefined)(this.state.sliderProps)){var t=this.state.sliderProps;return n.a.createElement("div",{id:"CovidMap"},n.a.createElement(S,t))}return n.a.createElement("div",{id:"CovidMap"})}}]),e}(r.Component);l.a.render(n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"container"},n.a.createElement(C,null))),document.getElementById("root"))},99:function(t,e,a){t.exports=a(113)}},[[99,1,2]]]);
//# sourceMappingURL=main.676afb0e.chunk.js.map