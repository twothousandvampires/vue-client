<script>
import BeltCell from "./BeltCell.vue";
export default {
  name: "Belt",
  components:{
    BeltCell
  },
  props:{
    belt : Object
  }
}
</script>

<template>
  <div id="belt">
    <div v-for="(item, index) in this.belt.cells">
      <BeltCell v-bind:num="index" v-bind:cell="item"></BeltCell>
    </div>
  </div>
</template>

<style scoped>
  #belt{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>