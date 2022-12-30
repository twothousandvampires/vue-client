<script>
import AccountInfo from "../components/AccountInfo.vue";
import CharactersInfo from "../components/CharactersInfo.vue";
import Load from '../components/Load.vue'

import { mapActions } from 'pinia'
import { useUserStore } from "@/stores/user";


export default {
  data(){
    return{

    }
  },
  name: "UserMainInfo.vue",
  components:{
    AccountInfo,
    CharactersInfo,
    Load
  },
  created() {
    // userStore.fetchUser()
  },
  mounted() {
    this.fetchUser()
  }
  ,methods:{
    ...mapActions(useUserStore, ['fetchUser']),
    deleteCharacter(id){
      this.user.characters = this.user.characters.filter( elem => {
        return elem.id !== id
      })
    }
  }
}
</script>

<template>
   <Load v-if="false"></Load>
    <div class="profile-wrap" v-else>
      <AccountInfo/>
      <CharactersInfo/>
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