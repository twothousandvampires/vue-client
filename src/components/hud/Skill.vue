<script>
export default {
  name: "Skill",
  props :{
    skill : Object
  }
}
</script>

<template>
  <div id="skill-wrap">
    <div>
      <p style="font-size: 14px">{{this.skill.name}}</p>
    </div>
    <div style="width: 100%;height: 100%; text-align: center">
      <img :src="this.skill.img_path">
    </div>
  </div>
</template>

<style scoped>
  #skill-wrap{
    width: 80%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }
  img{
    width: 90%;
  }
</style>