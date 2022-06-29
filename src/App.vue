<template>
<div>
  <Header></Header>
  <!-- 路由组件出口 -->
  <router-view></router-view>
  <!-- 在Home、Search显示的，在登录，注册隐藏-->
  <Footer v-show="$route.meta.show"></Footer>
</div>
</template>

<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {Header,Footer},
  mounted() {
    // 通知vuex发请求，获取数据，储存仓库中  派发一个axios ||获取商品分类的三级列表的数据
    this.$store.dispatch("homeOptions/categoryList");
  },
}
</script>

<style>
</style>
