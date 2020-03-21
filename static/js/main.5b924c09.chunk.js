(this["webpackJsonpcoronavirus-map-client"]=this["webpackJsonpcoronavirus-map-client"]||[]).push([[0],{104:function(t,e,a){},106:function(t,e,a){},110:function(t,e,a){},111:function(t,e,a){},113:function(t,e,a){"use strict";a.r(e);var r=a(1),n=a.n(r),i=a(62),o=a.n(i),l=(a(104),a(15)),s=a.n(l),c=a(64),d=a(63),u=a(3),h=a(4),p=a(13),f=a(12),b=a(5),v=a(14),g=a(0),m=(a(106),a(6)),y=function(){function t(e){Object(u.a)(this,t),this.basicMapProps=void 0,this.pathGenerator=void 0,this.defaultStrokeWidth="0.02px",this.coloredStrokeWidth="0.3px",this.tooltipHide=function(t){t.style("opacity",0)},this.tooltipShow=function(t,e){var a;t.transition().style("opacity",1),a=Object(m.isNullOrUndefined)(e.infected)?e.properties.name:"".concat(e.countryGeo.properties.name,": ").concat(e.infected),t.style("left",g.c.pageX+"px").style("top",g.c.pageY+"px").text(a)},this.basicMapProps=e,this.renderBasicMap(this.basicMapProps)}return Object(h.a)(t,[{key:"renderTooltip",value:function(t){var e=this,a=this.basicMapProps.tooltip;t.on("click",(function(t){e.tooltipShow(a,t)})).on("mouseover",(function(t){e.tooltipShow(a,t)})).on("mouseout",(function(t){e.tooltipHide(a)}))}},{key:"coloringMap",value:function(t,e){var a=this,r=this.basicMapProps.selector.selectAll(".country").data(e,(function(t){return t.countryId})).join("path").attr("class","country").attr("d",(function(t){return a.pathGenerator(t.countryGeo)})).attr("fill",(function(e){return t(e.infected)})).attr("stroke-width",(function(t){return 0===t.infected?a.defaultStrokeWidth:a.coloredStrokeWidth}));this.renderTooltip(r)}},{key:"hilightingMap",value:function(t){this.basicMapProps.selector.selectAll(".country").attr("opacity",(function(e){return null===t||e.infected>=t[0]&&e.infected<=t[1]?1:.2}))}},{key:"renderBasicMap",value:function(t){var e=t.selector,a=t.projection,r=t.worldGeo,n=t.countryColor,i=t.sphereColor,o=g.e(a);this.pathGenerator=o;var l=e;l.selectAll(".sphere").data([null]).join("path").attr("class","sphere").attr("d",(function(t){return o({type:"Sphere"})})).attr("fill",i);var s=l.selectAll(".country").data(r,(function(t){return t.id})).join("path").attr("class","country").attr("d",(function(t){return o(t)})).attr("fill",n).attr("stroke-width",this.defaultStrokeWidth);return this.renderTooltip(s),l}}]),t}(),k={Afghanistan:"004",Albania:"008",Algeria:"012",Andorra:null,"Antigua and Barbuda":null,Argentina:"032",Armenia:"051",Australia:"036",Austria:"040",Azerbaijan:"031",Bahamas:"044",Bahrain:null,Bangladesh:"050",Barbados:null,Belarus:"112",Belgium:"056",Benin:"204",Bermuda:null,Bhutan:"064",Bolivia:"068","Bosnia and Herzegovina":"070",Brazil:"076",Brunei:"096",Bulgaria:"100","Burkina Faso":"854",Cambodia:"116",Cameroon:"120",Canada:"124","Cape Verde":null,"Cayman Islands":null,"Central African Republic":"140",Chad:"148",Chile:"152",China:"156",Colombia:"170",Congo:"178","Costa Rica":"188","Cote d'Ivoire":"384",Croatia:"191",Cuba:"192",Cyprus:"196","Czech Republic":"203","Democratic Republic of Congo":"180",Denmark:"208",Djibouti:"262","Dominican Republic":"214",Ecuador:"218",Egypt:"818","El Salvador":"222","Equatorial Guinea":"226",Estonia:"233",Ethiopia:"231","Faeroe Islands":null,Fiji:"242",Finland:"246",France:"250","French Polynesia":null,Gabon:"266",Gambia:"270",Georgia:"268",Germany:"276",Ghana:"288",Gibraltar:null,Greece:"300",Greenland:"304",Guam:null,Guatemala:"320",Guernsey:null,Guinea:"324",Guyana:"328",Haiti:"332",Honduras:"340",Hungary:"348",Iceland:"352",India:"356",Indonesia:"360",Iran:"364",Iraq:"368",Ireland:"372","Isle of Man":null,Israel:"376",Italy:"380",Jamaica:"388",Japan:"392",Jersey:null,Jordan:"400",Kazakhstan:"398",Kenya:"404",Kosovo:null,Kuwait:"414",Kyrgyzstan:"417",Latvia:"428",Lebanon:"422",Liberia:"430",Liechtenstein:null,Lithuania:"440",Luxembourg:"442",Macedonia:"807",Madagascar:"450",Malaysia:"458",Maldives:null,Malta:null,Mauritania:"478",Mauritius:null,Mexico:"484",Moldova:"498",Monaco:null,Mongolia:"496",Montenegro:"499",Montserrat:null,Morocco:"504",Myanmar:"104",Namibia:"516",Nepal:"524",Netherlands:"528","Netherlands Antilles":null,"New Caledonia":"540","New Zealand":"554",Nicaragua:"558",Niger:"562",Nigeria:"566",Norway:"578",Oman:"512",Pakistan:"586",Palestine:"275",Panama:"591","Papua New Guinea":"598",Paraguay:"600",Peru:"604",Philippines:"608",Poland:"616",Portugal:"620",Qatar:"634",Romania:"642",Russia:"643",Rwanda:"646","Saint Lucia":null,"Saint Vincent and the Grenadines":null,"San Marino":null,"Saudi Arabia":"682",Senegal:"686",Serbia:"688",Seychelles:null,Singapore:null,Slovakia:"703",Slovenia:"705",Somalia:"706","South Africa":"710","South Korea":"410",Spain:"724","Sri Lanka":"144",Sudan:"729",Suriname:"740",Swaziland:null,Sweden:"752",Switzerland:"756",Taiwan:"158",Tanzania:"834",Thailand:"764",Togo:"768","Trinidad and Tobago":"780",Tunisia:"788",Turkey:"792",Ukraine:"804","United Arab Emirates":"784","United Kingdom":"826","United States":"840",Uruguay:"858",Uzbekistan:"860",Vatican:null,Venezuela:"862",Vietnam:"704",Zambia:"894",Zimbabwe:"716","Western Sahara":"732","Falkland Island":"238","French Southern and Antarctic Lands":"260","Timor-Leste":"626",Lesotho:"426",Belize:"084","Puerto Rico":"630",Botswana:"072",Mali:"466","Guinea-Bissau":"624","Sierra Leone":"694",Malawi:"454",Mozambique:"508",eSwatini:"748",Angola:"024",Burundi:"108",Vanuatu:"548",Laos:"418","North Korea":"408",Tajikistan:"762",Turkmenistan:"795",Syria:"760","Solomon Island":"090",Eritrea:"232",Yemen:"887",Antarctica:"010",Libya:"434",Uganda:"800","South Sudan":"728"};a(110);var x=g.l("%d %b"),S=function(t){function e(t){var a;Object(u.a)(this,e),(a=Object(p.a)(this,Object(f.a)(e).call(this,t))).timeScale=void 0,a.handle=void 0,a.handleText=void 0,a.playInterWidth=void 0,a.cursorMoving=!1,a.buttonTimer=void 0,a.currentCursorWidth=0,a.buttonPlayColor="#cb1c1ede",a.buttonPauseColor="#696969",a.initDateSlider.bind(Object(b.a)(a)),a.updateDateSlider.bind(Object(b.a)(a));var r=g.j().domain([a.props.startDate,a.props.endDate]).range([0,a.props.sliderWidth]).clamp(!0);return a.timeScale=r,a}return Object(v.a)(e,t),Object(h.a)(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props.selector.selectAll(".button").data([null]).join("g").attr("class","button");e.selectAll("rect").data([null]).join("rect").attr("height","50").attr("width","120").attr("x","0").attr("y","0").attr("rx","10").attr("transform","translate(-150, -30)").attr("fill",this.buttonPlayColor),e.selectAll("text").data([null]).join("text").attr("fill","white").attr("transform","translate(-90, 5)").style("text-anchor","middle").text("Play"),e.on("mouseover",(function(){e.select("rect").transition().attr("fill",t.buttonPauseColor)})).on("mouseout",(function(){"Play"===e.text()&&e.select("rect").transition().attr("fill",t.buttonPlayColor)})),e.on("click",(function(){"Pause"===e.text()?(t.cursorMoving=!1,clearInterval(t.buttonTimer),e.select("rect").transition().attr("fill",t.buttonPlayColor),e.select("text").transition().text("Play")):(t.cursorMoving=!0,t.buttonTimer=setInterval(a,100),e.select("rect").transition().attr("fill",t.buttonPauseColor),e.select("text").transition().text("Pause"))}));var a=function(){t.updateDateSlider(t.timeScale.invert(t.currentCursorWidth)),t.currentCursorWidth+=t.playInterWidth,t.currentCursorWidth>t.props.sliderWidth+t.playInterWidth&&(t.cursorMoving=!1,t.currentCursorWidth=0,clearInterval(t.buttonTimer),e.select("rect").transition().attr("fill",t.buttonPlayColor),e.select("text").transition().text("Play"))};this.initDateSlider()}},{key:"updateDateSlider",value:function(t){this.handle.attr("cx",this.timeScale(t)),this.handleText.attr("x",this.timeScale(t)).text(x(t)),this.props.onSliderDragged(t)}},{key:"initDateSlider",value:function(){var t=this,e=this.props.selector;e.selectAll(".track").data([null]).join("line").attr("class","track"),e.selectAll(".track-inset").data([null]).join("line").attr("class","track-inset");var a=e.selectAll(".track-overlay").data([null]).join("line").attr("class","track-overlay");e.selectAll("line").attr("x1",this.timeScale.range()[0]).attr("x2",this.timeScale.range()[1]),a.call(g.b().on("start.interrupt",(function(){return e.interrupt()})).on("start drag",(function(){t.currentCursorWidth=g.c.x,t.updateDateSlider(t.timeScale.invert(t.currentCursorWidth))})));var r=Math.floor((this.props.endDate.getTime()-this.props.startDate.getTime())/6048e5);this.playInterWidth=this.props.sliderWidth/(7*(r+1)),e.insert("g",".track-overlay").attr("class","ticks").attr("transform","translate(0, ".concat(this.props.tickOffset,")")).selectAll("text").data(this.timeScale.ticks(r)).join("text").attr("x",this.timeScale).attr("y",10).attr("text-anchor","middle").text((function(t){return x(t)})),this.handle=e.insert("circle",".track-overlay").attr("class","handle").attr("r",this.props.handleRadius).attr("cx",this.timeScale(this.props.endDate)),this.handleText=e.append("text").attr("class","handleText").attr("text-anchor","middle").attr("x",this.timeScale(this.props.endDate)).text(x(this.props.endDate)).attr("transform","translate(0, ".concat(this.props.handleTextOffset,")"))}},{key:"render",value:function(){return n.a.createElement("div",{id:"DateSlider"})}}]),e}(r.Component),M=function(){function t(e){Object(u.a)(this,t),this.props=void 0,this.backgroundWidth=175,this.backgroundHeight=230,this.barMargin={top:25,left:15},this.barWidth=30,this.barHeight=180,this.fontsize=18,this.colorLegendVerticalG=void 0,this.props=e,this.colorLegendVerticalG=this.props.selector.selectAll("#ColorLegendVertical").data([1]).join("g").attr("id","ColorLegendVertical"),this.background(),this.gradientLegend(),this.clickableLegend(this.props.clickedDomain)}return Object(h.a)(t,[{key:"background",value:function(){this.colorLegendVerticalG.selectAll("rect").data([null]).join("rect").attr("height",this.backgroundHeight).attr("width",this.backgroundWidth).attr("x","1").attr("fill","white").attr("opacity","0.7").attr("ry",10)}},{key:"gradientLegend",value:function(){for(var t=this.props.colorScaleMax,e=this.props.colorScale,a=[],r=t/10,n=0;n<10;++n){var i=0+r*n;a.push({number:i,offset:"".concat(i/t*100,"%"),color:e(i)})}this.colorLegendVerticalG.selectAll("defs").data([null]).join("defs").selectAll("linearGradient").data([null]).join("linearGradient").attr("id","svgGradient").attr("x1","0%").attr("x2","0%").attr("y1","0%").attr("y2","100%").selectAll("stop").data(a).join("stop").attr("offset",(function(t){return t.offset})).attr("stop-color",(function(t){return t.color}));this.colorLegendVerticalG.selectAll(".gradient-rect").data([null]).join("rect").attr("class","gradient-rect").attr("fill","url(#svgGradient)").attr("transform","translate(".concat(this.barMargin.left,", ").concat(this.barMargin.top,")")).attr("width",this.barWidth).attr("height",this.barHeight);this.colorLegendVerticalG.selectAll(".text0").data(["0"]).join("text").attr("class","text0").attr("text-anchor","middle").text((function(t){return t})).attr("font-size",this.fontsize).attr("x",this.barWidth/2+this.barMargin.left).attr("y",.75*this.barMargin.top),this.colorLegendVerticalG.selectAll(".textMax").data([">".concat(t)]).join("text").attr("class","textMax").attr("text-anchor","middle").text((function(t){return t})).attr("font-size",this.fontsize).attr("x",this.barWidth/2+this.barMargin.left+this.fontsize/2).attr("y",this.barMargin.top+this.barHeight+this.fontsize)}},{key:"clickableLegend",value:function(t){var e=this,a=this.props.colorScaleMax,r=this.colorLegendVerticalG.selectAll(".clickable").data([null]).join("g").attr("class","clickable"),n=[[1,9],[10,99],[100,999],[1e3,9999],[a,753e7]],i=(this.backgroundHeight-2*this.barMargin.top)/n.length,o=r.selectAll(".clickable-ticks").data(n).join("g").attr("class","clickable-ticks").attr("transform",(function(t,a){return"translate(".concat(2*e.barMargin.left+e.barWidth,", ").concat(1.25*e.barMargin.top+i*a,")")})).attr("cursor","pointer").attr("opacity",(function(e){return!t||e[0]===t[0]&&e[1]===t[1]?1:.2})).on("click",(function(a){return e.props.onClick(t&&a[0]===t[0]&&a[1]===t[1]?null:a)}));o.selectAll("rect").data((function(t){return[t]})).join("rect").attr("fill",(function(t){return e.props.colorScale(t[0])})).attr("ry",5).attr("width",20).attr("height",20),o.selectAll("text").data((function(t){return[t]})).join("text").attr("font-size",this.fontsize).attr("text-anchor","left").attr("dominant-baseline","hanging").attr("transform","translate(".concat(24,", 0)")).text((function(t){return t[0]===a?">".concat(a):"".concat(t[0],"-").concat(t[1])}))}}]),t}(),j=(a(111),a(112)),C=function(t){function e(){var t;return Object(u.a)(this,e),(t=Object(p.a)(this,Object(f.a)(e).call(this,{}))).state={sliderProps:void 0},t.dataDownloaded=!1,t.worldGeo=void 0,t.worldCovid=new Map,t.startDate=void 0,t.endDate=void 0,t.colorScaleMax=1e4,t.colorScale=void 0,t.coloredMap=void 0,t.colorNonInfacted="#ffffff",t.sphereColor="#3bb9b99a",t.drawBasicMapSVG.bind(Object(b.a)(t)),t.getWorldData(),t}return Object(v.a)(e,t),Object(h.a)(e,[{key:"constructWorldCovidKey",value:function(t){return"".concat(t.getUTCDate(),"/").concat(t.getUTCMonth()+1)}},{key:"getWorldData",value:function(){var t=Object(d.a)(s.a.mark((function t(){var e,a,r,n,i,o,l,d,u,h,p,f,b;return s.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Promise.all([g.g("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"),g.a("https://covid.ourworldindata.org/data/ecdc/total_cases.csv")]);case 2:e=t.sent,a=Object(c.a)(e,2),r=a[0],n=a[1],this.worldGeo=j.feature(r,r.objects.countries).features,n.sort((function(t,e){var a=new Date(t.date),r=new Date(e.date);return a.getTime()-r.getTime()})),this.startDate=new Date(n[0].date),this.endDate=new Date(n[n.length-1].date),i=null,o=!0,l=!1,d=void 0,t.prev=14,u=n[Symbol.iterator]();case 16:if(o=(h=u.next()).done){t.next=34;break}p=h.value,t.t0=s.a.keys(p);case 19:if((t.t1=t.t0()).done){t.next=28;break}if(f=t.t1.value,!Object.prototype.hasOwnProperty.call(p,f)){t.next=26;break}if("date"!==f){t.next=24;break}return t.abrupt("continue",19);case 24:""===p[f]&&(p[f]=null===i?0:i[f]);case 26:t.next=19;break;case 28:b=new Date(p.date),this.worldCovid.set(this.constructWorldCovidKey(b),p),i=p;case 31:o=!0,t.next=16;break;case 34:t.next=40;break;case 36:t.prev=36,t.t2=t.catch(14),l=!0,d=t.t2;case 40:t.prev=40,t.prev=41,o||null==u.return||u.return();case 43:if(t.prev=43,!l){t.next=46;break}throw d;case 46:return t.finish(43);case 47:return t.finish(40);case 48:this.dataDownloaded=!0,this.colorScale=this.createColorScale(),this.drawBasicMapSVG();case 51:case"end":return t.stop()}}),t,this,[[14,36,40,48],[41,,43,47]])})));return function(){return t.apply(this,arguments)}}()},{key:"createColorScale",value:function(){var t=this,e=this.colorScaleMax,a=g.h().domain([1,e]);return g.i((function(e){return 0===e?t.colorNonInfacted:g.f(a(e))}))}},{key:"drawBasicMapSVG",value:function(){if(!Object(m.isNullOrUndefined)(this.dataDownloaded)){var t=g.k("#CovidMap").selectAll(".svg-container").data([null]).join("div").classed("svg-container",!0).selectAll("svg").data([null]).join("svg").classed("svg-content-responsive",!0).attr("viewBox","0 0 ".concat(1024," ").concat(768)).attr("preserveAspectRatio","xMinYMin meet"),e=t.selectAll(".zoom-container").data([null]).join("g").attr("class","zoom-container");e.selectAll(".title").data([null]).join("text").attr("class","title").text("COVID-19 Outbreak Across the World").attr("font-size","1.5em").attr("font-family","sans-serif").attr("transform","translate(270, 50)");var a=g.k("#CovidMap").selectAll(".country-tooltip").data([null]).join("div").attr("class","country-tooltip").style("opacity",0),r={selector:e.selectAll(".map").data([null]).join("g").attr("class","map"),projection:g.d().scale(125),worldGeo:this.worldGeo,countryColor:this.colorNonInfacted,sphereColor:this.sphereColor,tooltip:a},n=new y(r);this.coloredMap=n;var i,o=e.selectAll(".colorLegend").data([null]).join("g").attr("class","colorLegend").attr("transform","translate(210, 270) scale(0.5, 0.5)"),l=new M({selector:o,colorScale:this.colorScale,colorScaleMax:this.colorScaleMax,onClick:function(t){i=t,n.hilightingMap(i),l.clickableLegend(i)},clickedDomain:i}),s={selector:e.selectAll(".slider").data([null]).join("g").attr("class","slider").attr("transform","translate(200, 450) scale(0.5, 0.5)"),startDate:this.startDate,endDate:this.endDate,sliderWidth:1200,tickOffset:10,handleRadius:10,handleTextOffset:-20,onSliderDragged:this.colorMapByDay.bind(this)};this.colorMapByDay(this.endDate);var c=g.m().scaleExtent([1,8]).on("zoom",(function(){e.attr("transform",g.c.transform)}));t.call(c),this.setState({sliderProps:s})}}},{key:"colorMapByDay",value:function(t){var e=this.worldCovid.get(this.constructWorldCovidKey(t));if(!Object(m.isNullOrUndefined)(e)){var a=this.combineWordGeoAndCovid(this.worldGeo,e);this.coloredMap.coloringMap(this.colorScale,a)}}},{key:"combineWordGeoAndCovid",value:function(t,e){var a=new Map;return t.forEach((function(t){a.set(t.id,{countryId:t.id,countryGeo:t,infected:0})})),Object.keys(e).forEach((function(t){var r=k[t],n=a.get(r);Object(m.isNullOrUndefined)(n)||(n.infected=Number(e[t]),a.set(r,n))})),Array.from(a.values())}},{key:"render",value:function(){if(!Object(m.isNullOrUndefined)(this.state.sliderProps)){var t=this.state.sliderProps;return n.a.createElement("div",{id:"CovidMap"},n.a.createElement(S,t))}return n.a.createElement("div",{id:"CovidMap"})}}]),e}(r.Component);o.a.render(n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"container"},n.a.createElement(C,null))),document.getElementById("root"))},99:function(t,e,a){t.exports=a(113)}},[[99,1,2]]]);
//# sourceMappingURL=main.5b924c09.chunk.js.map