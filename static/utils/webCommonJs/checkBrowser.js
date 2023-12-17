//检查浏览器版本
(function (window) {
	function getBrowserInfo() {
		var agent = navigator.userAgent.toLowerCase();
		var regStrff = /firefox\/[\d.]+/gi;
		if (agent.indexOf('firefox') > 0) {
			return agent.match(regStrff)
		}
	}

	var browser = getBrowserInfo();
	var verinfo = (browser + '').replace(/[^0-9.]/ig, '');
	var theUA = window.navigator.userAgent.toLowerCase();
	if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
		var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
		if (ieVersion < 9 || (verinfo !=='' && verinfo < '56')) {
			var str = "<div style='text-align:center;background: #fff9e6;width: 100%;padding: 10px 0; font-family: 'Microsoft YaHei''>";
			str += "<div>浏览器版本太低了:(</div>";
			str += "推荐使用：<a href='https://www.baidu.com/s?ie=UTF-8&wd=%E8%B0%B7%E6%AD%8C%E6%B5%8F%E8%A7%88%E5%99%A8' target = '_blank' style='color:darkblue; font-family: Microsoft YaHei; margin-right:10px;'>Chrome</a>";
			str += "<a href='http://www.firefox.com.cn/' target = '_blank' style = 'color:darkblue; font-family: Microsoft YaHei; margin-right:10px;'>Firefox</a>";
			str += "<a href='https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads' target = '_blank' style = 'color:darkblue; font-family: Microsoft YaHei; margin-right:10px;'>高版本IE浏览器</a>";
			str += "</div>";
			document.writeln(str);
		}
	}
}(window))