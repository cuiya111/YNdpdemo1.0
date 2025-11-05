<template>
  <div ref="chartRef" class="middleRightSche"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    if (!chartRef.value) return;
    const container = chartRef.value;
    if (container.offsetWidth === 0 || container.offsetHeight === 0) {
        console.warn('图表容器尺寸为0，请检查样式');
        return;
    }

    myChart = echarts.init(container);

    // 数据定义
    const firstValue = 200;       // 当日到达运单数
    const max = 500;              // 最大值
    const remainingValue = max - firstValue; // 剩余值

    const option = {
        backgroundColor: 'transparent',
        legend: {
            data: ['当日到达运单数', '当日转发运单数'],
            right: '8%',
            textStyle: { color: '#fff' },
            itemWidth: 25,
            itemHeight: 6,
            itemGap: 20,
        },
        yAxis: {
            type: 'category',
            data: ['进度'],
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: 'transparent' },
        },
        xAxis: {
            show: true,
            max: max,
            type: 'value',
            axisLine: { show: true, lineStyle: { color: '#666' } },
            // 主刻度线（对应坐标轴标签的刻度）
            axisTick: { 
                show: true,  // 显示刻度线
                length: 1,   // 刻度线长度
                lineStyle: { color: '#999' }  // 刻度线颜色
            },
            axisLabel: { show: true, color: '#999', formatter: '{value}' },
            // 辅助刻度线（网格线，作为主刻度之间的细分刻度）
            splitLine: {
                show: true,  // 显示辅助刻度线
                interval: 'auto',  // 自动计算间隔
                lineStyle: { 
                    color: 'rgba(255, 255, 255, 0.2)',  // 辅助线颜色（半透明）
                    type: 'solid'  // 实线（可改为'dashed'虚线）
                }
            },
            splitNumber: 5,  // 刻度分割数（5份，即0、100、200、300、400、500）
        },
        grid: {
            top: '40%',
            left: '5%',
            bottom: '20%',
            containLabel: true
        },
        animationDuration: 3000,
        series: [
        // 背景条（总进度）
        {
            name: '当日转发运单数',
            type: 'bar',
            barWidth: '10px',
            itemStyle: {
                color: '#2B99F9', // 蓝色背景
            },
            data: [{ value: max }],
            z: 1,
        },
        // 实际进度条（当日到达）
        {
            name: '当日到达运单数',
            type: 'bar',
            barWidth: '10px',
            itemStyle: {
                color: '#26D7C6', // 绿色进度
            },
            data: [{ value: firstValue }],
            label: {
                show: true,
                position: 'right',
                // // padding: [0, 0, 0, -20],
                // // formatter: `已完成: ${firstValue} / 剩余: ${remainingValue}`,
                // formatter: `${firstValue} {split| } ${remainingValue}`,
                // textStyle: { 
                //     color: '#fff', 
                //     fontSize: 12,
                //     rich: {
                //         split: {
                //             color: '#999',
                //             // padding: [0, '20%'] // 分隔符两侧间距
                //         },
                //     }
                // },
                useRichText: true
            },
            z: 2,
            barGap: '-100%',
        }
        ],
    };

    myChart.setOption(option);

    // 响应式处理
    const handleResize = () => myChart?.resize();
    window.addEventListener('resize', handleResize);

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        myChart?.dispose();
    });
});
</script>

<style scoped>
.middleRightSche {
  width: 100%;
  height: 100%;
}
</style>