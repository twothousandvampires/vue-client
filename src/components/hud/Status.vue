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
    <div :title="this.status.name + '(' + this.status.duration + ')'">
      <img id="status-image" :src="this.status.getStatusBarImgPath()">
    </div>
  </div>
</template>

<style scoped>
  #status-image{
    width: 30px;
    height: 30px;
  }
</style>