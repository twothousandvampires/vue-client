<script>
export default {
  name: "RenderSettings",
  props :{
    render : Object
  },
  methods :{
   showState(){
     this.render.show_state = !this.render.show_state
   },
   showBox(){
     this.render.show_box = !this.render.show_box
   },
   showAttackBox(){
     this.render.show_attack_box = !this.render.show_attack_box
   }
  }
}

</script>

<template>
  <div>
    <p @click="showState">
      show state
    </p>
    <p @click="showBox">
      show box
    </p>
    <p @click="showAttackBox">
      show attack box
    </p>
  </div>
</template>

<style scoped>

div{
  position: fixed;
  top: 100px;
  left:100px;
  cursor: pointer;
}

</style>