import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "@/router/router";
import store from "@/store";

import rootContainer from './components/root-container/index'

import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/styles/common.scss';


import "./mock";
import './error'; 

import "./permission";

Vue.use(VueRouter);
Vue.use(router);
Vue.use(element);








//注册全局容器
Vue.component('rootContainer', rootContainer)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
