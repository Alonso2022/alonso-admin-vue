<template>
  <div class="menu-wrapper">
    
    <template v-for="item in menu">
      <el-menu-item v-if="validatenull(item[childrenKey]) && vaildRoles(item)" 
                    :index="item[pathKey]"                   
                    :key="item[labelKey]"
                    :class="{'is-active':nowTagValue===item[pathKey]}"
                     @click="open(item)">
        <i :class="item[iconKey]"></i>
        <span slot="title">{{item[labelKey]}}</span>
      </el-menu-item>
      <el-submenu v-else-if="!validatenull(item[childrenKey])&&vaildRoles(item)"
                  :index="item[pathKey]"
                  :key="item[labelKey]">
        <template slot="title">
          <i :class="item[iconKey]"></i>
          <span slot="title" :class="{'el-menu--display':collapse}">{{item[labelKey]}}</span>
        </template>
        <template v-for="(child,cindex) in item[childrenKey]">
          <el-menu-item :index="child[pathKey],cindex"
                        @click="open(child)"
                        :class="{'is-active':nowTagValue===child[pathKey]}"
                        v-if="validatenull(child[childrenKey])"
                        :key="child[labelKey]">
            <i :class="child[iconKey]"></i>
            <span slot="title">{{child[labelKey]}}</span>
          </el-menu-item>
          <sidebar-item v-else
                        :menu="child[childrenKey]"
                        :key="cindex"
                        :props="props"
                        :screen="screen"
                        :collapse="collapse"></sidebar-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatenull } from "@/utils/validate";

export default {
  name: "sidebarItem",
  data() {
    return {};
  },
  props: {
    menu: {
      type: Array
    },
    screen: {
      type: Number
    },
    props: {
      type: Object,
      default: () => {
        return {};
      }
    },
    collapse: {
      type: Boolean
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(["roles", "website"]),
    labelKey() {
      return this.props.label || this.website.menuProps.label;
    },
    pathKey() {
      return this.props.path || this.website.menuProps.path;
    },
    iconKey() {
      return this.props.icon || this.website.menuProps.icon;
    },
    childrenKey() {
      return this.props.children || this.website.menuProps.children;
    },
    nowTagValue() {      
      return this.$router.$alonsoRouter.getValue(this.$route);
    }
  },
  methods: {
    vaildRoles(item) {
      item.meta = item.meta || {};
      return item.meta.roles ? item.meta.roles.includes(this.roles) : true;
    },
    validatenull(val) {
      return validatenull(val);
    },
    open(item) {
      if (this.screen <= 1) this.$store.commit("SET_COLLAPSE");
      this.$router.push({
        path: this.$router.$alonsoRouter.getPath({
          name: item[this.labelKey],
          src: item[this.pathKey]
        }),
        query: item.query
      });
    }
  }
};
</script>

