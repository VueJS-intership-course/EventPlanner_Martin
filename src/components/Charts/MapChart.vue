<template>
  <div id="container" style="height: 500px; min-width: 310px; max-width: 1000px; margin: 0 auto"></div>
</template>

<script setup>
import Highcharts from 'highcharts';
import Highmaps from 'highcharts/modules/map';
import mapData from '@highcharts/map-collection/custom/world.geo.json';
import { watch, computed, onMounted } from 'vue';

Highmaps(Highcharts);

const props = defineProps({
  eventsCount: {
    type: Object,
    required: true
  }
});

const data = computed(() => {
  return Object.keys(props.eventsCount).map(name => ({
    name,
    value: props.eventsCount[name]
  }));
});

const initMap = () => {
  Highcharts.mapChart('container', {
    chart: {
        map: mapData,
        backgroundColor: '#00ADB5'
    },
    title: {
        text: 'Events by countries'
    },
    series: [{
        data: data.value.map(item => ({
          ...item,
          color: '#00537c'
        })),
        name: 'Events',
        color: '#00537c',
        joinBy: 'name',
        states: {
            hover: {
                color: 'yellow'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}',
            style: {
              color: '#FFFCDE'
            }
        }
    }],
    accessibility: {
      enabled: false,
    },
    legend: {
      itemStyle: {
        color: '#222831',
        fontWeight: 'bold'
      },
    }
});

};

watch(data, () => {
    initMap();
});
</script>
