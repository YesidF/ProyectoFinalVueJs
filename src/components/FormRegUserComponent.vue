<template>
    <div id="form-usu" class="mt-3">
        <div class="row justify-content-sm-center">
            <div class="col-12	col-sm-8 col-md-6 col-lg-6">
            <!--.prevent para que no me envíe el formulario y solo ejecute el método-->
            <form class="p-3" @submit.prevent="crearUsuario()">
                <h1>Registrar usuario.</h1>
                <div class="mb-3">Por favor, ingrese los siguentes datos.</div> 

                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Ingrese su estatura" v-model="user.nombre" 
                    v-bind:class="{
                        'is-invalid': submitted && !$v.user.nombre.required || !$v.user.nombre.minLength || !$v.user.nombre.maxLength,
                        'is-valid': submitted && $v.user.nombre.required && $v.user.nombre.minLength && $v.user.nombre.maxLength
                        }">
                    <label for="nombre">Nombre:</label>
                    <div v-if="!$v.user.nombre.required" class="invalid-feedback">
                        El nombre es requerido
                    </div>
                    <div v-if="!$v.user.nombre.minLength" class="invalid-feedback">
                        El nombre debe tener mas de 3 caracteres
                    </div>
                    <div v-if="!$v.user.nombre.maxLength" class="invalid-feedback">
                        El nombre no puede tener mas de 30 caracteres
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="apellidos" name="apellidos" placeholder="Ingrese su Apellido" v-model="user.apellidos" 
                    v-bind:class="{
                        'is-invalid': submitted && !$v.user.apellidos.required || !$v.user.apellidos.minLength || !$v.user.apellidos.maxLength,
                        'is-valid': submitted && $v.user.apellidos.required && $v.user.apellidos.minLength && $v.user.apellidos.maxLength
                    }">
                    <label for="apellidos">Apellidos: </label>
                    <div v-if="!$v.user.apellidos.required" class="invalid-feedback">
                        El apellido es requerido
                    </div>
                    <div v-if="!$v.user.apellidos.minLength" class="invalid-feedback">
                        El apellido debe tener mas de 3 caracteres
                    </div>
                    <div v-if="!$v.user.apellidos.maxLength" class="invalid-feedback">
                        El apellido no puede tener mas de 30 caracteres
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="telefono" name="telefono" placeholder="Ingrese su tulefono" v-model="user.telefono"
                    v-bind:class="{
                        'is-invalid': submitted && !$v.user.telefono.required || !$v.user.telefono.minLength || !$v.user.telefono.maxLength || !$v.user.telefono.numeric,
                        'is-valid': submitted && $v.user.telefono.required && $v.user.telefono.minLength && $v.user.telefono.maxLength && $v.user.telefono.numeric
                    }"
                    >
                    <label for="telefono">Telefono:</label>
                    <div v-if="!$v.user.telefono.required" class="invalid-feedback">
                        El telefono es requerido
                    </div>
                    <div v-if="!$v.user.telefono.minLength" class="invalid-feedback">
                        El telefono debe tener 10 caracteres
                    </div>
                    <div v-if="!$v.user.telefono.maxLength" class="invalid-feedback">
                        El telefono debe tener 10 caracteres
                    </div>
                    <div v-if="!$v.user.telefono.numeric" class="invalid-feedback">
                        El telefono solo admite caracteres numéricos
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="email" name="email" placeholder="Ingrese su email" v-model="user.email"
                    v-bind:class="{
                        'is-invalid': submitted && !$v.user.email.required || !$v.user.email.email,
                        'is-valid': submitted && $v.user.email.required && $v.user.email.email
                    }"
                    >
                    <label for="email">Email:</label>
                    <div v-if="!$v.user.email.required" class="invalid-feedback">
                        El email es requerido
                    </div>
                    <div v-if="!$v.user.email.email" class="invalid-feedback">
                        Ingrese un email válido!!
                    </div>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" id="genero" name="genero" :value="generoDefault" @click="changeGenero()" checked v-model="user.genero" @>
                    <label class="form-check-label" for="genero">{{generoDefault}}</label>
                </div>
                <div class="form-check form-switch">
                    <input type="hidden" class="form-check-input" 
                    v-bind:class="{
                        'is-invalid': submitted && erroResponse}"
                    >
                    <div class="invalid-feedback">
                        Error al ingresar usuario, asegurate de estar autenticado o vuelva a intentarlo mas tarde...
                    </div>
                </div>
                <div class="d-flex align-items-center" v-if="loading">
                    <strong>Crearo Usuario...</strong>
                    <div class="spinner-border ms-auto text-danger" role="status" aria-hidden="true"></div>
                </div>
                <div class="d-grid d-md-flex justify-content-md-end">
                    <button type="submit" class="btn btn-info btn-lg">Registrar</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>

<script>
    import {required,minLength, maxLength, email, numeric} from 'vuelidate/lib/validators';
    //const { required, minLength } = require('vuelidate/lib/validators')
    import User from '../models/User';
    import swal from 'sweetalert';
    import axios from 'axios';
    import Global from '../global';

    export default {
        name: 'FormRegUserComponent',
        data(){
            return{
                submitted: false, //para controlar cuando de en submit
                generoDefault: 'Hombre',
                user: new User('','','','','','',3,2),
                url: Global.url_rest,
                erroResponse: false,
                token: '',
                loading: false
            }
        },
        components:{
            
        },
        methods:{
            changeGenero(){
                if (this.generoDefault=='Hombre'){
                    this.generoDefault='Mujer';
                }else{
                    this.generoDefault='Hombre';
                }
            },
            crearUsuario(){
                this.loading=true;
                this.submitted=true;
                this.$v.$touch();//validar
                if(this.$v.$invalid){
                    this.loading=false;
                    return false;
                }
                
                if(this.generoDefault=="Mujer"){
                    this.user.genero="Femenino"
                }else{
                    this.user.genero="Masculino"
                }
                this.user.password=this.user.telefono

                const headers = { 
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer '+ this.token
                };
                console.log(JSON.stringify(this.user))
                axios.post(this.url+'/users',JSON.stringify(this.user),{headers}).then(response=>{
                    if(response.data.ok){
                        this.loading=false;
                        swal(
                            'Usuario creado',
                            'El usuario '+ this.user.nombre+' '+this.user.apellidos+'se ha credo',
                            'success'
                        )
                        this.submitted=false;
                        this.user.nombre='';
                        this.user.apellidos='';
                        this.user.telefono='';
                        this.user.email='';
                        this.user.password='';
                    }
                })
                .catch(error=>{
                    this.loading=false;
                    this.erroResponse=true
                    //localStorage.removeItem('user_autenticado')
                    //this.$root.$children[0].$refs.header.usuario_autenticado =JSON.parse(localStorage.getItem("user_autenticado"))
                    swal(
                        'Error inesperado',
                        'Asegurate de iniciar sesión y vuelve a intentarlo',
                        'error'
                    )
                    //this.$router.push('/')
                    console.log(error);
                })
            }
        },
        validations:{
            user:{
                nombre:{
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(30)
                },
                apellidos:{
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(30)
                },
                telefono:{
                    required,
                    minLength: minLength(10),
                    maxLength: maxLength(10),
                    numeric
                },
                email:{
                    required,
                    email
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