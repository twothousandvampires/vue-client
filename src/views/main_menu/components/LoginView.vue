<script>
import requestService from "../../game/services/requestService";

export default {
  data(){
    return{
      name : '',
      password : '',
      c_password : '',
      error_msg : false,
      success_msg : false,
      login_form : true,
      start: false
    }
  },
  mounted() {

  },
  methods:{
    async auth(){
      let res = await requestService.serverRequest('login', { name: this.name, password: this.password })
      if(res.success) {
        localStorage.setItem('token' , res.data.token)
        location.href = '/'
      }
      else{
        this.error_msg = res.data.message
      }
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
    startGame(){
      this.start = true
      this.$refs.audio.volume = 0.3
      this.$refs.audio.play()
    },
    clear(){
      this.error_msg = ''
      this.success_msg = ''
      this.password = ''
      this.name = ''
      this.c_password = ''
    },
    async registration() {
      let res = await requestService.serverRequest('registration', {
                name : this.name,
                password : this.password,
                c_password : this.c_password
      })
      if(res.success){
        this.clear()
        this.success_msg = res.message
      }
      else{
        this.error_msg = res.message
      }
    }
  },
}
</script>
<template>
  <div>
    <audio ref="audio" src="./src/assets/music/To Call Upon the Fog.mp3"></audio>
    <div>
      <img src="/assets/img/main.gif" alt="">
    </div>
    <div id="form-wrap" style="min-height: 200px">
      <div id="start" v-show="!this.start">
        <p @click="startGame">Click to start</p>
      </div>
      <form v-show="this.start">
        <input @input="inputName" v-bind:value="name" class="input" type="text" placeholder="name">
        <input @input="inputPass" v-bind:value="password" class="input" type="text" placeholder="password">

        <input v-if="!login_form" @input="inputCpass" v-bind:value="c_password" class="input" type="text" placeholder="retype password">

        <button v-if="login_form" @click.prevent="auth" class="btn" >Login in</button>
        <button v-if="!login_form" @click.prevent="registration" class="btn" >Registration</button>
        <button @click.prevent="switchForm" class="btn" >{{ !this.login_form ? 'Go to login' : 'Go to registration' }}</button>

        <p v-if="error_msg">{{ error_msg }}</p>
        <p style="color: green" v-if="success_msg">{{ success_msg }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
  #form-wrap{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #start{
    cursor: pointer;
    color: white;
    text-align: center;
  }
  form{
    width: 250px;
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