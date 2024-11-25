<script>
import StatusBar from "../../../../../components/hud/StatusBar.vue";
import Skill from "@/components/hud/Skill.vue";

export default {
  name: "PlayerHUD",
  props :{
    char : Object
  }
  ,components:{
    StatusBar,
    Skill
  }
}
</script>

<template>
  <div id="hud-wrap">
    <div id="hud">
      <div id="stats">
        <div id="stats-left">
          <div style="height: 130px">
            <div class="stat-item">
              <img style="margin-right: 14px" width="30" height="30" src="src/assets/img/life.gif" alt="life-gif">
              <p>{{char.life}}/{{char.max_life}}</p>
            </div>
            <div class="stat-item">
              <img style="margin-right: 14px" width="30" height="30" src="src/assets/img/mana.gif" alt="life-gif">
              <p>{{char.mana}}/{{char.max_mana}}</p>
            </div>
            <div class="stat-item">
              <img style="margin-right: 14px" width="30" height="30" src="src/assets/img/stamina.gif" alt="life-gif">
              <p>{{Math.floor(char.energy)}}/{{char.max_energy}}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="status">
        <StatusBar :status="this.char.status"></StatusBar>
      </div>
      <div>
        <div v-if="char.figth_context">
          <p @click="char.skipTurn()">next turn</p>
          <p>actions {{char.action_count}}</p>
        </div>
        <p @click="char.useTorch()">torch({{char.torch}})</p>
        <p>food ({{char.food}})</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .turn{
    height: 25px;
    width: 25px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
  }
  #stats{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #status{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #hud-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width:200px;
    height: 100%;
    background-color: #c8c8c8;
    border: 59px solid #c8c8c8;
    border-image: url("/src/assets/img/border/hud_main.png") 59 stretch stretch;
  }
  #stats-left{
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #hud{
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
  }
  .stat-item{
    padding: 4px 0;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>