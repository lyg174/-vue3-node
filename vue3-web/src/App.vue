<template>
  <div>
    <Navbar/>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue';


</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

</style>