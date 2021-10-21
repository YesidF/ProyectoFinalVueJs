<template>
<div id="reportes" class="container reportes mt-3">
    <div class="row mt-5">
        <div class="col-12 mt-4">
            <h1 class="text-center mt-3">Tamizaje Indice de masa corporal (IMC)</h1>
        </div>
    </div>
    <div v-if="pageImc" class="mb-5 pb-3">
        <div class="row mt-3">
            <div class="col-12 text-center">
                <table class="table text-center table-striped table-hover">
                    <thead>
                        <tr class="table-dark">
                            <th scope="col">Nombre</th>
                            <th scope="col">Talla mts</th>
                            <th scope="col">Peso Kg</th>
                            <th scope="col">IMC</th>
                            <th scope="col">F. Registro</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="imc in pageImc" :key="imc.id">
                            <td>{{imc.usuario.nombre}} {{imc.usuario.apellidos}}</td>
                            <td>{{parseFloat(imc.talla).toFixed(2)}}</td>
                            <td>{{parseFloat(imc.masa).toFixed(2)}}</td>
                            <td>{{parseFloat(imc.imc).toFixed(2)}}</td>
                            <td>{{imc.reg_imc}}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <nav aria-label="Page navigation">
                        <ul class="pagination justify-content-center">
                            <li class="page-item" v-bind:class="{'disabled': pageNumber == 0}">
                                <a class="page-link" @click="atras()">Anterior</a>
                            </li>
                            <li class="page-item" v-for="i in totalPages" :key="i"  v-bind:class="{'active': pageNumber+1 == i}">
                                <a class="page-link" @click="getPageImc(i-1)">{{i}}</a>
                            </li>
                            <li class="page-item" v-bind:class="{'disabled': pageNumber+1 == totalPages}">
                                <a class="page-link" @click="siguiente()">Siguiente</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <hr>
        <div class="row mt-3">
            <div class="col-12">
                <h1 class="text-center">
                    Estadisticas
                </h1>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-12 text-center">
                <div class="form-check form-check-inline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                    </svg>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="filtroTablaIMC" id="imc" value="imc" checked v-model="selectRadio">
                    <label class="form-check-label" for="imc">Estadistica IMC</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="filtroTablaIMC" id="imcHM" value="imcHM" v-model="selectRadio">
                    <label class="form-check-label" for="imcHM">Estadistica IMC hombre/mujeres</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="filtroTablaIMC" id="pImcHM" value="pImcHM" v-model="selectRadio">
                    <label class="form-check-label" for="pImcHM">% Particiapción hombre/mujeres</label>
                </div>
            </div>
        </div>
        <div class="row mt-3" v-if="selectRadio=='imc'">
            <div class="col-12">
                <GraficoIMC :dataImc="dataImc"></GraficoIMC>
            </div>
        </div>
        <div class="row mt-3" v-if="selectRadio=='imcHM'">
            <div class="col-12">
                <GraficoIMCHM :dataImcM="dataImcM" :dataImcH="dataImcH"></GraficoIMCHM>
            </div>
        </div>
        <div class="row mt-3 " v-if="selectRadio=='pImcHM'">
            <div class="col-12">
                <GraficoPIMC :dataPimcHM="dataPimcHM" :total="total"></GraficoPIMC>
            </div>
        </div>
    </div>
    <div v-else>
        <h4 class=" alert alert-info text-center">
            No hay datos para mostrar...
        </h4>
    </div>
</div>
    
</template>
<script>
import axios from 'axios';
import Global from '../global';
import GraficoIMC from './ImcChart.vue';
import GraficoIMCHM from './ImcChartHM.vue';
import GraficoPIMC from './PImcChart.vue';

