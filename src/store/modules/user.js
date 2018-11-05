import { setToken, removeToken } from "@/utils/cookie";
import { setStore, getStore } from "@/utils/storage";
import { isURL } from "@/utils/validate";
import { aesEncryptObj } from "@/utils/crypto";
import webiste from "@/const/website";
import { auth } from "@/api/user";

const reqFrom = "001";

function addPath(ele) {
  const propsConfig = webiste.menu.props;
  const propsDefault = {
    label: propsConfig.label || "label",
    path: propsConfig.path || "path",
    icon: propsConfig.icon || "icon",
    children: propsConfig.children || "children"
  };
  const isChild =
    ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
  if (!isChild) return;
  ele[propsDefault.children].forEach(child => {
    if (!isURL(child[propsDefault.path])) {
      child[propsDefault.path] = `${ele[propsDefault.path]}/${
        child[propsDefault.path] ? child[propsDefault.path] : "index"
      }`;
    }
    addPath(child);
  });
}
const user = {
  state: {
    userInfo: {},
    permission: {},
    roles: [],
    menu: getStore({ name: "menu" }) || [],
    menuAll: [],
    token: getStore({ name: "token" }) || ""
  },
  actions: {
    //根据用户名登录
    LoginByUsername({ commit }, userInfo) {
      const user = aesEncryptObj({
        data: userInfo,
        type: "Aes",
        key: "avue",
        param: ["useranme", "password"]
      });
      return new Promise((resolve, reject) => {
        let reqData = Object.assign({}, webiste.requestConfig, {
          reqKey: "login", //分发接口Key
          reqData: {
            username: userInfo.username,
            password: user.password
          }
        });
        //console.log(reqData);
        auth(reqData)
          .then(res => {
            let data = res.data;
            console.log(data);
            if (data.resCode === "000") {
              let resData = data.resData;
              console.log(resData.token);
              commit("SET_TOKEN", resData.token);
              commit("SET_USERIFNO", resData.userInfo);

              resData.menus.forEach(ele => {
                addPath(ele);
              });
              commit("SET_MENU", resData.menus);
              //commit('SET_MENU', resData.menus);
              commit("SET_ROLES", resData.roles);
              commit("SET_PERMISSION", resData.permission);
              commit("DEL_ALL_TAG");
              commit("CLEAR_LOCK");
              //向Cookie里写入token
              setToken(resData.token);
            }
            resolve({ resCode: data.resCode, resDesc: data.resDesc });
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //刷新token
    RefeshToken({ commit }) {
      return new Promise((resolve, reject) => {
        let reqData = {
          reqData: {},
          reqKey: "refesh-token", //分发接口Key
          reqFrom: reqFrom
        };
        auth(reqData)
          .then(res => {
            let data = res.data;
            if (data.resCode === "000") {
              commit("SET_TOKEN", data.resData.token);
              setToken();
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        let reqData = {
          reqData: {},
          reqKey: "logout", //分发接口Key
          reqFrom: reqFrom
        };
        auth(reqData)
          .then(res => {
            let data = res.data;
            if (data.resCode === "000") {
              //console.log(data);
              commit("SET_TOKEN", "");
              commit("SET_MENU", []);
              commit("SET_ROLES", []);
              commit("DEL_ALL_TAG");
              commit("CLEAR_LOCK");
              removeToken();
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    //注销session
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_MENU", []);
        commit("SET_ROLES", []);
        commit("DEL_ALL_TAG");
        commit("CLEAR_LOCK");
        removeToken();
        resolve();
      });
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore({ name: "token", content: state.token, type: "session" });
    },
    SET_USERIFNO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
      setStore({
        name: "menu",
        content: state.menu,
        type: "session"
      });
    },
    SET_MENU_ALL: (state, menuAll) => {
      state.menuAll = menuAll;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = {};
      permission.forEach(ele => {
        state.permission[ele] = true;
      });
    }
  }
};
export default user;
