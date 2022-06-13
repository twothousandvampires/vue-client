<script>
export default {
  name: "Skill",
  props :{
    skill : Object
  }
}
</script>

<template>
  <div>{{this.skill.name}}</div>
</template>

<style scoped>

</style>