<template>
    <div id="chart">
      <Chart :options="chartOptions" :key="chartOptions"></Chart>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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
    text: 'Profit vs. Expenses',
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
      color: '#14ff99',
    },
    {
      name: 'Expenses',
      data: [props.expenses],
      color: '#f50500'
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
</script>
