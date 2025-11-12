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
      <section class="middle-left">
        <div class="map-container">
          <ChartWorldMap />
        </div>
        <div class="map-sidebar">
          <ListRight class="scrollable" />
        </div>
      </section>
      <section class="middle-right">
        <div class="right-top">
          <dv-border-box-7 :color="borderColors">
            <div style="width: 100%; height: 100%;">
              <div style="height: 15%;" class="little-title">业务系统PHM</div>
              <div style="height: 85%;"><MiddleRight1/></div>
            </div>
          </dv-border-box-7>
        </div>
        <div class="right-bottom">
        <dv-border-box-7 :color="borderColors">
          <div style="width: 100%; height: 100%;">
            <div style="height: 10%;" class="little-title">业务系统智能物流</div>
            <div style="height: 90%;"><MiddleRight2/></div>
          </div>
        </dv-border-box-7>
        </div>
      </section>
    </main>
    <!-- 底部内容区 -->
    <footer class="dashboard-footer">
      <section class="footer-left">
        <dv-border-box-7 :color="borderColors">
          <div style="width: 100%; height: 100%; ">
            <div style="height: 11%;" class="little-title">生产经营信息</div>
            <div style="width: 100%;height: 89%;display: flex;">
              <BottomLeft/>
            </div>
          </div>
        </dv-border-box-7>
      </section>
      <section class="footer-right">
        <dv-border-box-7 :color="borderColors">
          <div style="width: 100%; height: 100%; ">
            <div style="height: 11.8%;" class="little-title">业务系统运维</div>
            <div style="width: 100%;height: 88%;">
                <BottomRight/>
            </div>
          </div>
        </dv-border-box-7>
      </section>
    </footer>
  </dv-full-screen-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChartWorldMap from './ChartWorldMap1.vue';
import ListRight from './ListRight.vue';
import MiddleRight1 from './MiddleRight1.vue';
import MiddleRight2 from './MiddleRight2.vue';
import BottomLeft from './BottomLeft.vue';
import BottomRight from './BottomRight.vue'

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
  background-color: #000;
  color: rgba(22, 68, 100, 0.638);

  .little-title {
    font-size: 16px;
    font-weight: bold;
    text-align: left; 
    align-content: center;
    color: #fff;
    padding: 0px 0 0 25px;
    background-image: url('@/assets/images/1a.png');
    background-repeat: no-repeat;
    background-size: contain;
  }
}

/* 头部容器：Flex 布局实现左右分栏 */
.header-container {
  background-image: url(@/assets/images/title.png);
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  height: 7%; 
  color: #0ff; 
  font-family: "Microsoft Yahei", sans-serif;
  border-bottom: 2px solid #00ffff24;

  .left-section {
    text-align: left;
    padding-left: 10%;
    font-size: 24px; 
    font-weight: bold;
  }
 
  .right-section {
    display: flex;
    align-items: center;
    padding-right: 20px; 
    text-align: right;
    font-size: 16px; 
    grid-gap: 20px;
  }
  .time {
    font-size: 22px;
    font-weight: bold;
  }
  .date, .week {
    font-size: 15px;
  }
}

/* 中间内容区 */
.dashboard-middle {
  display: flex;
  height: 58%;

  .middle-left {
    width: 66%;
    position: relative; /*用于listRight组件的绝对定位的*/
    height: 100%;
    background-image: url(@/assets/images/mapbg.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  .map-container {
    width: 100%;
    height: 100%;
  }

  .map-sidebar {
    position: absolute;
    top: 2%;
    right: 1%;
    width: 25%;
    min-width: 240px;
    max-width: 320px;
    height: 96%;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.3);
    box-sizing: border-box;
    overflow: hidden;
  }

  .middle-right {
    width: 34%;
    height: 100%;
  }
  .right-top {  
    height: 40%;
    width: 100%;
  }
  .right-bottom {
    height: 60%;
    width: 100%;
  }
}

.dashboard-footer {
  height: 35%;
  display: flex;

  .footer-left {
    width: 66%;
    height: 100%;
  }
  .footer-right {
    width: 34%;
    height: 100%;
  }
}


</style>
