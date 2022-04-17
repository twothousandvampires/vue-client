<script>
export default {
  name: "PlayerHUD",
  props :{
    char : Object
  }
}
</script>

<template>
  <div id="hud">
    <div id="stats">
      <div style="width: 200px">
        <p>Life - {{char.life}}/{{char.max_life}}</p>
      </div>
      <div style="width: 200px">
        <p>Energy - {{Math.floor(char.energy)}}/{{char.max_energy}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #stats{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #hud{
    position: fixed;
    top:80%;
    left: auto;
    width: 600px;
    height: 100px;
    background-color: #c8c8c8;
    border: 10px solid #c8c8c8;
    border-image: url("/src/assets/img/border/border_long.png") 10 stretch stretch;
  }
</style>