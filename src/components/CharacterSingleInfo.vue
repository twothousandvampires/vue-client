<script>
import Request from "../script/Request";

export default {
  name: "CharacterSingleInfo",
  props : {
    char : Object
  },
  data(){
    return{

    }
  },
  methods : {
    play(id){
      localStorage.setItem('char_id', id)
      location.href = '/game'
    },
    deleteCharacter(char_id){
      Request.deleteCharacter(char_id).then(response =>{
        if(response.data.success){
          this.$emit('delete_char', char_id)
        }
      })
    }
  }
}
</script>

<template>
  <div style="color:#c8c8c8;">
    <div id="info-head">
      <p class="stat-elem">{{ char.name }}</p>
      <p>Level<span class="stat-elem">{{ char.level }}</span></p>
    </div>
    <div id="info-body">
      <img width="90" height=93 src="src/assets/img/characters/chel_preview.gif" alt="">
    </div>
    <div id="info-bottom">
      <button  @click.prevent="play(char.id)">Play</button>
      <button  @click.prevent="deleteCharacter(char.id)">Delete</button>
    </div>
  </div>
</template>

<style scoped>
  button{
    cursor: pointer;
    border: 10px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_long.png") 95 stretch stretch;
    font-family: o;
    font-size: 18px;
  }
  .stat-elem{
    font-weight: bold;
    font-size: 24px;
    margin-left: 8px;
  }
  #info-head{
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #info-head p{
    font-weight: bold;
  }
  #info-body{
    padding: 4px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  #info-stats{
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  #info-bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #info-bottom button{
    padding: 6px;
    cursor: pointer;
    width: 100px;
    background-color: #f8f8f8;
  }
</style>