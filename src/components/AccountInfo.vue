<script>
import CharacterCreate from "./CharacterCreate.vue";
import { useUserStore } from "@/stores/user";
import { mapState } from 'pinia';

export default {
  data(){
    return {
      character_creating : false,
    }
  },
  mounted() {

  },
  computed: {
    ...mapState(useUserStore,['user'])
  },
  methods:{
    createSwitch(){
      this.character_creating = !this.character_creating
    },
  },
  components:{
    CharacterCreate,
  }
}
</script>

<template>
    <div class="acc-info-wrap">
      <h1 class="acc-name">{{ this.user.name }}</h1>
      <button @click="createSwitch" >Create character</button>
    </div>
    <CharacterCreate @stopCreating="createSwitch" v-if="character_creating"/>
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