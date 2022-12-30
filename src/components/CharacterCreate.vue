<script>

import { useUserStore } from "@/stores/user";
import { mapActions } from 'pinia'

export default {
  data(){
    return{
      character_name : ''
    }
  },
  methods:{
    ...mapActions(useUserStore, ['createCharacter']),
    inputName(e){
      this.character_name = e.target.value
    },
    async create(){
      if(this.character_name !== ''){
        await this.createCharacter(this.character_name)
        location.href = '/'
      }a
    }
  },
}
</script>

<template>
  <div class="modal">
    <form>
      <input class="input" v-model="character_name">
      <button class="btn" @click.prevent="create">Create</button>
      <p @click="$emit('stopCreating')">Close</p>
    </form>
  </div>
</template>

<style scoped>
  .btn{
    background-color: snow;
    border: 2px solid aqua;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .modal{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 2px solid antiquewhite;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    position: absolute;
    background-color: darkcyan;
    width: 400px;
    height: 200px;
  }
  form{
    padding: 6px;
    display: flex;
    flex-direction: column;
  }
  .input{
    margin-bottom: 10px;
    border: none;
    padding: 6px;
  }
</style>