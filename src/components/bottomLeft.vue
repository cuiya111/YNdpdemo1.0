<template>
  <!-- 父容器，使用 Flex 布局实现水平排列 -->
  <div class="chart-container">
    <!-- 左下组件1 -->
    <bottomLeftOne/>
    <!-- 左下组件4 -->
    <BottomLeftFour />
    <!-- 左下组件2 -->
    <BottomLeftTwo />
    <!-- 左下组件3 -->
    <BottomLeftThree />
    
  </div>
</template>

<script lang="ts" setup>
// 引入组件1
import bottomLeftOne from './bottomLeftOne.vue';
// 引入组件2
import BottomLeftTwo from './bottomLeftTwo.vue';
// 引入组件3
import BottomLeftThree from './bottomLeftThree.vue';
// 引入组件4
import BottomLeftFour from './bottomLeftFour.vue';
</script>

<style scoped>
/* 父容器使用 Flex 布局，子元素水平排列 */
.chart-container {
  display: flex;
  /* 让子元素在水平方向上有一定的间距，可根据需要调整 */
  /* gap: 20px; */
  /* 可以根据需要设置父容器的宽度，比如占满整个页面宽度 */
  /* width: 100%; */
  /* 可以根据需要设置父容器的高度，这里两个图表高度分别为 280px 左右，所以设置 300px 左右 */
  /* height: 300px; */
  /* 让内容在垂直方向上居中，可根据需要调整 */
  /* align-items: center; */
  /* 让内容在水平方向上居中，可根据需要调整 */
  justify-content: center;
}
</style>