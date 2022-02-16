<script>
import MainLayout from '@/layouts/MainLayout.vue'
import LoginForm from '@/components/LoginForm.vue';
export default {
  name: "registration.vue",
  components:{
    MainLayout,
    LoginForm
  }
}
</script>

<template>
  <MainLayout>
    <LoginForm v-bind:login="false">

    </LoginForm>
  </MainLayout>
</template>

<style scoped>

</style>