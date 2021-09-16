function createMap(data) {
  
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

  var park = [{
    location: [44.409286, -68.247501],
    name: "Belmont-Paul Women's Equality National Monument",
    designation: "National Park",
    other_info: "Anything from data found" 
  },
  ];
  
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
  var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  layers: [streetmap, topo, allParksLayer]
  });

  L.control.layers(baseMaps,  overlayMaps, {
  collapsed: false
  }).addTo(myMap);
}


  function getPark(name1) {
    // d3.json("/static/data/data.json").then((data) => {
     d3.json("/static/data/park_clean.json").then((data) => {
        console.log(name1);
        console.log(data);
        createMap(data, name1);
  }); 


}

//createMap("", "");

d3.json("/static/data/park_clean.json").then((data) => {
  console.log(data);
  createMap(data);
});