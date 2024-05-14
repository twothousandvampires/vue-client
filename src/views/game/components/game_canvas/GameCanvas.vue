<script>
import AudioPlayer from "./components/AudioPlayer.vue";
import PlayerHUD from "./components/PlayerHUD.vue";
import RenderSettings from "./components/RenderSettings.vue";
import Inventory from "./components/Inventory.vue";
import Logger from "@/views/game/components/game_canvas/components/Logger.vue";
import BattleTools from "@/views/game/components/game_canvas/components/BattleTools.vue";
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
    <Logger></Logger>
  </div>

</template>

<style scoped>
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