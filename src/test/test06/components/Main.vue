<template>
  <dv-full-screen-container>
    <!-- 标题区域 -->
    <header class="header-container">
      <dv-border-box-11 
        :title="headerTitle" 
        :reverse="true" 
        :color="['#39c8b9','#187469']" 
      />
    </header>

    <!-- 第二行内容区 -->
    <main class="middle-container">
      <!-- 左侧主内容 -->
      <section class="left-main">
        <dv-border-box-7 
          class="content-box full-height" 
          :color="borderColors"
        >
          <dv-decoration-7 
            :reverse="true" 
            style="width:200px;height:50px;" 
            :color="['#6ad4d1','#187469']"
          >
            <span style="color: #7BBCB6;">左侧内容</span>
          </dv-decoration-7>
        </dv-border-box-7>
      </section>

      <!-- 右侧上下内容 -->
      <section class="right-panel">
        <dv-border-box-7 
          class="content-box top-panel" 
          :color="borderColors"
        >
          <dv-decoration-7 
            :reverse="true" 
            style="width:200px;height:50px;" 
            :color="['#6ad4d1','#187469']"
          >
            <span style="color: #7BBCB6;">右侧内容上</span>
          </dv-decoration-7>
        </dv-border-box-7>
        <dv-border-box-7 
          class="content-box bottom-panel" 
          :color="borderColors"
        >
          <dv-decoration-7
            :reverse="true" 
            style="width:200px;height:50px;" 
            :color="['#6ad4d1','#187469']"
          >
            <span style="color: #7BBCB6;">右侧内容下</span>
          </dv-decoration-7>
          <middle-right/>
        </dv-border-box-7>
      </section>
    </main>

    <!-- 第三行底部内容区 -->
    <footer class="bottom-container">
      <section class="bottom-left">
        <dv-border-box-7 
          class="content-box full-height" 
          :color="borderColors"
        >
          <dv-decoration-7 
            :reverse="true" 
            style="width:200px;height:50px;" 
            :color="titleColors"
          >
            <span style="color: #7BBCB6;">底部左侧内容</span>
          </dv-decoration-7>
          <bottom-left/>
        </dv-border-box-7>
      </section>
      <section class="bottom-right">
        <dv-border-box-7 
          class="content-box full-height" 
          :color="borderColors"
        >
          <dv-decoration-7 
            :reverse="true" 
            style="width:200px;height:50px;" 
            :color="titleColors"
          >
            <span style="color: #7BBCB6;">底部右侧内容</span>
          </dv-decoration-7>
        </dv-border-box-7>
      </section>
    </footer>
  </dv-full-screen-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import bottomLeft from './bottomLeft.vue';
import middleRight from './middleRight.vue';

// 标题变量 - 便于后期修改和维护
const headerTitle = '数据可视化面板';
const borderColors = ['#17535b', '#032025']; // 边框渐变颜色
const titleColors = ['#32B9B5', '#0D9BA9'];  // 标题装饰颜色

onMounted(() => {
  console.log('Main component mounted');
});
</script>

<style scoped>

/* 标题区域样式 */
.header-container {
  width: 100%;
  height: 72px;
  position: relative;
  background-color: #091418;
  
}

/* 中间内容区域 */
.middle-container {
  width: 100%;
  height: 648px;
  display: flex;
  justify-content: space-between;
  gap: 16px; /* 增加间距避免内容紧贴 */
  box-sizing: border-box;
  padding: 0 8px;
}

.left-main {
  flex: 2;
  box-sizing: border-box;
  color: #091418;
}

.right-panel {
  flex: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

/* 底部内容区域 */
.bottom-container {
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  box-sizing: border-box;
  padding: 8px;
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
  padding: 16px; /* 增加内边距让内容不紧贴边框 */
  opacity: 0.75
}

.full-height {
  height: 100%;
}

.top-panel {
  height: 216px;
}

.bottom-panel {
  height: 432px;
}
</style>
<style>
html, body {
  background-color: #03191c; 
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 避免页面滚动条 */
}
</style>