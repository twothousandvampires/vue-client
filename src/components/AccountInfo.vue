<script>
import CharacterCreate from "./CharacterCreate.vue";

export default {
  data(){
    return{
      character_creating : false
    }
  },
  name: "AccountInfo.vue",
  props:{
    user : Object
  },
  methods:{
    create(){
      this.character_creating = true
    },
  },
  components:{
    CharacterCreate,
  }
}
</script>

<template>

    <div class="acc-info-wrap">
      <h1 class="acc-name">{{ user.name }}</h1>
      <button @click="create">Create character</button>
    </div>

  <CharacterCreate v-if="character_creating"/>

</template>

<style scoped>

  button{
    margin-left: 10px;
    cursor: pointer;
    border: 10px solid #40c4c8;
    border-image: url("/src/assets/img/border/border_long.png") 95 stretch stretch;
    font-family: o;
    font-size: 18px;
  }

  .acc-info-wrap{
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 4px;
    color: #c8c8c8;
  }

</style>