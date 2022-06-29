<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="banner in list" :key="banner.id">
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carsousel",
  props:['list'],
  watch: {
    list: {
      immediate: true,
      // 立即监听：不管数据有没有变化，上来就执行一次
      // 为什么watch监听不到list，因为这个数据从来没有发生变化（数据是父组件给的，给的是一个对象，对象里面该有的数据都有的）
      handler() {
        // 只能监听到数据已经有 ，但是v-for动态渲染的数据还是没办法确定，因此还是需要$nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 小标可以点击
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>