<script>
export default {
  name: "Skill",
  props :{
    skill : Object
  }
}
</script>

<template>
  <div>
    <img :src="this.skill.img_path">
  </div>
</template>

<style scoped>

</style>