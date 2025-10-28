<template>
    <div ref="chartRef" class="bottomRight"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);

        const plantCap = [
            {name: '当季生成的发电量'},
            {name: '当月生成的发电量'}, 
            {name: '当日新生成的发电量'},
        ];

        const dataList = [
            {
                offset: [70, 65],
                symbolSize: 95,
                opacity: 0.9,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#174637'},
                    { offset: 1, color: '#29B689'}
                ])
            },
            {
                offset: [95, 45],
                symbolSize: 80,
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#7DB3D8'},
                    { offset: 1, color: '#BEC178'}
                ])
            },
            {
                offset: [70, 30], //位置
                symbolSize: 60,
                opacity: 0.9,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {offset: 0, color: '#083A6A'},
                        {offset: 1, color: '#7DB3D8'},
                ]),
            },
        ];

        const datas = plantCap.map((item, i) => {
            const itemToStyle = dataList[i];
            return {
            name: item.name,
            value: itemToStyle.offset,
            symbolSize: itemToStyle.symbolSize,
            label: {
                show: true,
                formatter: '{b}',  //formatter是格式化器,{b} 是 ECharts 提供的模板变量，代表数据项的 “名称（name）”
                textStyle: {
                    fontSize: 14,
                    color: '#fff'
                }
            },
            itemStyle: {
                color: itemToStyle.color,
                opacity: itemToStyle.opacity
            }
            };
        });

        const option: echarts.EChartsOption = {
            grid: {
                show: false,
                top: 10,
                bottom: 10
            },
            xAxis: [
                {
                    type: 'value',
                    show: false,
                    min: 0,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 5
                }
            ],
            yAxis: [
                {
                    min: 0,
                    show: false,
                    max: 100,
                    nameLocation: 'middle',
                    nameGap: 30
                }
            ],
            series: [
                {
                    type: 'effectScatter',  //动态的涟漪动画效果
                    symbol: 'circle',
                    symbolSize: 100,
                    rippleEffect:{
                        period: 5,
                        brushType: 'stroke', //涟漪以“描边”的方式绘制
                        scale: 3,
                        color: 'rgb(125, 179, 216, 0.5)'
                    },
                    label: {
                        show: true,
                        formatter: '{b}',
                        color: '#fff',
                        fontSize: 20
                    },
                    data: datas
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
.bottomRight {
  width: '100%';
  height: 300px;
  margin-left: 20px;
}

</style>