<script>
// CommitChart.js
import { Bar } from 'vue-chartjs'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.register(ChartDataLabels);
export default {
  extends: Bar,
  data(){
    return{
      chartdata: {
        labels: ['Bajo Peso', 'Peso normal', 'Sobrepeso', 'Obesidad clase I', 'Obesidad clase II', 'Obesidad clase III'],
      datasets: [
        {
          label: 'Tu IMC',
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
            'rgb(255, 99, 132)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1,
          data: [18.5, 24.9, 29.9, 34.9, 39.9, 40,],
          datalabels:{
            color: [
              'rgb(54, 162, 235)',
              'rgb(75, 192, 192)',
              'rgb(255, 205, 86)',
              'rgb(255, 159, 64)',
              'rgb(255, 99, 132)',
              'rgb(153, 102, 255)'
            ],
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              }
            },
            anchor: 'end',
            align: 'top'
          }
        }
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata,this.options);
  }
}
</script>
<style scoped>
  canvas{

  width:100% !important;
  height:500px !important;

}
</style>