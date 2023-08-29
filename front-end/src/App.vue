<template>
<contentGenerator></contentGenerator>
</template>

<script>
import contentGenerator from './components/contentGenerator.vue';
export default {
  name: 'App',
  components: {
    contentGenerator
  }
}
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}


#app {
  width: 100%;
  text-align: center
}
</style>
