<script>
import Status from "./Status.vue";
export default {
  name: "StatusBar",
  components:{
    Status
  },
  props : {
    status : Object
  }
}
</script>

<template>
  <div id="status">
    <div v-for="item in this.status.bar">
      <Status v-bind:status="item">

      </Status>
    </div>
  </div>
</template>

<style scoped>
  #status{
    display: flex;
    flex-direction: row;
  }
</style>