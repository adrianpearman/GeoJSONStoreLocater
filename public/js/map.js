mapboxgl.accessToken =
  "pk.eyJ1IjoiYWRyaWFucGVhcm1hbjEyIiwiYSI6ImNrNmlkZ3c4ejMzaGszbnFqY28zOTVhMzcifQ.YgsEEUURqf0S_4_lyFo79g";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-79.512, 43.71]
});

let stores;

//Fetch stores from API
async function getStores() {
  const res = await fetch("/api/v1/stores");
  const data = await res.json();

  stores = data.data.map(store => {
    const long = store.location.coordinates[0];
    const lat = store.location.coordinates[1];
    const { storeId } = store;

    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [long, lat]
      },
      properties: {
        storeId: storeId,
        icon: "shop"
      }
    };
  });
  loadMap(stores);
}

// Display icons on page
function loadMap(stores) {
  map.on("load", function() {
    map.addLayer({
      id: "points",
      type: "symbol",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: stores
        }
      },
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

getStores();
