<template>
  <dv-full-screen-container>
    <!-- 标题区域 -->
    <header class="header-container">
      <dv-border-box-11 :title="headerTitle" :reverse="true" :color="borderColors" class="full-size"/>
    </header>

    <!-- 第二行内容区 -->
    <main class="middle-container">
      <!-- 左侧主内容 -->
      <div style="width:100%;height:648px;box-sizing:border-box;flex:2;position: relative;">
        <dv-border-box-12  class="map-wrapper">
          <!-- 这里是echarts地图，世界地图 在该区域全局显示 -->
          <ChartWorldMap />  
        </dv-border-box-12>
        <div  class="left-wrapper">
          <ListRight />
        </div>  
      </div>

      <!-- 右侧上下内容 -->
      <section class="right-panel">
        <dv-border-box-7 class="content-box top-panel" :color="borderColors">
          <dv-decoration-7 :reverse="true" style="width:200px;height:50px;" :color="decorationColors">
            <span :style="{color: textColor}">右侧内容上</span>
          </dv-decoration-7>
        </dv-border-box-7>
        <dv-border-box-7 class="content-box bottom-panel" :color="borderColors">
          <dv-decoration-7 :reverse="true" style="width:200px;height:50px;" :color="decorationColors">
            <span :style="{color: textColor}">右侧内容下</span>
          </dv-decoration-7>
          <middle-right/>
        </dv-border-box-7>
      </section>
    </main>

    <!-- 第三行底部内容区 -->
    <footer class="bottom-container">
      <section class="bottom-left">
        <dv-border-box-7 class="content-box full-height" :color="borderColors">
          <dv-decoration-7 :reverse="true" style="width:200px;height:50px;" :color="titleColors">
            <span :style="{color: textColor}">底部左侧内容</span>
          </dv-decoration-7>
          <bottom-left/>
        </dv-border-box-7>
      </section>
      <section class="bottom-right">
        <dv-border-box-7 class="content-box full-height" :color="borderColors">
          <dv-decoration-7 :reverse="true" style="width:200px;height:50px;" :color="titleColors">
            <span :style="{color: textColor}">底部右侧内容</span>
          </dv-decoration-7>
          <bottom-right/>
        </dv-border-box-7>
      </section>
    </footer>
  </dv-full-screen-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import bottomLeft from './bottomLeft.vue';
import middleRight from './middleRight.vue';
import bottomRight from './bottomRight.vue';
import ChartWorldMap from './ChartWorldMap.vue';
import ListRight from './ListRight.vue';

// 标题变量 - 便于后期修改和维护
const headerTitle = '数据可视化面板';
const borderColors = ['#39c8b9','#0D3A3A']; // 边框渐变颜色
const titleColors = ['#32B9B5', '#0D9BA9'];  // 标题装饰颜色
const decorationColors = ['#6ad4d1','#187469'];
const textColor = '#fff'

</script>



<style scoped>

/* 标题区域样式 */
.header-container {
  width: 100%;
  height: 80px;
  position: relative;
  background-color: #060E12;
  
}

/* 中间内容区域 */
.middle-container {
  width: 100%;
  height: 648px;
  display: flex;
  justify-content: space-between;
  gap: 10px; /* 增加间距避免内容紧贴 */
  box-sizing: border-box;
  padding: 0;
}

.left-main {
  flex: 2;
  box-sizing: border-box;
  color: #091418;
}
.top-panel {
  height: 45%;
  box-sizing: border-box;
}
.bottom-panel {
  height: 55%;
  box-sizing: border-box;
}
.right-panel {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* gap: 16px; */
  /* padding: 8px 0; */
}

/* 底部内容区域 */
.bottom-container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  box-sizing: border-box;
  /* padding: 5px; */
}

.bottom-left {
  flex: 2;
  box-sizing: border-box;
}

.bottom-right {
  flex: 1;
  box-sizing: border-box;
}

/* 通用内容框样式 */
.content-box {
  width: 100%;
  box-sizing: border-box;
  opacity: 0.8
}

.full-height {
  height: 100%;
}

.top-panel {
  height: 100%;
}

.bottom-panel {
  height: 100%;
}


.map-wrapper {
  width: 100%;
  height: 100%;
}

.left-wrapper {
  /* 关键：基于父容器（左侧flex:2的div）定位 */
  position: absolute;
  top: 30px;
  right: 0;
  width: 300px; /* 固定宽度，可根据需求调整 */
  height: 90%;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3); /* 增加左侧阴影，增强悬浮感 */
  /* 避免超出父容器范围（可选） */
  box-sizing: border-box;
}

/* 确保父容器的定位生效 */
:deep(.left-container) {
  position: relative;
}
</style>


<style>
html, body {
  background-color: #041E25; 
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 避免页面滚动条 */
}
</style>