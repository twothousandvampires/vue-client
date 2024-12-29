<script>
import StatusBar from "./hud/StatusBar.vue";
import Skill from "./hud/Skill.vue";

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
              <img style="margin-right: 14px" width="30" height="30" src="/src/assets/img/life.gif" alt="life-gif">
              <p>{{char.life}}/{{char.max_life}}</p>
            </div>
            <div class="stat-item">
              <img style="margin-right: 14px" width="30" height="30" src="/src/assets/img/mana.gif" alt="life-gif">
              <p>{{char.mana}}/{{char.max_mana}}</p>
            </div>
            <div class="stat-item">
              <img style="margin-right: 14px" width="30" height="30" src="/src/assets/img/stamina.gif" alt="life-gif">
              <p>{{Math.floor(char.energy)}}/{{char.max_energy}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="char.figth_context" style="display: flex;flex-direction: column;align-items: center;text-align: center">
        <img title="retreat" width="60" height="60" src="/src/assets/img/movement_line.gif" style="cursor: pointer" @click="char.retreat()">
        <img title="defend" width="60" height="60" src="/src/assets/img/shield_up_skill.png" style="cursor: pointer" @click="char.defend()">
        <img width="60" height="60" src="/src/assets/img/equipment_parts.png" style="cursor: pointer" title="skip turn(space)" @click="char.skipTurn()">
        <div style="display: flex;">
          <img width="60" height="60" src="/src/assets/img/bones_in_boots.png" title="action points">
          <p style="position: absolute; top: 30px; left: 44px; color: wheat;">{{char.action_count}}</p>
        </div>
        <div v-if="char.combo_points">
          <img width="60" height="60" src="/src/assets/img/weapon_column.gif" title="combo points">
          <p style="position: absolute; top: 30px; left: 44px; color: wheat;">{{char.combo_points}}</p>
       </div>
      </div>
      <div style="color: #86c69a;">
        <div style="display: flex;justify-content: center;align-items: center;">
          <img @click="char.useTorch()" src="/src/assets//img/torch_count.gif" alt="">
          <p>{{char.torch}}</p>
        </div>
        <div style="display: flex;justify-content: center;align-items: center;">
          <img @click="char.rest()" src="/src/assets//img/food_count.gif" alt="">
          <p>{{char.food}}</p>
        </div>
      </div>
      <div v-if="false">
        <select @change="this.char.createEnemy($event)" name="" id="">
          <option selected ></option>
          <option value="swarm">swarm</option>
          <option value="bones of greatest sorcerer">bones of greatest sorcerer</option>
          <option value="the beehive dragger">the beehive dragger</option>
        </select>
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
    padding-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  #hud-wrap{
    z-index: 1111;
    height: 800px;
    background-color: #2a1e23;
    background-image: url('/src/assets/img/hudtest.png');
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
    width:240px;
    align-items: center;
  }
  .stat-item{
    color: #86c69a;
    padding: 4px 0;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>