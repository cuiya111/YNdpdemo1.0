<template>
  <div ref="chartRef" class="bottomLeftFour"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'; // 修正导入方式（推荐完整导入）
import { ref, onMounted, onUnmounted } from 'vue';

// 1. 初始化DOM引用
const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

// 2. 图表数据（修正颜色格式）
const charts = {
  cityList: ['38号点', '38号点', '15号点', '16号点'],
  cityData: [7500, 6200, 5700, 4200]
};
const top10CityList = charts.cityList;
const top10CityData = charts.cityData;
const color = [
  'rgba(248,195,248, 1)',
  'rgba(100,255,249, 1)',
  'rgba(135,183,255, 1)',
  'rgba(248,195,248, 1)',
];

// 3. 处理柱状图数据（修正格式）
const lineY: any[] = [];
for (let i = 0; i < charts.cityList.length; i++) {
  const x = i > color.length - 1 ? color.length - 1 : i;
  lineY.push({
    value: top10CityData[i], // 核心数值字段
    itemStyle: { // 平级配置itemStyle（ECharts 5+ 规范）
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: `${color[x].replace(/, ([\d.]+)\)$/, ', 0.01)')}` }, // 替换透明度
        { offset: 1, color: color[x] }
      ], false),
      barBorderRadius: 10,
      emphasis: { // 强调样式
        shadowBlur: 15,
        shadowColor: 'rgba(0, 0, 0, 0.1)'
      }
    }
  });
}

// 4. ECharts配置项
const getOption = (): echarts.EChartsOption => ({
  backgroundColor: 'transparent',
  title: { show: false },
  tooltip: { trigger: 'item' },
  grid: {
    borderWidth: 0,
    top: '10%',
    left: '5%',
    right: '15%',
    bottom: '3%'
  },
  color: color,
  yAxis: [
    {
      type: 'category',
      inverse: true,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false, inside: false },
      data: top10CityList
    },
    {
      type: 'category',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true,
        inside: false,
        textStyle: { 
            color: '#fff', 
            fontSize: 10, 
            fontFamily: 'PingFangSC-Regular' 
        },  //进度条后面的字
        formatter: (val: number) => `${val}k`
      },
      splitArea: { show: false },
      splitLine: { show: false },
      data: top10CityData
    }
  ],
  xAxis: {
    type: 'value',
    axisTick: { show: false },
    axisLine: { show: false },
    splitLine: { show: false },
    axisLabel: { show: false }
  },
  series: [
    {
      name: '',
      type: 'bar',
      zlevel: 2,
      barWidth: '8px',
      data: lineY,
      animationDuration: 1500,
      label: {
          color: '#fff',
          show: true,
          position: [0, '-24px'],
          textStyle: { fontSize: 14 },
          formatter: (params: any) => top10CityList[params.dataIndex] // 正确获取名称
      }
    }
  ],
  animationEasing: 'cubicOut'
});

// 5. 初始化和销毁图表（核心：补充初始化流程）
onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption(getOption()); // 加载配置
    // 窗口 resize 适配（可选）
    window.addEventListener('resize', () => {
      myChart?.resize();
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', () => myChart?.resize()); // 移除监听
  myChart?.dispose(); // 销毁实例
});
</script>

<style scoped>
.bottomLeftFour {
  width: 280px;
  height: 250px;
  /* margin-top: -20px; */
  margin-left: 20px;
}
</style>
