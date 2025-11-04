<template>
  <div ref="chartRef" class="bottomLeftSche"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);

    const datas = [
      { name: '2022年', value: '264' },
      { name: '2023年', value: '464' },
    ]
    const myColor = ['#64C9A3'].reverse();
    const xData = datas.map((item) => item.name);
    const yData = datas.map((item) => Number(item.value));
    const max = Math.ceil(Math.max(...yData) * 1.2);
    const maxData = new Array(yData.length).fill(max); // 长度与 yData 一致

    const option = {
      backgroundColor: 'transparent',
      grid: {
          left: "15%",
          right: "8%",
          bottom: "5%",
          top: "10%",
          containLabel: false,
      },
      xAxis: [
          {
            show: false,
          },
          {
            show: false,
          },
      ],
      yAxis: [ 
        {
          show: false,
          inverse: true,
          data: yData,
        },
        {
          show: true,
          data: yData,
          offset: -25,
          position: "right",
          axisLabel: {
              lineHeight: 0,
              verticalAlign: "bottom",
              fontSize: 10,
              color: "#fff",
              formatter: "{value}亿",
          },
          axisLine: {
              show: false,
          },
          splitLine: {
              show: false,
          },
          axisTick: {
              show: false,
          },
        },
      ],
      series: [
        {
          name: "进度",
          show: true,
          type: "bar",
          barGap: "-100%",
          xAxisIndex: 1,
          barWidth: 2,
          itemStyle: {
            borderRadius: 40,
            color: (params:any) => {
                var num = myColor.length;
                return {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#0F1F45",
                    },
                    {
                      offset: 1,
                      color: myColor[params.dataIndex % num],
                    },
                  ],
                };
            },
          },
          label: {
            show: false,
          },
          // max: 0,
          labelLine: {
              show: false,
          },
          z: 2,
          data: yData,
          animationDelay: 1000,
          animationDuration: 1000
        },
        {
          name: "外圆",
          type: "scatter",
          emphasis: {
            scale: false,
          },
          xAxisIndex: 1,
          symbolSize: 6,
          itemStyle: {
            color: (params:any) => {
                var num = myColor.length;
                return myColor[params.dataIndex % num];
            },
            shadowColor: "rgba(255, 255, 0, 0.8)",
            shadowBlur: 25,
            borderWidth: 1,
            opacity: 1,
          },
          z: 2,
          data: yData,
          animationDelay: 1500,
          animationDuration: 1000
        },
        {
          name: "年份",
          z: 1,
          show: true,
          type: "bar",
          xAxisIndex: 1,
          barGap: "-100%",
          barWidth: 2,
          itemStyle: {
            borderRadius: 4,
            color: "rgba(13, 55, 78, 1)",
          },
          label: {
            show: true,
            verticalAlign: "middle",
            position: [0, '-12px'],
            fontSize: 12,
            color: "#fff",
            formatter: function (data) {
                return xData[data.dataIndex] + "：";
            },
          },
          data: maxData,
        },
      ],
    };
    myChart.setOption(option);
  }
});
onUnmounted(() => {
  myChart?.dispose();
});
  
</script>

<style scoped>
.bottomLeftSche {
  width: 100%;
  height: 100%;
  color: #00ffff;
}
</style> 
