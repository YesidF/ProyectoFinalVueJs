<template>
    <div id="form-login">
        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="loginModalLabel">Inicia Sesión</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form id="formLogin" v-on:submit.prevent="login()">
                        <div class="modal-body">                       
                            <div class="form-floating mb-3">
                                <input v-model="usuario.email" type="email" class="form-control" id="emailL" name="emailL" placeholder="name@example.com">
                                <label for="emailL" class="col-form-label">Email:</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input v-model="usuario.password" type="password" class="form-control" id="password" name="password" placeholder="name@example.com">
                                <label for="password" class="col-form-label">Contraseña:</label>
                            </div>   
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" class="btn btn-info" data-bs-dismiss="modal">Iniciar Sesión</button>
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
        name: 'FormLoginComponent',
        data(){
            return{
                usuario: new UsuarioLogin('',''),
                url: Global.url_rest,
                modal: ''
            }
        },
        mounted(){
            //console.log(this.usuario);
        },
        methods:{
            login(){
                axios.post(this.url+'/users/login', this.usuario).then(response=>{
                   
                    if(response.data.ok){
                        //GuardarToken
                         console.log(response.data.body.token)
                        //redirecionar a la home
                        this.modal='modal'
                        this.$router.push('/home')
                    }else{
                        //validar formulario
                    }
                    
                })
                .catch(error=>{
                    console.log(error);
                })
                
            }
        }
    }
</script>