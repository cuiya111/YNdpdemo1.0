<template>
    <div ref="chartRef" class="middleRightPie"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';


const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;
let loopTimer: NodeJS.Timeout | null = null;
let selectedIndex: number | null = null;
let hoveredIndex: number | null = null;

// 定义数据类型接口
interface PieDataItem {
    name: string;
    value: number;
    itemStyle?: {
        color: string;
        opacity?: number;
    };
    startRatio?: number;
    endRatio?: number;
}

onMounted(() => {
    if (!chartRef.value) return;
    myChart = echarts.init(chartRef.value);
    
    // 生成扇形的曲面参数方程
    function getParametricEquation(
        startRatio: number,
        endRatio: number,
        isSelected: boolean,
        isHovered: boolean,
        k?: number,
        h?: number
    ) {

        const startRadian = startRatio * Math.PI * 2;
        const endRadian = endRatio * Math.PI * 2;

        if (startRatio === 0 && endRatio === 1) {
            isSelected = false;
        }

        k = k || 1 / 3;
        const offsetX = 0;
        const offsetY = 0;
        const hoverRate = isHovered ? 1.0 : 1;
        const selectScale = isSelected ? 1.02 : 1;
        // 横向缩放因子（>1 横向拉伸，<1 横向压缩）//horizontalScale 的值越大，横向拉伸越明显
        const horizontalScale = 1.3; 
        // 纵向缩放因子（>1 纵向拉伸，<1 纵向压缩）
        const verticalScale = 0.9; 

        return {
            u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 },
            v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
            x(u: number, v: number) {
                let x;
                if (u < startRadian) x = Math.cos(startRadian);
                else if (u > endRadian) x = Math.cos(endRadian);
                else x = Math.cos(u);    
                return offsetX + x * (1 + Math.cos(v) * k) * hoverRate * selectScale * horizontalScale;   
            },
            y(u: number, v: number) {
                let y;
                if (u < startRadian) y = Math.sin(startRadian);
                else if (u > endRadian) y = Math.sin(endRadian);
                else y = Math.sin(u); 
                return offsetY + y * (1 + Math.cos(v) * k) * hoverRate * selectScale * verticalScale;
            },
            //z轴凸起高度
            z(u: number, v: number) {
                const baseZ = Math.sin(v) > 0 ? (h || 20) * 0.3 : -1;
                return isSelected ? baseZ * 2 : baseZ;  
            },
        };
    }

    // 生成3D饼图配置项
    function getPie3D(
        pieData: PieDataItem[],
        totalValue: number,
        internalDiameterRatio?: number
    ): echarts.EChartsOption {
        const series: any[] = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        const legendData: string[] = [];
        const k = typeof internalDiameterRatio !== 'undefined'
            ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
            : 1 / 3;

        // 计算总和
        pieData.forEach(item => sumValue += item.value);

        // 构建系列数据
        pieData.forEach((item, i) => {
            series.push({
                name: item.name,
                type: 'surface',
                parametric: true,
                wireframe: { show: false },
                pieData: { ...item },
                pieStatus: { selected: false, hovered: false, k },
                itemStyle: item.itemStyle,
                totalValue
            });
        });

        // 计算比例并设置参数方程
        series.forEach((item, i) => {
            endValue = startValue + item.pieData.value;
            item.pieData.startRatio = startValue / sumValue;
            item.pieData.endRatio = endValue / sumValue;
            item.parametricEquation = getParametricEquation(
                item.pieData.startRatio,
                item.pieData.endRatio,
                false,
                false,
                k,
                20
            );
            startValue = endValue;
            legendData.push(item.name);
        });

        // 找到最大值数据用于初始标题
        const maxValue = Math.max(...pieData.map(item => item.value));
        const maxIndex = pieData.findIndex(item => item.value === maxValue);
        const maxName = pieData[maxIndex].name;
        const maxPercentage = ((maxValue / totalValue) * 100).toFixed(1);

        return {
            tooltip: {
                formatter: (params: any) => `${params.seriesName}
                        <br/>
                            <span 
                                style="display:inline-block;
                                margin-right:5px;
                                border-radius:10px;
                                width:10px;
                                height:10px;
                                background-color:${params.color};">
                            </span>${series[params.seriesIndex].pieData.value}`
            },
            legend: {
                data: legendData,
                // top: '32%',
              right: '10%',
                orient: 'vertical',    // 图例纵向排列
                // left: 'right',         // 图例居右（核心配置）
                top: 'center',         // 图例垂直居中
                textStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                itemWidth: 30,
                itemHeight: 10,
                itemGap: 25,
                // orient: 'horizontal'
            },
            xAxis3D: { min: -1, max: 1 },
            yAxis3D: { min: -1, max: 1 },
            zAxis3D: { min: -1, max: 1 },
            grid3D: {
                show: false,
                boxHeight: 5,
                left: '-25%',
                viewControl: {
                    alpha: 30,              // 固定水平视角
                    beta: 0,                // 固定垂直视角
                    rotateSensitivity: 0,   // 禁用手动旋转
                    zoomSensitivity: 0,     // 禁用缩放
                    panSensitivity: 0,      // 禁用平移
                    autoRotate: false,      // 关闭自动旋转
                    distance: 150,
                },
            },
            series,
        };
    }

    // 选中扇形逻辑（同步标题与扇形呼应）
    function selectSector(index: number, option: echarts.EChartsOption) {
        if (!myChart) return;

        // 取消上一个选中项
        if (selectedIndex !== null && selectedIndex !== index) {
            const prev = option.series![selectedIndex] as any;
            prev.pieStatus.selected = false;
            prev.parametricEquation = getParametricEquation(
                prev.pieData.startRatio,
                prev.pieData.endRatio,
                false,
                prev.pieStatus.hovered,
                prev.pieStatus.k,
                20
            );
        }

        // 选中当前项并更新凸起状态
        const current = option.series![index] as any;
        current.pieStatus.selected = true;
        current.parametricEquation = getParametricEquation(
            current.pieData.startRatio,
            current.pieData.endRatio,
            true,
            current.pieStatus.hovered,
            current.pieStatus.k,
        );
        
        // 同步更新标题
        const percentage = ((current.pieData.value / current.totalValue) * 100).toFixed(1);
        option.title = {
                text: `${percentage}%`,
                subtext: current.name,
                left: '24%',
                top: '15%',
                textAlign: 'center', // 关键：让标题和副标题在自身区域内居中对齐
                textStyle: {
                    color:  '#fff',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                subtextStyle: {
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 'normal',
                    padding: [5, 0, 0, 0]  //上右下左
                }
        };
        myChart.setOption(option);
        selectedIndex = index;
    }  

    // 启动自动轮巡
    function startAutoLoop(option: echarts.EChartsOption, interval = 2000) {
        if (loopTimer) clearInterval(loopTimer);

        let currentIndex = 0;
        const sectorCount = option.series!.length;

        selectSector(currentIndex, option);

        loopTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % sectorCount;
            selectSector(currentIndex, option);
        }, interval);
    }

    // 饼图数据
    const colors = ['#0E88F9', '#249EBA', '#23D08F', '#FDFA97'];
    const xData = ['新能源材料', '金属及合金', '稀土材料', '钨材'];
    const yData = [180, 250, 320, 180];
    const totalValue = yData.reduce((sum, val) => sum + val, 0);

    // 组装数据
    const optionsData: PieDataItem[] = xData.map((name, i) => ({
        name,
        value: yData[i],
        itemStyle: { color: colors[i] }
    }));

    // 初始化配置
    const option = getPie3D(optionsData, totalValue, 0.7);  

    // 鼠标悬停事件
    myChart.on('mouseover', (params: any) => {
        if (loopTimer) clearInterval(loopTimer);

        if (hoveredIndex === params.seriesIndex) return;

        // 重置上一个悬停项
        if (hoveredIndex !== null) {
            const prev = option.series![hoveredIndex] as any;
            prev.pieStatus.hovered = false;
            prev.parametricEquation = getParametricEquation(
                prev.pieData.startRatio,
                prev.pieData.endRatio,
                prev.pieStatus.selected,
                false,
                prev.pieStatus.k,
            );
        }

        if (params.seriesName !== 'mouseoutSeries') {
            const current = option.series![params.seriesIndex] as any;
            current.pieStatus.hovered = true;
            current.parametricEquation = getParametricEquation(
                current.pieData.startRatio,
                current.pieData.endRatio,
                current.pieStatus.selected,
                true,
                current.pieStatus.k,
            );
            hoveredIndex = params.seriesIndex;

            const percentage = ((current.pieData.value / totalValue) * 100).toFixed(1);
            myChart?.setOption({
                title: {
                    text: `${percentage}%`,
                    subtext: current.name,
                    textStyle: {
                        color: current.pieData.itemStyle?.color || '#fff'
                    }
                }
            });
        }

        myChart?.setOption(option);
    });

    // 鼠标离开事件
    myChart.on('globalout', function () {
        if (hoveredIndex !== null) {
            const prev = option.series![hoveredIndex] as any;
            prev.pieStatus.hovered = false;
            prev.parametricEquation = getParametricEquation(
                prev.pieData.startRatio,
                prev.pieData.endRatio,
                prev.pieStatus.selected,
                false,
                prev.pieStatus.k,
            );
            hoveredIndex = null;
            myChart?.setOption(option);
        }
        startAutoLoop(option, 2000);
    });

    // 初始化图表并启动轮巡
    myChart.setOption(option);
    startAutoLoop(option, 2000);

    // 窗口resize适配
    const handleResize = () => myChart?.resize();
    window.addEventListener('resize', handleResize);


    // 组件卸载清理
    onUnmounted(() => {
        if (loopTimer) clearInterval(loopTimer);
        myChart?.dispose();
    });
});
</script>

<style scoped>
.middleRightPie {
    width: 100%;
    height: 100%;
}
</style>