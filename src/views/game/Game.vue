<script>
import Character from "./components/game_canvas/src/Character/Character";
import requestService from "./services/requestService";
import Game from "./src/Game.js";

import MainLayout from "../../layouts/MainLayout.vue";
import Load from '../components/Load.vue'
import GameCanvas from "@/views/game/components/game_canvas/GameCanvas.vue";

export default {
  data(){
    return {
      game : undefined
    }
  },
  components:{
    MainLayout,
    Load,
    GameCanvas
  },
  async mounted() {
    this.game = new Game()
  },
}
</script>
<template>
    <div>
      <Load v-if="!game"></Load>
      <GameCanvas v-else :game="game"></GameCanvas>
    </div>
</template>

<style scoped>

</style>