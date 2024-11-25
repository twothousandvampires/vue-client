<script>
export default {
  name: "Status",
  props :{
    status : Object
  }
}

</script>

<template>
  <div>
    <div :title="this.status.getDescription()">
      <img id="status-image" :src="this.status.getStatusBarImgPath()">
    </div>
  </div>
</template>

<style scoped>
  #status-image{
    width: 60px;
    height: 60px;
  }
</style>