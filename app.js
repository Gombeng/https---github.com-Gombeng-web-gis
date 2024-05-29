//
// INITIALIZE MAP
//
let map = L.map("map").setView([0.914, 104.473], 13);
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
// ICON ASSETS
//
let tourIcon = L.icon({
  iconUrl: "./tourIcon.png",
});

let drugIcon = L.icon({
  iconUrl: "./drugIcon.png",
});

//
// UTILS
//

function printRange(number) {
  if (number >= 0 && number <= 300) {
    return "Low";
  } else if (number >= 301 && number <= 600) {
    return "Medium";
  } else {
    return "High";
  }
}

//
// ADD SHAPEFILE (tourist)
//
const touristAttraction = L.geoJSON(touristData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: tourIcon });
  },
})
  .bindPopup(
    function (layer) {
      const randomNumber = Math.floor(Math.random() * 1001);
      let card = `<p>
      <h5>
      Tempat Wisata
      </h5>
      Visits: ${randomNumber} times</p>`;
      return card;
    },
    {
      offset: [20, 25],
    }
  )
  .addTo(map);

//
// ADD SHAPEFILE (drugs)
//

const spreadOfDrugs = L.geoJSON(drugsData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: drugIcon });
  },
})
  .bindPopup(
    function (layer) {
      const randomNumber = Math.floor(Math.random() * 1001);
      let card = `<p style="width:fit-content">
      <h5>
      Penyebaran Narkoba
      </h5>
      Spreads of Drugs: ${printRange(randomNumber)}</p>`;
      return card;
    },
    {
      offset: [20, 25],
    }
  )
  .addTo(map);

//
// ADDING OVERLAYS TO THE MAP
//
let overlays = {
  "Tourist Attraction": touristAttraction,
  "Spread of Drugs": spreadOfDrugs,
};

L.control.layers(baseLayers, overlays).addTo(map);
