<script>
  import NotLogin from "@/components/NotLogin.vue";
  import MainLayout from '@/layouts/MainLayout.vue'
  import LoginView from "./LoginView.vue";
  import Profile from "./Profile.vue";

  export default {
    data(){
      return{
        auth : localStorage.getItem('auth') === 'true'
      }
    },
    components : {
      LoginView,
      NotLogin,
      MainLayout,
      Profile
    },
    methods:{

    }
  }
</script>

<template>
  <MainLayout>
    <Profile v-if="auth"/>
    <LoginView v-else />
  </MainLayout>
</template>

<style>

</style>