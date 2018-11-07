import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "@/router/router";
import store from "@/store";

import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./mock";
import "./permission";
Vue.use(VueRouter);
Vue.use(router);
Vue.use(element);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
