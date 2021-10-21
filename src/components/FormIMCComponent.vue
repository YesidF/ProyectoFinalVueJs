<template>
    <div id="form-imc" class="mt-3">
        <div class="row">
            <div class="col">
                <form class="p-5" v-on:submit.prevent="calcularIMC()">
                    <h1>Calcula Tu IMC... (índice de masa coporal).</h1>
                    <div class="mb-3">Por favor, ingrese los siguentes datos.</div>
                    <div class="form-floating mb-3">
                        <input v-model="imc.talla" type="text" class="form-control" id="talla" placeholder="Ingrese su estatura"
                        v-bind:class="{
                        'is-invalid': submitted && !$v.imc.talla.required || !$v.imc.talla.between,
                        'is-valid': submitted && $v.imc.talla.required && $v.imc.talla.between
                        }"
                        >
                        <label for="nombre">Estatura en metros (Ej. 1.75):</label>
                        <div v-if="!$v.imc.talla.required" class="invalid-feedback">
                            Estatura requerida
                        </div>
                        <div v-if="!$v.imc.talla.between" class="invalid-feedback">
                            Estatura no puede ser menor a 0.70m ni mayor a 3m
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="imc.masa" type="text" class="form-control" id="peso" placeholder="Ingrese su peso"
                        v-bind:class="{
                        'is-invalid': submitted && !$v.imc.masa.required || !$v.imc.masa.between,
                        'is-valid': submitted && $v.imc.masa.required && $v.imc.masa.between
                        }"
                        >
                        <label for="peso">Peso en kg (Ej. 60.5):</label>
                        <div v-if="!$v.imc.masa.required" class="invalid-feedback">
                            Peso requerido
                        </div>
                        <div v-if="!$v.imc.masa.between" class="invalid-feedback">
                            Peso no puede ser menor a 1kg ni mayor a 600kg
                        </div>
                    </div>
                    <div class="d-flex align-items-center" v-if="loading">
                        <strong>Calculando IMC...</strong>
                        <div class="spinner-border ms-auto text-danger" role="status" aria-hidden="true"></div>
                    </div>
                    <div class="d-grid d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-primary">Calcular</button>
                    </div>
                    <div class="form-floating mt-3 alert" v-if="tuImc" 
                    v-bind:class="{
                        'alert-primary': tuImc<18.50,
                        'alert-success': tuImc>=18.50 && tuImc<=24.99,
                        'alert-warning': tuImc>24.99 && tuImc<=34.99,
                        'alert-danger': tuImc>=35
                    }">
                        Tu indice de masa corporal es de <strong>{{ parseFloat(tuImc).toFixed(2) }}</strong> <br>
                        Clasificación: <strong>{{cImc}}</strong>
                    </div>
                </form>
            </div>
            <div class="col text-end">
                <Grafico ></Grafico>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col text-center">
                <img src="../assets/img/imc.gif" alt="Imagen decorativa báscula" class="img-fluid">
            </div>
            <div class="col">
                <table class="table text-center">
                    <thead>
                        <tr class="table-dark">
                            <th scope="col">Imc</th>
                            <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="table-primary">
                            <td>Por debajo de 18.5</td>
                            <td>Bajo Peso</td>
                        </tr>
                        <tr class="table-success">
                            <td>18.5-24.9</td>
                            <td>Peso normal</td>
                        </tr>
                        <tr class="table-warning">
                            <td>25.0–29.9</td>
                            <td>Pre-obesidad o Sobrepeso</td>
                        </tr>
                        <tr class="table-warning">
                            <td>30.0–34.9</td>
                            <td>Obesidad clase I</td>
                        </tr>
                        <tr class="table-danger">
                            <td>35,0–39,9</td>
                            <td>Obesidad clase II</td>
                        </tr>
                        <tr class="table-danger">
                            <td>Por encima de 40</td>
                            <td>Obesidad clase III</td>
                        </tr>
                    </tbody>
                </table>
                <p>
                    El IMC,anteriormente llamado índice de Quetelet, es una medida para 
                    indicar el estado nutricional en adultos. Se define como el peso de 
                    una persona en kilogramos dividido por el cuadrado de la altura de la 
                    persona en metros (kg/m2). Por ejemplo, un adulto que pesa 70 kg y cuya 
                    altura es de 1,75 m tendrá un IMC de 22,9.70 (kg)/1.752 (m2) = 22.9 IMC
                </p>
                <small>Fuente: <a href="https://www.euro.who.int/en/health-topics/disease-prevention/nutrition/a-healthy-lifestyle/body-mass-index-bmi">OMS</a> (2020)</small>
            </div>
        </div>
    </div>
</template>

<script>
    import {required, between} from 'vuelidate/lib/validators';
    import axios from 'axios';
    import swal from 'sweetalert';
    import Imc from '../models/Imc';
    import Global from '../global';
    import Grafico from '../components/BarChart.vue'

    export default {
        name: 'FormIMCComponent',
        components:{
            Grafico
        },
        data(){
            return{
                token: '',
                imc: new Imc('',''),
                url: Global.url_rest,
                tuImc:'',
                cImc:'',
                loading: false,
                submitted: false
            }
        },
        methods:{
            calcularIMC(){
                this.submitted=true
                this.loading=true
                const headers = { 
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ this.token
                };

                axios.post(this.url+'/imc', this.imc,{headers}).then(response=>{
                    if(response.data.ok){
                        this.submitted=false;
                        this.loading=false
                        this.tuImc=response.data.body.imc
                        this.cImc = this.getCategorias(this.tuImc)
                        swal(
                            'IMC creado',
                            'El indice de masa corporal se ha guardado satisfactoriamente',
                            'success'
                        )
                        this.imc.masa='';
                        this.imc.talla='';
                    }
                })
                .catch(error=>{
                    this.loading=false
                    console.log(error);
                })
            },
            getCategorias(vimc){
                let imc = parseFloat(vimc)
                if(imc<18.5){
                    return "Bajo Peso"
                }
                if(imc>=18.5 && vimc<=24.9){
                    return "Normal"
                }
                if(imc>=25.0 && vimc<=29.9){
                    return "Pre-obesidad o Sobrepeso"
                }
                if(imc>=30.0 && vimc<=34.9){
                    return "Obesidad clase I"
                }
                if(imc>=35.0 && vimc<=39.9){
                    return "Obesidad clase II"
                }
                if(imc>=40){
                    return "Obesidad clase III"
                }
            }
        },
        validations:{
            imc:{
                talla:{
                    required,
                    between: between(0.7, 3)
                },
                masa:{
                    required,
                    between: between(1, 600)
                }
            }
        },
        mounted(){
            this.token = JSON.parse(localStorage.getItem("user_autenticado")).token
        }
    }
</script>
<style scoped>
   
</style>