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
    {{this.status.name}}
  </div>
</template>

<style scoped>

</style>