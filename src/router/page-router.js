import Layout from "@/pages/layout/index";
export default [
  {
    path: "/login",
    name: "登录页",
    component: () =>
      import(/* webpackChunkName: "page" */ "@/pages/login/index"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: "/",
    name: "主页",
    redirect: "/wel"
  },
  {
    path: "/wel",
    component: Layout,
    redirect: "/wel/index",
    children: [
      {
        path: "index",
        name: "首页",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/wel/index")
      }
    ]
  },
  {
    path: "/lock",
    name: "锁屏页",
    component: () =>
      import(/* webpackChunkName: "page" */ "@/pages/lock/index"),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: "/myiframe",
    component: Layout,
    redirect: "/myiframe",
    children: [
      {
        path: ":routerPath",
        name: "iframe",
        component: () =>
          import(/* webpackChunkName: "components" */ "@/components/iframe/index"),
        props: true
      }
    ]
  },
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        name: "关于",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/about/index")
      }
    ]
  },
  {
    path: "/home",
    component: Layout,
    redirect: "/home/index",
    children: [
      {
        path: "index",
        name: "首页",
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/Home")
      }
    ]
  }
];
