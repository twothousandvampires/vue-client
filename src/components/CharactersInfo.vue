<script>
import GameCanvas from "../views/GameCanvas.vue";
import CharacterCreate from "./CharacterCreate.vue";
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
    CharacterCreate
  },
  mounted() {
  },
  methods:{
    create(){
      this.character_creating = true
    },
    classImage(str){
      return 'src/assets//img/' + str + '.jpg'
    },
    play(id){
      localStorage.setItem('char_id', id)
      location.href = '/world'
    }
  }
}
</script>


<template>
  <div class="characters-wrap">
    <div class="character" v-for="character in characters">
        <p>{{ character.name }}</p>
        <img width="160" height="240" :src="classImage(character.class)" alt="">
        <p  @click="play(character.id)">Play</p>
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
    min-width: 200px;
    min-height: 320px;
    border: 2px solid darkblue;
  }

</style>