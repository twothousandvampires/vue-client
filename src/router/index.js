import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/main_menu/components/LoginView.vue'
import MainMenu from "../views/main_menu/MainMenu.vue";
import World from "../views/game/Game.vue";

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
  ]
})

export default router
