import * as echarts from '../components/ec-canvas/echarts.min.js';
// 初始化图表
function init (ecComponent, option) {
  ecComponent.init((canvas, width, height) => {
    // 获取组件的 canvas、width、height 后的回调函数
    // 在这里初始化图表
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    chart.setOption(option);

    // 注意这里一定要返回 chart 实例，否则会影响事件处理等
    return chart;
  });
}
// 处理横纵坐标数据
function hybridData(data, type) {
  let arr = []
  data.map(item => {
    arr.push(item[type])
  })
  return arr;
}
//画图
function echartlinefn (color, xAxis, data, sortype, tooltipName) {
  //color:颜色, xAxis:x轴数据, data:数据, sortype:获取Y轴区间类型
  // y轴最小值
  let min = 0;
  // let min = Math.min(...hybridData(data, sortype));
  // y轴最大值
  let max = Math.max(...hybridData(data, sortype));
  max = max == 0 ? 4 : max
  // y轴刻度间隔
  let yInterval = max >= 4 ? parseInt((max - min) / 4) : 1;
  // 配置
  let option = {
    // 折线图颜色
    color: color,
    // grid 为直角坐标系内绘图网格,控制图表摆放位置上
    grid: {
      top: '4%',
      left: '8%',
      right: '8%',
      bottom: '4%',
      containLabel: true
    },
    // 悬浮框
    tooltip: {
      show: true,
      trigger: "axis",
      // formatter: function (params) {
      //   let tip = `${params[0].name}\n`;
      //   for (let i = 0; i < params.length; i++) {
      //     tip += `${params[i].value}`;
      //   }
      //   return tip
      // }
      formatter: function (params) {
        console.log(params);
        let tip = `${params[0].name}\n`;
        for (let i = 0; i < params.length; i++) {
          tip += `{marker${params[i].seriesIndex}at0|} ${params[i].seriesName}: ${params[i].value}\n`;
        }
        return tip;
      }
    },
    // x轴
    xAxis: {
      type: 'category',
      // 坐标轴两边留白策略
      boundaryGap: true,
      // show: false,
      data: xAxis,
      // x轴线
      axisLine: {
        show: false, //是否显示x轴线
        lineStyle: {
          color: '#ECF2FB', // x坐标轴的轴线颜色
          width: 1, //这里是坐标轴的宽度,可以去掉
        }
      },
      // 坐标轴刻度
      axisTick: {
        show: false
      },
      // 单轴刻度标签的相关设置
      axisLabel: {
        // rotate: 45,
        fontSize: 10,
        textStyle: { //x轴字体样式
          margin: 25,
          color: '#9CA5B1'
        },
        formatter: function (value) {
          return value.split("-").join("/");
        }  
      }
    },
    yAxis: {
      x: 'center',
      // show: false,
      type: 'value',
      minInterval: 1,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false, //是否显示y轴
        lineStyle: {
          color: '#ECF2FB', // y坐标轴的轴线颜色
          width: 1, //这里是坐标轴的宽度,可以去掉
        }
      },
      splitLine: {
        show: true, // 网格线是否显示
        //  改变样式
        lineStyle: {
          color: '#ECF2FB', // 修改网格线颜色
          type: 'dotted', //网格线的类型
          width: 1,
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#9CA5B1'
        }
      },
      min: min,
      max: max,
      interval: yInterval
    },
    series: [{
      name: tooltipName,
      type: 'line',
      smooth: true,
      color: ['#4EBADB'],
      data: hybridData(data, sortype),
      itemStyle: {
        normal: { 
          color: '#4EBADB',
          borderColor: '#4EBADB',
          // label: { show: true },
          lineStyle: {
            width: 2,
            type: 'solid'  //'dotted'虚线 'solid'实线
          }
        }
      }
    }]
  };
  return option
}

export {
  echartlinefn,
  init,
  hybridData
}