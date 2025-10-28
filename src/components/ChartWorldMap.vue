<template>
    <div ref="chartRef" class="chart-wrapper"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
// 引入地图数据
import worldMap from '../assets/map/data-1598770376853-S8m1N7TvW.json'
import { walkUpBindingElementsAndPatterns } from 'typescript';
import { TooltipComponent } from 'echarts/components';
// 图表1. 响应式Dom元素和echarts图表实例定义
const chartRef = ref(null)
let chartInstance = null

// 图表2.世界地图图表实例的初始化、配置、渲染并绑定事件
const initChart = (mapName, mapData) => {
  if (!chartRef.value) return
  // 先销毁再创建ECharts实例，绑定到容器，注册地图
  chartInstance?.dispose()
  chartInstance = echarts.init(chartRef.value);
  // 注册地图
  echarts.registerMap(mapName, mapData)
  // 地图配置
  const option = {
    backgroundColor: '#404a59',
    
    tooltip: mapTooltip,
    geo: {      
      type: 'map',
      map: mapName,
      zoom: 4.6,
      center: [117.97, 31.71],
      nameMap: worldMapName,  // 将国家名的英文转为中文
      roam: true,
      scaleLimit: { min: 0.8, max: 20 },
      aspectScale: 0.75,
      label: {
        show: false,
        color:'#fff',
        emphasis: {
            show: true,
            color:'#fff'
        }
      },
      itemStyle: {
        borderColor: '#0f5a70',
        borderWidth: 0.8,
        areaColor: {
          type: 'linear-gradient',
          x: 1000,
          y: 600,
          x2: 1000,
          y2: 0,
          colorStops: [{
            offset: 0, color: '#274d68' // 0% 处的颜色
          }, {
            offset: 1, color: '#09132c' // 50% 处的颜色
          }],
          global: true, // 缺省为 false
        },
        opacity: 0.8,
      },
      regions: [{ // 北部
          name: '内蒙古自治区',
          itemStyle: provinceItemStyle
      }, {
          name: '黑龙江省',
          itemStyle: provinceItemStyle
      }, {
          name: '吉林省',
          itemStyle: provinceItemStyle
      }, {
          name: '辽宁省',
          itemStyle: provinceItemStyle
      }, {
          name: '山东省',
          itemStyle: provinceItemStyle
      }, { // 西部
          name: '新疆维吾尔自治区',
          itemStyle: provinceItemStyle
      }, {
          name: '西藏自治区',
          itemStyle: provinceItemStyle
      }, {
          name: '青海省',
          itemStyle: provinceItemStyle
      }, {
          name: '甘肃省',
          itemStyle: provinceItemStyle
      }, {
          name: '宁夏回族自治区',
          itemStyle: provinceItemStyle
      }, {
          name: '四川省',
          itemStyle: provinceItemStyle
      }, {
          name: '重庆市',
          itemStyle: provinceItemStyle
      }, { // 南部
          name: '云南省',
          itemStyle: provinceItemStyle
      }, {
          name: '广西壮族自治区',
          itemStyle: provinceItemStyle
      }, {
          name: '贵州省',
          itemStyle: provinceItemStyle
      }, {
          name: '广东省',
          itemStyle: provinceItemStyle
      }, {
          name: '湖南省',
          itemStyle: provinceItemStyle
      }, {
          name: '海南省',
          itemStyle: provinceItemStyle
      }, {
          name: '香港',
          itemStyle: provinceItemStyle
      }, {
          name: '澳门',
          itemStyle: provinceItemStyle
      }, {
          name: '南海诸岛',
          itemStyle: provinceItemStyle
      }, { // 东部
          name: '福建省',
          itemStyle: provinceItemStyle
      },{
          name: '上海市',
          itemStyle: provinceItemStyle
      },  {
          name: '浙江省',
          itemStyle: provinceItemStyle
      }, {
          name: '江苏省',
          itemStyle: provinceItemStyle
        }, {
          name: '台湾省',
          itemStyle: provinceItemStyle
      }, {
          name: '安徽省',
          itemStyle: provinceItemStyle
      }, {
          name: '江西省',
          itemStyle: provinceItemStyle
      }, { // 中部
          name: '北京市',
          itemStyle: provinceItemStyle
      }, {
          name: '天津市',
          itemStyle: provinceItemStyle
      }, {
          name: '陕西省',
          itemStyle: provinceItemStyle
      }, {
          name: '山西省',
         itemStyle: provinceItemStyle
      }, {
          name: '河北省',
          itemStyle: provinceItemStyle
      }, {
          name: '河南省',
          itemStyle: provinceItemStyle
      }, {
          name: '湖北省',
          itemStyle: provinceItemStyle
      },
    ],
    },
    series: [
      { // 带有涟漪特效动画的散点
        type: 'effectScatter',
        coordinateSystem: 'geo', // 坐标系，绑定到geo组件
        geoIndex: 0,
        symbol: 'circle',
        symbolSize: 6,
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke',
            scale: 10
        },
        hoverAnimation: true,
        label: {
            show: true,
            formatter: name => {
                return name.data[2];
            },
            position: 'right',
            color: '#fff',
            fontSize: 14,
            distance: 10
        },
        itemStyle: {
            color: 'rgba(0, 255, 246, 1)',
        },
        data: convertData(data)
      }, { // 带有涟漪特效动画的散点
        type: 'effectScatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        silent: true,
        symbol: 'circle',
        symbolSize: 4,
        showEffectOn: 'render',
        rippleEffect: {
            brushType: 'stroke',
            scale: 6
        },
        hoverAnimation: true,
        itemStyle: {
            color: 'rgba(255, 255, 255, 0.8)',
        },
        data: convertData(data)
      }
    ]
  }
  
  chartInstance.hideLoading();
  chartInstance.setOption(option);
  bindMapEvents();
}

