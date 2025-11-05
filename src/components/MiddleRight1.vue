<template>
  <div style="width: 100%;height: 100%;display: flex;flex-direction: row;padding-top: 2%;">
    <!-- 左侧部分 -->
    <div style="width: 35%;">
      <!-- 分为上下两部分，其中每个部分又分为左右两部分，左侧是文字，右侧是光点+直线组成 -->
      <div style="height: 50%;align-items: center; flex-direction: row; display: flex;">
        <div class="info">
          <span class="normal">故障预警模型</span>
          <div class="normal">
            <span class="number">16</span>
            <span>个</span>
          </div>
        </div>
        <div style="width:40%;height: 60%; display: flex; flex-direction: row;align-items: center;padding-left: 4%;">
          <div style="width:10%;height: 50%;">
            <div class="glowing-dot"></div>
          </div>
          <div style="width:90%;height: 42%;">
            <div class="radiant-light"></div>
          </div>
        </div>
      </div>
      <div style="height: 50%;align-items: center; flex-direction: row; display: flex;">
        <div class="info">
          <span class="normal">预测精确率</span>
          <div class="normal">
            <span class="number">98</span>
            <span>%</span>
          </div>
        </div>
        <div style="width:40%;height: 60%; display: flex; flex-direction: row;align-items: center;padding-left: 4%;">
          <div style="width:10%;height: 50%;">
            <div class="glowing-dot1"></div>
          </div>
          <div style="width:90%;height: 42%;">
            <div class="radiant-light1"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="model"></div>
    <!-- 右侧部分 -->
    <div style="width: 35%; height: 100%; flex-direction: column;display: flex">
      <!-- 分为上、中、下三部分，上和左侧的一样，中和下一样 -->
      <div style="width: 100%; height: 50%;align-items: center; flex-direction: row; display: flex;">
        <div style="width:40%;height: 60%; display: flex; flex-direction: row;align-items: center;padding-left: 4%;">
          <div style="width:90%;height: 42%;">
            <div class="radiant-light2"></div>
          </div>
          <div style="width:10%;height: 50%;">
            <div class="glowing-dot2"></div>
          </div>
        </div>
        <div class="info" style="text-align: left;">
          <span class="normal">处于亚健康状态机组</span>
          <div class="normal ">
            <span class="number">20</span>
            <span>台</span>
            <span style="padding-right: 5%;padding-left: 5%;">|</span>
            <span class="number position">15</span>
            <span>%</span>
          </div>
        </div>
      </div>
      <div style="width: 100%; height: 20%;flex-direction: row;display: flex;align-items: center;padding-left: 5%;">
        <div style="height: 20%;"><div class="glowing-dot2"></div></div>
        <div class="span-font">
          <span class="span-number">18</span>
          <span>台机组</span>
          <span style="color: #297df2;">正在检修</span>
          <span>中</span>
        </div>
      </div>
      <div style="width: 100%; height: 20%;flex-direction: row;display: flex;align-items: center;padding-left: 5%;">
        <div style="height: 20%;"><div class="glowing-dot2"></div></div>
        <div class="span-font">
          <span class="span-number">12</span>
          <span>台机组</span>
          <span style="color: #297df2;">严密监控</span>
          <span>中</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.span-font{
  font-size: 12px;
  color: #fff;
}
.span-number{
  font-weight: bold;
  font-size: 18px;
  padding-right: 4px;
  padding-left: 4px;
}
/* 创建一个发光的圆点 */
.glowing-dot {
    width: 4px;
    height: 4px;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 3px 3px rgba(255, 60, 0, 0.6);
}

/* 创建辐射光效果 */
.radiant-light {
  flex-grow: 1;
  height: 0.8px;
  background: linear-gradient(90deg, #ef0808, #373c3c calc(100% - 4px), transparent calc(100% - 4px));
    /* height: 1px;
    background: radial-gradient(circle, white 5%, rgba(255, 60, 0, 0.6) 50%, rgba(39, 47, 44, 0) 100%); */
}


.glowing-dot1 {
    width: 4px;
    height: 4px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 3px 3px rgba(123, 255, 0, 0.6);
}

/* 创建辐射光效果 */
.radiant-light1 {
  flex-grow: 1;
  height: 0.8px;
  background: linear-gradient(90deg, #6cef08, #373c3c calc(100% - 4px), transparent calc(100% - 4px));
    /* height: 1px;
    background: radial-gradient(circle, white 5%, rgba(255, 60, 0, 0.6) 50%, rgba(39, 47, 44, 0) 100%); */
}

.glowing-dot2 {
    width: 4px;
    height: 4px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 3px 3px rgba(73, 115, 239, 0.6);
}

/* 创建辐射光效果 */
.radiant-light2 {
  flex-grow: 1;
  height: 0.8px;
  background: linear-gradient(90deg, #373c3c, #3460f0 calc(100% - 4px), transparent calc(100% - 4px));
    /* height: 1px;
    background: radial-gradient(circle, white 5%, rgba(255, 60, 0, 0.6) 50%, rgba(39, 47, 44, 0) 100%); */
}

.model {
  width: 30%;
  height: 100%;
  padding-top: 10%;
  background-image: url('@/assets/images/fan.png');
  background-repeat: no-repeat;
  background-size: contain;
}

.info{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  text-align: right;
  color: #fff;
}

.normal{
  font-size: 12px;
  height: 50%;
  width: 100%;
  font-weight: lighter;
  padding-left: 3px;
  /* align-content: right; */
}


.number{
  font-weight: bold;
  font-size: 18px;
  padding-right: 4px;
}
</style>