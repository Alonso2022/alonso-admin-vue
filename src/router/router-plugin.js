let RouterPlugin = function() {
  this.$router = null;
  this.$store = null;
};

RouterPlugin.install = function(router, store) {
  this.$router = router;
  this.$store = store;
  //form post参数形式 转成 get参数形式
  function objToform(obj) {
    let result = [];
    Object.keys(obj).forEach(ele => {
      result.push(`${ele}=${obj[ele]}`);
    });
    return result.join("&");
  }
  this.$router.$alonsoRouter = {
    //全局配置
    $website: this.$store.getters.website,
    safe: this,

    // 设置标题
    setTitle: title => {
      title = title ? `${title} — ALONSO 后台管理模板` : "ALONSO 后台管理模板";
      document.title = title;
    },

    //新建标签
    addTag: tagOptions => {
      const options = Object.assign(
        {},
        {
          label: "", //标签名称
          value: "", //标签的路径
          params: "", //标签的路径参数
          query: "" //标签的参数
        },
        tagOptions
      );
      this.$store.commit("ADD_TAG", options);
    },

    //关闭标签
    closeTag: value => {
      const tag = value || this.$store.getters.tag;
      this.$store.commit("DEL_TAG", tag);
    },

    //处理路由
    getPath: params => {
      let { src } = params;
      let result = src || "/";
      if (src.includes("http") || src.includes("https")) {
        result = `/myiframe/urlPath?${objToform(params)}`;
      }
      return result;
    },

    //正则处理路由
    vaildPath: (list, path) => {
      let result = false;
      list.forEach(ele => {
        if (new RegExp("^" + ele + ".*", "g").test(path)) {
          result = true;
        }
      });
      return result;
    },

    //设置路由值
    getValue: route => {
      let value = "";
      if (route.query.src) {
        value = route.query.src;
      } else {
        value = route.path;
      }
      return value;
    },

    //动态路由
    formatRoutes: function(aMenu, first) {
      if (!aMenu || aMenu.length == 0) return;

      const aRouter = [];
      const propsConfig = this.$website.menuProps;

      const propsDefault = {
        label: propsConfig.label || "label",
        path: propsConfig.path || "path",
        icon: propsConfig.icon || "icon",
        children: propsConfig.children || "children"
      };

      aMenu.forEach(oMenu => {
        const path = oMenu[propsDefault.path],
          component = oMenu.component,
          name = oMenu[propsDefault.label],
          icon = oMenu[propsDefault.icon],
          children = oMenu[propsDefault.children],
          meta=oMenu['meta'];

        const isChild = children.length !== 0;
        const oRouter = {
          path: path,
          component(resolve) {
            // 判断是否为首路由
            if (first) {
              require(["../pages/layout/index"], resolve);
              return;
              // 判断是否为多层路由
            } else if (isChild && !first) {
              require(["../pages/layout/empty-layout"], resolve);
              return;
              // 判断是否为最终的页面视图
            } else {
              require([`../${component}.vue`], resolve);
            }
          },
          name: name,
          icon: icon,
          meta: meta,
          redirect: (() => {
            if (!isChild && first) return `${path}/index`;
            else return "";
          })(),
          // 处理是否为一级路由
          children: !isChild
            ? (() => {
                if (first) {
                  oMenu[propsDefault.path] = `${path}/index`;
                  return [
                    {
                      component(resolve) {
                        require([`../${component}.vue`], resolve);
                      },
                      icon: icon,
                      name: name,
                      path: "index"
                    }
                  ];
                }
                return [];
              })()
            : (() => {
                return this.formatRoutes(children, false);
              })()
        };
        aRouter.push(oRouter);
      });

      if (first) {
        this.safe.$router.addRoutes(aRouter);
      } else {
        return aRouter;
      }
    }
  };
};
export default RouterPlugin;
