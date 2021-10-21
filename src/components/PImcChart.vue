<script>
import { Pie } from 'vue-chartjs'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.register(ChartDataLabels);
export default {
  extends: Pie,
  props:['dataPimcHM','total'],
  data(){
    return{
      chartdata: {
        labels: ['Hombres', 'Mujeres'],
      datasets: [
        {
          label: 'Porcentaje de particiapción en hombres y mujeres',
          backgroundColor: [
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 99, 132, 0.8)'
          ],
          borderColor: [
            'rgb(255, 255, 255)',
            'rgb(255, 255, 255)'
          ],
          borderWidth: 2,
          data: this.dataPimcHM,
          total: this.total,
          datalabels:{
            color: 'white',
            labels: {
              title: {
                font: {
                  weight: 'bold'
                }
              }
            },
            formatter: function(value,context) {
              let total=context.chart.data.datasets[0].total
              let vPorc= Number.parseFloat((value/total)*100).toFixed(2);
               return value+'\n\n'+vPorc + '%';
            }
          }
        }
      ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Porcentaje participación',
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