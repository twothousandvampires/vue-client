<script>

import NodeModal from "../components/NodeModal.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Inventory from "../components/Inventory.vue";
import SkillTree from "../components/SkillTree.vue";
import Game from "../script/Game.js";
import Request from "../script/Request.js";
import RenderSettings from "../components/RenderSettings.vue";
import PlayerHUD from "../components/PlayerHUD.vue";

export default {
  data(){
    return {
      // char_id : localStorage.getItem('char_id')
      loaded : true,
      game : undefined
    }
  },
  components:{
    RenderSettings,
    NodeModal,
    MainLayout,
    Inventory,
    PlayerHUD,
    SkillTree
  },
  mounted() {
    Request.world(this.char_id).then(response =>{
        if(response.data.success){
          this.game = new Game(this)
          this.game.prettifyData(response.data.data)
          this.loaded = false
          this.game.frame()
        }
      })
  },
  computed:{
    can_style(){
      return this.loaded ? 'visibility : hidden' : 'visibility : visible'
    },
  }
}
</script>
<template>
  <div v-if="game?.scene === 'tower'">
    <p>Tower</p>
    <p @click="game.setState('world')">Exit</p>
  </div>
  <div v-else>
    <div id="canvas-wrap">
      <canvas id='game-canvas' :style="can_style" width="1300" height="1300" ref="canvas"></canvas>
    </div>
    <p style="position:absolute" v-if="loaded">Loading</p>
  </div>
  <Inventory v-if="game?.inv_is_open" @close_inv="close_inv" v-bind:char="game.char" v-bind:mouse="game.mouse"></Inventory>
  <SkillTree v-if="game?.tree_is_open" @close_inv="close_inv" v-bind:char="game.char"></SkillTree>
  <RenderSettings v-if="game" v-bind:render="game.render"></RenderSettings>
<!--  <PlayerHUD v-if="game" v-bind:char="game.char.hud"></PlayerHUD>-->
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





