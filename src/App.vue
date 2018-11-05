<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    
     <el-button type="primary"
                 size="small"
                 @click.native.prevent="handleLogin"
                 class="login-submit">登录</el-button>
    <router-view/>
  </div>
</template>
<script>


export default {
  methods:{
    handleLogin:function(){
                this.$store.dispatch("LoginByUsername", {username:"admin",password:"12121"}).then((res) => {
            console.log(res);
            //this.$router.push({ path: this.tagWel.value });
          });
    }
  }
  
}
</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
