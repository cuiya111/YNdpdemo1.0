<template>
<div class="title-bar">
  <img src="@/assets/images/echarts.png" alt="图标" class="icon" />
  <span class="text">{{ title }}</span>
  <div class="line"></div>
</div>
</template>
<script setup lang="ts">
const props = defineProps({
  title: {
    type: String, // 限制类型为字符串
    required: false, // 是否必传（默认 false）
    default: '默认标题' // 未传递时的默认值
  }
})

</script>
<style scoped>
.title-bar {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  color: #fff;
}

.icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.text {
  margin-right: 8px;
  font-size: 12px;
}

.line {
  flex-grow: 1;
  height: 0.8px;
  background: linear-gradient(90deg, #024646, #8ab1b1 calc(100% - 4px), transparent calc(100% - 4px));
}
</style>