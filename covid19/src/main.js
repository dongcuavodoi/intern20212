import Vue from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import './scss/app.scss';
Vue.config.productionTip = false;

Vue.use(Antd);


/* eslint-disable no-new */
new Vue({
  render: h => h(App),
}).$mount('#app')