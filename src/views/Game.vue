<script>

import NodeModal from "../components/NodeModal.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Inventory from "../components/Inventory.vue";
import SkillTree from "../components/SkillTree.vue";
import Game from "../script/Game.js";
import Request from "../script/Request.js";
import RenderSettings from "../components/RenderSettings.vue";
import PlayerHUD from "../components/PlayerHUD.vue";
import Load from '../components/Load.vue'

export default {
  data(){
    return {
      char_id : localStorage.getItem('char_id'),
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
    SkillTree,
    Load
  },
  async mounted() {
      this.game = new Game(this)
      this.game.init()
      this.loaded = false
  },
}
</script>
<template>
  <MainLayout >

    <!-- tower scene -->
<!--    <div v-if="game?.scene === 'tower'">-->
<!--      <p>Tower</p>-->
<!--      <p @click="game.setState('world')">Exit</p>-->
<!--    </div>-->

    <!-- game scene -->
    <div>
      <Load v-if="loaded"></Load>
      <div id="canvas-wrap">
        <canvas id='game-canvas'  width="1300" height="1300" ref="canvas"></canvas>
      </div>
    </div>

    <Inventory v-if="game?.inv_is_open" v-bind:char="game.char" v-bind:mouse="game.mouse"></Inventory>

    <SkillTree v-if="game?.tree_is_open" v-bind:char="game.char"></SkillTree>

    <RenderSettings v-if="game?.state === 'fight'" v-bind:render="game.render"></RenderSettings>

    <PlayerHUD v-if="game" v-bind:char="game.char"></PlayerHUD>

  </MainLayout>
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