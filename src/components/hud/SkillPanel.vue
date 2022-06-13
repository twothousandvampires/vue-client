<script>
import Skill from "./Skill.vue";
export default {
  name: "SkillPanel",
  components : {
    Skill
  },
  props :{
    skills : Object
  }
}
</script>

<template>
  <div>
    <div v-for="item in this.skills.skills">
      <Skill v-bind:skill="item">

      </Skill>
    </div>
  </div>
</template>

<style scoped>

</style>