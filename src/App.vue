<script>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore} from "./stores/counter";
import test from "./components/test.vue";

export default {
  data(){
    return{
      auth : localStorage.getItem('auth') === 'true',
      acc_name : localStorage.getItem('acc_name')
    }
  },
  components:{
    test,
  },
  mounted() {
    let test =[]

    function search(needle, arr){
      let start = Date.now()
      let result
      for(let i = 0; i < arr.length - 1; i++){
        if(needle === arr[i]){
          result = arr[i]
          break
        }
      }
      console.log(Date.now() - start)
      console.log(result)
    }

    function binarySearch(item, list){
      let start = 0
      let end = list.length - 1

      while (start <= end){
        let mid = Math.floor((start + end) /2)
        let quess = list[mid]

        if(quess === item){
          return mid
        }
        else if(item > list[mid]){
          start = mid + 1
        }
        else{
          end = mid -1
        }
      }
    }

    for(let i = 0; i < 1000000; i++){
      test.push(i)
    }

    console.log(binarySearch(452525, test))

  },
  methods:{
    logout(){
      this.auth = false
    },
  },
}
</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <RouterLink  to="/" v-if="!auth">Login</RouterLink>
        <RouterLink  to="/" v-if="auth">Profile</RouterLink>
        <RouterLink  to="/logout" v-if="auth">Logout</RouterLink>
        <RouterLink to="/canvas">Scoreboard</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView @logout="logout" />

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
