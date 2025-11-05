<template>
  <!-- 给图表容器加类名，便于控制样式 -->
  <div ref="chartRef" class="bottomLeftColumn"></div>
  
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);

    let data0 = [202, 118, 219, 293, 429];
    let data1 = [122, 368, 198, 123, 129];

    const option = {
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'shadow'
      //   },
      // },  //提示框
      legend: {
        data: ['bar1', 'bar2'], 
        icon: 'rect',
        right: '10%',
        itemWidth: 25, // 图例标记的宽度
        itemHeight: 8, // 图例标记的高度
        itemGap: 25, // 图例项之间的间距
        textStyle: {
          color: '#fff', // 文字颜色（适配深色背景）
          fontSize: 10, // 文字大小
          fontWeight: 'normal' // 文字粗细
        },
      }, //小标题
      grid: {
        top: '10%',
        bottom: '10%',
        right: '10%'
      },
      xAxis: {
        color: '#fff',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#fff',
            width: 1,
            type: 'soild' //solid'（实线）、'dashed'（虚线）
          }
        },
        z: 10,
        //关闭垂直网格线
        splitLine: {
          show: false
        }
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#fff',
          fontSize: 10
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
          name:'bar1',  //蓝
          type: 'bar',
          barWidth:'10px',
          stack: 'one',
          showBackground: true,
          backgroundStyle: {
            opacity: 0.1
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(50, 144, 255, 1)' },       // 亮蓝色（红、绿通道提升，更明亮）
              { offset: 0.5, color: 'rgba(40, 102, 235, 1)' },  // 中蓝色（绿、蓝通道提升，透明度降低）
              { offset: 1, color: 'rgba(20, 36, 46, 1)' } 
            ]),
            barBorderRadius: [2,2,0,0]
          },
          data: data0
        },
        {
          name:'bar2',  //绿
          type: 'bar',
          barWidth:'10px',
          stack: 'one',
          showBackground: true,
          backgroundStyle: {
            opacity: 0.1
          },
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(37, 253, 183, 1)' },
              { offset: 0.5, color: 'rgba(36, 159, 109, 1)' },
              { offset: 1, color: 'rgba(12, 40, 42, 1)' }
            ]),
            barBorderRadius: [2,2,0,0]  //圆角
          },
          data: data1
        }
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
.bottomLeftColumn {
  width: 100%;
  height: 100%
}

</style>