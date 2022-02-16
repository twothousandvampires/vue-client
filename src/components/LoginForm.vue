<script>
  export default {
    data(){
      return{
        login : '',
        password : ''
      }
    },
    methods:{
      auth(e){
        e.preventDefault()
        axios.post('//127.0.0.1:8000/api/login', {
          email : 'admin@gmail.com',
          password : 123
        }).then(function (response){
          if(response.data.success) {
            localStorage.setItem('auth' , 'true')
            localStorage.setItem('token' , response.data.data.token)
            location.href = '/mainmenu'
          }
          else {
            alert('login failed')
          }
        })
      },
      inputLogin(e){
        this.login = e.target.value
      },
      inputPass(e){
        this.password = e.target.value
      }
    }
  }
</script>

<template>
  <div>
    <form>
      <input @input="inputLogin" v-bind:value="login" class="input" type="text">
      <input @input="inputPass" v-bind:value="password" class="input" type="text">
      <button @click="auth" class="btn">Login in</button>
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
  }
</style>