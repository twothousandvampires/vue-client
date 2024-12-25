<script>
import AudioPlayer from "./components/AudioPlayer.vue";
import PlayerHUD from "./components/PlayerHUD.vue";
import Inventory from "./components/Inventory.vue";
import Logger from "./components/Logger.vue";
import StatusBar from "./components/hud/StatusBar.vue";

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
    Inventory,
    Logger,
    StatusBar
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
    to_profile(){
        localStorage.removeItem('world')
        window.location.href = '/'
      }
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
    <PlayerHUD v-bind:char="char"></PlayerHUD>
    <div style="width: 720px; height: 800px;position: relative;">
      <div style="background-image: url('/src/assets/img/toptest2.png');height: 120px;z-index: 1111;position: relative; background-color: #2a1e23;display: flex;justify-content: space-around;align-items: center;">
        <AudioPlayer ref="audio_player"></AudioPlayer>
        <p style="color: #86c69a;cursor: pointer;" @click="to_profile">Profile</p>
      </div>
      <div style="background-image: url('/src/assets/img/innertest.png');height: 680px; width: 720px;;z-index: 1111;position: relative;pointer-events: none;">

      </div>
      <canvas style="position: relative;top:-960px;left: -300px;" id='game-canvas' width="1300" height="1300" ref="canvas"></canvas>
      <div id="status">
        <StatusBar :status="char.status"></StatusBar>
      </div>
    </div>
    <Logger></Logger>
  </div>
  <div v-if="init">
    <Inventory v-if="char.inv_is_open" v-bind:char="char"></Inventory>
    <div style="visibility: hidden; position: fixed; top: 20%; left: 50%;transform: translate(-50%, -50%);text-align: center" id="cell_info"></div>
    <div v-if="char.figth_context" style="display: flex;flex-direction: column;position: fixed; top: 28%; left: 50%;transform: translate(-50%, -50%);text-align: center" id="spells_and_items">
      <div id="items">
        <div @click="char.selectToUse(item)" v-for="item in char.getItems((elem) => { return elem.uses_in_fight})" style="margin: 2px;border: 5px solid; display: flex; flex-direction: row;justify-content: center;align-items: center" :style="item.selected ? 'border: 5px solid #00e699' :''">
          <img :title="item.getDescription()" width="60" height="60" :src="item.getImagePath()" alt="">
          <p style="position: absolute; left: 45px; top: 36px;color: wheat" v-if="item.item_type === 3">
            {{item.charges}}
          </p>
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
#status{
  display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:calc(100% - 80px);
    height: 80px;
    width: 400px;
    z-index: 6666;
  }
  #items, #spells{
    display: flex;
    flex-direction: row;
  }
  #canvas-wrap{
    overflow: hidden;
    width: 1200px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  canvas{
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
</style>