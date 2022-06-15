import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainMenu from "../views/MainMenu.vue";
import World from "../views/Game.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainMenu
    },
    {
      path: '/game',
      name: 'game',
      component: World
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
  ]
})

export default router
