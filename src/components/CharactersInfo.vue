<script>
import GameCanvas from "../views/GameCanvas.vue";
import CharacterSingleInfo from "./CharacterSingleInfo.vue";
export default {
  props:{
    characters : Array
  },
  name: "CharactersInfo.vue",
  components:{
    GameCanvas,
    CharacterSingleInfo
  },
}
</script>

<template>
  <div class="characters-wrap">
    <div class="character" v-for="character in characters">
        <CharacterSingleInfo v-bind:char="character"/>
    </div>
  </div>
</template>

<style scoped>

  .characters-wrap{
    display: flex;
    justify-content: space-around;
  }
  .character{
    background-color: dimgrey;
    padding: 10px;
    min-width: 200px;
    min-height: 320px;
    border: 25px solid #2c3e50;
    border-image: url("/src/assets/img/border/border_big.png") 95 stretch stretch;
  }

</style>