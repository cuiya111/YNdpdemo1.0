<template>
  <div class="layout-container">
    <!-- 标签栏 -->
    <div class="tab-bar">
      <button class="tab-btn" :class="{ active: activeTab === 'owner' }" @click="activeTab = 'owner'">业主</button>
      <button class="tab-btn" :class="{ active: activeTab === 'region' }" @click="activeTab = 'region'">区域</button>
    </div>

    <!-- 区域选择 -->
    <div class="region-select" v-if="activeTab === 'region'">
      <button class="region-btn" :class="{ active: activeRegion === key }" 
              @click="activeRegion = key" 
              v-for="(item, key) in regions" :key="key">
        {{ item }}
      </button>
    </div>

    <!-- 列表内容区 -->
    <div class="list-container">
      <div class="list-item" v-for="i in 15" :key="i">
        <span class="icon" >▲</span>
        <span class="text">{{ i }} ****风场1</span>
        <span class="icon">▲</span>
        <span class="text">{{ i }} ****风场2</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('region');
const regions = ref({
  area1: '华东地区', area2: '华南地区', area3: '华北地区',
  area4: '西北地区', area5: '西南地区', area6: '东北地区',
  area7: '港澳台', area8: '海外区域', area9: '全国'
});
const activeRegion = ref('area1');
</script>

<style scoped>
/* 核心：容器背景完全透明 */
.layout-container {
  width: 100%;
  height: 100%;
  background: transparent; /* 透明背景 */
  color: #fff; /* 文字用白色，避免与地图冲突 */
  font-size: 13px;
  display: flex;
  flex-direction: column;
}

/* 标签栏：半透明背景，增强可读性 */
.tab-bar {
  display: flex;
  background: rgba(202, 243, 234, 0.2); /* 半透明深色背景 */
  backdrop-filter: blur(4px); /* 毛玻璃效果（可选） */
}
.tab-btn {
  flex: 1;
  padding: 12px 0;
  background: transparent;
  border: none;
  color: #e0e0e0;
  cursor: pointer;
}
.tab-btn.active {
  background: rgba(26, 122, 114, 0.7); /* 激活状态半透明 */
  color: #0ff;
}

/* 区域选择按钮组：半透明背景 */
.region-select {
  display: flex;
  flex-wrap: wrap;
  background: rgba(15, 72, 69, 0.4); /* 比标签栏更透明 */
}
.region-btn {
  width: 33.333%;
  padding: 10px 0;
  background: transparent;
  border: 1px solid rgba(42, 107, 159, 0.5); /* 半透明边框 */
  color: #e0e0e0;
  cursor: pointer;
  margin: -1px 0 0 -1px;
}
.region-btn.active {
  background: rgba(26, 122, 114, 0.6);
  border-color: #0ff;
  color: #0ff;
}

/* 列表区域：半透明背景 */
.list-container {
  flex: 1;
  overflow-y: auto;
  background: rgba(15, 72, 63, 0.3); /* 最透明的背景 */
}
.list-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 15px;
  border-bottom: 1px solid rgba(42, 159, 151, 0.3);
}
.icon {
  color: #0ff;
  margin-right: 8px;
}
.text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 滚动条也设置为半透明 */
.list-container::-webkit-scrollbar {
  width: 6px;
}
.list-container::-webkit-scrollbar-thumb {
  background-color: rgba(42, 159, 140, 0.5);
  border-radius: 3px;
}
</style>