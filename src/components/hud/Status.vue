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
    <div :title="this.status.name">
      <img id="status-image" :src="this.status.img_path">
    </div>
  </div>
</template>

<style scoped>
  #status-image{
    width: 30px;
    height: 30px;
  }
</style>