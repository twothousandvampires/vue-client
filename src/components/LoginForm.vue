<script>
  export default {
    data(){
      return{
        email : '',
        password : '',
        error_msg : false
      }
    },
    props:{
      login : Boolean
    },
    mounted() {
      console.log(this.login)
    },
    methods:{
      auth(e){
        e.preventDefault()
        axios({method:'post', url : '//127.0.0.1:8000/api/login',headers:{}}).then((response)=>{
          if(response.data.success) {
            localStorage.setItem('auth' , 'true')
            localStorage.setItem('token' , response.data.data.token)
            location.href = '/mainmenu'
          }
          else{
            this.error_msg = response.data.message
          }
        })
      },
      inputLogin(e){
        this.email = e.target.value
      },
      inputPass(e){
        this.password = e.target.value
      },
      goToRegistration(e){
        e.preventDefault()
        location.href = '/registration'
      },
      registration(e){
        e.preventDefault()
        axios({method:'post', url : '//127.0.0.1:8000/api/register',headers:{}}).then((response)=>{
          if(response.data.success) {
            localStorage.setItem('auth' , 'true')
            localStorage.setItem('token' , response.data.data.token)
            location.href = '/mainmenu'
          }
          else{
            this.error_msg = response.data.message
          }
        })
      }
    }
  }
</script>

<template>
  <div>
    <form>
      <input @input="inputLogin" v-bind:value="email" class="input" type="text">
      <input @input="inputPass" v-bind:value="password" class="input" type="text">
      <button v-if="login" @click="auth" class="btn" >Login in</button>
      <button v-if="login" @click="goToRegistration" class="btn" >Registration</button>

      <button v-if="!login" @click="registration">Registration</button>

      <p v-if="error_msg">{{ error_msg }}</p>
    </form>
  </div>
</template>

<style>
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
  p{
    text-align: center;
    color: darkred;
  }
</style>