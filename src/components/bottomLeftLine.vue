<template>
    <!-- 给图表容器加类名，便于控制样式 -->
  <div ref="chartRef" class="bottomLeftLine"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);

        const getLast7Hours = () =>{
            const hours = [];
            const now = new Date();
            for (let i = 0; i < 7; i++){
                const hour = new Date(now.getTime() - i * 60 * 60 * 1000).getHours();
                hours.unshift(hour.toString().padStart(2, '0') + ':00'); //格式化为"HH:00"
            }
            return hours;
        };

        const option = {
            legend: {
                data: ['line1', 'line2'], 
                right: '10%',
                icon: 'roundRect',
                itemWidth: 30,      // 图例标记的宽度
                itemHeight: 1,      // 图例标记的高度
                itemGap: 25,        // 图例项之间的间距
                textStyle: {
                    color: '#fff',   
                    fontSize: 10,  
                    fontWeight: 'normal' // 文字粗细
                },
            },
            grid: {
                top: '10%',
                bottom: '10%',
                right: '10%'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: getLast7Hours(),
                axisLabel: {
                    color: '#fff',
                    fontSize: 10
                },
                splitLine: {
                    show: false
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    color: '#fff',
                    fontSize: 10
                },
                splitLine: {
                    lineStyle: { color: 'rgba(255, 255, 255, 0)' }  // 网格线设为半透明
                },
            },
            series: [
                {
                    data: [320, 1232, 101, 334, 990, 130, 1020],
                    name: 'line1',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    smooth: true,
                    lineStyle: {
                        width: 1.5,
                        color: '#3970A5',  
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(16, 96, 176, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(10, 55, 84, 0.1)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
                },
                {
                    data: [220, 432, 301, 734, 290, 830, 620],
                    name: 'line2',
                    type: 'line',
                    areaStyle: {},
                    smooth: true,
                    lineStyle: {
                        width: 1.5
                    },
                    showSymbol: false,
                    areaStyle: {
                        opacity: 0.5,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(32, 193, 136, 1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(16, 38, 45, 0.5)'
                            }
                        ])
                    },
                    emphasis: {
                        focus: 'series'
                    },
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
.bottomLeftLine {
    width: 100%;
    height: 100%;
}
</style>