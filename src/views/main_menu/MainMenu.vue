<script>
  import MainLayout from '@/layouts/MainLayout.vue'
  import LoginView from "./components/LoginView.vue";
  import Profile from "./components/Profile.vue";
  import Game from "@/views/game/Game.vue";

  export default {
    props : {
      auth : Boolean,
      world: Boolean
    },
    components : {
      LoginView,
      MainLayout,
      Profile,
      Game
    },
  }
</script>

<template>
  <MainLayout>
    <Game v-if="world"></Game>
    <Profile v-else-if="auth"/>
    <LoginView v-else />
  </MainLayout>
</template>

<style>

</style>