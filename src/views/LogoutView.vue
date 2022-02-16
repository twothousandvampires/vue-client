<script>
import MainLayout from '@/layouts/MainLayout.vue'
export default {
  components : {
    MainLayout
  },
  data(){
    return{
      isLogout : false
    }
  },
  name: "LogoutView",
  mounted() {
    axios({method: 'post', url: '//127.0.0.1:8000/api/logout', headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }})
        .then( (response)=>{
          if(response){
            localStorage.clear()
            this.$emit('logout');
            this.isLogout = true
          }
        })
  }
}
</script>

<template>
  <MainLayout>
    <h1 v-if="isLogout">You have been logout, <a href="/">return</a></h1>
    <h1 v-else>Logout...</h1>
  </MainLayout>
</template>


<style scoped>

</style>