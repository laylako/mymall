<template>
  <div id="app">
    <main-tab-bar/>
    <router-view/>
  </div>

</template>

<script>
  import MainTabBar from "components/content/MainTabBar"

  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  /* 打包时入口文件是main.js, 打包时就会引入这里的 css 文件了*/
  @import "assets/css/base.css";
</style>
