<script>
import CharacterService from "./views/game/services/requestService";
import config from "../config.js";
import MainMenu from "./views/main_menu/MainMenu.vue";

export default {
  data(){
    return{
      auth : !!localStorage.getItem('token'),
      world : !!localStorage.getItem('world'),
      config
    }
  },
  components: {
    MainMenu
  },
  mounted() {
    
  },
  methods:{
    logout(){
      CharacterService.serverRequest('logout').then( r =>{
        localStorage.clear()
        window.location.href = './'
      })
    },
    to_profile(){
      localStorage.removeItem('world')
      localStorage.removeItem('char_id')
      window.location.href = './'
    }
  },
}
</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <p @click="logout" v-if="auth">Logout</p>
        <p @click="to_profile" v-if="world">Profile</p>
      </nav>
    </div>
  </header>
  <div style="display: flex; flex-direction: column;">
      <img :src="config.img_link('toptest.png')" width="1320" height="60" alt="">
      <div style="display: flex; flex-direction: row;">
        <img :src="config.img_link('lefttest.png')" width="60" height="800" alt="">

          <MainMenu v-bind:world="this.world" v-bind:auth="this.auth"/>

        <img :src="config.img_link('rigthtest.png')" width="60" height="800" alt="">
      </div>
      <img :src="config.img_link('bottomtest.png')" width="1320" height="60" alt="">
  </div>
</template>

<style>
@import '@/assets/base.css';

@font-face {
  font-family: o;
  src: url("@/fonts/manaspc.ttf");
}
#inspect_passive_wrap, #inspect_skill_wrap{
  position: fixed;
  z-index: 100000;
  padding: 4px;
  background-color: #00994d;
  border: 3px solid #5cd65c;
}
.item-context{
  font-family: o;
  z-index: 100000;
  position: fixed;
  padding: 10px;
  background-color: white;
  color:#181818;
}
.item-context p{
  cursor: pointer;
}
.options_modal{
  padding: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  z-index: 99999;
  border: 3px solid  #5cd65c;
  background-color: #00994d;
}
.options_modal .title{
  text-align: center;
  font-size: 25px;
  color: #222222;
}
.options_modal .options{
  display: flex;
  flex-direction: row;
}

.options_modal .options div{
  padding: 6px;
  cursor: pointer;
  color: black;
}

.options_modal .options div:hover{
  color: #1a651a;
}

.game-modal{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: fit-content;
  font-size: 12px;
  color: black;
  background-color: transparent;
  position: absolute;
}

.modal{
  font-family: o;
  position: fixed;
  color: white;
  font-size: 18px;
  padding: 4px;
  z-index: 100;
}
#app {
  background-color: black;
  font-family: o;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  font-weight: normal;
}

header {
  top: 40px;
  align-items: center;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content:center;
  position: fixed;
  line-height: 1.5;
  width: 100%;
  z-index: 9999;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  transition: 0.4s;
  color: #c8c8c8;
}

@media (hover: hover) {
  a:hover {
    background-color: #969696;
  }
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body {

  }

  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
