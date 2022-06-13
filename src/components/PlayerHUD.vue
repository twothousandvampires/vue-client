<script>
import Belt from "./hud/Belt.vue";
import StatusBar from "./hud/StatusBar.vue";
import SkillPanel from "./hud/SkillPanel.vue";

export default {
  name: "PlayerHUD",
  props :{
    char : Object
  }
  ,components:{
    Belt,
    StatusBar,
    SkillPanel
  }
}
</script>

<template>
  <div id="hud">
    <div id="stats">
      <div>
        <p>Life - {{char.life}} / {{char.max_life}}</p>
      </div>
      <div>
        <p>Will - 100/100</p>
      </div>
      <div>
        <p>Energy - {{Math.floor(char.energy)}}/{{char.max_energy}}</p>
      </div>
    </div>
    <div id="player">
      <StatusBar v-bind:status="this.char.status">

      </StatusBar>
      <Belt v-bind:belt="this.char.belt">

      </Belt>
      <SkillPanel v-bind:skills="this.char.skill_panel">

      </SkillPanel>
    </div>
  </div>
</template>

<style scoped>
  #player{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
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
    height: auto;
    background-color: #c8c8c8;
    border: 10px solid #c8c8c8;
    border-image: url("/src/assets/img/border/border_long.png") 10 stretch stretch;
  }
</style>