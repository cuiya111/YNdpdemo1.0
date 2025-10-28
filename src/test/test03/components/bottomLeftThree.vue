<template>
    <!-- 给图表容器加类名，便于控制样式 -->
  <div ref="chartRef" class="bottomLeftThree"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);

    const option = {
        legend: {
            data: ['line1', 'line2'], 
            top: '-5px',
            left: 'right',
            icon: 'roundRect',
            itemWidth: 30, // 图例标记的宽度
            itemHeight: 1, // 图例标记的高度
            itemGap: 25, // 图例项之间的间距
            textStyle: {
                color: '#fff', // 文字颜色（适配深色背景）
                fontSize: 12, // 文字大小
                fontWeight: 'normal' // 文字粗细
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: false
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }  // 网格线设为半透明
            },
        },
        series: [
            {
            data: [820, 232, 901, 634, 990, 130, 1020],
            name: 'line1',
            type: 'line',
            areaStyle: {},
            smooth: true
            },
            {
            data: [220, 432, 301, 734, 290, 830, 620],
            name: 'line2',
            type: 'line',
            areaStyle: {},
            smooth: true
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
.bottomLeftThree {
    width: 350px;
    height: 300px;
    margin-left: 20px;
    margin-top: -10px;
}
</style>