// echart图表主题
var echartsTheme = {
    // 默认色板
    color: [
        '#3da0fd','#ae58f5','#fdd150','#8acc73','#fd9e2f',
        '#fe585f','#6685d6','#febb6d','#c68af8','#fe8a8f'
    ],

    // 图表标题
    title: {
        textStyle: {
            fontWeight: 'normal',
            color: '#333333'
        }
    },
    
    // 值域
    dataRange: {
        color:['#1f610a','#97b58d']
    },

    // 提示框
    tooltip: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type:'shadow',         // 默认为直线，可选为：'line' | 'shadow'
            lineStyle:{          // 直线指示器样式设置
                color:'#408829',
                type:'dashed'
            },
            crossStyle: {
                color: '#408829'
            },
            shadowStyle:{// 阴影指示器样式设置
                color: 'rgba(200,200,200,0.1)'
            }
        }
    },

    // 区域缩放控制器
    dataZoom: {
        dataBackgroundColor: 'rgba(100,216,171,0.2)',// 数据背景颜色
        fillerColor: 'rgba(100,216,171,0.35)',   // 填充颜色
        handleColor: '#64d8ab'    // 手柄颜色
    },
    
    // 网格
    grid: {
        x:60,
        x2:35,
        borderWidth: 0
    },

    // 类目轴
    categoryAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#333'
            }
        },
        splitLine: {           // 分隔线
            show : true,
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
        axisLine: {            // 坐标轴线
            lineStyle: {       // 属性lineStyle控制线条样式
                color: '#333'
            }
        },
        splitArea : {
            show : false,
            areaStyle : {
                color: ['rgba(249,249,249,0.6)','rgba(255,255,255,0.4)']
            }
        },
        splitLine: {           // 分隔线
            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                color: ['#eee']
            }
        }
    },

    timeline : {
        lineStyle : {
            color : '#408829'
        },
        controlStyle : {
            normal : { color : '#408829'},
            emphasis : { color : '#408829'}
        }
    },
    
    textStyle: {
        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
};
export default  echartsTheme;