<script>
import AccountInfo from "../components/AccountInfo.vue";
import CharactersInfo from "../components/CharactersInfo.vue";
export default {
  data(){
    return{
      user : undefined,
    }
  },
  name: "UserMainInfo.vue",
  components:{
    AccountInfo,
    CharactersInfo
  },
  mounted() {
    this.getUser()
  }
  ,methods:{
    async getUser(){
      try{
        await axios({method:'get', url : '//127.0.0.1:8000/api/user/' + localStorage.getItem('user_id'),
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          }
        }).then((response) => {
          console.log(response)
          this.user = response.data.data
        })
      }
      catch(e){
        localStorage.clear()
        window.location = '/'
      }
    }
  }
}
</script>


<template>
  <p v-if="!user">Loading...</p>
  <div class="profile-wrap" v-else>
    <AccountInfo v-bind:user="user"/>
    <CharactersInfo v-bind:characters="user.characters"/>
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