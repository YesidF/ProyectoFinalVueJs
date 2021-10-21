<template>
  <div id="app">
    <div class="container-fluid">
      <!--<Login></Login>-->
      <Header ref="header"></Header>
      <router-view></router-view>
      <Footer></Footer>
    </div>
  </div>
  
</template>

<script>
import Header from './components/HeaderComponent.vue';
//import Login from './components/FormLoginComponent.vue';
import Footer from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    Header,
    //Login,
    Footer
  }
}

</script>

<style>

</style>