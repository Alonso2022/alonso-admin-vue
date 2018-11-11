<template>
  <div class="hc-contail"
       :class="{'hc--collapse':isCollapse}">
    <div class="hc-header">
      <!-- 顶部导航栏 -->
      <top />
    </div>

    <div class="hc-layout">
      <div class="hc-left">
        <!-- 左侧导航栏 -->
        <sidebar />
      </div>
      <div class="hc-main">
        <!-- 顶部标签卡 -->
        <tags />
        <!-- 主体视图层 -->
        <el-scrollbar style="height:100%">
          <keep-alive>
            <router-view class="hc-view" v-if="$route.meta.keepAlive" />
          </keep-alive>
          <router-view class="hc-view" v-if="!$route.meta.keepAlive" />
        </el-scrollbar>

      </div>
    </div>
    <div class="hc-shade" @click="showCollapse"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tags from './tags'
import top from './top/'
import sidebar from './sidebar/'
import { getScreen, calcDate} from '@/utils/common';
import { validatenull } from '@/utils/validate';
import { getStore } from '@/utils/storage.js';
export default {
  components: {
    top,
    tags,
    sidebar
  },
  name: 'index',
  data () {
    return {
      //刷新token锁
      refreshLock: false,
      //刷新token的时间
      refreshTime: '',
    }
  },
  created () {
    //实时检测刷新token
    // this.refreshToken();
    
  },
  mounted () {
    this.init();
  },
  computed: mapGetters(['isLock', 'isCollapse', 'website','keyCollapse']),
  props: [],
  methods: {
    showCollapse () {
      this.$store.commit("SET_COLLAPSE");
    },
    // 屏幕检测
    init () {
      this.$store.commit('SET_SCREEN', getScreen());
      let _this=this;
      window.onresize = () => {        
        if( getScreen()<=1 && this.isCollapse){
           this.$store.commit("SET_COLLAPSE");
        }
        setTimeout(() => {
          this.$store.commit('SET_SCREEN', getScreen());
          console.log(getScreen());
        }, 0);
      }
    },
    // 实时检测刷新token
    refreshToken () {
      this.refreshTime = setInterval(() => {
        const token = getStore({
          name: 'token',
          debug: true,
        });
        const date = calcDate(token.datetime, new Date().getTime());
        if (validatenull(date)) return;
        if (!(date.seconds >= this.website.tokenTime) && !this.refreshLock) {
          this.refreshLock = true;
          this.$store
            .dispatch('RefeshToken',token)
            .then(() => {
              clearInterval(this.refreshTime);
            })
            .catch(() => {
              this.refreshLock = false;
            });
        }
      }, 3000);
    },
  }
}
</script>