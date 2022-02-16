<script>
import { RouterLink, RouterView } from 'vue-router'
import { useCounterStore} from "./stores/counter";
import test from "./components/test.vue";


export default {
  data(){
    return{
      auth : localStorage.getItem('auth') === 'true',
      num : 145
    }
  },
  components:{
    test
  },
  methods:{
    logout(){
      this.auth = false
    },
    does(){
      this.auth = false
    }
  },
}
</script>

<template>

  <header>
    <div class="wrapper">
      <nav>
        <RouterLink  to="/" v-if="!auth">Login</RouterLink>
        <RouterLink  to="/logout" v-else>Logout</RouterLink>
        <RouterLink to="/canvas">Scoreboard</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView @logout="logout" />

</template>

<style>
@import '@/assets/base.css';

#app {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
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
    padding-right: calc(var(--section-gap) / 2);
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
