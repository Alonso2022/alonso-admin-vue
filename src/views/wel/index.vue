<template>
    <root-container>
    <div>
        keyCollapse : {{keyCollapse}}  isCollapse : {{isCollapse}} <br />
        我是后台进入的欢迎页面 <br />
        keyCollapse=getters.screen > 1 ? getters.isCollapse : false<br />
        wel-index
    </div>
    </root-container>

</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["keyCollapse", "isCollapse"])
  }
};
</script>

<style>
</style>
