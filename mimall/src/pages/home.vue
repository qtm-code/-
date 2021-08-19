<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
  import NavHeader from './../components/NavHeader'
  import NavFooter from './../components/NavFooter'
  export default{
    name:'nav-home',
    components:{//components 加s是加载多个组件
      NavHeader,//es6语法key和value可以省略
      NavFooter
    }
  }
</script>