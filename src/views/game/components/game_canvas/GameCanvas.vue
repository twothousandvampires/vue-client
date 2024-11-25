<script>
import AudioPlayer from "./components/AudioPlayer.vue";
import PlayerHUD from "./components/PlayerHUD.vue";
import RenderSettings from "./components/RenderSettings.vue";
import Inventory from "./components/Inventory.vue";
import Logger from "@/views/game/components/game_canvas/components/Logger.vue";
import BattleTools from "@/views/game/components/game_canvas/components/BattleTools.vue";
import FightPrepare from "@/views/game/components/game_canvas/components/FightPrepare.vue";
export default {
  name: "GameCanvas",
  data(){
    return{

    }
  },
  props: {
    game: Object
  },
  components:{
    FightPrepare,
    AudioPlayer,
    PlayerHUD,
    RenderSettings,
    Inventory,
    Logger,
    BattleTools
  },
  mounted() {
    this.game.init()
    if(!this.$refs.audio_player.is_played){
      let listener = () => {
        this.$refs.audio_player.startPlay()
        this.$refs.audio_player.is_played = true
        window.removeEventListener('keydown', listener)
      }
      window.addEventListener('keydown', listener)
    }
  },
  methods:{

  },
  computed: {
    char: function (){
      return this.game.char
    },
    init: function (){
      return this.game.initiated
    }
  }
}
</script>

<template>
  <div id="canvas-wrap">
    <AudioPlayer ref="audio_player"></AudioPlayer>
    <canvas id='game-canvas' width="1300" height="1300" ref="canvas"></canvas>
  </div>
  <div v-if="init">
    <Inventory v-if="char.inv_is_open" v-bind:char="char"></Inventory>
<!--    <RenderSettings v-bind:render="game.scene?.render"></RenderSettings>-->
<!--    <BattleTools v-bind:f_context="game.scene"></BattleTools>-->
    <PlayerHUD v-bind:char="char"></PlayerHUD>
<!--    <FightPrepare v-bind:game="this.game" v-if="this.game.prepare_for_battle"></FightPrepare>-->
    <Logger></Logger>
    <div style="visibility: hidden; position: fixed; top: 20%; left: 50%;transform: translate(-50%, -50%);text-align: center" id="cell_info"></div>
    <div v-if="char.figth_context" style="display: flex;flex-direction: column;position: fixed; top: 85%; left: 50%;transform: translate(-50%, -50%);text-align: center" id="spells_and_items">
      <div id="items">
        <div @click="char.selectToUse(item)" v-for="item in char.getItems((elem) => { return elem.uses_in_fight})" style="margin: 2px;border: 5px solid; display: flex; flex-direction: row;justify-content: center;align-items: center" :style="item.selected ? 'border: 5px solid #00e699' :''">
          <img :title="item.getDescription()" width="60" height="60" :src="item.getImagePath()" alt="">
        </div>
      </div>
      <div id="spells">
        <div @click="char.selectToUse(skill)" v-for="skill in char.skill_pull" style="margin: 2px;border: 5px solid; display: flex; flex-direction: row;justify-content: center;align-items: center" :style="skill.selected ? 'border: 5px solid #00e699' :''">
          <img :title="skill.getDescription()" width="60" height="60" :src="skill.getImagePath()" alt="">
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
  #items, #spells{
    display: flex;
    flex-direction: row;
  }
  #canvas-wrap{
    overflow: hidden;
  }
  canvas{
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>