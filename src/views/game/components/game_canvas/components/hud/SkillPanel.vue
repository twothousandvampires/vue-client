<script>
import Skill from "./Skill.vue";
export default {
  name: "SkillPanel",
  components : {
    Skill
  },
  props :{
    skill : Object
  },
  mounted() {
  }
}
</script>

<template>
  <div id="skills">
      <Skill v-if="skill" v-bind:skill="skill">

      </Skill>
  </div>
</template>

<style scoped>
  #skills{
    min-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>