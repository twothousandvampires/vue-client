<script>
import Request from "../script/Request";
export default {
  data(){
    return{
      name : '',
      email : '',
      password : '',
      c_password : '',
      error_msg : false,
      success_msg : false,
      login_form : true
    }
  },
  mounted() {

  },
  methods:{
    async auth(){
      let ApiResponse = await Request.login(this.email, this.password)
      if(ApiResponse.data.success) {
        localStorage.setItem('token' , ApiResponse.data.data.token)
        location.href = '/'
      }
      else{
        this.error_msg = ApiResponse.data.message
      }
    },
    inputLogin(e){
      this.email = e.target.value
    },
    inputName(e){
      this.name = e.target.value
    },
    inputCpass(e){
      this.c_password = e.target.value
    },
    inputPass(e){
      this.password = e.target.value
    },
    switchForm(){
      this.login_form = !this.login_form
    },
    clear(){
      this.error_msg = ''
      this.success_msg = ''
      this.password = ''
      this.name = ''
      this.c_password = ''
      this.email = ''
    },
    async registration() {
      let ApiResponse = await Request.registration(this.name, this.email, this.password, this.c_password)
      if (ApiResponse.data.success) {
        this.clear()
        this.success_msg = ApiResponse.data.message
      } else {
        this.error_msg = ApiResponse.data.message
      }
    }
  },
}
</script>
<template>
  <div>
    <form>
      <input v-if="!login_form" @input="inputName" v-bind:value="name" class="input" type="text" placeholder="name">

      <input @input="inputLogin" v-bind:value="email" class="input" type="text" placeholder="email">
      <input @input="inputPass" v-bind:value="password" class="input" type="text" placeholder="password">

      <input v-if="!login_form" @input="inputCpass" v-bind:value="c_password" class="input" type="text" placeholder="retype password">

      <button v-if="login_form" @click.prevent="auth" class="btn" >Login in</button>
      <button v-if="!login_form" @click.prevent="registration" class="btn" >Registration</button>
      <button @click.prevent="switchForm" class="btn" >{{ !this.login_form ? 'Go to login' : 'Go to registration' }}</button>

      <p v-if="error_msg">{{ error_msg }}</p>
      <p style="color: green" v-if="success_msg">{{ success_msg }}</p>
    </form>
  </div>
</template>

<style scoped>
  form{
    display: flex;
    flex-direction: column;
  }
  .input{
    margin-bottom: 10px;
  }
  .btn{
    background-color: snow;
    border: 2px solid aqua;
    cursor: pointer;
    margin-bottom: 10px;
  }
</style>