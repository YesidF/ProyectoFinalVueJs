<template>
    <dir class="container">
        <h1 class="text-center">Prueba conexión con api-res</h1>
        <h3 class="text-center">Obtener usuarios</h3>

        <ul class="list-group" v-for="usuario in usuarios" :key="usuario.email">
            <li class="list-group-item">{{usuario.nombre}} {{usuario.apellidos}} --- {{usuario.email}}</li>
        </ul>
    </dir>
</template>
<script>
//Importar axios
import axios from 'axios';

//import {Global} from '../global';
import Global from '../global';

export default {
    name:'Usuarios',
    mounted(){
        this.getUsuarios();
    },
    data(){
        return{
            usuarios:[]
        }
    },
    methods:{
        getUsuarios(){
            axios.get(Global.url_rest+'/users?pageNumber=0&pageSize=5')
           .then(res=>{
                if(res.data.ok){
                    this.usuarios=res.data.body
                    console.log(this.usuarios);
                }
                //console.log(res);
            });
        }
    }
}
</script>
