<template>
  <div class="top-menu">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <template v-for="(item,index) in items">   
        <el-menu-item :index="index+''" @click.native="openMenu(item)" :key="index">
          <i :class="item.icon"></i>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "top-menu",
  data() {
    return {
      activeIndex: "-1",
      items: [
        {
          id: 0,
          icon: "iconfont icon-welcome",
          label: "首页",
          value: "/wel/index",
          params: {},
          query: {},
          close: false
        },
        {
          id: 1,
          icon: "iconfont icon-help",
          label: "帮助",
          value: "/about/index",
          params: {},
          query: {},
          close: false
        },
        {
          id: 2,
          label: "关于",
          icon: "iconfont icon-about",
          value: "/about/index",
          params: {},
          query: { },
          close: false
        }
      ]
    };
  },
  created() {},
  computed: {
    ...mapGetters(["tagCurrent", "menu"])
  },
  methods: {
    openMenu(item) {
      this.$router.push({
        path: this.$router.$alonsoRouter.getPath({
          name: item.label,
          src: item.value
        }),
        query: item.query
      })

      
    }
  }
};
</script>