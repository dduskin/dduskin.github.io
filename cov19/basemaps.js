const map = L.map('map',{zoomControl:true,attributionControl:false,doubleClickZoom: false}).setView([31.5,-99], 4);
// L.control.zoom({position:'bottomleft'}).addTo(map);
map.flyTo([31.5,-99], 6);
const googleRoad = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']}).addTo(map);
const google_terrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
var google_hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const Esri_WorldImagery = L.tileLayer('https://servicesbeta.arcgisonline.com/arcgis/rest/services/Firefly_World_Imagery/MapServer/tile/{z}/{y}/{x}');
const CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png');
const Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png');
const NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});
var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png');
var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
var basemapDiv = document.createElement("DIV");
basemapDiv.innerHTML =
// "<img style='margin-right:1em;position:absolute;top:0.75%;left:1%;z-index:750;' height=20 width=20 src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/2000px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png'/>"+
// "<div class='header'><span style='margin-left:3em;'>FEMA Region 6 | Posture and Footprint</span></div>"+
"<div id='baseMapsid' class='basemapsContainer'>"+
"<button id='baseMapsBtn' class='basemapsMainBtn'><img height=12 width=12 src='./img/basemap_gly.PNG'/>&nbsp;&nbsp;Base Map&nbsp;&nbsp;<span class='caret'></span></button>"+
"<div id='baseMaps' class='hide basemapsMainContainer animated'>"+
"<div style='padding:3px;margin-bottom: 10px;background-color: lightgray;'>"+
"<p style='margin:0px 0px 5px 0px;font-size:0.75em;'>Select a base map:</p>"+
"<div id='basemap1' class='basemaps'>"+
"<img class='basemapImg' src='./img/google_imagery.png'>"+
"<div class='basemapLabel'>Google Imagery</div></div>"+
"<div id='basemap2' class='basemaps'>"+
"<img class='basemapImg' src='./img/google_terrain.png'>"+
"<div class='basemapLabel'>Google Terrain</div></div>"+
"<div id='basemap3' class='basemaps basemapSelected'>"+
"<img class='basemapImg' src='./img/google_roads.PNG'>"+
"<div class='basemapLabel'>Google Roads</div></div><br>"+
"<div id='basemap4' class='basemaps'>"+
"<img class='basemapImg' src='./img/esri_imagery.PNG'>"+
"<div class='basemapLabel'>ESRI Imagery (Firefly)</div></div>"+
"<div id='basemap5' class='basemaps'>"+
"<img class='basemapImg' src='./img/cartodb_positron.PNG'>"+
"<div class='basemapLabel'>CartoDB Positron</div></div>"+
"<div id='basemap6' class='basemaps'>"+
"<img class='basemapImg' src='./img/stadia_dark.PNG'>"+
"<div class='basemapLabel'>Stadia Dark</div></div><br>"+
"<div id='basemap7' class='basemaps'>"+
"<img class='basemapImg' src='./img/nasa_night.png'>"+
"<div class='basemapLabel'>NASA GIBS (Night)</div></div>"+
"<div id='basemap8' class='basemaps'>"+
"<img class='basemapImg' src='./img/osm_hot.PNG'>"+
"<div class='basemapLabel'>OSM HOT</div></div>"+
"<div id='basemap9' class='basemaps'>"+
"<img class='basemapImg' src='./img/open_topo.PNG'>"+
"<div class='basemapLabel'>OSM OpenTopo</div></div>"+
"</div>"+
"<button id='closeBase' class='baseMapClose'>Close</button></div></div>";
document.body.appendChild(basemapDiv);
var basemapToggle = document.getElementById("baseMapsBtn");
var basemapDiv = document.getElementById("baseMaps");
var closeBase_ = document.getElementById("closeBase");

let basemapToggleNum = 1;
basemapToggle.onclick = function(){
	  basemapDiv.classList.toggle("hide");
		if(basemapToggleNum = 1){
			basemapToggleNum = 0;
			map.on("drag", function(){
			 document.getElementById("baseMaps").classList.add("hide");
		 });
		} else {
    baseMapToggleNum = 1;
		}
	}