export default({
    name: 'ReportesComponent',
    components:{
        GraficoIMC,
        GraficoPIMC,
        GraficoIMCHM
    },
    data(){
        return{
            selectRadio: 'imc',
            pageImc: null,
            dataAll: null,
            dataImc: [],
            dataImcH: [],
            dataImcM: [],
            dataPimcHM: [],
            url: Global.url_rest,
            token: '',
            totalPages: 0,
            pageNumber: 0,
            pageSize: 5,
            total: 1

        }
    },
    methods:{
        getPageImc(pageNumber){
            const headers = { 
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+ this.token
            };

            axios.get(this.url+'/imc?pageNumber='+pageNumber+'&pageSize='+this.pageSize,{headers}).then(response=>{
                if(response.data.ok){
                    this.pageNumber=pageNumber
                    this.pageImc = response.data.body.content
                    this.totalPages = response.data.body.totalPages;
                    //console.log(response.data.body)
                }
            })
            .catch(error=>{
                //idicar error
                console.log(error);
            })
        },
        siguiente(){
            this.pageNumber++;
            if(this.pageNumber>(this.totalPages-1)){
                this.pageNumber=(this.totalPages-1);
            }
            this.getPageImc(this.pageNumber);
        },
        atras(){
            this.pageNumber--;
            if(this.pageNumber<0){
                this.pageNumber=0;
            }
            this.getPageImc(this.pageNumber);
        },
        graficos(){
            //obtener # de personas mujeres y hombres participantes
            this.total = this.dataAll.length;
            this.dataPimcHM.push(this.dataAll.filter(eachDataImc => eachDataImc.usuario.genero=='Masculino').length)
            this.dataPimcHM.push(this.dataAll.filter(eachDataImc => eachDataImc.usuario.genero=='Femenino').length)
            
            //obtener # de personas con IMC (BP,NP,SP,O1,O2,O3)
            this.dataImc.push(this.dataAll.filter(eachDataImc => eachDataImc.imc<18.50).length)
            this.dataImc.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=18.50 && eachDataImc.imc<=24.99).length)
            this.dataImc.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=25 && eachDataImc.imc<=29.99).length)
            this.dataImc.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=30 && eachDataImc.imc<=34.99).length)
            this.dataImc.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=35 && eachDataImc.imc<=39.99).length)
            this.dataImc.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=40).length)

            //obtener # de personas hombres con IMC (BP,NP,SP,O1,O2,O3)
            this.dataImcH.push(this.dataAll.filter(eachDataImc => eachDataImc.imc<18.50 && eachDataImc.usuario.genero=='Masculino').length)
            this.dataImcH.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=18.50 && eachDataImc.imc<=24.99 && eachDataImc.usuario.genero=='Masculino').length)
            this.dataImcH.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=25 && eachDataImc.imc<=29.99 && eachDataImc.usuario.genero=='Masculino').length)
            this.dataImcH.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=30 && eachDataImc.imc<=34.99 && eachDataImc.usuario.genero=='Masculino').length)
            this.dataImcH.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=35 && eachDataImc.imc<=39.99 && eachDataImc.usuario.genero=='Masculino').length)
            this.dataImcH.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=40 && eachDataImc.usuario.genero=='Masculino').length)

            //obtener # de personas mujeres con IMC (BP,NP,SP,O1,O2,O3)
            this.dataImcM.push(this.dataAll.filter(eachDataImc => eachDataImc.imc<18.50 && eachDataImc.usuario.genero=='Femenino').length)
            this.dataImcM.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=18.50 && eachDataImc.imc<=24.99 && eachDataImc.usuario.genero=='Femenino').length)
            this.dataImcM.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=25 && eachDataImc.imc<=29.99 && eachDataImc.usuario.genero=='Femenino').length)
            this.dataImcM.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=30 && eachDataImc.imc<=34.99 && eachDataImc.usuario.genero=='Femenino').length)
            this.dataImcM.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=35 && eachDataImc.imc<=39.99 && eachDataImc.usuario.genero=='Femenino').length)
            this.dataImcM.push(this.dataAll.filter(eachDataImc => eachDataImc.imc>=40 && eachDataImc.usuario.genero=='Femenino').length)
        },
        getAllData(){
            const headers = { 
                'Content-Type':'application/json',
                'Authorization': 'Bearer '+ this.token
            };
            axios.get(this.url+'/imc/all',{headers}).then(response=>{
                if(response.data.ok){
                    //console.log(response.data.body)
                    this.dataAll=response.data.body
                    this.graficos()
                }
            })
            .catch(error=>{
                //idicar error
                console.log(error);
            })
        }
    },
    mounted(){
        this.token = JSON.parse(localStorage.getItem("user_autenticado")).token
        this.getAllData();
        this.getPageImc(this.pageNumber);        
    }
})
</script>
<style lang="css" scoped>
    .page-item:hover{
        cursor: pointer;
    }
    .reportes{
        background-color: aliceblue;
    }
</style>