<template>
  <div ref="chartRef" class="bottomLeftFour"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

interface UserData {
  name: string;
  value: number;
  sum: number;
}

const data: UserData[] = [
  { name: 'user1', value: 10, sum: 10 },
  { name: 'user2', value: 20, sum: 10 },
  { name: 'user3', value: 23, sum: 50 },
  { name: 'user4', value: 44, sum: 60 },
];

const getArrByKey = (data: UserData[], k?: keyof UserData) => {
  const key = k || "value";
  return data.map(t => t[key]);
};

const getSymbolData = (data: UserData[]) => {
  return data.map(item => ({
    value: item.value,
    symbolPosition: 'end' as const
  }));
};

const sortedData = [...data].sort((a, b) => b.value - a.value);

const option = {
  backgroundColor: 'transparent', /* 透明背景 */
  grid: {
    top: '2%',
    bottom: -15,
    right: 30,
    left: 30,
    containLabel: true //确保标签（如名称、数值）不被网格裁剪
  },
  xAxis: { 
    show: false,
},
  yAxis: [
    {
      triggerEvent: true,
      show: true,
      inverse: true,
      data: getArrByKey(sortedData, 'name'),
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        show: true, // 若需要显示名称可改为 true
        color: '#fff',
        align: 'left', //水平对齐
        verticalAlign:'middle',   //垂直对齐
        margin: 35, //调整与柱子的距离（增大则远离，减小则靠近）
        fontSize: 12,
        formatter: (value: string) => `{title|${value}}`,
        rich: { title: { width: 120 } }
      },
    },
    {
      triggerEvent: true,
      show: true,
      inverse: true,
      axisLine: { show: false },
      splitLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#fff',
        align: 'right',
        verticalAlign: 'bottom',
        fontSize: 13,
        formatter: (_: string, index: number) => {
          const ratio = (sortedData[index].value / sortedData[index].sum) * 100;
          return `${ratio.toFixed(1)}%`;
        }
      }
    }
  ],
  series: [
    {
      type: 'pictorialBar',
      symbol: 'image://data:image/png;base64,...', // 确保图片路径正确
      symbolSize: [50, 50],
      symbolOffset: [20, 0],
      z: 12,
      data: getSymbolData(sortedData)
    },
    {
      name: '条',
      type: 'bar',
      showBackground: true,
      barBorderRadius: 30, // 柱子圆角半径30px（圆角效果）
      yAxisIndex: 0,
      data: sortedData.map(item => item.value), // 直接传数值
      barWidth: 8, //柱子宽度
      barCategoryGap: '20px', // 调整柱子之间的距离（关键配置）
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 0.1, [
          { offset: 0, color: '#253E3B' },
          { offset: 0.7, color: '#48876C' },
          { offset: 1, color: '#8EE9CA' }
        ]),
      },
      label:{
        color: '#fff', 
        show: true, // 显示标签
        position: [0, '-20px'], // 标签位置：向右0px，向上20px（柱子上方）
        textStyle: { fontSize: 16 }, // 文字大小16px
      }
    }
  ]
};

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    myChart.setOption(option);
    
    const handleResize = () => myChart?.resize();
    window.addEventListener('resize', handleResize);
    
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      myChart?.dispose();
    });
  }
});
</script>

<style scoped>
.bottomLeftFour {
  width: 400px;
  height: 280px;
  margin-top: -25px;
  margin-left: -60px;
}
</style>
