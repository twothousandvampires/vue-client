<script>
export default {
  name: "BeltCall",
  props :{
    cell : Object
  }
}
</script>

<template>
  <div v-if="!cell">
    <img class="belt-img" src="src/assets/img/icons/misc/empty_belt.png" alt="">
  </div>
</template>

<style scoped>
  div{
    padding: 1px;
  }
  .belt-img{
    width: 60px;
    height: 60px;
  }
</style>