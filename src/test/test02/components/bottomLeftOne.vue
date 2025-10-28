<template>
    <!-- 给图表容器加类名，便于控制样式 -->
  <div ref="chartRef" class="bottomLeftOne"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);

        // 定义起始和结束角度
        const startAngle = 240;
        const endAngle = -60;

        // 初始化 ECharts 实
        // 更新图表选项的函数
        function updateChart() {
            // 生成一个在 0 到 10 之间的随机数，并保留两位小数
            const randomValue = (Math.random() * 10).toFixed(2);

            // 定义图表的配置项
            const option = {
                backgroundColor: '#03191C',
                title: [
                    {
                        text: `{value|${randomValue}%}\n{name|${'需求量'}}`,
                        left: 'center',
                        bottom: '40%',
                        textStyle: {
                            rich: {
                                value: {
                                    fontSize: '30',  //百分比
                                    color: '#ffffff',
                                    padding: [8, 0]
                                },
                                name: {
                                    fontSize: '15',  //需求量
                                    color: '#ffffff'
                                }
                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '最外层-刻度尺',
                        type: 'gauge',
                        radius: '95%',
                        startAngle,
                        endAngle,
                        axisLine: {
                            lineStyle: {
                                color: [[1, 'rgba(25, 235, 255, 1)']],  //刻度尺-圆弧
                                width: 1
                            }
                        },
                        axisTick: {
                            distance: -6,
                            length: 7,
                            lineStyle: {
                                color: 'rgba(25, 235, 255, 1)'  //刻度尺-短齿
                            },
                            splitNumber: 10
                        },
                        splitLine: {
                            distance: -11,
                            length: 14,
                            lineStyle: {
                                color: 'rgba(25, 235, 255, 1)',  //刻度尺-长齿
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: false
                        },
                        pointer: {
                            show: false
                        }
                    },
                    // 内层带指针
                    {
                        name: '内层带指针',
                        type: 'gauge',
                        radius: '82%',
                        startAngle,
                        endAngle,
                        axisLine: {
                            lineStyle: {
                                color: [[1, 'rgba(25, 235, 255, 0.2)']], //内层
                                width: 20
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            show: false
                        },
                        detail: {
                            show: false
                        },
                        pointer: {
                            show: false,
                            length: '86%',
                            offsetCenter: [0, '-24%'],
                            width: 12,
                            icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                        },
                        progress: {
                            show: false,
                            width: 40,
                        },
                        data: [
                            {
                                value: 43
                            }
                        ]
                    },
                    // 中心效果圆
                    {
                name: '中心效果圆',
                type: 'gauge',
                radius: '54%',
                startAngle: 0,
                endAngle: 360,
                axisLine: {
                    lineStyle: {
                    color: [[1, '#0AFFE9']],
                    width: 1
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                detail: {
                    show: false
                },
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    width: 80,
                    itemStyle: {
                    color: {
                        type: 'radial',
                        x: 0.5,
                        y: 0.5,
                        r: 0.5,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgb(0, 224, 205, 0)'   //渐变色
                            },
                            {
                                offset: 0.7,
                                color: 'rgba(0, 224, 205, 0)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(10, 255, 233, 1)'
                            }
                        ]
                    }
                    }
                },
                data: [
                    {
                    value: 100
                    }
                ]
            },
                    {
                        type: 'pie',
                        radius: ['90%', '89.5%'],
                        hoverAnimation: false,
                        clockWise: false,
                        itemStyle: {
                            normal: {
                                color: '#000'
                            }
                        },
                        label: {
                            show: false
                        },
                        data: [100]
                    }
                ]
            };

            // 使用设置的配置项和数据显示图表
            myChart?.setOption(option);
        }

        // 初始化图表
        updateChart(); // 首次加载图表
        // 每 2000 毫秒（即 2 秒）更新一次图表
        setInterval(updateChart, 5000);
    }
});


    onUnmounted(() => {
        myChart?.dispose();
    });

</script>

<style scoped>
/* 让图表容器占满父组件空间 */
.bottomLeftOne {
    width: 350px;
    height: 200px;
    margin-left: -20px;
    margin-top: 10px;
}
</style>