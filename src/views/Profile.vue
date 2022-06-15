<script>
import AccountInfo from "../components/AccountInfo.vue";
import CharactersInfo from "../components/CharactersInfo.vue";
import Request from "../script/Request";
import Load from '../components/Load.vue'

export default {
  data(){
    return{
      user : undefined,
    }
  },
  name: "UserMainInfo.vue",
  components:{
    AccountInfo,
    CharactersInfo,
    Load
  },
  mounted() {
    Request.getUser().then( r =>{
      this.user = r.data.data
    })
  }
  ,methods:{
    deleteCharacter(id){
      this.user.characters = this.user.characters.filter( elem => {
        return elem.id !== id
      })
    }
  }
}
</script>

<template>
   <Load v-if="!user"></Load>
    <div class="profile-wrap" v-else>
      <AccountInfo v-bind:user="user"/>
      <CharactersInfo @deleteCharacter="deleteCharacter" v-bind:characters="user.characters"/>
    </div>
</template>

<style scoped>
.profile-wrap{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>