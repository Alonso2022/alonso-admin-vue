<template>
    <div style="background:#ccc">
                                sdfsdf
     <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">登录</el-button>

    </div>
</template>

<script>
export default {
  methods:{
    handleLogin:function(){
                this.$store.dispatch("LoginByUsername", {username:"admin",password:"12121"}).then((res) => {
            console.log(res);
             this.$router.push({ path: "/about" });
            //this.$router.push({ path: this.tagWel.value });
          });
    }
  }
  
}
</script>

<style>

</style>
