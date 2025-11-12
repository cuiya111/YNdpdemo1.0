<template>
  <div class="layout-container">
    <!-- 标签栏 -->
    <div class="tab-bar">
      <div class="tab-btn" :class="{ active: activeTab === 'owner' }" @click="activeTab = 'owner'">业主</div>
      <div class="tab-btn" :class="{ active: activeTab === 'region' }" @click="activeTab = 'region'">区域</div>
    </div>

    <!-- 区域选择 -->
    <div class="region-select" v-if="activeTab === 'region'">
      <div class="region-btn" :class="{ active: activeRegion === key }" 
              @click="activeRegion = key" 
              v-for="(item, key, index) in regions" :key="key">
        {{ item }}
      </div>
    </div>

    <!-- 列表内容区 -->
    <div class="list-container">
      <div class="list-col">
        <div class="list-item" v-for="i in 10" :key="`left-${i}`">
          <img class="icon-img" src="../assets/images/little-fan.png" alt="图标">
          <span class="text">xxxxx风场</span>
        </div>
      </div>
      <div class="list-col">
        <div class="list-item" v-for="i in 10" :key="`right-${i}`">
          <img class="icon-img" src="../assets/images/little-fan.png" alt="图标">
          <span class="text">xxxxx风场</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('region');
const regions = ref({
  area1: '某地区', area2: '某地区', area3: '某地区',
  area4: '某地区', area5: '某地区', area6: '某地区',
  area7: '某地区', area8: '某地区', area9: '某地区'
});
const activeRegion = ref('area1');
</script>

<style scoped>
.layout-container {
  width: 100%;
  height: 100%;
  background: transparent;
  color: #fff;
  font-size: 12px;
  display: flex;
  flex-direction: column;
}

/* 标签栏 */
.tab-bar {
  display: flex;
  gap: 12px;
  background: transparent;
}
.tab-btn {
  flex: 1;
  padding: 8px 0;
  background: rgba(227, 240, 240, 0.2);
  border-bottom: 1px solid #fff;
  color: #aaa;
  cursor: pointer;
  margin: 8px 0;
}
.tab-btn.active {
  background: rgba(0, 255, 255, 0.2);
  color: #0ff;
  font-weight: bold;
  border-bottom: 1px solid #0ff;
}
.a1{
  color:rgb(148, 253, 253)
}
/* 区域选择按钮组 */
.region-select {
  border-top: 2px solid rgb(13, 111, 113);
  border-bottom: 1px solid rgb(13, 111, 113);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background: transparent;
  margin: 8px 0;
  padding: 5px 0 5px 0;
}
.region-btn {
  width: 30%;
  padding: 8px 0;
  background: transparent;
  border-top: 1px solid rgb(13, 111, 113);
  color: #fff;
  cursor: pointer;
  margin: 2% 1%;
  box-sizing: border-box;
  background: rgba(5, 35, 45, 0.6);
}
.region-btn.active {
  background: rgb(0, 255, 255, 0.2);
  color: #0ff;
  font-weight: bold;
  border-top: 1px solid #0ff;
}

/* 列表区域 */
.list-container {
  flex: 1;
  display: flex;
  gap: 10px; /* 两列之间的间隔 */
  overflow-y: auto;
  background: transparent;
  border-top: 2px solid rgb(13, 111, 113);
  border-bottom: 1px solid rgb(13, 111, 113);
  margin: 10px 0;
  padding: 3px 0 3px 0;
}
.list-col {
  flex: 1;
  padding-top: 6px;
}
.list-item {
  padding: 7px 10px;
  /* border: 1px solid #0ff; */
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  background: rgba(5, 35, 45, 0.6);
}
/* 图片图标的样式 */
.icon-img {
  width: 16px; /* 根据需要调整图标宽度 */
  height: 16px; /* 根据需要调整图标高度 */
  margin-right: 4px; /* 与文字保持间距，和原来的 ☰ 一致 */
  object-fit: contain; /* 保持图片比例，避免拉伸 */
}
.text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 滚动条 */
.list-container::-webkit-scrollbar {
  width: 6px;
}
.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 255, 255, 0.5);
  border-radius: 3px;
}
</style>