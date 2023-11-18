<!-- <template>
  <div>
    <highcharts :options="chartOptions"></highcharts>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
import HighchartsVue from 'highcharts-vue';

export default {
  name: 'ColumnChart',
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column',
        },
        title: {
          text: 'Basic Column Chart',
        },
        xAxis: {
          categories: ['Category 1', 'Category 2', 'Category 3'],
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Values',
          },
        },
        series: [
          {
            name: 'Series 1',
            data: [10, 20, 30],
          },
        ],
        accessibility: {
          enabled: false,
        },
      },
    };
  },
};
</script> -->
<template>
  <div id="chart">
    <highcharts :options="chartOptions" :key="chartOptions"></highcharts>
  </div>
</template>


<script setup>
import Highcharts from 'highcharts';
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  profit: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
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
