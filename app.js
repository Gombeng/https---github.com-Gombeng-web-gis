//
// INITIALIZE MAP
//
let map = L.map("map").setView([0.914, 104.473], 10);
let markers = L.layerGroup().addTo(map);

//
// ADD BASE LAYER (MAP)
//
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  { maxZoom: 20, subdomains: ["mt0", "mt1", "mt2", "mt3"] }
).addTo(map);

let googleSatelite = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }
).addTo(map);

let baseLayers = {
  "Open Street Map": osm,
  "Google Satelite": googleSatelite,
  "Google Street": googleStreets,
};

//
// ADD SHAPEFILE (tourist) overlay
//
const touristAttraction = L.geoJSON(touristData, {
  style: function (feature) {
    console.log("feature: ", feature);
    return { color: feature.properties.color };
  },
})
  .bindPopup(function (layer) {
    console.log("layer: ", layer);
    return layer.feature.properties.REMARK;
  })
  .openPopup()
  .addTo(map);

//
// ADD SHAPEFILE (drugs) overlay
//
const spreadOfDrugs = L.geoJSON(drugsData, {
  style: function (feature) {
    console.log("feature: ", feature);
    return { color: feature.properties.color };
  },
})
  .bindPopup(function (layer) {
    console.log("layer: ", layer);
    return layer.feature.properties.REMARK;
  })
  .openPopup()
  .addTo(map);

//
// ADDING OVERLAYS TO THE MAP
//

let overlays = {
  "Tourist Attraction": touristAttraction,
  "Spread of Drugs": spreadOfDrugs,
};

L.control.layers(baseLayers, overlays).addTo(map);

//
// SHOW TOURIST DATA FUNCTION
//
function showTouristData(location, spotName) {
  markers.clearLayers();

  let locationData = touristData[location];
  let spot = locationData.find((s) => s.name === spotName);

  if (spot) {
    map.setView([spot.latitude, spot.longitude], 15);

    let spotMessage = `
    <div class="card">
        <img class="rounded" src=${spot.imageUrl} alt="${spot.name}">
        <div class="card-body">
            <h4 class="card-title">${spot.name}</h4>
            <p class="card-text">${spot.description}</p>
            <p class="card-text">Visits: ${spot.visits}</p>
            <p class="card-text">Spreads of Drugs: ${spot.drugSpread.toUpperCase()}</p>
        </div>
    </div>`;
    L.marker([spot.latitude, spot.longitude])
      .addTo(markers)
      .bindPopup(spotMessage)
      .openPopup();
  }
}

$(".menu-item").click(function () {
  let location = $(this).data("location");
  let spotName = $(this).data("spot");
  showTouristData(location, spotName);
});

// function addShapefileOverlay(url) {
//   L.shapefile(url, {
//     onEachFeature: function (feature, layer) {
//       if (feature.properties) {
//         layer.bindPopup(
//           Object.keys(feature.properties)
//             .map(function (k) {
//               return k + ": " + feature.properties[k];
//             })
//             .join("<br />"),
//           { maxHeight: 200 }
//         );
//       }
//     },
//   }).addTo(map);
// }

// var shapefileUrl = "path/to/your/indonesia_tourist_attractions.zip";
// addShapefileOverlay(shapefileUrl);

// function searchPlace() {
//   let place = document.getElementById("place-input").value;
//   $.ajax({
//     url: `https://nominatim.openstreetmap.org/search?format=json&q=${place}, Indonesia`,
//     method: "GET",
//     success: function (data) {
//       if (data.length > 0) {
//         let firstResult = data[0];
//         let lat = firstResult.lat;
//         let lon = firstResult.lon;

//         markers.clearLayers();

//         L.marker([lat, lon])
//           .addTo(map)
//           .bindPopup(`<b>${firstResult.display_name}</b>`)
//           .openPopup();

//         map.setView([lat, lon], 10);
//       } else {
//         alert("Place not found");
//       }
//     },
//     error: function () {
//       alert("Error occurred while searching for the place");
//     },
//   });
// }
