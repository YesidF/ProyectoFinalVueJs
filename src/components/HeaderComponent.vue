<template>
    <header>
        <nav class="navbar mt-3">
            <router-link to="/" class="navbar-brand">
                <img src="../assets/img/logo.png" class="logo-app d-inline-block align-top ms-3" alt="Logo app">
            </router-link>
            
            <ul class="nav justify-content-end">
                
                <li class="nav-item">
                    <router-link :to="{name:'reportes'}" class="nav-link" active-class="active" v-if="usuario_autenticado && rol=='Admin'">
                        <a class="nav-link text-secondary" aria-current="page">Reportes</a>
                    </router-link>    
                </li>

                <li class="nav-item">
                    <router-link :to="{name:'registro'}" class="nav-link" active-class="active" v-if="usuario_autenticado && rol=='Admin'">
                        <a class="nav-link text-secondary" aria-current="page">Registrar usuario</a>
                    </router-link>    
                </li>

                <li class="nav-item">
                    <router-link :to="{name:'login'}" class="nav-link text-secondary" active-class="active" v-if="!usuario_autenticado">
                        <button type="button" class="btn btn-outline-info me-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                                <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                            </svg>
                            <font _mstmutation="1" _msthash="1160419" _msttexthash="78442"> Iniciar Sesión </font>
                        </button>
                    </router-link>
                </li>
                
                <li class="nav-item" >
                    <div class="nav-link text-secondary" active-class="active" v-if="usuario_autenticado">
                        <button type="button" class="btn btn-outline-danger me-3" @click="salir()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                                <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                            </svg>
                            <font _mstmutation="1" _msthash="1160419" _msttexthash="78442"> Cerrar Sesion</font>
                        </button>
                    </div>
                </li>
                <!--<li class="nav-item">
                    <button type="button" class="btn btn-outline-info me-3" data-bs-toggle="modal" data-bs-target="#loginModal" data-bs-whatever="@mdo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"></path>
                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"></path>
                        </svg>
                        <font _mstmutation="1" _msthash="1160419" _msttexthash="78442"> Iniciar Sesión </font>
                    </button>
                </li>-->
            </ul>
        </nav>
    </header>
</template>

<script>

export default {
    name: 'HeaderComponent',

    data(){
        return{
            usuario_autenticado: JSON.parse(localStorage.getItem('user_autenticado')),
            rol: ''
        }
    },
    mounted(){
        if(localStorage.getItem("user_autenticado")){
            this.rol = JSON.parse(localStorage.getItem("user_autenticado")).usuario.rol.descripcion
        }
    },
    methods:{
        salir(){
            localStorage.removeItem('user_autenticado')
            this.usuario_autenticado = JSON.parse(localStorage.getItem('user_autenticado'))
            this.$router.push('/')
        }
    }
}
</script>