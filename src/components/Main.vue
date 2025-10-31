<template>
  <dv-full-screen-container class="dashboard-root">
    <!-- 标题区域 -->
    <header class="header-container">
      <div class="left-section">
        数据可视化面板
      </div>
      <div class="right-section">
        <span class="time">{{currentTime}}</span>
        <span class="date">{{currentDate}}</span>
        <span class="week">{{currentWeekday}}</span>
      </div>
    </header>
    <!-- 中间内容区 -->
    <main class="dashboard-middle">
      
      <!-- 左侧主内容区 -->
      <section class="middle-left">
        <div class="map-container">
          <ChartWorldMap />
        </div>
        <div class="map-sidebar">
          <ListRight class="scrollable" />
        </div>
      </section>

      <!-- 右侧内容区 -->
      <section class="middle-right">
        <div class="right-top">
          <dv-border-box-7 :color="borderColors">
              <span :style="{ color: textColor }">右侧内容上</span>
          </dv-border-box-7>
        </div>
        <div class="right-bottom">
        <dv-border-box-7 :color="borderColors">
          <span :style="{ color: textColor }">右侧内容下</span>
          <!-- <middle-right/> -->
        </dv-border-box-7>
        </div>
      </section>
    </main>
    <!-- 底部内容区 -->
    <footer class="dashboard-footer">
      <div class="footer-left">
        <dv-border-box-7 :color="borderColors">
            <span :style="{ color: textColor }">底部左侧内容</span>
          <!-- <bottom-left/> -->
        </dv-border-box-7>
      </div>
      <div class="footer-right">
        <dv-border-box-7 :color="borderColors">
            <span :style="{ color: textColor }">底部右侧内容</span>
          <!-- <bottom-right/> -->
        </dv-border-box-7>
      </div>
    </footer>
  </dv-full-screen-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import bottomLeft from './bottomLeft.vue';
import middleRight from './middleRight.vue';
import bottomRight from './bottomRight.vue';
import ChartWorldMap from './ChartWorldMap.vue';
import ListRight from './ListRight.vue';

// 样式配置集中管理
const config = {
  headerTitle: '数据可视化面板',
  borderColors: ['#00ffff2e', '#000'],  // '#39c8b9' ,#00ffff2e
  titleColors: ['#32B9B5', '#0D9BA9'],
  decorationColors: ['#6ad4d1', '#187469'],
  textColor: '#fff'
};

const { headerTitle, borderColors, titleColors, decorationColors, textColor } = config;

// 初始化时间相关变量
const currentTime = ref('');
const currentDate = ref('');
const currentWeekday = ref('');

// 格式化时间的函数
const formatTime = () => {
  const now = new Date();
  
  // 格式化时间 (HH:MM:SS)
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${hours}:${minutes}:${seconds}`;
  
  // 格式化日期 (YYYY-MM-DD)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始
  const day = String(now.getDate()).padStart(2, '0');
  currentDate.value = `${year}-${month}-${day}`;
  
  // 格式化星期
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  currentWeekday.value = weekdays[now.getDay()] ?? '';
};

onMounted(() => {
  formatTime();
});
</script>

<style scoped>
/* 根容器：全屏无滚动 */
.dashboard-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #041E25;
}

/* 头部容器：Flex 布局实现左右分栏 */
.header-container {
  background-image: url(../assets/images/title.png);
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  height: 8vh; 
  min-height: 60px;
  color: #0ff; /* 文字颜色 */
  font-family: "Microsoft Yahei", sans-serif; /* 可选：设置字体 */
  border-bottom: 2px solid #00ffff24;
}

/* 左侧区域：文字居中 */
.left-section {
  flex: 1; /* 占满剩余空间（使文字居中更稳定） */
  text-align: left;
  padding-left: 10%;
  font-size: 24px; /* 调整字体大小 */
  font-weight: bold;
}

/* 右侧区域：文字靠右 */
.right-section {
  display: flex;
  align-items: center;
  padding-right: 20px; /* 可选：添加右侧内边距，调整位置 */
  text-align: right;
  font-size: 16px; 
  grid-gap: 20px;
}
.time {
  font-size: 22px;
  font-weight: bold;
}
.date {
  font-size: 15px;
}
.week {
  font-size: 15px;
}


/* 中间内容区 */
.dashboard-middle {
  flex: 1;
  display: flex;
  height: 60vh;
}

.middle-left {
  /* flex: 2; */
  width: 66%;
  position: relative;
  height: 100%;
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-sidebar {
  position: absolute;
  top: 2%;
  right: 2%;
  width: 25%;
  min-width: 240px;
  max-width: 320px;
  height: 96%;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  overflow: hidden;
}

.scrollable {
  height: 100%;
  overflow-y: auto;
}

.scrollable::-webkit-scrollbar {
  width: 6px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: rgba(57, 200, 185, 0.5);
  border-radius: 3px;
}

.middle-right {
  /* flex: 1; */
  width: 34%;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.right-top, .right-bottom {
  flex: 1;
}

/* 底部内容区 */
.dashboard-footer {
  height: 30vh;
  min-height: 240px;
  display: flex;
}

.footer-left {
  width: 66%;
}

.footer-right {
  width: 34%;
}

/* 通用边框样式 */
:deep(dv-border-box-7), :deep(dv-border-box-11) {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(dv-decoration-7) {
  width: 100%;
  max-width: 200px;
  height: 40px;
  margin-bottom: 10px;
}
</style>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}



.scrollable::-webkit-scrollbar {
  display: initial;
}
</style>