<script>
  export default {
    data(){
      return{
        name : '',
        email : '',
        password : '',
        c_password : '',
        error_msg : false,
        success_msg : false
      }
    },
    props:{
      login : Boolean
    },
    mounted() {

    },
    methods:{
      auth(e){
        e.preventDefault()
        axios({method:'post', url : '//127.0.0.1:8000/api/login',data:{
          email : this.email,
          password : this.password
          }}).then((response)=>{
          if(response.data.success) {
            localStorage.setItem('auth' , 'true')
            localStorage.setItem('token' , response.data.data.token)
            localStorage.setItem('user_id', response.data.data.id)
            location.href = '/'
          }
          else{
            this.error_msg = response.data.message
          }
        })
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
      goToRegistration(e){
        e.preventDefault()
        location.href = '/registration'
      },
      goToLogin(e){
        e.preventDefault()
        location.href = '/'
      },
      clear(){
        this.password = ''
        this.name = ''
        this.c_password = ''
        this.email = ''
      },
      registration(e){
        e.preventDefault()
        axios({method:'post', url : '//127.0.0.1:8000/api/register', data: {
            name : this.name,
            email : this.email,
            password : this.password,
            c_password : this.c_password
          }}).then((response)=>{
          if(response.data.success) {
            this.success_msg = response.data.message
            this.clear()
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

      <input v-if="!login" @input="inputName" v-bind:value="name" class="input" type="text" placeholder="name">

      <input @input="inputLogin" v-bind:value="email" class="input" type="text" placeholder="email">
      <input @input="inputPass" v-bind:value="password" class="input" type="text" placeholder="password">

      <input v-if="!login" @input="inputCpass" v-bind:value="c_password" class="input" type="text" placeholder="retype password">

      <button v-if="login" @click="auth" class="btn" >Login in</button>
      <button v-if="login" @click="goToRegistration" class="btn" >Registration</button>


      <button v-if="!login" @click="registration" class="btn">Registration</button>
      <button v-if="!login" @click="goToLogin" class="btn">Go to login</button>


      <p v-if="error_msg">{{ error_msg }}</p>
      <p v-if="success_msg">{{ success_msg }}</p>
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
  p{
    text-align: center;
    color: red;
  }
</style>