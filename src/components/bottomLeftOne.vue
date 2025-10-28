<template>
  <div ref="chartRef" class="bottomLeftOne"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';
import 'echarts-gl'; // 引入3D扩展

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;
let timer: number | null = null; // 保存定时器ID

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);

    let value = '80%';
    let angle = 0; // 角度变量，用于动画

    // 生成扇形的曲面参数方程
    function getParametricEquation(
      startRatio: number,
      endRatio: number,
      isSelected: boolean,
      isHovered: boolean,
      k: number
    ) {
      let midRatio = (startRatio + endRatio) / 2;
      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      if (startRatio === 0 && endRatio === 1) {
        isSelected = false;
      }

      k = typeof k !== 'undefined' ? k : 1 / 3;
      let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let hoverRate = isHovered ? 1.05 : 1.6;

      return {
        u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
        v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
        x: function (u: number, v: number) {
          if (u < startRadian) {
            return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        y: function (u: number, v: number) {
          if (u < startRadian) {
            return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          if (u > endRadian) {
            return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },
        z: function (u: number, v: number) {
          if (u < -Math.PI * 0.5 || u > Math.PI * 2.5) {
            return Math.sin(u);
          }
          return Math.sin(v) > 0 ? 1 : -1;
        },
      };
    }

    // 生成3D饼图配置项（修正：函数内完成所有逻辑）
    function getPie3D(pieData: any[], internalDiameterRatio?: number) {
      let series: any[] = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData: string[] = [];
      let option: any = {};
      let k = internalDiameterRatio !== undefined
        ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
        : 1 / 3;

      // 生成基础series
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;
        const seriesItem: any = {
          name: pieData[i].name || `series${i}`,
          type: 'surface',
          parametric: true,
          wireframe: { show: false },
          pieData: pieData[i],
          pieStatus: { selected: false, hovered: false, k },
        };
        if (pieData[i].itemStyle) {
          seriesItem.itemStyle = {
            color: pieData[i].itemStyle.color,
            opacity: pieData[i].itemStyle.opacity,
          };
        }
        series.push(seriesItem);
      }

      // 为每个series设置参数方程（修正：移至函数内部）
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;
        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          true,
          false,
          0.08
        );
        startValue = endValue;
        legendData.push(series[i].name);
      }

      // 添加自定义弧形（使用当前angle值）
      series.push(
        {
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: (params: any, api: any) => ({
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 0.8,
              r: Math.min(api.getWidth(), api.getHeight()) / 1.5,
              startAngle: ((360 - angle) * Math.PI) / 180, // 使用angle变量
              endAngle: ((180 - angle) * Math.PI) / 180,
            },
            style: {
              fill: 'transparent',
              stroke: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#291801' },
                { offset: 0.5, color: '#8CE5C4' },
                { offset: 1, color: '#291801' },
              ]),
              lineWidth: 4,
            },
            scale: [1, Math.cos((60 * Math.PI) / 180)],
            silent: true,
          }),
          data: [0],
        },
        {
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: (params: any, api: any) => ({
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 0.87,
              r: Math.min(api.getWidth(), api.getHeight()) / 1.7,
              startAngle: ((360 - angle) * Math.PI) / 180,
              endAngle: ((180 - angle) * Math.PI) / 180,
            },
            style: {
              fill: 'transparent',
              stroke: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#243D3A' },
                { offset: 0.5, color: '#8CE5C4' },
                { offset: 1, color: '#243D3A' },
              ]),
              lineWidth: 5,
            },
            scale: [1, Math.cos((60 * Math.PI) / 180)],
            silent: true,
          }),
          data: [0],
        }
      );

      // 组装option并返回（修正：移至函数内部）
      option = {
        backgroundColor: 'transparent',
        legend: { show: false, data: legendData },
        title: {
          text: `{img|}{text|${value}}`,
          left: '100px',
          top: '35%',
          textStyle: {
            rich: {
              img: { height: 20, width: 15 },
              text: {
                fontSize: 25,
                fontWeight: 'bold',
                color: '#fff',
                verticalAlign: 'middle',
                padding: [0, 5, 0, 5],
              },
              pre: {
                fontSize: 15,
                color: '#f26a6a',
                verticalAlign: 'middle',
              },
            },
          },
        },
        xAxis3D: { min: -1, max: 1 },
        yAxis3D: { min: -1, max: 1 },
        zAxis3D: { min: -1, max: 1 },
        grid3D: {
          show: false,
          boxHeight: 0.1,
          viewControl: {
            alpha: 20,
            rotateSensitivity: 0,
            zoomSensitivity: 0,
            panSensitivity: 0,
          },
        },
        series: series,
      };
      return option; // 修正：函数内返回option
    }

    // 生成模拟数据
    let arr: any[] = [];
    let n = 50;
    for (let a = 0; a < 80; a++) {
      arr.push({
        name: 'a',
        value: 1,
        itemStyle: {
          color: a < 100 - n ? '#092b45' : '#29FEC8',
        },
      });
    }

    // 动画更新函数
    function updateChart() {
      angle += 3; // 角度递增
      const option = getPie3D(arr); // 重新生成配置
      myChart?.setOption(option, true);
    }

    // 初始化图表并启动动画
    myChart.setOption(getPie3D(arr));
    timer = window.setInterval(updateChart, 100); // 启动定时器
  }
});

onUnmounted(() => {
  myChart?.dispose();
  if (timer) clearInterval(timer); // 清除定时器，防止内存泄漏
});
</script>

<style scoped>
.bottomLeftOne {
  width: 300px;
  height: 140px;
  margin-top: -10px;
  margin-left: -70px;
}
</style>