//
// INITIALIZE MAP
//
let map = L.map("map").setView([0, 0], "");
// let map = L.map("map").setView([0.914, 104.473], 11);
// let markers = L.layerGroup().addTo(map);

//
// ADD BASE LAYER (MAP)
//
let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
});

let googleStreets = L.tileLayer(
  "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
  { maxZoom: 20, subdomains: ["mt0", "mt1", "mt2", "mt3"] }
);

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
}).bindPopup(
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
);

//
// ADD SHAPEFILE (drugs)
//
const spreadOfDrugs = L.geoJSON(drugsData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: drugIcon });
  },
}).bindPopup(
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
);

//
// ADDING OVERLAYS TO THE MAP
//
let overlays = {
  "Tourist Attraction": touristAttraction,
  "Spread of Drugs": spreadOfDrugs,
};

L.control.layers(baseLayers, overlays).addTo(map);

//
// ADD POLYGON
//
// let namaWilayah = polygonData[0].features[0].properties.NAMOBJ;
// let wilayah = [
//   [104.51973754400005, 0.9366735170000702],
//   [104.51974309200006, 0.9371824100000765],
//   [104.51916449000007, 0.9373632690000306],
//   [104.51852972100004, 0.9374932310000368],
//   [104.51849604600008, 0.9372840160000457],
//   [104.51849608, 0.9370352240000663],
//   [104.51847925700012, 0.9368203560000516],
//   [104.51838379200004, 0.9366111320000599],
//   [104.51827146300006, 0.9364923750000926],
//   [104.51813666900001, 0.9363453430000064],
//   [104.51750753500001, 0.9363509100000229],
//   [104.51721544000009, 0.9363339070000372],
//   [104.51696266100005, 0.9363451800000817],
//   [104.51670989000009, 0.9363055650000902],
//   [104.51638970900007, 0.9362829030000803],
//   [104.51613693400012, 0.9362715590000299],
//   [104.51617633600009, 0.9356778580000231],
//   [104.5162494160001, 0.935276409000025],
//   [104.51637310700002, 0.9344621990000697],
//   [104.51663150400009, 0.9344396170000664],
//   [104.51690674900004, 0.9344396550000695],
//   [104.5168506130001, 0.9341738930000183],
//   [104.5168731110001, 0.9339590310000041],
//   [104.51689561400009, 0.9337158970000488],
//   [104.51688441800006, 0.9334331770000155],
//   [104.51683388900005, 0.9332352680000717],
//   [104.51671034500004, 0.9329751510000435],
//   [104.51700805400007, 0.9330204270000593],
//   [104.51720465500009, 0.933037417000044],
//   [104.51739564200008, 0.9330374430000461],
//   [104.51753607700006, 0.9330148450000415],
//   [104.51768213100007, 0.9329752850000546],
//   [104.51781694900004, 0.9329413770000023],
//   [104.51798547600004, 0.9328735480000745],
//   [104.5181483850001, 0.9328170270000165],
//   [104.51824945300011, 0.9331280309999919],
//   [104.51852471300006, 0.9330206360000766],
//   [104.51879435300008, 0.9329358580000786],
//   [104.5190415270001, 0.9328284590000742],
//   [104.51905835700008, 0.9329867830000289],
//   [104.51919317900004, 0.9329302580000594],
//   [104.51960325300004, 0.9328285360000805],
//   [104.51986165600002, 0.9327607190000649],
//   [104.52019307500008, 0.9327494560001099],
//   [104.52044584100013, 0.9328343060001139],
//   [104.52065365400009, 0.9330209280001007],
//   [104.52081652500006, 0.9332414710000521],
//   [104.521091729, 0.9335468440000056],
//   [104.52125461000007, 0.9336938790000033],
//   [104.5214568040001, 0.9338974640000615],
//   [104.52164214100007, 0.9341349719999954],
//   [104.52166458800006, 0.9342989520000629],
//   [104.52150166300008, 0.9344798690000218],
//   [104.52112525900012, 0.9348303870000692],
//   [104.52079384400005, 0.9348020700000355],
//   [104.52030514700003, 0.934768077000065],
//   [104.52004674000005, 0.9348641650000218],
//   [104.52004670200004, 0.9351468830000549],
//   [104.51938947500011, 0.9351976819999948],
//   [104.51938943900011, 0.9354634370000454],
//   [104.51942310800005, 0.9357178870000489],
//   [104.51944553700004, 0.9360119170000409],
//   [104.51946797600003, 0.9362324399999906],
//   [104.51969265800007, 0.9362946690000769],
//   [104.51973754400005, 0.9366735170000702],
// ];

let latlngs = [
  [
    [0, 0],
    [-10, 0],
    [-10, 10],
    [0, 10],
  ],
  [
    [10, 10],
    [0, 10],
    [0, 20],
    [10, 20],
  ],
  [
    [20, 20],
    [10, 20],
    [10, 30],
    [20, 30],
  ],
];

let colors = ["red", "green", "blue"];
let areaName = ["red", "green", "blue"];

let polygon;
let options = {
  // permanent: true,
   direction: "top",
  // sticky: true
};
for (let i = 0; i < latlngs.length; i++) {
  polygon = L.polygon(latlngs[i], { color: colors[i] })
    .bindTooltip(
      () => {
        let card = `
<div class="card" >
  <div class="card-body">
    <h4 class="card-title" style="width:10rem">${areaName[i]}</h4>
    <p class="card-text text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eum, nostrum eaque modi autem sed. Delectus, iusto. Consequatur, unde eaque?
</p>
  </div>
</div>`;
        return card;
      },
      { ...options }
    )
    .addTo(map);
}
// zoom the map to the polygon
map.fitBounds(polygon.getBounds());

//
// ADD POLYLINE
//
// let latlngs = [
//   [
//     [0, 10], // titik 1: nilai x=0, nilai y=10
//     [10, 10],
//     [15, 20],
//     [10, 30],
//     [10, 15],
//   ],
//   [
//     [10, 10],
//     [15, 15],
//   ],
//   [
//     [15, 15],
//     [20, 20],
//   ],
// ];

// let colors = ["red", "green", "blue"];
// let polyline;
// for (let i = 0; i < latlngs.length; i++) {
//   polyline = L.polyline(latlngs[i], { color: colors[i] }).addTo(map);
// }
// zoom the map to the polyline
// map.fitBounds(polyline.getBounds());
