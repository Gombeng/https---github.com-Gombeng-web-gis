const touristData = {
  tanjungpinang: [
    {
      name: "Tanjung Siambang",
      latitude: 0.9019,
      longitude: 104.4744,
      description:
        "Tanjung Siambang is a picturesque coastal area known for its stunning sunsets and tranquil atmosphere. Visitors can enjoy relaxing strolls along the beach, take in breathtaking views of the surrounding islands, and indulge in delicious seafood at nearby restaurants. With its pristine sands and clear waters, Tanjung Siambang is the perfect destination for those seeking a peaceful escape from the hustle and bustle of city life.",
      visits: 1000,
      drugSpread: "low",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Pulau Penyengat",
      latitude: 0.9163,
      longitude: 104.4183,
      description:
        "Pulau Penyengat, also known as Wasp Island, is a historic island located off the coast of Tanjungpinang. The island is home to several cultural landmarks, including the majestic Sultan Riau Mosque and the grand Istana Tengku Fisabilillah palace. Visitors can explore the island's rich history, stroll through its charming villages, and admire its stunning architecture. With its cultural significance and natural beauty, Pulau Penyengat offers a unique and unforgettable experience for travelers.",
      visits: 1200,
      drugSpread: "medium",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Tugu Pensil",
      latitude: 0.9197,
      longitude: 104.4571,
      description:
        "Tugu Pensil, or the Pencil Monument, is a popular landmark in Tanjungpinang. It symbolizes the importance of education and development in the region. The monument is located near the waterfront and offers a great view of the sea, making it a favorite spot for both locals and tourists.",
      visits: 900,
      drugSpread: "high",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Laman Boenda",
      latitude: 0.9166,
      longitude: 104.4472,
      description:
        "Laman Boenda is a scenic park located in the heart of Tanjungpinang. It is a popular gathering place for families and friends to relax and enjoy the beautiful surroundings. The park features well-maintained gardens, walking paths, and a playground for children.",
      visits: 1500,
      drugSpread: "medium",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Museum Sultan Sulaiman Badrul Alamsyah",
      latitude: 0.9194,
      longitude: 104.4562,
      description:
        "This museum is dedicated to the history and culture of the Riau Islands. It showcases a variety of artifacts, including traditional clothing, weapons, and musical instruments. The museum provides an insightful look into the rich cultural heritage of the region.",
      visits: 800,
      drugSpread: "low",
      imageUrl: "https://picsum.photos/200/80",
    },
  ],
  batam: [
    {
      name: "Barelang Bridge",
      latitude: 0.8896,
      longitude: 104.1426,
      description:
        "The Barelang Bridge is a series of six bridges connecting the islands of Batam, Rempang, and Galang. Spanning a total length of over two kilometers, the bridges offer breathtaking views of the surrounding sea and landscape. Visitors can drive, cycle, or walk across the bridges, stopping at scenic viewpoints along the way. The Barelang Bridge is not only a feat of engineering but also a popular tourist attraction, attracting thousands of visitors each year.",
      visits: 2000,
      drugSpread: "high",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Nagoya Hill Shopping Mall",
      latitude: 1.1443,
      longitude: 104.0107,
      description:
        "Nagoya Hill Shopping Mall is the largest shopping center in Batam, offering a wide range of retail stores, restaurants, and entertainment options. The mall is a favorite destination for both locals and tourists, providing a modern and comfortable shopping experience.",
      visits: 2500,
      drugSpread: "medium",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Maha Vihara Duta Maitreya Temple",
      latitude: 1.1368,
      longitude: 104.0301,
      description:
        "This Buddhist temple is one of the largest in Southeast Asia. It features impressive architecture and serene gardens, making it a peaceful retreat for visitors. The temple is a place of worship and cultural significance, attracting devotees and tourists alike.",
      visits: 1800,
      drugSpread: "low",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Ocarina Park",
      latitude: 1.1309,
      longitude: 104.0626,
      description:
        "Ocarina Park is a family-friendly amusement park located in Batam. It offers a variety of rides, games, and attractions for visitors of all ages. The park is a popular spot for recreational activities and outdoor fun.",
      visits: 2200,
      drugSpread: "medium",
      imageUrl: "https://picsum.photos/200/80",
    },
    {
      name: "Batam Miniature Park",
      latitude: 1.1487,
      longitude: 104.0276,
      description:
        "This park features miniature replicas of famous landmarks from around Indonesia. It is a great place to learn about the country's diverse culture and architecture. The park is both educational and entertaining, making it a popular destination for families and tourists.",
      visits: 1600,
      drugSpread: "low",
      imageUrl: "https://picsum.photos/200/80",
    },
  ],
};

// Create the map
let map = L.map("map").setView([0.914, 104.473], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

let markers = L.layerGroup().addTo(map);

function searchPlace() {
  let place = document.getElementById("place-input").value;
  $.ajax({
    url: `https://nominatim.openstreetmap.org/search?format=json&q=${place}, Indonesia`,
    method: "GET",
    success: function (data) {
      if (data.length > 0) {
        let firstResult = data[0];
        let lat = firstResult.lat;
        let lon = firstResult.lon;

        markers.clearLayers();

        L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`<b>${firstResult.display_name}</b>`)
          .openPopup();

        map.setView([lat, lon], 10);
      } else {
        alert("Place not found");
      }
    },
    error: function () {
      alert("Error occurred while searching for the place");
    },
  });
}

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
