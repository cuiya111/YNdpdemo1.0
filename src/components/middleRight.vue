<template>
    <div ref="chartRef" class="middleRight"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;


// 定义数据类型接口
interface PieDataItem {
    name: string;
    value: number;
    itemStyle?: {
        color: string;
        opacity?: number;
    };
}
onMounted(() => {
    if (!chartRef.value) return;
    myChart = echarts.init(chartRef.value);

    //getParametricEquation 函数（3D 饼图曲面参数方程生成）
    function getParametricEquation(startRatio:number, endRatio:number, isSelected:boolean, isHovered:boolean, k?:number, height?:number){
        //计算扇形的中间比例、起始/结束弧度
        const midRatio = (startRatio + endRatio) / 2;
        const startRadian = startRatio * Math.PI *2;
        const endRadian = endRatio * Math.PI * 2;
        const midRadian = midRatio * Math.PI * 2;

        //若为完整饼图，则不触发选中效果
        if (startRatio === 0 && endRatio === 1){
            isSelected = false;
        };

        //计算辅助参数k（控制扇形内外径比例）
        k = typeof k !== 'undefined' ? k: 1 / 3;

        //计算选中时的位移
        const offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0;
        const offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0;
        
        //计算高亮时的放大比例（默认1，高亮时1.05）
        let hoverRate  = isHovered ? 1.05 : 1;

        // 返回3D曲面的参数方程（定义x、y、z轴的计算逻辑）
        return {
            u: { min: -Math.PI, max: Math.PI * 3, step: Math.PI / 32 }, // u轴（角度维度）的范围和步长
            v: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },       // v轴（角度维度）的范围和步长
            x: function( u: number, v: number ) { // x坐标计算逻辑
                if ( u < startRadian ){
                    return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }; 
                if ( u > endRadian ){
                    return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                }; 
                return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
            },
            y: function( u: number, v: number ) { // y坐标计算逻辑
                if ( u < startRadian ) {
                    return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
                };
                if ( u > endRadian ) {
                    return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
                };
                return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
            },
            z: function( u: number, v: number ) { // z坐标计算逻辑（控制扇形高度）
                if ( u < -Math.PI * 0.5 ) {
                    return Math.sin(u);
                }
                if ( u > Math.PI * 2.5 ) {
                    return Math.sin(u);
                }
                return Math.sin(v) > 0 ? 1 * height : -1;
            }
        };
    };
    //getPie3D 函数（生成 3D 饼图系列配置）
    function getPie3D(pieData:PieDataItem[], internalDiameterRatio?:number): echarts.SeriesOption[] {
        const series: echarts.SeriesOption[] = [];
        const legendData: string[] = [];
        let sumValue = 0;
        let startValue = 0;
        let endValue = 0;
        // 计算辅助参数k（控制内外径比例）
        const k = typeof internalDiameterRatio !== 'undefined' ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio) : 1 / 3;

        // 遍历数据，为每个扇形生成surface系列
        for (let i = 0; i < pieData.length; i++){
            sumValue += pieData[i].value;

            let seriesItem = {
                name: typeof pieData[i]?.name === 'undefined' ? `series${i}` : pieData[i]?.name,
                type: 'surface', // 类型：3D曲面
                parametric: true, // 启用参数方程
                wireframe: { show: false }, // 隐藏线框
                pieData: pieData[i],
                pieStatus: {
                    selected: false,
                    hovered: false,
                }  // 状态和参数k
            };
            if (typeof pieData[i]?.itemStyle != 'undefined'){
                const itemStyle: { color?: string; opacity?: number} = {};

                typeof pieData[i]?.itemStyle?.color != 'undefined' ? itemStyle.color = pieData[i].itemStyle.color : null;
                typeof pieData[i]?.itemStyle?.opacity != 'undefined' ? itemStyle.opacity = pieData[i].itemStyle.opacity : null;
                
                seriesItem.itemStyle = itemStyle;
            }
            series.push(seriesItem);       
            }

        // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
	    // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
        for (let i = 0; i < series.length; i++){
            endValue = startValue + series[i].pieData.value;
            console.log(series[i]);
            series[i].pieData.startRatio = startValue / sumValue;
            series[i].pieData.endRatio = endValue / sumValue;
		    series[i].parametricEquation = getParametricEquation(series[i].pieData.startRatio, series[i].pieData.endRatio, false, false, k,series[i].pieData.value);

		    startValue = endValue;

		    legendData.push(series[i].name);
		}

            // 补充3个透明圆环（用于模拟3D高亮的视觉支撑，实际不可见）
            series.push(
                {
                    name: 'mouseoutSeries',
                    type: 'surface',
                    parametric: true,
                    wireframe: { 
                        show: false 
                    },
                    itemStyle: { 
                        opacity: 0.1, 
                        color: '#E1E8EC' 
                    },
                    parametricEquation: { 
                        u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
                        v: { min: 0, max: Math.PI, step: Math.PI / 20 },
                        x: function (u: number, v: number) {
			                return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
                        },
                        y: function (u: number, v: number) {
                            return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
                        },
                        z: function (u: number, v: number) {
                            return Math.cos(v) > 0 ? -0.5 : -5;
                        },
                    } 
                },
                {
                    name: 'mouseoutSeries',
                    type: 'surface',
                    parametric: true,
                    wireframe: { 
                        show: false
                    },
                    itemStyle: { 
                        opacity: 0.1, 
                        color: '#E1E8EC' 
                    },
                    parametricEquation: { 
                        u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
                        v: { min: 0, max: Math.PI, step: Math.PI / 20 },
                        x: function (u: number, v: number) {
                            return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
                        },
                        y: function (u: number, v: number) {
                            return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
                        },
                        z: function (u: number, v: number) {
                            return Math.cos(v) > 0 ? -10 : -20;
                        },
                    } 
                },
                {
                    name: 'mouseoutSeries',
                    type: 'surface',
                    parametric: true,
                    wireframe: { 
                        show: false 
                    },
                    itemStyle: { 
                        opacity: 0.1,      //透明度
                        color: '#23609B'   
                    },
                        parametricEquation: { 
                            u: { min: 0, max: Math.PI * 2, step: Math.PI / 20 },
                            v: { min: 0, max: Math.PI, step: Math.PI / 20 },
                            x: function (u: number, v: number) {
                                return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
                            },
                            y: function (u: number, v: number) {
                                return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
                            },
                            z: function (u: number, v: number) {
                                return Math.cos(v) > 0 ? -40 : -40;
                            },
                        }
                } 
            );
            return series; // 返回生成的所有系列配置
        };

        //option 配置
        const colors = ['#0E88F9','#249EBA','#23D08F','#FDFA97']; // 颜色数组
        const xData = ['新能源材料', '金属及合金', '稀土材料', '钨材']; // 类目名称
        const yData = [80,50,20,30]; // 数值数据

        // 组装optionsData：每个类目对应{name, value, itemStyle}结构
        const optionsData: PieDataItem[] = [];
        for (let i = 0; i < xData.length; i++){
            optionsData.push(
                {
                    name: xData[i],
                    value: yData[i],
                    itemStyle: {
                        color: colors[i],
                    }
                }
            );
        }
        //计算总和
        const totalValue = yData.reduce((sum, val) => sum + val, 0);

        // 找到最大值及其占比
        const maxValue = Math.max(...yData);
        const maxIndex = yData.indexOf(maxValue);
        const maxName = xData[maxIndex];
        const maxPercentage = ((maxValue / totalValue) * 100).toFixed(1); // 保留一位小数

        // 生成3D饼图的series配置
        const series = getPie3D(optionsData, 0.8);

        // 补充2D饼图系列（用于辅助3D交互，实际不可见）
        series.push({
            name: 'pie2d',
            type: 'pie',

            label: {
                opacity: 1,
                fontSize: 12,
                lineHeight: 20,
            textStyle: {
                fontSize: 12,
            },
            },
	        labelLine: {
                length: 60,
                length2: 60,
	        },
            startAngle: -50, //起始角度，支持范围[0, 360]。
            clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
            radius: ['0', '0'],

            center: ['20%', '20%'],
            data: optionsData,
            itemStyle: {
                opacity: 0,
            },
        });

        // 最终ECharts配置项option
        const option = {
            //添加标题展示最大占比
            title: {
                text: `${maxPercentage}%`,
                subtext: `${maxName}`,
                left: 'center',
                top: '35%',     //占比距离顶部的距离
                textStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'bold'
                },
                subtextStyle: {
                    //color: colors[maxIndex], // 使用最大值对应的颜色
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 'normal'
                }
            },
            legend: { // 图例配置
                tooltip: { 
                    show: true 
                },
                data: xData,
                bottom: '15%',
                // left: '360px',
                top: '25%',
                itemGap: 15,
                itemWidth: 30, //单个图例项的宽度
                align: 'left',
                //orient: 'vertical', //垂直排列
                orient: 'horizontal',  //水平排列
                textStyle: { 
                    color: '#fff', 
                    fontSize: 11 
                }
            },
            animation: true, // 启用动画
            tooltip: { // 提示框配置
                formatter: (params: echarts.EChartsOption.TooltipFormatterParams) => {
                if (params.seriesName === 'mouseoutSeries' || params.seriesName === 'pie2d') {
                    return ` `;
                }
                // 类型断言确保安全访问
                const seriesItem = series[params.seriesIndex] as { pieData: PieDataItem };
                return `${params.seriesName}<br/>
                    <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color};"></span>
                    ${seriesItem.pieData.value}`;
                },
                textStyle: { fontSize: 12 }
            },
            backgroundColor: 'transparent', // 背景色
            labelLine: { show: false, lineStyle: { color: 'transparent' } }, // 隐藏标签线
            label: { show: false, color:'transparent', position: 'outside' }, // 隐藏标签
            xAxis3D: { min: -1, max: 1 }, // 3D x轴范围
            yAxis3D: { min: -1, max: 1 }, // 3D y轴范围
            zAxis3D: { min: -1, max: 1 }, // 3D z轴范围
            grid3D: { // 3D网格配置
                show: false,
                boxHeight: 0.5,
                bottom: '20%',
                viewControl: { // 3D视角控制
                    distance: 280, // 适配300x300容器
                    alpha: 25,
                    beta: 60,
                    autoRotate: true, // 自动旋转
                    autoRotateSpeed: 20
                }
            },
            series: series // 传入所有系列配置
        };
            
        myChart.setOption(option);

        // 窗口resize适配
        const handleResize = () => {
            myChart?.resize();
        };
        window.addEventListener('resize', handleResize);

        // 组件卸载时移除监听
        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });
});

// 5. 组件卸载时销毁图表
onUnmounted(() => {
    myChart?.dispose();
});

</script>

<style scoped>
.middleRight {
  width: '100%';
  height: 350px;
  margin-top: -80px;
  /* margin-left: 10px; */
  /* position: relative;  确保子元素定位正常 */
}
</style>