// 图表2.中国各省地图图表实例的初始化、配置、渲染并绑定事件
const initChinaProvenceMap = (mapName, mapData) => {
  console.log('开始'+mapName+'地图绘制');
  if (!chartRef.value) return
  // 先销毁再创建ECharts实例，绑定到容器，注册地图器
  chartInstance?.dispose()
  chartInstance = echarts.init(chartRef.value);
  echarts.registerMap(mapName, mapData)
  
  const options = {
    backgroundColor: '#182F49',
    tooltip: mapTooltip,
    geo: {
      map: mapName,          // 关联已注册的地图标识
      zoom: 1,               // 初始缩放比例
      roam: true,           // 关闭geo组件自身的漫游（由series控制）
      animation: false,      // 关闭动画（提升性能）
      label: {
        show: true,
        color:'#fff',
        emphasis: {
            show: true,
            color:'#fff'
        }
      },
      itemStyle: provinceItemStyle,
    },
  };

  chartInstance.hideLoading();
  chartInstance.setOption(options);
  bindMapEvents();
}

// 图表3.地图绑定双击和单击事件函数
let clickTimer = null;  // 单击延时计时器
function bindMapEvents() {
  // 避免在实例未创建时绑定事件
  if (!chartInstance) return;

  // 单击事件：延迟250ms执行，用于区分双击
  chartInstance.on('click', (params) => {
    // 清除上一次单击的延迟计时器（防止连续点击冲突）
    clearTimeout(clickTimer);
    // 250ms后执行单击处理逻辑（若250ms内触发双击则会被清除）
    clickTimer = setTimeout(async function(){
      const mapName = params.name; 
      console.log('！！！这里单击了' + params.name);
      const module = await import(`../assets/map/provence/${mapName}.json`)
      const mapData = module.default; 
      if (!mapData) return;
      initChinaProvenceMap(mapName, mapData);
    }, 250);
  });

  // 双击事件：立即执行返回上一级逻辑
  chartInstance.on('dblclick', (params) => {
    console.log('这里双击了'+params.name+'，跳转到世界地图')
    // 清除单击计时器，确保双击时不触发单击逻辑
    clearTimeout(clickTimer);
    initChart('world', worldMap); // 使用'china'会显示南海诸岛
  });
}

// 窗口resize处理
const handleResize = () => {
  chartInstance?.resize()
}

onMounted(() => {
  initChart('world', worldMap);
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})

