const map = L.map('map',{zoomControl:false,attributionControl:false,doubleClickZoom: false}).setView([31.5,-99], 6);
const googleRoad = L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
const google_terrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
var google_hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const Esri_WorldImagery = L.tileLayer('https://servicesbeta.arcgisonline.com/arcgis/rest/services/Firefly_World_Imagery/MapServer/tile/{z}/{y}/{x}');
const CartoDB_PositronNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png').addTo(map);
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
"<img style='margin-right:1em;position:absolute;top:0.75%;left:1%;z-index:750;' height=20 width=20 src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Seal_of_the_United_States_Department_of_Homeland_Security.svg/2000px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png'/>"+
"<div class='header'><span style='margin-left:3em;'>FEMA Region 6 | Posture and Footprint</span></div>"+
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
"<div id='basemap3' class='basemaps'>"+
"<img class='basemapImg' src='./img/google_roads.PNG'>"+
"<div class='basemapLabel'>Google Roads</div></div><br>"+
"<div id='basemap4' class='basemaps'>"+
"<img class='basemapImg' src='./img/esri_imagery.PNG'>"+
"<div class='basemapLabel'>ESRI Imagery (Firefly)</div></div>"+
"<div id='basemap5' class='basemaps basemapSelected'>"+
"<img class='basemapImg' src='./img/cartodb_positron.PNG'>"+
"<div class='basemapLabel'>CartoDB Positron (No Labels)</div></div>"+
"<div id='basemap6' class='basemaps'>"+
"<img class='basemapImg' src='./img/stadia_dark.PNG'>"+
"<div class='basemapLabel'>Stadia Dark</div></div><br>"+
"<div id='basemap7' class='basemaps'>"+
"<img class='basemapImg' src='./img/nasa_night.png'>"+
"<div class='basemapLabel'>NASA GIBS (Night)</div></div>"+
"<div id='basemap8' class='basemaps'>"+
"<img class='basemapImg' src='./img/osm_hot.PNG'>"+
"<div class='basemapLabel'>Open Street Map HOT</div></div>"+
"<div id='basemap9' class='basemaps'>"+
"<img class='basemapImg' src='./img/open_topo.PNG'>"+
"<div class='basemapLabel'>Open Street Map OpenTopo</div></div>"+
"</div>"+
"<button id='closeBase' class='baseMapClose'>Close</button></div></div>";
document.body.appendChild(basemapDiv);
var basemapToggle = document.getElementById("baseMapsBtn");
var basemapDiv = document.getElementById("baseMaps");
var closeBase_ = document.getElementById("closeBase");

let basemapToggleNum = 1;
basemapToggle.onclick = ()=>{
	  basemapDiv.classList.toggle("hide");
		if(basemapToggleNum = 1){
			basemapToggleNum = 0;
			map.on("drag", ()=>{
			 document.getElementById("baseMaps").classList.add("hide");
		 });
		} else {
    baseMapToggleNum = 1;
		}
	}


closeBase_.onclick = ()=>{
    basemapDiv.classList.add("hide");

}
var basemap1_ = document.getElementById("basemap1")
basemap1_.onclick = ()=> {
  if(!map.hasLayer(google_hybrid)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.addLayer(google_hybrid);map.removeLayer(googleRoad);map.removeLayer(google_terrain);basemap1_.classList.add("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap2_ = document.getElementById("basemap2");
basemap2_.onclick = ()=> {
  if(!map.hasLayer(google_terrain)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.addLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.add("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap3_ = document.getElementById("basemap3");
basemap3_.onclick = ()=> {
  if(!map.hasLayer(googleRoad)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.addLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.add("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap4_ = document.getElementById("basemap4");
basemap4_.onclick = ()=> {
  if(!map.hasLayer(Esri_WorldImagery)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.addLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.add("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap5_ = document.getElementById("basemap5");
basemap5_.onclick = ()=> {
  if(!map.hasLayer(CartoDB_PositronNoLabels)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.addLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.add("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap6_ = document.getElementById("basemap6");
basemap6_.onclick = ()=> {
  if(!map.hasLayer(Stadia_AlidadeSmoothDark)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.addLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.add("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap7_ = document.getElementById("basemap7");
basemap7_.onclick = ()=> {
  if(!map.hasLayer(NASAGIBS_ViirsEarthAtNight2012)){
  map.removeLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.addLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.add("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap8_ = document.getElementById("basemap8");
basemap8_.onclick = ()=> {
  if(!map.hasLayer(OpenStreetMap_HOT)){
  map.removeLayer(OpenTopoMap);map.addLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.add("basemapSelected");basemap9_.classList.remove("basemapSelected");}
}
var basemap9_ = document.getElementById("basemap9");
basemap9_.onclick = ()=> {
  if(!map.hasLayer(OpenTopoMap)){
  map.addLayer(OpenTopoMap);map.removeLayer(OpenStreetMap_HOT);map.removeLayer(NASAGIBS_ViirsEarthAtNight2012);map.removeLayer(Stadia_AlidadeSmoothDark);map.removeLayer(CartoDB_PositronNoLabels);map.removeLayer(Esri_WorldImagery);map.removeLayer(google_terrain);map.removeLayer(googleRoad);map.removeLayer(google_hybrid);basemap1_.classList.remove("basemapSelected");basemap2_.classList.remove("basemapSelected");basemap3_.classList.remove("basemapSelected");basemap4_.classList.remove("basemapSelected");basemap5_.classList.remove("basemapSelected");basemap6_.classList.remove("basemapSelected");basemap7_.classList.remove("basemapSelected");basemap8_.classList.remove("basemapSelected");basemap9_.classList.add("basemapSelected");}
}
