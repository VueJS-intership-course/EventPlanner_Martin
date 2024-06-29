import { Chart } from 'highcharts-vue';
import * as HighCharts from 'highcharts';
import exportingInit from 'highcharts/modules/exporting';
import usAnnotations from 'highcharts/modules/annotations';
import acessibility from 'highcharts/modules/accessibility';
import useHighMap from 'highcharts/modules/map';

export default {
  install(app, options) {
    acessibility(HighCharts);
    usAnnotations(HighCharts);
    useHighMap(HighCharts);
    app.component('Chart', Chart);
  },
};
