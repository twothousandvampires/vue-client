<script>
export default {

}
</script>

<template>
  <div class="loading">
    <img class="load_gif" src="@/assets/img/icons/misc/load.gif" alt="">
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