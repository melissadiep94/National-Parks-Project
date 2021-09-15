/// Create a map object.
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
  });
  
  // Add a tile layer.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // An array containing park's name, designation, ... any other information
  var park = [{
    location: [44.409286, -68.247501],
    name: "Abraham Lincoln",
    designation: "National Park",
    other_info: "Anything from data found" 
  },
  ];
  
  // Looping through the parks, adding marker
  for (var i = 0; i < park.length; i++) {
    var area = park[i];
    L.marker(area.location)
      .bindPopup(`<h5><a href= "parks/acad">${area.name}</a></h5> <hr> <b>:</b> ${area.designation}`)
      .addTo(myMap);
  }