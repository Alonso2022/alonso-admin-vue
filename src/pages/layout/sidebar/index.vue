<template>
  <div class="hc-sidebar">
    <logo></logo>
    <el-scrollbar style="height:100%">
      <el-menu unique-opened
               :default-active="nowTagValue"
               mode="vertical"
               :show-timeout="200"
               
               text-color="rgba(255,255,255,0.7)"
               :collapse="keyCollapse">
        <sidebar-item :menu="menu"
                      :screen="screen"
                      :props="website.menuProps"
                      :collapse="keyCollapse"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import logo from './logo'
import sidebarItem from './sidebarItem' 
export default {
  name: 'sidebar',
  components: { sidebarItem, logo },
  data () {
    return {}
  },
  created () {
    this.$router.$alonsoRouter.formatRoutes(this.menu, true);
  },
  computed: {
    ...mapGetters(['website', 'menu', 'tag', 'keyCollapse', 'screen']),
    nowTagValue: function () { return this.$router.$alonsoRouter.getValue(this.$route) }
  },
  mounted () { },
  methods: {}
}
</script>
<style lang="scss" scoped>
</style>

