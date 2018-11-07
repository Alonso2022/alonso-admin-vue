/**
 * 路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import VueRouter from 'vue-router'
import Store from '@/store/'
import PageRouter from './page-router'
import RouterPlugin from './router-plugin'



let Router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          if (from.meta.keepAlive) {
              from.meta.savedPosition = document.body.scrollTop;
          }
          return {
              x: 0,
              y: to.meta.savedPosition || 0
          }
      }
  },
  routes: []
});

RouterPlugin.install(Router, Store);
Router.$alonsoRouter.formatRoutes(Store.state.user.menu, true);
Router.addRoutes([...PageRouter]);
export default Router;

