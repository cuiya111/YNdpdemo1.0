<template>
  <div ref="chartRef" class="bottomLeftBar"></div>
  <div class="chartName">年生产能力</div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;
let timer: number | null = null; // 保存定时器ID

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);
    window.addEventListener('reset', handleResize);

    let angle = 0; // 角度变量，用于动画

    // 生成扇形的曲面参数方程
    function getParametricEquation(
      startRatio: number,
      endRatio: number,
      isSelected: boolean,
      isHovered: boolean,
      k: number
    ) 
    {
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
        : 2 / 3;

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
        //底部外线
        {
          type: 'custom',
          coordinateSystem: 'none',
          animation: false,
          animationDuration: 0,
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
                { offset: 0, color: '#163030' },
                { offset: 0.55, color: '#8CE5C4' },
                { offset: 1, color: '#8CE5C4' },
              ]),
              lineWidth: 2.5,
            },
            scale: [1, Math.cos((60 * Math.PI) / 180)],
            silent: true,
          }),
          data: [0],
        },
        //底部内线
        {
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: (params: any, api: any) => ({
            type: 'arc',
            shape: {
              cx: api.getWidth() / 2,
              cy: api.getHeight() / 0.87,
              r: Math.min(api.getWidth(), api.getHeight()) / 1.7,
              // startAngle: ((360 - angle) * Math.PI) / 180,
              // endAngle: ((180 - angle) * Math.PI) / 180,
              startAngle: 0,
              endAngle: Math.PI,
            },
            style: {
              fill: 'transparent',
              stroke: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#243D3A' },
                { offset: 0.5, color: '#8CE5C4' },
                { offset: 1, color: '#243D3A' },
              ]),
              lineWidth: 1.5,
            },
            scale: [1, Math.cos((60 * Math.PI) / 180)],
            silent: true,
          }),
          data: [0],
        },
        //线上圆点
        {
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: (params: any, api: any) => {
            const x0 = api.getWidth() / 2;
            const y0 = api.getHeight() / 0.8;
            const r = Math.min(api.getWidth(), api.getHeight()) / 1.5;
            const point = getCirlPoint(x0, y0, r, ( -angle ));
            
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              }, 
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: '#71BDA4' },
                  { offset: 0.5, color: '#71BDA4' },
                  { offset: 1, color: '#51A789' },
                ]),
                shadowBlur: 10, // 光晕效果 
                shadowColor: 'rgba(188, 224, 250, 0.8)',
                lineWidth: 0 // 无边框
              },
              // 应用与弧线相同的缩放（确保位置对齐）
              scale: [1, Math.cos((60 * Math.PI) / 180)],
              silent: true
            };
          },
            data: [0],
        },
      ),


      // 组装option并返回（修正：移至函数内部）
      option = {
        backgroundColor: 'transparent',
        legend: { 
          show: false, 
          data: legendData 
        },
        title: {
          text: `{img|}{text|${value}}`,
          subtext: `${currentData}/${targetData}`,
          left: 'center',
          top: '20%',
          textStyle: {
            rich: {
              img: { height: 15, width: 10 },
              text: {
                fontSize: 25,
                fontWeight: 'bold',
                color: '#fff',
                verticalAlign: 'middle',
                padding: [0, 5, 0, 5],
              },
              pre: {
                fontSize: 15,
                color: '#fff',
                verticalAlign: 'middle',
              },
            },
          },
          subtextStyle: {
            fontSize: 10,
            color: '#fff',
            fondFamily: 'inherit', //保持字体统一
            fondWidth: 'normal',
            verticalAlign: 'middle',
            padding: [1, 0, 0, 0], //padding 数组顺序为 [上, 右, 下, 左]
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
    const targetData= 1300;
    const currentData = 767;
    let value = '0%'; // 初始值从0开始
    const targetPercent = Math.floor((currentData / targetData) * 100); // 动画过程中的当前百分比
    let currentPercent = 0;

    // 生成与百分比匹配的颜色数据
    let arr: any[] = [];
    // 总数据量设为100，确保与百分比完全对应（1个数据=1%）
    for (let a = 0; a < 80; a++) {
      arr.push({
        name: 'a',
        value: 1,
        itemStyle: {
          color: a < 100 - targetPercent ? '#092b45' : '#29FEC8',
        },
      });
    }

    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
            x: x1,
            y: y1
        }
    }

    // 动画更新函数
    function updateChart() {
      angle += 3; // 角度递增
      const option = getPie3D(arr); // 重新生成配置
      myChart?.setOption(option, true);
    }

    function animateValue() {
      const duration = 500; // 动画总时长（毫秒）
      const frameDuration = 20; // 每帧时长（约60fps）
      const totalFrames = duration / frameDuration; // 总帧数
      const increment = targetPercent / totalFrames; // 每帧增长值

      let frame = 0;
      const animationTimer = setInterval(() => {
        frame++;
        currentPercent += increment;
        // 确保最终值准确等于目标值
        if (frame >= totalFrames) {
          currentPercent = targetPercent;
          clearInterval(animationTimer);
        }
        // 更新显示值（保留整数百分比）
        value = `${Math.floor(currentPercent)}%`;
        // 刷新图表
        myChart?.setOption(getPie3D(arr));
      }, frameDuration);
    }

    // 初始化图表并启动动画
    myChart.setOption(getPie3D(arr));
    animateValue(); // 启动从0到目标值的增长动画
    timer = window.setInterval(updateChart, 100); // 启动定时器
  }
});

onUnmounted(() => {
  myChart?.dispose();
  if (timer) clearInterval(timer); // 清除定时器，防止内存泄漏
  window.removeEventListener('resize', handleResize); // 销毁时解绑
});

const handleResize = () => {
  myChart?.resize(); // ECharts 自带 resize 方法
};
</script>

<style scoped>
.bottomLeftBar {
  width: 100%;
  height: 85%;
}
.chartName {
  color: #fff;
  font-size: 14px;
}
</style>