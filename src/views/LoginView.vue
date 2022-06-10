<script>
  import MainLayout from '@/layouts/MainLayout.vue'
  import LoginForm from '@/components/LoginForm.vue';
  export default {
    props :{
      auth : Boolean
    },
    components : {
      MainLayout,
      LoginForm
    },
  }
</script>

<template>
    <LoginForm>

    </LoginForm>
</template>

<style>



</style>