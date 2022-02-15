var myMap;
var parkData;
var redMarker;
var hotelMarker;
var hotParksLayer;
var marker = 0;

var HotAcad = [{coord:[44.38763151750132, -68.20553326710981 ],"name":"Acadia Hotel - Downtown" },
{coord:[44.38721889394144, -68.21044114796977], "name":"The Inn on Mount Desert"},
{coord:[44.39815243550061, -68.22494826639411], "name":"Atlantic Oceanside Hotel & Event Center"}];

var HotIndu = [{coord:[41.618670601276726, -87.04224098918274 ],"name":"WaterBird Lakeside Inn" },
{coord:[41.62175046937392, -87.08378304256094], "name":"Spring House Inn"},
{coord:[41.6125466486599, -87.1047592161781], "name":"Comfort Inn & Suites Near Indiana Dunes State Park"}];

function createMap(data) {
  parkData = data;
  
  // Add a tile layer.
   var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });
  
  var baseMaps = {
    "Street Map": streetmap,
    "Topographic Map": topo
  };
 
  var allParks =[];
  var natParks = [];



  blueMarker = L.ExtraMarkers.icon({
    icon: 'fa-compass', 
    markerColor: '#0066CC',
    shape: 'circle',
    prefix: 'fa',
    svg :true 
  });


  hotelMarker =   L.ExtraMarkers.icon({
    icon: 'fa-bed',
    markerColor: '#008000',
    shape: 'penta',
    prefix: 'fa',
    svg :true 
  }); 

  // Looping through the parks, adding marker
  for (var i = 0; i < data.length; i++) {
    var area = data[i];
    allParks.push(
      L.marker([area.latitude, area.longitude], {icon: blueMarker, opacity:0.5})
      .bindPopup(`<h6><a href= "parks/${area.parkCode}">${area.fullName}</a></h6> <hr> <b> ${area.designation}, ${area.states}</b>`))

    if ("National Park" == area.designation) {
      natParks.push( 
        L.marker([area.latitude, area.longitude],  {zIndexOffset:500})
        .bindPopup(`<h6><a href= "parks/${area.parkCode}">${area.fullName}</a></h6> <hr><b>${area.designation}, ${area.states}</b>`))
    }
  };

  var allParksLayer = L.layerGroup(allParks);
  var natParksLayer = L.layerGroup(natParks);
  hotParksLayer = L.layerGroup([]);
  var overlayMaps = {
      "Parks Location": allParksLayer,
      "National Parks": natParksLayer,
      "Hotels to Stay": hotParksLayer,
   };
  
  /// Create a map object.
  myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, topo, allParksLayer, natParksLayer]
  });

 
  L.control.layers(baseMaps,  overlayMaps, {
  collapsed: false
  }).addTo(myMap);

  redMarker = L.ExtraMarkers.icon({
    
      shape: 'square',
      markerColor: 'red',
      icon: 'glyphicon-cog',
      
    });
}
  
function fillHotels(hotels)  {
  for (var i = 0; i < hotels.length; i++) {
    var hotel = hotels[i];
      L.marker(hotel.coord, {icon: hotelMarker})
      .bindPopup(`<h6>${hotel.name}</h6> <hr> <b> </b>`).addTo(hotParksLayer);
    } 
}


  function getPark(name1) {
    try{  
      myMap.removeLayer(marker);
      }catch(e){  
      }
    for (var i = 0; i < parkData.length; i++) {
      var area = parkData[i];
      if (name1 == area.fullName) {
        if (area.parkCode == "acad") 
          fillHotels(HotAcad);
        if (area.parkCode == "indu")
          fillHotels(HotIndu);
          marker = new L.marker([area.latitude, area.longitude],  {icon: redMarker, zIndexOffset:1000})
        .bindPopup(`<h6><a href= "parks/${area.parkCode}">${area.fullName}</a></h6> <hr><b>${area.designation}, ${area.states}</b>`).addTo(myMap).openPopup();
      }
    }
    myMap.setView(marker.getLatLng(),myMap.hasLayer(hotParksLayer)?10:5);
    
  }


d3.json( location.origin + "/api/v1/markers").then((data) => {
   createMap(data);
});