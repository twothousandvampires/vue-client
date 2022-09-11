<script>
export default {
  name: "InspectSkillGem",
  data(){
    return{
      item: undefined,
      show: false,
      y: 0,
      x: 0
    }
  }
}
</script>
<template>
  <div v-on:mouseleave="$emit('mouseleave')" v-if="this.show" id="inspect-skill-gem" :style="{ top: y - 120 + 'px', left: x - 120 + 'px' }">
    {{item.name}}
    <div v-for="prop in item.props">
      <p>{{prop.name}}</p>
      <div>
        <img :src="prop.img_src">
      </div>
    </div>
  </div>
</template>
<style scoped>
  #inspect-skill-gem{
    background-color: yellow;
    position: fixed;
    z-index: 100000;
  }
</style>