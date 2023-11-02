<template>
  <div id="map" class="rounded"></div>
</template>

<script setup>
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Style, Circle, Fill } from "ol/style";
import { fromLonLat, toLonLat } from "ol/proj";
import { ref, onMounted } from "vue";
import 'ol/ol.css';

const emit = defineEmits();

const map = ref(null);
const vectorSource = ref(null);

const initializeMap = () => {
  const vectorInstance = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorInstance,
  });

  const mapInstance = new Map({
    target: this.$el,
    view: new View({
      center: fromLonLat([0, 0]),
      zoom: 2,
    }),
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
  });

  mapInstance.on('click', (event) => {
    const lonLat = toLonLat(event.coordinate);
    handleMapClick(lonLat, vectorInstance);
  });

  map.value = mapInstance;
  vectorSource.value = vectorInstance;
};

const handleMapClick = (lonLat, vectorInstance) => {
  const point = new Feature({
    geometry: new Point(fromLonLat(lonLat)),
  });

  const pointStyle = new Style({
    image: new Circle({
      radius: 3,
      fill: new Fill({
        color: 'blue',
      }),
    }),
  });

  point.setStyle(pointStyle);
  vectorInstance.clear();
  vectorInstance.addFeature(point);

  const coordinates = lonLat;

  emit('selectedLocation', coordinates);
};

const { location } = defineProps(['location']);
const showLocationOnMap = () => {
  if (location && map.value) {
    const lonLat = fromLonLat(location);
    const longitudeAndLatitude = toLonLat(lonLat);

    map.value.getView().setCenter(fromLonLat(location));
    map.value.getView().setZoom(5); 

    console.log(longitudeAndLatitude);
    handleMapClick(longitudeAndLatitude, vectorSource.value);
  }
};

onMounted(() => {
  initializeMap();
  showLocationOnMap();
});
</script>