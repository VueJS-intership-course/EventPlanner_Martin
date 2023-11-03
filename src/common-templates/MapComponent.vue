<template>
  <div id="map" ref="mapContainer" class="rounded"></div>
</template>

<script setup>
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill } from 'ol/style';
import { fromLonLat, toLonLat } from 'ol/proj';
import { ref, onMounted, watch } from 'vue';
import 'ol/ol.css';

const emit = defineEmits();

const map = ref(null);
const vectorSource = ref(null);

const mapContainer = ref(null);

const initializeMap = (element) => {
  const vectorInstance = new VectorSource();
  const vectorLayer = new VectorLayer({
    source: vectorInstance,
  });
  const mapInstance = new Map({
    target: element,
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

  if (!readonly) {
    mapInstance.on('click', (event) => {
      const lonLat = toLonLat(event.coordinate);
      handleMapClick(lonLat, vectorInstance);
    });
  }

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

  emit('update:modelValue', lonLat);

  const coordinates = lonLat;

  emit('selectedLocation', coordinates);
};

const { location, readonly, modelValue, $emit } = defineProps([
  'location',
  'readonly',
  'modelValue',
]);
const showLocationOnMap = () => {
  if (location && map.value) {
    const coordinates = fromLonLat(location);
    const longitudeAndLatitude = toLonLat(coordinates);

    map.value.getView().setCenter(coordinates);
    map.value.getView().setZoom(5);

    console.log(longitudeAndLatitude);
    handleMapClick(longitudeAndLatitude, vectorSource.value);
  }
};

watch(
  () => location,
  (newLocation) => {
    if (newLocation) {
      showLocationOnMap();
    }
  },
  { immediate: true }
);

onMounted(() => {
  initializeMap(mapContainer.value);
  showLocationOnMap();
});
</script>
