<script>
import CharacterSingleInfo from "./CharacterSingleInfo.vue";
import {mapState} from "pinia/dist/pinia";
import { useUserStore } from "@/stores/user";

export default {
  components:{
    CharacterSingleInfo
  },
  methods :{

  },
  computed: {
    ...mapState(useUserStore,['user'])
  },
}
</script>

<template>
  <div class="characters-wrap">
    <div class="character" v-for="character in this.user.characters">
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