closeBase_.onclick = function(){
    basemapDiv.classList.add("hide");

}
var basemap1_ = document.getElementById("basemap1")
basemap1_.onclick = function() {
  if(!map.hasLayer(google_hybrid)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.addLayer(google_hybrid);map.removeLayer(googleRoad);map.removeLayer(google_terrain);basemap1_.classList.add("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");
	boundary.setStyle({color:"white"})
}
}
var basemap2_ = document.getElementById("basemap2");
basemap2_.onclick = function() {
  if(!map.hasLayer(google_terrain)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.addLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.add("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"black"});
}
var basemap3_ = document.getElementById("basemap3");
basemap3_.onclick = function() {
  if(!map.hasLayer(googleRoad)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.addLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.add("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"black"});
}
var basemap4_ = document.getElementById("basemap4");
basemap4_.onclick = function() {
  if(!map.hasLayer(Esri_WorldImagery)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.addLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.add("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"white"})
}
var basemap5_ = document.getElementById("basemap5");
basemap5_.onclick = function() {
  if(!map.hasLayer(CartoDB_PositronNoLabels)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.addLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.add("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"black"});
}
var basemap6_ = document.getElementById("basemap6");
basemap6_.onclick = function() {
  if(!map.hasLayer(Stadia_AlidadeSmoothDark)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.addLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.add("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"white"})
}
var basemap7_ = document.getElementById("basemap7");
basemap7_.onclick = function() {
  if(!map.hasLayer(NASAGIBS_ViirsEarthAtNight2012)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.addLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.add("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"white"})
}
var basemap8_ = document.getElementById("basemap8");
basemap8_.onclick = function() {
  if(!map.hasLayer(OpenStreetMap_HOT)){
  map.removeLayer(OpenTopoMap);map.addLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.add("basemapSelected");basemap9_.classList.remove("basemapSelected");}
boundary.setStyle({color:"black"});
}
var basemap9_ = document.getElementById("basemap9");
basemap9_.onclick = function() {
  if(!map.hasLayer(OpenTopoMap)){
  map.addLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.add("basemapSelected");}
boundary.setStyle({color:"black"});
}


var layersDiv = document.createElement("DIV");
layersDiv.innerHTML =
// "<img style='margin-right:1em;position:absolute;top:0.75%;left:1%;z-index:750;' height=20 width=20 src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/2000px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png'/>"+
// "<div class='header'><span style='margin-left:3em;'>FEMA Region 6 | Posture and Footprint</span></div>"+
"<button id='openLayer_' class='layersMainBtn hide'><img height=12 width=12 src='./img/basemap_gly.PNG'/>&nbsp;&nbsp; Layers&nbsp;&nbsp;</button>"+
"<div id='layersContainer_' class='layersContainer'>"+
// "<button id='baseMapsBtn' class='basemapsMainBtn'><img height=12 width=12 src='./img/basemap_gly.PNG'/>&nbsp;&nbsp;Base Map&nbsp;&nbsp;<span class='caret'></span></button>"+
"<div class='basemapsMainContainer animated'>"+
"<div style='padding:3px;margin-bottom: 10px;background-color: lightgray;'>"+
"<p style='margin:0px 0px 5px 0px;font-size:0.85em;'>EXPLANATION:</p>"+
"<div id='layer1' class='layertoggles'>"+
"<img class='layerImg' src='./img/acs_legend.png'>"+
"<div class='layerLabel'>ACS</div></div>"+
"<div id='layer2' class='layertoggles'>"+
"<img class='layerImg' src='./img/cbts_legend.png'>"+
"<div class='layerLabel'>CBTS</div></div>"+
"<div id='layer3' class='layertoggles'>"+
"<img class='layerImg' src='./img/fms_legend.png'>"+
"<div class='layerLabel'>FMS</div></div>"+
// "<div id='layer4' class='layertoggles'>"+
// "<img class='layerImg' src='./img/ppe_legend.png'>"+
// "<div class='layerLabel'>PPE</div></div>"+
// "<div id='layer5' class='layertoggles'>"+
// "<img class='layerImg' src='./img/smms_legend.png'>"+
// "<div class='layerLabel'>SMMS</div></div>"+
"<div id='layer6' class='layertoggles'>"+
"<img class='layerImg' src='./img/ppe_legend.png'>"+
"<div class='layerLabel'>Battelle</div></div><br>"+

// "<div id='layer6' class='layertoggles'>"+
// "<img class='layerImg' src='./img/vha_legend.png'>"+
// "<div class='layerLabel'>VHA</div></div><br>"+
"<div id='layer7' class='layertoggles'><div class='layerLabel'>Shipping</div>"+
"<img class='layerImg' src='./img/shipping_legend.png'>"+
// "<div class='layerLabel'>Location</div></div>"+
// "<div id='layer8' class='layertoggles'><div class='layerLabel'>Staging</div>"+
// "<img class='layerImg' src='./img/staging_legend.png'>"+
"<div class='layerLabel'>Area</div></div>"+
"<div id='layer9' class='layertoggles'><div class='layerLabel'>EOC</div>"+
"<img class='layerImg' src='./img/eoc_legend.png'>"+
"<div class='layerLabel'>Active</div></div>"+
// "<div id='layer10' class='layertoggles'><div class='layerLabel'>IMAT</div>"+
// "<img class='layerImg' src='./img/imat_legend.png'>"+
// "<div class='layerLabel'>TEAMS</div></div>"+
// "<div id='layer10' class='layertoggles'><div class='layerLabel'>Battelle</div>"+
// "<img class='layerImg' src='./img/ppe_legend.png'>"+
// "<div class='layerLabel'>CCDS</div></div>"+
"<div id='layer11' class='layertoggles'><div class='layerLabel'>Affected</div>"+
"<img class='layerImg' src='./img/affected_legend.png'>"+
"<div class='layerLabel' style='font-size:0.6em;padding-top:0.85em;padding-bottom:0.2em;'>County/Parish</div></div>"+
"<div class='layertoggles'>"+
"<button id='addallLayer'class='addallLayerImg'></button><br>"+
"<button id='removeallLayer'class='removeallLayerImg'></button>"+
"<div class='layerLabel' style='font-size:0.5em;'>add | remove</div></div>"+
"</div>"+
"<button id='closeLayer' class='baseMapClose'>Close</button></div></div>";





document.body.appendChild(layersDiv);

var closeLayer_ = document.getElementById("closeLayer");
closeLayer_.onclick = function(){
    document.getElementById("layersContainer_").classList.add("hide");
		document.getElementById("openLayer_").classList.remove("hide");

}
var openLayer_ = document.getElementById("openLayer_");
openLayer_.onclick = function(){
    document.getElementById("layersContainer_").classList.remove("hide");
				document.getElementById("openLayer_").classList.add("hide");

}




const layerGroup = L.featureGroup([]).addTo(map);
document.getElementById("addallLayer").onclick = function(){
layerGroup.addLayer(acs);
layerGroup.addLayer(cbts);
layerGroup.addLayer(fms);
// layerGroup.addLayer(smms);
//layerGroup.addLayer(vha);
//layerGroup.addLayer(ppe);
layerGroup.addLayer(shipping);
layerGroup.addLayer(staging);


layerGroup.addLayer(eocs);
layerGroup.addLayer(battelle);
layerGroup.addLayer(aoi);
document.getElementById("layer1").classList.remove("layernotSelected");
document.getElementById("layer2").classList.remove("layernotSelected");
document.getElementById("layer3").classList.remove("layernotSelected");
// document.getElementById("layer4").classList.remove("layernotSelected");
// document.getElementById("layer5").classList.remove("layernotSelected");
document.getElementById("layer6").classList.remove("layernotSelected");
document.getElementById("layer7").classList.remove("layernotSelected");
// document.getElementById("layer8").classList.remove("layernotSelected");
document.getElementById("layer9").classList.remove("layernotSelected");
document.getElementById("layer10").classList.remove("layernotSelected");
document.getElementById("layer11").classList.remove("layernotSelected");
}
document.getElementById("removeallLayer").onclick = function(){
layerGroup.clearLayers();
document.getElementById("layer1").classList.add("layernotSelected");
document.getElementById("layer2").classList.add("layernotSelected");
document.getElementById("layer3").classList.add("layernotSelected");
// document.getElementById("layer4").classList.add("layernotSelected");
// document.getElementById("layer5").classList.add("layernotSelected");
document.getElementById("layer6").classList.add("layernotSelected");
document.getElementById("layer7").classList.add("layernotSelected");
// document.getElementById("layer8").classList.add("layernotSelected");
document.getElementById("layer9").classList.add("layernotSelected");
// document.getElementById("layer10").classList.add("layernotSelected");
document.getElementById("layer11").classList.add("layernotSelected");
}
document.getElementById("layer1").onclick = function(){
	if(layerGroup.hasLayer(acs)){layerGroup.removeLayer(acs);document.getElementById("layer1").classList.add("layernotSelected");} else {
		layerGroup.addLayer(acs);document.getElementById("layer1").classList.remove("layernotSelected");
	}
}
document.getElementById("layer2").onclick = function(){
	if(layerGroup.hasLayer(cbts)){layerGroup.removeLayer(cbts);document.getElementById("layer2").classList.add("layernotSelected");} else {
		layerGroup.addLayer(cbts);document.getElementById("layer2").classList.remove("layernotSelected");
	}
}
document.getElementById("layer3").onclick = function(){
	if(layerGroup.hasLayer(fms)){layerGroup.removeLayer(fms);document.getElementById("layer3").classList.add("layernotSelected");} else {
		layerGroup.addLayer(fms);document.getElementById("layer3").classList.remove("layernotSelected");
	}
}
// document.getElementById("layer4").onclick = function(){
// 	if(layerGroup.hasLayer(ppe)){layerGroup.removeLayer(ppe);document.getElementById("layer4").classList.add("layernotSelected");} else {
// 		layerGroup.addLayer(ppe);document.getElementById("layer4").classList.remove("layernotSelected");
// 	}
// }
// document.getElementById("layer5").onclick = function(){
// 	if(layerGroup.hasLayer(smms)){layerGroup.removeLayer(smms);document.getElementById("layer5").classList.add("layernotSelected");} else {
// 		layerGroup.addLayer(smms);document.getElementById("layer5").classList.remove("layernotSelected");
// 	}
// }
document.getElementById("layer6").onclick = function(){
	if(layerGroup.hasLayer(battelle)){layerGroup.removeLayer(battelle);document.getElementById("layer6").classList.add("layernotSelected");} else {
		layerGroup.addLayer(battelle);document.getElementById("layer6").classList.remove("layernotSelected");
	}
}
document.getElementById("layer7").onclick = function(){
	if(layerGroup.hasLayer(shipping)){layerGroup.removeLayer(shipping);document.getElementById("layer7").classList.add("layernotSelected");} else {
		layerGroup.addLayer(shipping);document.getElementById("layer7").classList.remove("layernotSelected");
	}
}
// document.getElementById("layer8").onclick = function(){
// 	if(layerGroup.hasLayer(staging)){layerGroup.removeLayer(staging);document.getElementById("layer8").classList.add("layernotSelected");} else {
// 		layerGroup.addLayer(staging);document.getElementById("layer8").classList.remove("layernotSelected");
// 	}
// }
document.getElementById("layer9").onclick = function(){
	if(layerGroup.hasLayer(eocs)){layerGroup.removeLayer(eocs);document.getElementById("layer9").classList.add("layernotSelected");} else {
		layerGroup.addLayer(eocs);document.getElementById("layer9").classList.remove("layernotSelected");
	}
}
// document.getElementById("layer10").onclick = function(){
// 	if(layerGroup.hasLayer(battelle)){layerGroup.removeLayer(battelle);document.getElementById("layer10").classList.add("layernotSelected");} else {
// 		layerGroup.addLayer(battelle);document.getElementById("layer10").classList.remove("layernotSelected");
// 	}
// }
document.getElementById("layer11").onclick = function(){
	if(layerGroup.hasLayer(aoi)){layerGroup.removeLayer(aoi);document.getElementById("layer11").classList.add("layernotSelected");} else {
		layerGroup.addLayer(aoi);document.getElementById("layer11").classList.remove("layernotSelected");
	}
}