// 公共样式1. 世界地图中的中国省级区域样式
const provinceItemStyle = {
  areaColor: {         // 区域填充色（径向渐变）
    type: 'radial',    // 径向渐变类型
    x: 0.5, y: 0.5,    // 渐变中心坐标
    r: 0.9,            // 渐变半径
    colorStops: [      // 渐变颜色节点
        { offset: 0, color: 'rgba(147, 235, 248, 1)' }, // 中心颜色
        { offset: 1, color: 'rgba(2, 99, 206, 1)' }    // 边缘颜色
    ],
    globalCoord: false  // 不使用全局坐标
  },
  shadowColor: '#105781', // 区域阴影颜色
  shadowOffsetX: 0,       // 阴影水平偏移
  shadowOffsetY: 15,      // 阴影垂直偏移
  opacity: 0.5  ,         // 区域透明度
  emphasis: {
      borderColor: '#fff', // hover 时省级边界变白
      borderWidth: 4
  }
}
// 公共样式2. 提示框
const mapTooltip = {
  trigger: 'item',
  position: function (point, params, dom, rect, size) {
    var x = 0; // x坐标位置
    var y = 0; // y坐标位置
    // 当前鼠标位置
    var pointX = point[0];
    var pointY = point[1];
    // 提示框大小
    var boxWidth = size.contentSize[0];
    var boxHeight = size.contentSize[1];

    // boxWidth > pointX 说明鼠标左边放不下提示框
    if (boxWidth > pointX) {
        x = pointX + 10;
    } else { // 左边放的下
        x = pointX - boxWidth - 10;
    }

    // boxHeight > pointY 说明鼠标上边放不下提示框
    if (boxHeight > pointY) {
        y = 5;
    } else { // 上边放得下
        y = pointY - boxHeight;
    }
    return [x, y];
  },
  show: true,
  enterable: true,
  textStyle: {
    fontSize: 13,
    color: '#fff',
  },
  backgroundColor: 'rgba(0,2,89,0.8)',
  formatter: (params) => {
    if (params.data)
      return (
        params.name +
        '<br/>总数：' + params.data['value'] + '万'
      );
  },
  extraCssText:
    "background:url('./image/tip.png') 100% 100% repeat;width:185px;height:130px;z-index:20px;",
}

// 函数1. 将各城市的数据依据城市经纬度标在地图上
const convertData = function(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(data[i].value)
      });
    }
  }
  return res;
};


