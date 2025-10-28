<template>
  <div ref="chartRef" class="bottomLeftFour"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
  if (chartRef.value) {
    myChart = echarts.init(chartRef.value);

    // 图片icon
    var iconimg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAX1JREFUKFOFkTtok2EUhp/zfbk1hfD/hFhpEwnawRYrwUx10ckOgpu6KE4qdHOwGLSQoktBm0HEuYtQpdZaWqlbFnUQHJIhODilS8jFJBpb7Z8jkSpFaHu2w+HhvBcBaHxKORHbnDXd4FWM3UD0Lu3Wipwu/+jdd4/wXIfG4+/rz/puX0qYatZij6BSAn2MSoGQV5KRUu0vJCx3XuKZp+f68+8WBqYmHNOZoRsYwdBEaSMsgnkgJwuNHiS87syhZiyMl1mNnC+ejZXPsB2cRTgBWFQ3QDNse29If64JS40kNpSxqoedrc5kNZ6qEw5PIv57gAPaBSogb4F5+aNt6VsKCeTo+m+qK1+IHr8C9iFK9J9h1V4A6zvAz5TPejlX2jcq0VPl/T/0JEn/nZhpxJ6407cuRvLDqG9ubw/Lm48sOpb0V2Y+Dl4YcOR7Fg2O7p3Sq18vXPN1/kP8snvMlrMWX3L/HhY3j6YDxdZa4vr9Q9K6hoQOaPr/7g/YfwMYE6Mto6rp5wAAAABJRU5ErkJggg==';
    // 主体颜色
    const color = ['#3bb7b5','#f7d955','#d6ecfa','#ffc684']
    // 边框颜色
    const barBorderColor = ['rgba(59,183,181,.3)','rgba(247,217,85,.3)','rgba(214,236,250,.3)','rgba(255,198,132,.3)']
    // 渐变颜色
    const colorLine = [['#008E7F', '#00A3BB', '#68FBF9'],['#F4C913', '#F5CD2B', '#FFEA90'],['#EEF8FF', '#EEF8FF', '#EEF8FF','rgba(238, 248, 255, 0.5)'],['#FFB661', '#FFB661', '#FFB661']]
    // 斜纹背景颜色
    const backgroundColor = ['rgba(104, 251, 249, 0.5)','rgba(255, 234, 144, 0.5)','rgba(238, 248, 255, 0.5)','rgba(255, 182, 97, 0.5)']
    // 数据
    var list = [
      {
        "name": "2021",
        "value": 34233
      },
      {
        "name": "2022",
        "value": 31132
      },
      {
        "name": "2023",
        "value": 12322
      },
      {
        "name": "2024",
        "value": 2212
      }
    ];

    var names = list.map(item =>{ return item.name });
    var data = list.map(item => { return item. value });
    var all = 0
    list.map(item => {
      all += item.value
    })
    var seriesData1 = data.map((item, index) => {
      return {
          value: all,
          itemStyle: {
            color: "transparent", // 填充色
            barBorderColor: barBorderColor[index],
            shadowColor: color[index],
            barBorderWidth: 0.8, // 边框宽度
            opacity: 0.9,
            borderRadius: 10,
            label: {
              show: false,
            },
          },
      }
    });
    var seriesData2 = data.map((item, index) => {
      return {
          name: names[index],
          value: item,
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                  {
                    offset: 0,
                    color: colorLine[index][0], // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: colorLine[index][1], // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: colorLine[index][2], // 100% 处的颜色
                  },
              ],
            },
            decal: {
              color: backgroundColor[index],
              symbol: 'rect',
              symbolSize: 1,
              dashArrayY: [1, 0],
              dashArrayX: 20, //横条距离
              rotation: 60
            },
            shadowColor: colorLine[index][2],
            shadowBlur: 5,
            borderRadius: 5,
          },
      }
    })

    const option = {
      tooltip: {
          trigger: 'axis',
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)',
          backgroundColor: 'rgba(4, 17, 34, 0.9)',
          borderColor: 'rgba(4, 17, 34, 0.9)',
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          axisPointer: {
            type: 'shadow'
          },
      },
      backgroundColor: 'transparent',
      grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          top: "3%",
          containLabel: true
      },
      xAxis: {
          type: "value",
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
      },
      yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
                textStyle: {
                  color: "#ffffff",
                  fontSize: 10
                },
                inside: true,
                verticalAlign: 'bottom',
                lineHeight: 40,
                margin: 0,// 刻度标签与轴线之间的距离
                formatter: function (value) {
                  return `{img|}{a|${value}}`
                },
                rich: {
                  a: {
                    fontSize: 10,
                    color: '#ffffff',
                    padding: [4, 0, 0, 8], // 顺序为上右下左
                  },
                  img: {
                    width: 12,
                    height: 12,
                    align: 'center', 
                    padding: [3, 1, 0, 1],
                    verticalAlign: 'middle',
                    backgroundColor: {
                      image: iconimg,
                    }
                  }
                },
              },
              splitLine: {
                  show: false
              },
              axisTick: {
                  show: false
              },
              axisLine: {
                  show: false
              },
              data: names
          },
          {
            type: "category",
            inverse: true,
            axisLabel: {
                inside: true,
                verticalAlign: 'bottom',
                lineHeight: 40,
                formatter: function (value) {
                  return `{a|${value}}`
                },
                rich: {
                  a: {
                  fontSize: 10,
                  color: '#ffffff',
                  padding: [4, 0, 0, 0],
                  },
                },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#333',
              },
            },
            data: data
          },
      ],
      dataZoom: [
        {
          show: false, // 为true 滚动条出现
          startValue: 0,
          endValue: 10,
          yAxisIndex: [0, 1], //关联多个y轴
        },
        {
          //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
          type: "inside",
          yAxisIndex: 0,
          zoomOnMouseWheel: false, //滚轮是否触发缩放
          moveOnMouseMove: true, //鼠标滚轮触发滚动
          moveOnMouseWheel: true,
        },
      ],
      series: [
        // 背景
        {
        show: true,
        type: 'bar',
        barGap: '-100%',
        barWidth: '3', //统计条宽度 
        label: {
          show: false,
        },
        z: 1,
        data: seriesData1
        },
        // 主体
        {
        type: "bar",
        barGap: '-80%',
        barWidth: "3",
        legendHoverLink: false,
        silent: true,
        offset: [5, 0],
        data: seriesData2,
        z: 2,
        },
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
.bottomLeftFour {
  width: 400px;
  height: 280px;
  margin-left: -40px;
}
</style>
