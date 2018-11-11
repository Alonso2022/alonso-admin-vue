//import { param2Obj } from "@/utils/common";

const menus = [

  {
    id: "10",
    label: "主菜单",
    path: "/wel",
    icon: "el-icon-menu",
    component: "views/wel/index",
    meta: {},
    children: [
      {
        id: "111",
        label: "驾驶舱",
        path: "a",
        icon: "el-icon-setting",
        component: "views/dashborad/index",
        meta: { title:"驾驶舱-1" },
        children: []
      },
      {
        id: "112",
        label: "首页",
        path: "b",
        icon: "el-icon-setting",
        component: "views/home/index",
        meta: {},
        children: []
      }

    ]
  },
  {
    id: "113",
    label: "欢迎页",
    path: "/dashborad",
    icon: "el-icon-setting",
    component: "views/wel/index",
    meta: {},
    children: [
      {
        id: "114",
        label: "欢迎页",
        path: "c",
        icon: "el-icon-setting",
        component: "views/home/index",
        meta: {},
        children: []
      }

    ]
  }
  
];

export const users = [
  {
    username: "admin",
    userInfo: {
      username: "admin",
      name: "Administrator",
      avatar: "avatar.jpg"
    },
    token: "admin-header.admin-payload.admin-signature",
    menus: menus,
    roles: ["admin"],
    permission: [
      "sys_crud_btn_add",
      "sys_crud_btn_export",
      "sys_menu_btn_add",
      "sys_menu_btn_edit",
      "sys_menu_btn_del",
      "sys_role_btn1",
      "sys_role_btn2",
      "sys_role_btn3",
      "sys_role_btn4",
      "sys_role_btn5",
      "sys_role_btn6"
    ]
  },
  {
    username: "alonso",
    userInfo: {
      username: "alonso",
      name: "Alonso",
      avatar: "avatar.jpg"
    },
    token: "alonso-header.alonso-payload.alonso-signature",
    menus: menus,
    roles: ["editor"],
    permission: [
      "sys_crud_btn_add",
      "sys_crud_btn_export",
      "sys_menu_btn_add",
      "sys_menu_btn_edit",
      "sys_menu_btn_del"
    ]
  }
];

function login(reqData) {
  let result;
  let resData;
  let { username } = reqData;
  
  users.some(function(item, index, array) {
    if (item.username === username) {
      resData = array[index];
    }
    return item.username === username
  });

  

  if (resData) {
    result = {
      resCode: "000",
      resDesc: "Success",
      resData: resData
    };
  } else {
    result = {
      resCode: "001",
      resDesc: "没有找到指定用户，用户不存在",
      resData: null
    };
  }
  return result;
}

function logout() {
  return {
    resCode: "000",
    resDesc: "Success",
    resData: null
  };
}

function getUserInfo(reqData) {
  let result;
  let resData;
  let { token } = reqData;
  users.some(function(item, index, array) {
    if (item.token === token) {
      resData = array[index].userInfo;
      return false;
    }
  });
  if (resData) {
    result = {
      resCode: "000",
      resDesc: "Success",
      resData: resData
    };
  } else {
    result = {
      resCode: "001",
      resDesc: "用户登录过期，需重新登录",
      resData: null
    };
  }

  return result;
}

function refeshToken(reqData) {
  let { token } = reqData;
  return {
    resCode: "000",
    resDesc: "Success",
    resData: token
  };
}

export default {
  authorization: config => {
    const { reqKey, reqData } = JSON.parse(config.body);
    if (reqKey === "login") {
      return login(reqData);
    } else if (reqKey === "logout") {
      return logout(reqData);
    } else if (reqKey === "refesh-token") {
      return refeshToken(reqData);
    } else if (reqKey === "user-info") {
      return getUserInfo(reqData);
    }
  }
};
