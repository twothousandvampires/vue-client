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
    {
      path: '/canvas',
      name: 'canvas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GameCanvas.vue')
    }
  ]
})

export default router
