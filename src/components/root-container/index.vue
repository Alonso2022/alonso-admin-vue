<template>
  <div class="root-container">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "rootContainer"
};
</script>

<style lang="scss">
.root-container {
  padding: 0px;
  border-radius: 0px;  
  box-sizing: border-box;

  .el-card {
    width: 100%;
    border-radius: 0px;
     &__body {
      padding: 5px;
    }
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
