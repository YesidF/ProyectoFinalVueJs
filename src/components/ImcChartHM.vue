<script>
import { Bar } from 'vue-chartjs'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.plugins.register(ChartDataLabels);
export default {
  extends: Bar,
  props:['dataImcH', 'dataImcM'],
  data(){
    return{
      chartdata: {
        labels: ['Bajo Peso', 'Peso normal', 'Sobrepeso', 'Obesidad clase I', 'Obesidad clase II', 'Obesidad clase III'],
        datasets: [
          {
            label: 'IMC Mujeres',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: this.dataImcM,
            datalabels:{
              color: 'rgb(255, 99, 132)',
              anchor: 'end',
              align: 'top',
              labels: {
                title: {
                  font: {
                    weight: 'bold'
                  }
                }
              }
            }
          },
          {
            label: 'IMC Hombres',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: this.dataImcH,
            datalabels:{
              color: 'rgb(54, 162, 235)',
              anchor: 'end',
              align: 'top',
              labels: {
                title: {
                  font: {
                    weight: 'bold'
                  }
                }
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
          text: 'IMC en Hombres y mujeres',
        },
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