// 常量1.世界主要国家名称中文映射
const worldMapName = {
    'Afghanistan': '阿富汗',
    'Angola': '安哥拉',
    'Albania': '阿尔巴尼亚',
    'United Arab Emirates': '阿联酋',
    'Argentina': '阿根廷',
    'Armenia': '亚美尼亚',
    'French Southern and Antarctic Lands': '法属南半球和南极领地',
    'Australia': '澳大利亚',
    'Austria': '奥地利',
    'Azerbaijan': '阿塞拜疆',
    'Burundi': '布隆迪',
    'Belgium': '比利时',
    'Benin': '贝宁',
    'Burkina Faso': '布基纳法索',
    'Bangladesh': '孟加拉国',
    'Bulgaria': '保加利亚',
    'The Bahamas': '巴哈马',
    'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
    'Belarus': '白俄罗斯',
    'Belize': '伯利兹',
    'Bermuda': '百慕大',
    'Bolivia': '玻利维亚',
    'Brazil': '巴西',
    'Brunei': '文莱',
    'Bhutan': '不丹',
    'Botswana': '博茨瓦纳',
    'Central African Republic': '中非共和国',
    'Canada': '加拿大',
    'Switzerland': '瑞士',
    'Chile': '智利',
    'China': '中国',
    'Ivory Coast': '象牙海岸',
    'Cameroon': '喀麦隆',
    'Democratic Republic of the Congo': '刚果民主共和国',
    'Republic of the Congo': '刚果共和国',
    'Colombia': '哥伦比亚',
    'Costa Rica': '哥斯达黎加',
    'Cuba': '古巴',
    'Northern Cyprus': '北塞浦路斯',
    'Cyprus': '塞浦路斯',
    'Czech Republic': '捷克共和国',
    'Germany': '德国',
    'Djibouti': '吉布提',
    'Denmark': '丹麦',
    'Dominican Republic': '多明尼加共和国',
    'Algeria': '阿尔及利亚',
    'Ecuador': '厄瓜多尔',
    'Egypt': '埃及',
    'Eritrea': '厄立特里亚',
    'Spain': '西班牙',
    'Estonia': '爱沙尼亚',
    'Ethiopia': '埃塞俄比亚',
    'Finland': '芬兰',
    'Fiji': '斐',
    'Falkland Islands': '福克兰群岛',
    'France': '法国',
    'Gabon': '加蓬',
    'United Kingdom': '英国',
    'Georgia': '格鲁吉亚',
    'Ghana': '加纳',
    'Guinea': '几内亚',
    'Gambia': '冈比亚',
    'Guinea Bissau': '几内亚比绍',
    'Equatorial Guinea': '赤道几内亚',
    'Greece': '希腊',
    'Greenland': '格陵兰',
    'Guatemala': '危地马拉',
    'French Guiana': '法属圭亚那',
    'Guyana': '圭亚那',
    'Honduras': '洪都拉斯',
    'Croatia': '克罗地亚',
    'Haiti': '海地',
    'Hungary': '匈牙利',
    'Indonesia': '印尼',
    'India': '印度',
    'Ireland': '爱尔兰',
    'Iran': '伊朗',
    'Iraq': '伊拉克',
    'Iceland': '冰岛',
    'Israel': '以色列',
    'Italy': '意大利',
    'Jamaica': '牙买加',
    'Jordan': '约旦',
    'Japan': '日本',
    'Kazakhstan': '哈萨克斯坦',
    'Kenya': '肯尼亚',
    'Kyrgyzstan': '吉尔吉斯斯坦',
    'Cambodia': '柬埔寨',
    'South Korea': '韩国',
    'Dem. Rep. Korea': '韩国',
    'Kosovo': '科索沃',
    'Kuwait': '科威特',
    'Laos': '老挝',
    'Lebanon': '黎巴嫩',
    'Liberia': '利比里亚',
    'Libya': '利比亚',
    'Sri Lanka': '斯里兰卡',
    'Lesotho': '莱索托',
    'Lithuania': '立陶宛',
    'Luxembourg': '卢森堡',
    'Latvia': '拉脱维亚',
    'Morocco': '摩洛哥',
    'Moldova': '摩尔多瓦',
    'Madagascar': '马达加斯加',
    'Mexico': '墨西哥',
    'Macedonia': '马其顿',
    'Mali': '马里',
    'Myanmar': '缅甸',
    'Montenegro': '黑山',
    'Mongolia': '蒙古',
    'Mozambique': '莫桑比克',
    'Mauritania': '毛里塔尼亚',
    'Malawi': '马拉维',
    'Malaysia': '马来西亚',
    'Namibia': '纳米比亚',
    'New Caledonia': '新喀里多尼亚',
    'Niger': '尼日尔',
    'Nigeria': '尼日利亚',
    'Nicaragua': '尼加拉瓜',
    'Netherlands': '荷兰',
    'Norway': '挪威',
    'Nepal': '尼泊尔',
    'New Zealand': '新西兰',
    'Oman': '阿曼',
    'Pakistan': '巴基斯坦',
    'Panama': '巴拿马',
    'Peru': '秘鲁',
    'Philippines': '菲律宾',
    'Papua New Guinea': '巴布亚新几内亚',
    'Poland': '波兰',
    'Puerto Rico': '波多黎各',
    'North Korea': '北朝鲜',
    'Korea': '朝鲜',
    'Portugal': '葡萄牙',
    'Paraguay': '巴拉圭',
    'Qatar': '卡塔尔',
    'Romania': '罗马尼亚',
    'Russia': '俄罗斯',
    'Rwanda': '卢旺达',
    'Western Sahara': '西撒哈拉',
    'Saudi Arabia': '沙特阿拉伯',
    'Sudan': '苏丹',
    'South Sudan': '南苏丹',
    'Senegal': '塞内加尔',
    'Solomon Islands': '所罗门群岛',
    'Sierra Leone': '塞拉利昂',
    'El Salvador': '萨尔瓦多',
    'Somaliland': '索马里兰',
    'Somalia': '索马里',
    'Republic of Serbia': '塞尔维亚共和国',
    'Suriname': '苏里南',
    'Slovakia': '斯洛伐克',
    'Slovenia': '斯洛文尼亚',
    'Sweden': '瑞典',
    'Swaziland': '斯威士兰',
    'Syria': '叙利亚',
    'Chad': '乍得',
    'Togo': '多哥',
    'Thailand': '泰国',
    'Tajikistan': '塔吉克斯坦',
    'Turkmenistan': '土库曼斯坦',
    'East Timor': '东帝汶',
    'Trinidad and Tobago': '特里尼达和多巴哥',
    'Tunisia': '突尼斯',
    'Turkey': '土耳其',
    'United Republic of Tanzania': '坦桑尼亚联合共和国',
    'Uganda': '乌干达',
    'Ukraine': '乌克兰',
    'Uruguay': '乌拉圭',
    'United States of America': '美国',
    'Uzbekistan': '乌兹别克斯坦',
    'Venezuela': '委内瑞拉',
    'Vietnam': '越南',
    'Vanuatu': '瓦努阿图',
    'West Bank': '西岸',
    'Yemen': '也门',
    'South Africa': '南非',
    'Zambia': '赞比亚',
    'Zimbabwe': '津巴布韦'
}
// 常量2.城市经纬度坐标
const geoCoordMap = {
    "北京": [116.46, 39.92],
    "四川": [104.06, 30.67],
    "浙江": [120.19, 30.26],
    "山东": [117, 36.65],
    "福建": [119.3, 26.08],
    "上海": [121.48, 31.22],
    "重庆": [106.54, 29.59],
    "江西": [115.89, 28.68],
    "广东": [113.23, 23.16],
    "山西": [112.53, 37.87],
    "黑龙江": [126.63, 45.75],
    "陕西": [108.95, 34.27],
    "辽宁": [123.38, 41.8],
    "海南": [110.35, 20.02],
    "湖南": [113, 28.21],
    "宁夏": [106.27, 38.47],
    "河北": [114.48, 38.03],
    "云南": [102.73, 25.04],
    "湖北": [114.31, 30.52],
    "内蒙古": [111.65, 40.82],
    "天津": [117.2, 39.13],
    "贵州": [106.71, 26.57],
    "甘肃": [103.73, 36.03],
    "江苏": [118.78, 32.04],
    "吉林": [125.35, 43.88],
    "河南": [113.65, 34.76],
    "青海": [101.74, 36.56],
    "安徽": [117.27, 31.86],
    "广西": [108.33, 22.84],
    "西藏": [91.11, 29.97],
    "新疆": [87.68, 43.77],   
    "香港": [114.17,22.28],
    "澳门": [113.58,22.20],
    "台湾": [121.52,25.03],
};
// 常量3.各城市的数据
const data = [
    {name:"北京",value:88},
    {name:"四川",value:88},
    {name:"浙江",value:87},
    {name:"山东",value:87},
    {name:"福建",value:87},
    {name:"上海",value:87},
    {name:"重庆",value:87},
    {name:"云南",value:87},
    {name:"江西",value:86},
    {name:"广东",value:85},
    {name:"山西",value:84},
    {name:"黑龙江",value:83},
    {name:"陕西",value:83},
    {name:"辽宁",value:82},
    {name:"海南",value:82},
    {name:"湖南",value:82},
    {name:"宁夏",value:82},
    {name:"河北",value:82},
    {name:"湖北",value:81},
    {name:"内蒙古",value:81},
    {name:"天津",value:80},
    {name:"贵州",value:80},
    {name:"甘肃",value:80},
    {name:"江苏",value:80},
    {name:"吉林",value:80},
    {name:"河南",value:79},
    {name:"青海",value:79},
    {name:"广西",value:78},
    {name:"安徽",value:77},
    {name:"新疆",value:76},
    {name:"西藏",value:76}
];
</script>

<style scoped>

.chart-wrapper {
  /* position: flex; */
  width: 100%;
  height: 100%;
  background-color: #7a818a;
}
</style>