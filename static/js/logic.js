var myMap;
var parkData;
var redMarker;
var marker = 0;

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

  // Looping through the parks, adding marker
  for (var i = 0; i < data.length; i++) {
    var area = data[i];
    allParks.push(
    L.marker([area.latitude, area.longitude])
      .bindPopup(`<h5><a href= "parks/${area.parkCode}">${area.fullName}</a></h5> <hr> <b> ${area.designation}</b>`)
      );
  }//

  var allParksLayer = L.layerGroup(allParks);
  var overlayMaps = {
  "Parks Location": allParksLayer,

   };
  
  /// Create a map object.
  myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, topo, allParksLayer]
  });

  marker = L.marker([data[0].latitude,data[0].longitude]).addTo(myMap);

  L.control.layers(baseMaps,  overlayMaps, {
  collapsed: false
  }).addTo(myMap);

  redMarker = L.ExtraMarkers.icon({
    icon: 'fa-coffee',
    markerColor: 'red',
    shape: 'square',
    prefix: 'fa'
  });

}


  function getPark(name1) {
  
    myMap.removeLayer(marker);
    for (var i = 0; i < parkData.length; i++) {
      var area = parkData[i];
      if (name1 == area.fullName) {
          marker = new L.marker([area.latitude, area.longitude],  {icon: redMarker, zIndexOffset:1000})
        .bindPopup(`<h5><a href= "parks/${area.parkCode}">${area.fullName}</a></h5> <hr> <b> ${area.designation}</b>`).addTo(myMap).openPopup();
      }
    }
    myMap.setView(marker.getLatLng(),5);
    
  }

  function centerLeafletMapOnMarker(map, marker) {
    var latLngs = [ marker.getLatLng() ];
    var markerBounds = L.latLngBounds(latLngs);
    map.fitBounds(markerBounds);
  }
  // var marker;
  // function newMarker() {
  //  markerLayer = L.layerGroup();
  //  marker = new L.marker( [12, 13],
  //  {icon:greenMarker, clickable:true}).bindPopup("Hello Marker").addTo(markerLayer); 
  

  // };


d3.json("/static/data/park_clean.json").then((data) => {
   createMap(data);
});