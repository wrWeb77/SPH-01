<template>
  <div>
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <Recommend></Recommend>
      <Rank></Rank>
      <Like></Like>
      <!-- Floor这个组件:自己在组件内部是没有发请求的:数据是父组件给的 -->
      <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
      <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  name:'Home',
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
  computed:{
    ...mapState("homeOptions",['floorList'])
  },
  mounted() {
    // 派发action 获取floor组件的数据
    this.$store.dispatch("homeOptions/getFloorList")
    
  },

}
</script>

<style>

</style>