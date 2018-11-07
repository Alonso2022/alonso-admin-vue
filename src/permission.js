import router from "@/router/router";
import store from "@/store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/cookie";
NProgress.configure({ showSpinner: false });
const lockPage = store.getters.website.lockPage; //锁屏页

router.beforeEach((to, from, next) => {
  NProgress.start()
  const meta = to.meta || {}
  const token = getToken()

  if (token) {
    if (store.getters.isLock && to.path != lockPage) {
      //当锁屏状态时，禁止路由到其他页面
      next({ path: lockPage })
    } else if (to.path === "/login") {
      next({ path: "/" })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        next()
      } else {
        if (meta.isTab !== false) {
          const value = to.query.src ? to.query.src : to.path;
          const label = to.query.name ? to.query.name : to.name;
          store.commit("ADD_TAG", {
            label: label,
            value: value,
            params: to.params,
            query: to.query
          })
        }
        next()
      }
    }
  } else {
      if (meta.isAuth === false) {
          next()
      } else {
          next('/login')
          NProgress.done()
      }
  }
});

router.afterEach(() => {
  NProgress.done()
//   const title = store.getters.tag.label
//   console.log(title)
//   router.$avueRouter.setTitle(title)
});
