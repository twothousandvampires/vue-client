<script>

  import MainLayout from '@/layouts/MainLayout.vue'
  import LoginView from "./LoginView.vue";
  import Profile from "./Profile.vue";

  export default {
    props : {
      auth : Boolean
    },
    components : {
      LoginView,
      MainLayout,
      Profile
    },
    methods:{

    },
    mounted() {

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