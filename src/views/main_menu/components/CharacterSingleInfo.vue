<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import { useUserStore } from "@/stores/user";
import requestService from "../../game/services/requestService";

export default {
  props : {
    char : Object
  },
  methods : {
    async delete(char_id){
      let res = await requestService.serverRequest('delete_character', {delete_id: char_id})
      if(res.success){
        this.deleteCharacter(char_id)
      }
    },
    ...mapActions(useUserStore, ['deleteCharacter']),
    play(id){
      localStorage.setItem('char_id', id)
      localStorage.setItem('world', '1')
      location.reload()
    },
  },
  computed: {
    ...mapState(useUserStore,['user'])
  },
}
</script>

<template>
  <div style="color:#c8c8c8;">
    <div id="info-head">
      <p class="stat-elem">{{ char.name }}</p>
      <p>Killed<span class="stat-elem">{{ char.enemies_killed }}</span></p>
    </div>
    <div id="info-body">
      <img v-if="!char.dead" width="96" height="96" src="/src/assets/img/grim_world_idle.gif" alt="">
      <img v-else width="96" height="96" src="/src/assets/img/grim_dead.gif" alt="">
    </div>
    <div id="info-bottom">
      <button  @click.prevent="play(char.id)">Play</button>
      <button  @click.prevent="this.delete(char.id)">Delete</button>
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