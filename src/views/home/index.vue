<template>

    <root-container>
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </root-container>

</template>

<script>
// @ is an alias to /src
import HelloWorld from './HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
