<script>
  import NotLogin from "@/components/NotLogin.vue";
  import MainLayout from '@/layouts/MainLayout.vue'
  import LoginView from "./LoginView.vue";
  import Profile from "./Profile.vue";

  export default {
    props : {
      auth : Boolean
    },
    components : {
      LoginView,
      NotLogin,
      MainLayout,
      Profile
    },
    methods:{

    },
    mounted() {
      console.log(this.auth)
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