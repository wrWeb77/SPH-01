<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件 的委派 -->
      <div @mouseleave="leaveIndex()" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort" appear>
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                :class="{ cur: currentIndex == index }"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级 三级分类的地方  -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// 引入lodash 这种引入方式是全部引入
// import _ from 'lodash'
// 按需引入 lodash
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      // 储存用户鼠标移到了哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex的属性  加上节流的throttle 回调不能用箭头函数
    changeIndex: throttle(function (index) {
      // index:鼠标移某一个一级分类的元素的索引值
      this.currentIndex = index;
    }, 50),

    // 一级分类鼠标移除的事件回调
    leaveIndex() {
      this.currentIndex = -1;
      // 导航栏显示移除 回调
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(event) {
      // 最好的解决方案 事件委派 + 编程式导航
      // 有一些问题：1.点击一定是a标签2.如何获取【1.2.3级分类的产品名字，id】
      // 把子节点当中a标签，加上自定义属性 data-categoryName,其余的子节点没有
      // 获取到当前触发事件的节点【h3,a,dt,dl】,需要带有 data-categoryName这样节点【一定是a标签】
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }
        if (this.$route.params) {
          location.params = this.$route.params;
          // 整理完参数
          location.query = query;
          // 路由跳转
          this.$router.push(location);
        }
      }
    },
    // 鼠标进入 search 组件的 typenav 导航栏显示
    enterShow() {
      this.show = true;
    },
  },

  // 当组件挂载完毕：可以向服务器发请求
  mounted() {
    // 当组件挂载完毕 组件 show 属性为false
    // 如果不是Home组件 将 TypeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    // ...mapState('homeOptions',['categoryList'])
    //对象的写法 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
    // 注一个参数state，其实即为大仓库中的数据
    ...mapState({
      categoryList: (state) => {
        return state.homeOptions.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
a {
  cursor: pointer;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    // 过渡动画的样式
    /* 进入的起点 离开的终点 */
    .sort-enter,
    .sort-leave-to {
      height: 0;
    }
    // 定义动画时间，速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.2s linear;
    }
    /* 进入的终点 离开的起点 */
    .sort-enter-to,
    .sort-leave {
      height: 460px;
    }
  }
}
</style>