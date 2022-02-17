<script>
export default {
  name: "AccountInfo.vue",
  props:{
    user : Object
  }
}
</script>


<template>

  <div class="acc-info-wrap">

      <h1 class="acc-name">{{ user.name }}</h1>
      <p class="acc-email">{{ user.email }}</p>

  </div>

</template>


<style scoped>
  .acc-name{
    color: hsla(160, 100%, 37%, 1);
  }
  .acc-info-wrap{
    padding: 10px;
    border: hsla(160,100%,37%,1) 2px solid;
    min-height: 200px;
  }
  .acc-email{
    font-size: 26px;
    color:darkblue;
  }
</style>