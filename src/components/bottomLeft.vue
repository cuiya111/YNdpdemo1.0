<template>

  <div class="chart-container">
    <div style="width: 40%;height: 100%;">
      <div class="echartsTitle"><LineEchartsTitle :title="'生产基地项目情况'"/></div>
      <div style="height: 40%; display: flex;padding-top: 5%;">
        <div style="width: 40%;">
          <bottomLeftBar />
        </div>
        <div style="width: 60%;">
          <bottomLeftSche />
        </div>
      </div>
      <div style="height: 40%; display: flex;">
        <div style="width: 40%;">
          <bottomLeftBarO/>
        </div>
        <div style="width: 60%;">
          <bottomLeftScheO />
        </div>
      </div>
    </div>
    <div style="width: 30%;height: 100%;">
      <div class="echartsTitle"><LineEchartsTitle :title="'装机容量'"/></div>
      <bottomLeftColumn style="width: 100%; height: 84%;"/>
    </div>
    <div style="width: 30%;height: 100%;">
      <div class="echartsTitle"><LineEchartsTitle :title="'发电量完成情况'"/></div>
      <bottomLeftLine style="width: 100%; height: 84%;"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入组件1
import bottomLeftBar from './bottomLeftBar.vue';
import bottomLeftBarO from './bottomLeftBarO.vue';
// 引入组件2
import bottomLeftSche from './bottomLeftSche.vue';
import bottomLeftScheO from './bottomLeftScheO.vue';
// 引入组件3
import bottomLeftColumn from './bottomLeftColumn.vue';
// 引入组件4
import bottomLeftLine from './bottomLeftLine.vue';
import LineEchartsTitle from './LineEchartsTitle.vue'

</script>

<style scoped>
/* 父容器使用 Flex 布局，子元素水平排列 */
.chart-container {
  display: flex;
  width: 100%;
  height: 100%;
}
.echartsTitle {
  width: 90%; 
  height: 8%;
  padding-left: 3%;
}

</style>