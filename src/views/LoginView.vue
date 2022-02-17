<script>
  import MainLayout from '@/layouts/MainLayout.vue'
  import LoginForm from '@/components/LoginForm.vue';
  export default {
    components : {
      MainLayout,
      LoginForm
    },
  }
</script>

<template>
  <MainLayout>
    <LoginForm v-bind:login="true">

    </LoginForm>
  </MainLayout>
</template>

<style>



</style>