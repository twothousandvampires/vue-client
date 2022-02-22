<script>

import MainLayout from '@/layouts/MainLayout.vue';
import GameCanvas from "./GameCanvas.vue";

export default {
  data(){
    return{
      char_id : localStorage.getItem('char_id')
    }
  },
  mounted() {

  },
  name: "world.vue",
  components:{
    MainLayout,
    GameCanvas
  }
}
</script>

<template>

  <MainLayout>

    <GameCanvas v-bind:char_id="char_id"/>

  </MainLayout>

</template>

<style scoped>

</style>