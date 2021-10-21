<template>
    <div id="container">
        <registroIMC></registroIMC>
    </div>
</template>

<script>
import registroIMC from './FormIMCComponent.vue'

export default {
    name: 'HomeComponent',
    components:{
        registroIMC
    }
}
</script>