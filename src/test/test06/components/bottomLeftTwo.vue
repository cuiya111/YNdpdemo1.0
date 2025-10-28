<template>
  <!-- 给图表容器加类名，便于控制样式 -->
  <div ref="chartRef" class="bottomLeftTwo"></div>
  
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);

    const _currentAxisBreaks = [{
      start: 10,
      end: 30,
      gap: '0.5%'
    }];

    let data = [22, 18, 19, 23, 29];

  const option = {
    title: {
      // text: '特性示例',
      // subtext: 'Feature Sample',
      left: 'center',
      textStyle: {
        fontSize: 12
      },
    subtextStyle: {
      color: '#175ce5',
      fontSize: 13,
      fontWeight: 'bold'
    }
  },
    tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
    legend: {
      data: ['bar1', 'bar2'], 
      top: '-5px',
      left: 'right',
      icon: 'rect',
      itemWidth: 25, // 图例标记的宽度
      itemHeight: 10, // 图例标记的高度
      itemGap: 25, // 图例项之间的间距
      textStyle: {
        color: '#fff', // 文字颜色（适配深色背景）
        fontSize: 12, // 文字大小
        fontWeight: 'normal' // 文字粗细
      },
      // backgroundColor: '#000', // 背景色（半透明深色）
      // borderColor: 'rgba(57, 200, 185, 0.9)', // 边框颜色
      // borderWidth: 1, // 边框宽度
      // borderRadius: 4, // 边框圆角
      // padding: [10, 20] // 内边距（上右下左）
    }, //小标题
    grid: {
      top: 10,
    },
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        show: true
      },
      z: 10,
      //关闭垂直网格线
      splitLine: {
        show: false
      }
    },
    yAxis: {
      breaks: _currentAxisBreaks,
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#fff'
      },
      splitLine: {
        show: false
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      {
        name:'bar1',
        type: 'bar',
        barWidth:'30%',
        stack: 'one',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#157CEA' },
            { offset: 1, color: '#082427' }
          ]),
          barBorderRadius: [1,1,0,0]
        },
        data: data
      },
      {
        name:'bar2',
        type: 'bar',
        barWidth:'10px',
        stack: 'one',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#37F6B5' },
            { offset: 1, color: '#172F26' }
          ]),
          barBorderRadius: [1,1,0,0]
        },
        data: data}
    ]
  };

    myChart.setOption(option);
  }
});

  onUnmounted(() => {
    myChart?.dispose();
  });

</script>

<style scoped>
/* 让图表容器占满父组件空间 */
.bottomLeftTwo {
  width: 300px;
  height: 300px;
  margin-left: 20px;
}

</style>