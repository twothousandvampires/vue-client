<script>
import config from '/config'
export default {
  data(){
    return {
      config
    }
  }
}
</script>

<template>
  <div class="loading">
    <img class="load_gif" :src="config.img_url + 'load.gif'" alt="">
  </div>
</template>

<style scoped>
  .load_gif{
    width: 400px;
    height: 120px;
  }
  .loading{
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    position: absolute;
  }
</style>