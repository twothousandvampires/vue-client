<script>
import {useGameConfigStore} from "../../stores/game_config";
export default {
  name: "BeltCall",
  props :{
    num: Number,
    cell : Object,
  },

  computed:{
    createCellImg: function (){
      if(this.cell){

      }
      else {
        if(this.num === 0){
          return useGameConfigStore().getImgUrl + '/belt_1.png'
        }
        else if(this.num === 1){
          return "src/assets/img/icons/hud/belt_2.png"
        }
        else if(this.num === 2){
          return "src/assets/img/icons/hud/belt_3.png"
        }
        else if(this.num === 3){
          return "src/assets/img/icons/hud/belt_4.png"
        }
      }
    }
  }
}
</script>

<template>
  <div v-if="!cell">
    <img class="belt-img" :src="createCellImg" alt="">
  </div>
</template>

<style scoped>
  div{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1px;
  }
  .belt-img{
    width: 60px;
    height: 60px;
  }
</style>