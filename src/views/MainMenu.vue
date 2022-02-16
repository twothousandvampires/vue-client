<script>
  import NotLogin from "@/components/NotLogin.vue";
  import MainLayout from '@/layouts/MainLayout.vue'
  export default {
    data(){
      return{
        auth : localStorage.getItem('auth') === 'true'
      }
    },
    components : {
      NotLogin,
      MainLayout
    },
    methods:{

    }
  }
</script>

<template>
  <MainLayout>
    <h1 v-if="auth">auth</h1>
    <NotLogin v-else />
  </MainLayout>
</template>

<style>

</style>