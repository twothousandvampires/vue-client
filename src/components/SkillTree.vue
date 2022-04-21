<script>
export default {
  name: "SkillTree",
  props : {
    char : Object
  }
}
</script>

<template>
  <div v-for="(item) in char.skill_tree.passives">
    <p>{{item.name}}</p>
  </div>
</template>

<style scoped>

</style>