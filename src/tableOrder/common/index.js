import echartTheme from './echartsConfig.js'
export default {
	install(Vue, options) {
		Vue.prototype.echartsInit = function (id, options) {//图表初始化
			let that = this;
			let myChart = this.$echarts.init(document.getElementById(id), echartTheme);
			myChart.clear();
			// 解决获取元素隐藏又显示后获取不到宽度的问题
			setTimeout(function () {
				myChart.resize();
			}, 100);
			myChart.setOption(options, true);
			let resizeTimer = null;
			window.addEventListener("resize", function () {
				if (resizeTimer != null) {
					clearTimeout(resizeTimer);
				}
				resizeTimer = setTimeout(function () {
					myChart.resize();
				}, 10);
			});
		};
	}
};
