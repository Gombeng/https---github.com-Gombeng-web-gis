// app.js

// Initialize the map and set its view
var map = L.map("map").setView([0.91667, 104.45], 13); // Coordinates for New York City
// app.js

// Add a tile layer (map background) to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Function to search for a place
function searchPlace() {
  var place = document.getElementById("place-input").value;

  // Fetch geocoding data from Nominatim
  $.ajax({
    url: `https://nominatim.openstreetmap.org/search?format=json&q=${place}`,
    method: "GET",
    success: function (data) {
      if (data.length > 0) {
        var firstResult = data[0];
        var lat = firstResult.lat;
        var lon = firstResult.lon;

        // Add a marker at the searched location
        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`<b>${firstResult.display_name}</b>`)
          .openPopup();

        // Center the map on the searched location
        map.setView([lat, lon], 15);
      } else {
        alert("Place not found");
      }
    },
    error: function () {
      alert("Error occurred while searching for the place");
    },
  });
}

// Fetch real-time data from a public transport API
function fetchTransportData() {
  $.ajax({
    url: "https://api.publictransport.example.com/vehicles", // Example API endpoint
    method: "GET",
    success: function (data) {
      // Clear existing markers
      markers.clearLayers();

      // Loop through the data and add markers to the map
      data.vehicles.forEach(function (vehicle) {
        var marker = L.marker([vehicle.latitude, vehicle.longitude]).addTo(map);
        marker.bindPopup(
          "<b>" + vehicle.route + "</b><br>Next stop: " + vehicle.next_stop
        );
      });
    },
  });
}

// Create a layer group to hold the markers
var markers = L.layerGroup().addTo(map);

// Fetch data initially
fetchTransportData();

// Set an interval to fetch data periodically
setInterval(fetchTransportData, 30000); // Fetch data every 30 seconds
