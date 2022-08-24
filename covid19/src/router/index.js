import Vue from 'vue';
import VueRouter from 'vue-router';
import DetailCountry from '../components/DetailCountry.vue'

Vue.use(VueRouter)
const routes = [
    {
      path: '/',
      name: 'DetailCountry',
      props: true,
      component: DetailCountry,
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router