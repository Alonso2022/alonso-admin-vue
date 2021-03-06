import { validatenull } from "./validate";

/**
 * 得到屏幕大小
 */
export const getScreen = () => {
  //var width = window.screen.width;
  var width = document.body.clientWidth;
  if (width >= 1200) {
    return 3; //大屏幕
  } else if (width >= 992) {
    return 2; //中屏幕
  } else if (width >= 768) {
    return 1; //小屏幕
  } else {
    return 0; //超小屏幕
  }
};

/**
 * 设置灰度模式
 */
export const toggleGrayMode = status => {
  if (status) {
    document.body.className = document.body.className + " grayMode";
  } else {
    document.body.className = document.body.className.replace(" grayMode", "");
  }
};

/**
 * 设置主题
 */
export const setTheme = name => {
  document.body.className = name;
};

/**
 * 浏览器全屏切换
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen();
  } else {
    reqFullScreen();
  }
};

/**
 * esc 监听全屏
 */
export const listenfullscreen = callback => {
  function listen() {
    callback();
  }
  document.addEventListener("fullscreenchange", function() {
    listen();
  });
  document.addEventListener("mozfullscreenchange", function() {
    listen();
  });
  document.addEventListener("webkitfullscreenchange", function() {
    listen();
  });
  document.addEventListener("msfullscreenchange", function() {
    listen();
  });
};

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen =
    document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen;
  return isFullscreen;
};

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen();
  }
};

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen();
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen();
  }
};

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length != 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id == id) {
          return menu[i];
        } else {
          if (menu[i].children[j].children.length != 0) {
            return findParent(menu[i].children[j].children, id);
          }
        }
      }
    }
  }
};

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  const head = document.getElementsByTagName("head")[0];
  head.appendChild(link);
};

/**
 * 判断路由是否相等
 */
export const isObjectValueEqual = (a, b) => {
  let result = true;
  Object.keys(a).forEach(ele => {
    const type = typeof a[ele];
    if (type === "string" && a[ele] !== b[ele]) result = false;
    else if (
      type === "object" &&
      JSON.stringify(a[ele]) !== JSON.stringify(b[ele])
    )
      result = false;
  });
  return result;
};



/**
 * 根据字典的value显示label
 */
export const findByvalue = (dic, value) => {
  let result = "";
  if (validatenull(dic)) return value;
  if (
    typeof value == "string" ||
    typeof value == "number" ||
    typeof value == "boolean"
  ) {
    let index = 0;
    index = findArray(dic, value);
    if (index != -1) {
      result = dic[index].label;
    } else {
      result = value;
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach(ele => {
      index = findArray(dic, ele);
      if (index != -1) {
        result.push(dic[index].label);
      } else {
        result.push(value);
      }
    });
    result = result.toString();
  }
  return result;
};

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value == value) {
      return i;
    }
  }
  return -1;
};

/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = "";
  random = Math.ceil(Math.random() * 100000000000000)
    .toString()
    .substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
};

/**
 * 打开小窗口
 */
export const openWindow = (url, title, w, h) => {
  // Fixes dual-screen position                            Most browsers       Firefox
  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : screen.left;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : screen.top;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const left = width / 2 - w / 2 + dualScreenLeft;
  const top = height / 2 - h / 2 + dualScreenTop;
  const newWindow = window.open(
    url,
    title,
    "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=" +
      w +
      ", height=" +
      h +
      ", top=" +
      top +
      ", left=" +
      left
  );

  // Puts focus on the newWindow
  if (window.focus) {
    newWindow.focus();
  }
};

export const calcDate = (date1, date2) => {
  var date3 = date2 - date1;

  var days = Math.floor(date3 / (24 * 3600 * 1000))

  var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数  
  var hours = Math.floor(leave1 / (3600 * 1000))

  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数  
  var minutes = Math.floor(leave2 / (60 * 1000))

  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数  
  var seconds = Math.round(date3 / 1000)
  return {
      leave1,
      leave2,
      leave3,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
  }
}