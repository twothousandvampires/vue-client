<script>
import AccountInfo from "./AccountInfo.vue";
import CharactersInfo from "./CharactersInfo.vue";
import Load from '../../components/Load.vue'

import {mapActions, mapState} from 'pinia'
import { useUserStore } from "@/stores/user";
import requestService from "../../game/services/requestService";

export default {
  name: "UserMainInfo.vue",
  components:{
    AccountInfo,
    CharactersInfo,
    Load
  },
  async mounted() {
    let data = await requestService.serverRequest('user')
    this.setUser(data.data.user)
  }
  ,methods:{
    ...mapActions(useUserStore, ['setUser']),
  },
  computed: {
    ...mapState(useUserStore,['user'])
  },
}
</script>

<template>
   <Load v-if="!this.user.name"></Load>
   <div v-else class="profile-wrap">
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
  position: fixed;
}
</style>