<template>
  <span @click.prevent.stop="driverStart()">
     <i class="iconfont icon-info"></i>
  </span>
</template>

<script>
import * as Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from '@/const/defineSteps'

export default {
  name: "top-info",
  data () {
    return {
      driver: null
    };
  },
  created () {
  },
  mounted () { 
    this.driver = new Driver({
      doneBtnText: '结束',
      closeBtnText: '关闭',
      nextBtnText: '下一项',
      prevBtnText: '上一项'
    })
  },
  computed: { },
  props: [],
  methods: {
    driverStart () {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
};
</script>

