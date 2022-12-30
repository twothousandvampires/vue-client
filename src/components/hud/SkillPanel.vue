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
  <div id="skills">
    <div v-for="item in this.skills.skills">
      <Skill v-bind:skill="item">

      </Skill>
    </div>
  </div>
</template>

<style scoped>
  #skills{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>