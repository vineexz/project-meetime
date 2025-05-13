import { ApexOptions } from 'ng-apexcharts';

export const CHART_OPTIONS_MOCK: ApexOptions = {
  series: [],
  chart: {
    type: 'bar',
    height: 300,
    stacked: true,
    toolbar: { show: true },
    zoom: { enabled: false },
  },
  colors: ['#34D399', '#9CA3AF', '#38BDF8', '#818CF8'],
  dataLabels: { enabled: false },
  xaxis: {
    type: 'category',
    categories: [],
  },
  legend: {
    show: true,
    position: 'bottom',
    offsetY: 0,
  },
  fill: { opacity: 1 },
  plotOptions: {
    bar: { horizontal: false },
  },
  responsive: [],
};
