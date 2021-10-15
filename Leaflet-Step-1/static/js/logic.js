// Creating the map object
var myMap = L.map("map", {
    center: [38.64, -98.32],
    zoom: 3
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);




// create function to get colors for depth
function getColor(depth) {

    // Conditionals for colored depth markers
    
    if (depth < 10) {
        depthColor = "#addd8e";
    }
    else if (depth < 30) {
        depthColor = "#fed976";
    }
    else if (depth < 50) {
        depthColor = "#feb24c";
    }
    else if (depth < 70) {
        depthColor = "#fd8d3c";
    }
    else if (depth < 90) {
        depthColor = "#f03b20";
    }
    else {
        depthColor = "#bd0026";
    }

    return (depthColor);
};

// link to geo data
var geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

var geojson;

// Get the geojson data with d3 and test
d3.json(geoData).then(function(data) {
    console.log('data',data)
});

// Get the geoson data with d3 and build the map

d3.json(geoData).then(function(data) {
    
    // test getting features from data
    console.log('Map Features',data)
    
    // Loop through locations and create the earthquake markers
    for (var i = 0; i < data.features.length; i++) {
        
        getColor(data.features[i].geometry.coordinates[2]); // depth
        
        // Conditionals for marker size based on magnitude
        var size = "";
        if (data.features[i].properties.mag < 1) {
            size = 10000;
        }
        else if (data.features[i].properties.mag < 2) {
            size = 20000;
        }
        else if (data.features[i].properties.mag < 3) {
            size = 30000;
        }
        else if (data.features[i].properties.mag < 4) {
            size = 40000;
        }
        else if (data.features[i].properties.mag < 5) {
            size = 50000;
        }
        else {
            size = 60000;
        }
        
        geojson = L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
            stroke: true,
            color: "black",
            weight: .2,
            fillOpacity: 1,
            fillColor: depthColor,
            radius: size
            }).bindPopup(`<h3>Location: ${data.features[i].properties.title}</h3> <hr> <h3>Magnitude: ${data.features[i].properties.mag}</h3> <hr> <h3>Depth: ${data.features[i].geometry.coordinates[2]}</h3>`).addTo(myMap)
        
        }});

// Set up the legend.
var legend = L.control({position: 'topright'});

legend.onAdd = function(myMap) {

        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: #addd8e"></i><span>-10 - 10</span><br>';
        div.innerHTML += '<i style="background: #fed976"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background: #feb24c"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background: #fd8d3c"></i><span>50 - 70</span><br>';
        div.innerHTML += '<i style="background: #f03b20"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background: #bd0026"></i><span>90 +</span><br>';
        
        // took legend code from https://codepen.io/haakseth/pen/KQbjdO
        
return div;
};

legend.addTo(myMap);

