import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LoginSuccess from '../views/MainMenu.vue'
import MainMenu from "../views/MainMenu.vue";
import LogoutView from "../views/LogoutView.vue";
import Registration from "../views/Registration.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/mainmenu',
      name: 'mainmenu',
      component: MainMenu
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
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
