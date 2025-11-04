<template>
  <div class="layout-panel">
    <div class="panel-header">
      <div class="panel-header-title">{{ title }}111</div>
    </div>
    <div class="panel-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PropsType {
  title: string 
}
const props = defineProps<PropsType>()
</script>

<style lang="scss" scoped>
.layout-panel {
  position: relative;
  color: #fff;
  background-image: url('@/assets/panel_body_bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .panel-header {
    display: flex;
    align-items: center;
    height: 45px;
    font-family: Douyu;
    background-image: url('@/assets/panel_title_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .panel-header-title {
      position: relative;
      top: -12px;
      left: 70px;
      font-size: 15px;
    }
  }
  .panel-body {
    height: 100%;
    width: 100%;
  }
}
</style>
