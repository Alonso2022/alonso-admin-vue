<template>
  <div class="hc-top">
    <div class="top-bar__left">
      <div class="hc-breadcrumb" v-if="showCollapse">
           <i class="iconfont icon-menu hc-breadcrumb_collapse"
           :class="[{ 'hc-breadcrumb_collapse--right': isCollapse }]"
           @click="setCollapse"></i>
      </div>
    </div>
    <h1 class="top-bar__title">
      <div class="top-bar__item top-bar__item--show"
           v-if="showMenu">
        <top-menu></top-menu>
      </div>
      <span class="top-bar__item" v-if="showSearch">
        <top-search></top-search>
      </span>
    </h1>
    <div class="top-bar__right">
      <el-tooltip v-if="showColor"
                  effect="dark"
                  content="主题色"
                  placement="bottom">
        <div class="top-bar__item">
          <top-color></top-color>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showDebug"
                  effect="dark"
                  :content="logsFlag?'没有错误日志':`${logsLen}条错误日志`"
                  placement="bottom">
        <div class="top-bar__item">
          <top-logs></top-logs>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showLock"
                  effect="dark"
                  content="锁屏"
                  placement="bottom">
        <div class="top-bar__item">
          <top-lock></top-lock>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showTheme"
                  effect="dark"
                  content="特色主题"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-theme></top-theme>
        </div>
      </el-tooltip>
           <el-tooltip v-if="showTheme"
                  effect="dark"
                  content="打开引导页"
                  placement="bottom">
        <div class="top-bar__item top-bar__item--show">
          <top-info></top-info>
        </div>
      </el-tooltip>
      <el-tooltip v-if="showFullScren" effect="dark" :content="isFullScren?'退出全屏':'全屏'" placement="bottom">
        <div class="top-bar__item">
          <i class="iconfont" :class="isFullScren?'icon-tuichuquanping':'icon-quanping'" @click="handleScreen"></i>
        </div>
      </el-tooltip>
      <el-tooltip effect="dark" content="用户头像" placement="bottom">
        <div class="top-bar__item" style="margin-right:0px">
        <img class="top-bar__img" :src="getAvatar(userInfo.avatar)">
        </div>
      </el-tooltip>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/info/index">个人信息</router-link>
          </el-dropdown-item>

          <el-dropdown-item @click.native="logout"
                            divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-setting></top-setting>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { fullscreenToggel, listenfullscreen } from "@/utils/common";
import topLock from "./top-lock";
import topMenu from "./top-menu";
import topSearch from './top-search';
import topBreadcrumb from "./top-breadcrumb";
import topColor from "./top-color";
import topTheme from "./top-theme";
import topLogs from "./top-logs";
import topSetting from "./top-setting";
import topInfo from "./top-info";
export default {
  components: { topLock, topMenu, topSearch, topBreadcrumb, topColor, topTheme, topLogs, topSetting,topInfo },
  name: "top",
  data () {
    return {
      baseUrl: process.env.BASE_URL
    };
  },
  filters: {},
  created () { },
  mounted () {
    listenfullscreen(this.setScreen);
  },
  computed: {
    ...mapState({
      showDebug: state => state.common.showDebug,
      showColor: state => state.common.showColor,
      showTheme: state => state.common.showTheme,
      showLock: state => state.common.showLock,
      showFullScren: state => state.common.showFullScren,
      showCollapse: state => state.common.showCollapse,
      showSearch: state => state.common.showSearch,
      showMenu: state => state.common.showMenu
    }),
    ...mapGetters([
      "userInfo",
      "isFullScren",
      "tagWel",
      "tagList",
      "isCollapse",
      "tag",
      "logsLen",
      "logsFlag"
    ]),
    imgPath: function() {    
      return `${this.baseUrl}`;
    }
  },
  methods: {
    getAvatar:function(path){      
      if(path)
      {
        return path.startsWith('http')?path: this.imgPath+'img/'+path
      }
      
    },
    handleScreen () {
      fullscreenToggel();
    },
    setCollapse () {
      this.$store.commit("SET_COLLAPSE");
    },
    setScreen () {
      this.$store.commit("SET_FULLSCREN");
    },
    logout () {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

