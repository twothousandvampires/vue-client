<script>
import GameCanvas from "../views/GameCanvas.vue";
import CharacterCreate from "./CharacterCreate.vue";
import CharacterSingleInfo from "./CharacterSingleInfo.vue";
export default {
  data(){
    return{
      character_creating : false
    }
  },
  props:{
    characters : Array
  },
  name: "CharactersInfo.vue",
  components:{
    GameCanvas,
    CharacterCreate,
    CharacterSingleInfo
  },
  mounted() {
  },
  methods:{
    create(){
      this.character_creating = true
    },
  }
}
</script>


<template>
  <div class="characters-wrap">
    <div class="character" v-for="character in characters">
        <CharacterSingleInfo v-bind:character="character"/>
    </div>
  </div>
  <button @click="create">Create</button>
  <CharacterCreate v-if="character_creating"/>
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
    border: 2px solid darkblue;
  }

</style>