<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
  data(){
    return {
     
    }
  },
  mounted(){
    if(this.$cookie.get('userId')){
      this.getUser();
      this.getCartCount();
    }
    
  },
  methods:{
    getUser(){
      this.axios.get('/user').then((res={})=>{
        // console.log(res);
        // 保存到vuex里 避免刷新用户名消失
        this.$store.dispatch('saveUserName',res.username);
      })
    },
    getCartCount(){
      this.axios.get('/carts/products/sum').then((res=0)=>{
        // 保存到vuex里
        this.$store.dispatch('saveCartCount',res);
      })
    }
  }
}
</script>

<style lang="scss">
/* 引入scss文件 */
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
