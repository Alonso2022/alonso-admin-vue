//import { param2Obj } from "@/util/util";

const menus = [
    {
      id: "10",
      label: "主菜单",
      path: "/dashborad",
      icon: "icon-dengji",
      component: "views/wel/index",
      mate: { },
      children: []
    },
    {
      id: "11",
      label: "驾驶舱",
      path: "/dashborad",
      icon: "icon-dengji",
      component: "views/wel/index",
      mate: {},
      children: []
    }
  ];
  
  export const userInfo = {
    admin: {
      userInfo: {
        username: "admin",
        name: "Administrator",
        avatar: "avatar.jpg"
      },
      token: "alonso-header.alonso-payload.alonso-signature",
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
    alonso: {
      userInfo: {
        username: "admin",
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
  };
  
  export default {
    authorization: config => {
      const { reqKey, reqData } = JSON.parse(config.body);
      let result = {
        resCode: "000",
        resDesc: "Success"
      };
      switch (reqKey) {
        case "login":        
          result.resData = userInfo[reqData.username];
          break;
        case "logout":
          break;
      }
      return result;
    }
  };
  