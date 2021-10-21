import Vue from 'vue'
import App from './App.vue'
/*Importar el router*/
import VueRouter from 'vue-router';
/*Importar el validador vuelidate*/
import Vuelidate from 'vuelidate'

/*import Componentes el nombre es indiferente, la ruta no*/
import Home from "./components/HomeComponent.vue";
import Login from "./components/LoginComponent.vue";
import FormRegistro from "./components/FormRegUserComponent.vue";
//import FormIMC from "./components/FormIMCComponent.vue";
import Index from "./components/IndexComponent.vue";
//import BarChart from "./components/BarChart.vue";
import NotFound from "./components/ErrorComponent.vue";
import Reportes from "./components/ReportesComponent";

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'popper.js'
import 'jquery'
import './assets/css/index.css';

Vue.config.productionTip = false

/*Congifuración del router*/
const routes =[
  {path: '/home', name:'home', component: Home},
  {path: '/login', name:'login', component: Login},
  {path: '/registro', name:'registro', component: FormRegistro},
  {path: '/reportes', name:'reportes', component: Reportes},
  //{path: '/imc', name: 'formRegImc', component: FormIMC},
  //{path: '/grafico', name: 'grafico', component: BarChart},
  {path: '/', component: Index},
  {path: '*', component: NotFound}
];

Vue.use(VueRouter); //Usamos VueRoute
/*Crear el objeto del vue routes*/
const router = new VueRouter({
  routes,
  mode: 'history'
});

Vue.use(Vuelidate)

/**Interceptores**/
function existToken() {
  let token = null;
  if(localStorage.getItem('user_autenticado')){
    token=JSON.parse(localStorage.getItem("user_autenticado")).token;
  }
  return token;
}

function getRolUser(){
  let rol = null;
  if(localStorage.getItem('user_autenticado')){
    rol=JSON.parse(localStorage.getItem("user_autenticado")).usuario.rol.descripcion
  }
  return rol;
}

router.beforeEach((to, from, next) => {
  let token = existToken();
  let rol = getRolUser();

  if (!token && (to.path == '/' || to.path == '/login') ) {
    next();
  }else{
    if (token && (to.path == '/' || to.path == '/login')) {
      next('home');
    }else{
      if (!token && to.path != '/' && to.path != '/login' ) {
        next('login');
      }else{
        if (token && rol && rol!='Admin' && (to.path == '/registro' || to.path == '/reportes')){
          next(from.path)
        }else{
          next()
        }
      }
    }
  }
});

/*dar de alta el route dentro de la instancia de vue 
*para que nos funcione de manera global en todo el proyecto*/
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
