import Vue from 'vue';
import VueRouter from 'vue-router';
import MainView from './../views/MainView'
import NameCard from '../views/NameCard'

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: 'Your name',
    components: { default: NameCard }
  },
  {
    path: '/tasks',
    name: 'Your tasks',
    components: { default: MainView }
  },
  {
    path: '/*',
    component: 404
    },
]

const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

export default router;