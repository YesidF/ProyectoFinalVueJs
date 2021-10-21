<template>
    <div id="form-login">
        <div class="" id="loginModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="loginModalLabel">Inicia Sesión</h4>
                    </div>
                    <form id="formLogin" v-on:submit.prevent="login()">
                        <div class="modal-body">                       
                            <div class="form-floating mb-3">
                                <input v-model="usuario.email" type="email" class="form-control" v-bind:class="{'is-invalid': msgInvalidEmail !=='' && msgInvalidEmail !=='valido'}" id="email" name="emailL" placeholder="name@example.com">
                                <label for="emailL" class="col-form-label">Email:</label>
                                <div id="validEmail" class="invalid-feedback">
                                    {{msgInvalidEmail}}
                                </div>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="usuario.password" type="password" class="form-control" v-bind:class="{'is-invalid': msgInvalidPassw !=='' && msgInvalidPassw !=='valido'}" id="password" name="password" placeholder="name@example.com">
                                <label for="password" class="col-form-label">Contraseña:</label>
                                <div id="validPassword" class="invalid-feedback">
                                    Ingrese contraseña
                                </div>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="hidden" v-bind:class="{'is-invalid': msgInvalidAutent !=='' && msgInvalidAutent !=='valido'}">
                                <div id="validAuten" class=" block invalid-feedback">
                                    Usuario o contraseña incorrectas!
                                </div>
                            </div>
                            <div class="d-flex align-items-center" v-if="loading">
                                <strong>Iniciando Sesión...</strong>
                                <div class="spinner-border ms-auto text-danger" role="status" aria-hidden="true"></div>
                            </div>
                               
                        </div>
                        <div class="modal-footer mb-3">
                            <button type="button" class="btn btn-secondary" @click="cancelar">Cancelar</button>
                            <button type="submit" class="btn btn-info">Iniciar Sesión</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UsuarioLogin from '../models/UserLogin';
    import axios from 'axios';
    import Global from '../global';

    export default {
        name: 'LoginComponent',
        data(){
            return{
                usuario: new UsuarioLogin('',''),
                url: Global.url_rest,
                usuario_autenticado: JSON.parse(localStorage.getItem("user_autenticado")),
                msgInvalidEmail: '',
                msgInvalidPassw:'',
                msgInvalidAutent:'',
                loading: false
            }
        },
        mounted(){

        },
        methods:{
            login(){
                if(this.validar()){
                    this.loading=true
                    axios.post(this.url+'/users/login', this.usuario).then(response=>{
                        if(response.data.ok){
                            //GuardarToken y user en el locaStorage
                            localStorage.setItem(
                                'user_autenticado',
                                JSON.stringify(response.data.body)
                            )
                            //actualizar el token del header
                            this.$root.$children[0].$refs.header.usuario_autenticado = JSON.parse(localStorage.getItem("user_autenticado"))
                            this.$root.$children[0].$refs.header.rol = this.rol = JSON.parse(localStorage.getItem("user_autenticado")).usuario.rol.descripcion
                            //redirecionar a la home
                            this.$router.push('/home')
                        }
                    })
                    .catch(error=>{
                        this.loading=false;
                        this.msgInvalidAutent='Email o contraseña incorrecta'
                        console.log(error);
                    })
                }else{
                    this.loading=false;
                }
            },
            cancelar(){
                this.$router.push('/')
            },
            validar(){
                let isValid=true

                if(!this.usuario.email){
                    this.msgInvalidEmail="Ingrese un email"
                    isValid=false
                }else{
                    this.msgInvalidEmail="valido"
                }

                if(!this.usuario.password){
                    this.msgInvalidPassw="Ingrese una contraseña"
                    isValid=false
                }else{
                    this.msgInvalidPassw="valido"
                }

                return isValid;
            }
        }
    }
</script>

<style lang="css" scoped>
    #form-login{
        height: 79vh;
    }
</style>