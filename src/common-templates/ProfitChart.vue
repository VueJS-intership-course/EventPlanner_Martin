<template>
  <div id="chart">
    <Chart :options="chartOptions" :key="chartOptions"></Chart>

  </div>
</template>

<script setup>
import Highcharts from 'highcharts';
import { ref, watch, onMounted, computed } from 'vue';
import { eventStore } from '../store/eventStore';
import {useRoute} from 'vue-router';

const route = useRoute();

const eStore = eventStore();

// const event = computed(() => eStore.choosedEvent);

const eventId = computed(() => route.params.id);

console.log(eventId.value);

const props = defineProps({
  profit: {
    type: Number,
    default: 0,
  },
  expenses: {
    type: Number,
    default: 0,
  },
});

console.log(props.expenses);

const chartOptions = ref({
  chart: {
    type: 'column',
  },
  title: {
    text: 'Basic Column Chart',
  },
  xAxis: {
    categories: ['Profit/Loss'],
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Values',
    },
  },
  series: [
    {
      name: 'Profit',
      data: [props.profit],
      color: 'purple',
    },
    {
      name: 'Expenses',
      data: [props.expenses],
    },
  ],
  accessibility: {
    enabled: false,
  },
});

const updateChart = () => {
  chartOptions.value.series[0].data = [props.profit];
  chartOptions.value.series[1].data = [props.expenses];
};

watch(
  () => props.profit,
  (newVal) => {
    updateChart();
  },
  { immediate: true }
);

watch(
  () => props.expenses,
  (newVal) => {

    updateChart();
  },
  { immediate: true }
);

onMounted(() => {
  Highcharts.chart('chart', chartOptions.value);
});
</script>
