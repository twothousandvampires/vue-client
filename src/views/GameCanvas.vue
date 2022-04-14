<script>

import NodeModal from "../components/NodeModal.vue";
import MainLayout from "../layouts/MainLayout.vue";
import Inventory from "../components/Inventory.vue";
import Game from "../script/Game.js";
import Request from "../script/Request.js";
import RenderSettings from "../components/RenderSettings.vue";

export default {
  data(){
    return {
      loaded : true,
      game : undefined
    }
  },
  components:{
    RenderSettings,
    NodeModal,
    MainLayout,
    Inventory,
  },
  props:{
    char_id : String
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
    <div id="canvas-wrap">
      <canvas id='game-canvas' :style="can_style" width="1300" height="1300" ref="canvas"></canvas>
    </div>
    <p style="position:absolute" v-if="loaded">Loading</p>
  <Inventory v-if="game && game.inv_is_open" @close_inv="close_inv" v-bind:char="game.char" v-bind:mouse="game.mouse">

  </Inventory>
  <RenderSettings v-if="game" v-bind:render="game.render"></RenderSettings>
</template>
<style scoped>

#canvas-wrap{
  overflow: hidden;
}

canvas{
  overflow: hidden;
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
}
</style>





