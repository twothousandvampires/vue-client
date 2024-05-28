import { createRouter, createWebHistory } from 'vue-router'
import MainMenu from "../views/main_menu/MainMenu.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainMenu
    },
  ]
})

export default router
