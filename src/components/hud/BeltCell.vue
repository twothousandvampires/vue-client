<script>
import config from '/config.js'
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
          return config.img_url + '/belt_1.png'
        }
        else if(this.num === 1){
          return config.img_url +'/belt_2.png'
        }
        else if(this.num === 2){
          return config.img_url +'/belt_3.png'
        }
        else if(this.num === 3){
          return config.img_url +'/belt_4.png'
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