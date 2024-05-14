<script>
import Character from "./components/game_canvas/src/Character/Character";
import CharacterService from "./services/CharacterService";
import Game from "./src/Game.js";

import MainLayout from "../../layouts/MainLayout.vue";
import Load from '../../components/Load.vue'
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
    let response = await CharacterService.getCharacter()
    let data = response.data.data
    let player = new Character(data)
    this.game = new Game(player)
  },
}
</script>
<template>
  <MainLayout >
    <div>
      <Load v-if="!game"></Load>
      <GameCanvas v-else :game="game"></GameCanvas>
    </div>
  </MainLayout>
</template>

<style scoped>

</style>