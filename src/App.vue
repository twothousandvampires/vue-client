<script>
  import Request from "./services/AccountService";
  export default {
    data(){
      return{
        auth : !!localStorage.getItem('token'),
        world : !!localStorage.getItem('world')
      }
    },
    mounted() {
    },
    methods:{
      logout(){
        Request.logout().then( r =>{
          localStorage.clear()
          window.location.href = '/'
        })
      },
      to_profile(){
        localStorage.removeItem('world')
        window.location.href = '/'
      }
    },
  }
</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" v-if="!auth">Login</RouterLink>
        <p @click="logout" v-else>Logout</p>
        <p @click="to_profile" v-if="world">Profile</p>
      </nav>
    </div>
  </header>
  <RouterView v-bind:world="this.world" v-bind:auth="this.auth"/>
</template>

<style>
@import '@/assets/base.css';

@font-face {
  font-family: o;
  src: url("@/fonts/manaspc.ttf");
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
  font-family: o;
  font-size: 20px;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
