// app.js

// Initialize the map and set its view
var map = L.map("map").setView([40.7128, -74.006], 13); // Coordinates for New York City

// Add a tile layer (map background) to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);
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
