/**
 * Created by zhuxufeng on 2017/6/1.
 * version 20 Update by hanshaojie on 2018/05/31
 */
var BaseJs = {

    developMode: true, // 开发模式
    proxy: true, // 是否使用代理

    // imUrl: 'http://www.zdhx-edu.com/im',
    imUrl: '',
    // v3Url: 'http://192.168.1.81:10001/dc-moraleducationevaluation',
    // v3Url: 'http://192.168.1.230:7000/dc-moraleducationevaluation',
    // v3Url: 'http://192.168.1.233:14000/dc-moraleducationevaluation',
    // v3Url: '',

    imId: '',
    v3Id: '',
    // v3Url: 'http://192.168.1.12:6080/dc-studentcheck',
    v3Url: 'http://1.116.31.117/dc',
    // v3Url: 'http://oa.zdhx-edu.link/dc',
    // v3Url: 'http://nlsyze.zdhx-edu.link/xpk',
    // v3Url: 'http://192.168.1.9:17000/dc_dataanalysis',//数据分析
    // v3Url: 'http://www.zdhx-edu.com/zddc',//移动端选课
    // v3Url: 'http://szxy.nlsyz.com.cn/dc',//中电集团测试学校
    // v3Url: 'http://www.zdhx-edu.com/zddc-cs',//通知
    // v3Url: 'http://192.168.1.190:6080/zddc-exam',//考试
    // v3Url: 'http://192.168.1.190:7080/dc-news',//校内新闻
    // organizationId: '20160923155525448419150856081234', // 北京中电学校
    // organizationId: '20170607155612726782890062549795', // 中电集团测试学校
    // organizationId: '20170527125235556876917905665617', // 研发测试学校
    organizationId: '20160105180142413453515367944789', // 陈经纶
    // loginName: '173000587',
    // loginName: 'hewenjing',
    // loginName: 'chenfugang',
    // loginName: 'chehonghui',
    loginName: 'zuolumei',
    passWord: '000000',
    // dataSourceName: 'ttxs',
    // dataSourceName: 'dataSource1',
    dataSourceName: '',

    token: '',

    updateToken: function (token) {
        this.token = token;
        this.setQueryString('sys_token', token);
    },

    getQueryString: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    },
    getLanguage:function(){
      return this.getCookie('L10N_TRACK')
    },

    // 获取指定名称的cookie
    getCookie:function(name){
      var strcookie = document.cookie;//获取cookie字符串
      var arrcookie = strcookie.split("; ");//分割
      //遍历匹配
      for ( var i = 0; i < arrcookie.length; i++) {
        var arr = arrcookie[i].split("=");
        if (arr[0] == name){
          return arr[1];
        }
      }
      return "";
    },

    getUrlParams: function (url,name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = url.substr(1).match(reg);
        if (r !== null) {
            return decodeURIComponent(r[2]);
        }
        return '';
    },

    setQueryString: function (name, value) {
        var url = window.location.href;
        var newUrl = '';
        var tmp = name + '=' + value;
        var reg = new RegExp('(^|)' + name + '=([^&]*)(|$)');
        if (url.match(reg) !== null) {
            newUrl = url.replace(eval(reg), tmp);
        } else {
            if (url.match('[\?]')) {
                newUrl = url + '&' + tmp;
            } else {
                newUrl = url + '?' + tmp;
            }
        }
        window.location.href = newUrl;
    },

    setQueryStrings: function (params) {
        var url = window.location.href;
        var newQueryString = '';
        for (var name in params) {
            var tmp = name + '=' + params[name];
            var reg = new RegExp('(^|)' + name + '=([^&]*)(|$)');
            if (url.match(reg) !== null) {
                url = url.replace(eval(reg), tmp);
            } else {
                if (newQueryString === '') {
                    newQueryString = tmp;
                } else {
                    newQueryString = newQueryString + '&' + tmp;
                }
            }
        }
        if (newQueryString !== '') {
            if (url.match('[\?]')) {
                window.location.href = url + '&' + newQueryString;
            } else {
                window.location.href = url + '?' + newQueryString;
            }
        }
    },

    getRootPath: function () {
        var curWwwPath = window.document.location.href;
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);
        var localhostPath = curWwwPath.substring(0, pos);
        var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        return localhostPath + projectName;
    },

    getParams: function () {
        return 'v3Url=' + this.v3Url + '&dataSourceName=' + this.dataSourceName + '&imId=' + this.imId + '&v3Id=' + this.v3Id + '&loginName=' + this.loginName + '&organizationId=' + this.organizationId + '&sys_token=' + this.token;
    },

    saveUserAndPwd: function(){
        let url = window.location.href;
        if(url.indexOf('?')>-1){
            var curUrlParams = url.substring(url.indexOf('?'));
            sessionStorage.setItem('ZDDATE',this.getUrlParams(curUrlParams,'loginName'));
            sessionStorage.setItem('ZDANALYSIS',this.getUrlParams(curUrlParams,'sys_password'));
            window.location.href = url.substring(0,url.indexOf('?'));
        }
    },

    initData: function () {
        if (this.token === '') {
            this.token = this.getQueryString('sys_token');
        }
        if (this.v3Url === '') {
            this.v3Url = this.getQueryString('v3Url');
        }
        if (this.dataSourceName === '') {
            this.dataSourceName = this.getQueryString('dataSourceName');
        }
        if (this.imId === '') {
            this.imId = this.getQueryString('imId');
        }
        if (this.v3Id === '') {
            this.v3Id = this.getQueryString('v3Id');
        }
        if (this.loginName === '') {
            if(this.getQueryString('loginName') !== ''){
                this.loginName = this.getQueryString('loginName');
            }else{
                this.loginName = sessionStorage.getItem('ZDDATE');
            }
        }
        if (this.passWord === '') {
            if (this.getQueryString('sys_password') !== '') {
                this.passWord = this.getQueryString('sys_password');
            }else{
                this.passWord = sessionStorage.getItem('ZDANALYSIS');
            }
        }
        if (this.organizationId === '') {
            this.organizationId = this.getQueryString('organizationId');
        }
        if (this.developMode && this.token === '') {
            var queryStringObj = {};
            if (this.imUrl !== '') {
                this.getIMToken();
                queryStringObj['v3Url'] = this.v3Url;
                queryStringObj['dataSourceName'] = this.dataSourceName;
                queryStringObj['imId'] = this.imId;
                queryStringObj['v3Id'] = this.v3Id;
            }
            if (this.token !== null && this.token !== '') {
                queryStringObj['sys_token'] = this.token;
            }
            this.setQueryStrings(queryStringObj);
        }
    },

    getIMToken: function () {
        var params = {
            'loginName': this.loginName,
            'password': this.passWord,
            'organizationId': this.organizationId,
            'terminal': 'web'
        };
        var json = this.ajaxSyncProxy(this.imUrl + '/bd/welcome/getUserWithLoginNameAndPassword', params);
        var data = JSON.parse(json);
        if (data.successStatus === '0') {
            this.v3Url = data.userData.v3Url;
            this.dataSourceName = data.userData.dataSourceName;
            this.v3Id = data.userData.v3Id;
            this.imId = data.userData.id;
            this.token = data.token;
            return data.token;
        } else {
            console.error(data.errorMsg);
        }
        return '';
    },

    getXmlHttp: function () {
        // 此处不能单例，每次生成新的XmlHttp对象
        var xmlHttp = null;
        try {
            xmlHttp = new XMLHttpRequest();
        } catch (e) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
            }
            catch (e) {
                alert('您的浏览器不支持XmlHttp!');
            }
        }
        return xmlHttp;
    },

    setIMDefaultParams: function (params) {
        params['sys_token'] = this.token;
        params['sys_auto_authenticate'] = 'true';
        return params;
    },

    setV3DefaultParams: function (params) {
        if (this.developMode) {
            params['sys_username'] = this.loginName;
            params['sys_password'] = this.passWord;
        } else {
            params['sys_token'] = this.token;
        }
        params['dataSourceName'] = this.dataSourceName;
        params['sys_auto_authenticate'] = 'true';
        return params;
    },

    setCenterDefaultParams: function (params) {
        if (this.developMode) {
            params['sys_username'] = this.loginName;
            params['sys_password'] = this.passWord;
        } else {
            params['sys_token'] = this.token;
        }
        params['sys_auto_authenticate'] = 'true';
        return params;
    },

    httpSuccess: function (xhr) {
        return xhr.status >= 200 && xhr.status < 300 || xhr.status === 304;
    },

    ajaxCallback: function (xmlHttp, timer, callback) {
        if (xmlHttp.readyState === 4) {
            if (this.httpSuccess(xmlHttp)) {
                if ('noToken' === xmlHttp.responseText) {
                    alert('token失效，请重新登录');
                    this.tokenTimeOut();
                } else {
                    callback(xmlHttp.responseText);
                }
            }
            if (timer) clearTimeout(timer);
            xmlHttp = null;
        }
    },

    ajaxIMProxy: function (url, params, callback, timeoutCallback, timeout) {
        this.initData();
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = this.imUrl + url;
        }
        if (params === null) {
            params = {};
        }
        this.setIMDefaultParams(params);
        this.ajaxAsyncProxy(url, params, callback, timeoutCallback, timeout);
    },

    ajaxV3Proxy: function (url, params, callback, timeoutCallback, timeout) {
        this.initData();
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = this.v3Url + url;
        }
        if (params === null) {
            params = {};
        }
        this.setV3DefaultParams(params);
        this.ajaxAsyncProxy(url, params, callback, timeoutCallback, timeout);
    },

    ajaxCenterProxy: function (url, params, callback, timeoutCallback, timeout) {
        this.initData();
        if (params === null) {
            params = {};
        }
        this.setCenterDefaultParams(params);
        this.ajaxAsyncProxy(url, params, callback, timeoutCallback, timeout);
    },

    ajaxIM: function (url, params, callback, timeoutCallback, timeout) {
        this.initData();
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = this.imUrl + url;
        }
        if (params === null) {
            params = {};
        }
        this.setIMDefaultParams(params);
        this.ajaxAsync(url, params, callback, timeoutCallback, timeout);
    },

    ajaxV3: function (url, params, callback, timeoutCallback, timeout) {
        this.initData();
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            url = this.v3Url + url;
        }
        if (params === null) {
            params = {};
        }
        this.setV3DefaultParams(params);
        this.ajaxAsync(url, params, callback, timeoutCallback, timeout);
    },

    ajaxCenter: function (url, params, callback, timeoutCallback, timeout) {
        this.initData();
        if (params === null) {
            params = {};
        }
        this.setCenterDefaultParams(params);
        this.ajaxAsync(url, params, callback, timeoutCallback, timeout);
    },

    ajaxAsyncProxy: function (url, params, callback, timeoutCallback, timeout) {
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            alert('ajaxAsyncProxy: 请填写完整url和参数');
            console.error(url);
            return '';
        }
        if (this.proxy) {
            var paramJson = JSON.stringify(params);
            var xmlHttp = this.getXmlHttp();
            var that = this;
            var timer = null;
            if (timeoutCallback){
                if (!timeout){
                    timeout = 5000;
                }
                timer = setTimeout(timeoutCallback, timeout);
            }
            xmlHttp.onreadystatechange = function () {
                that.ajaxCallback(xmlHttp, timer, callback);
            };
            xmlHttp.open('POST', '/static/proxy', true);
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlHttp.send('url=' + url + '&params=' + paramJson + '&_t=' + Math.random());
        } else {
            this.ajaxAsync(url, params, callback, timeoutCallback, timeout);
        }
    },

    ajaxSyncProxy: function (url, params) {
        if (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) {
            alert('ajaxSyncProxy: 请填写完整url和参数');
            console.error(url);
            return '';
        }
        if (this.proxy) {
            var paramJson = '';
            if (params !== null) {
                paramJson = JSON.stringify(params);
            }
            var xmlHttp = this.getXmlHttp();
            xmlHttp.open("POST", '/static/proxy', false);
            if (paramJson !== '') {
                xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xmlHttp.send('url=' + url + '&params=' + paramJson + '&_t=' + Math.random());
            } else {
                xmlHttp.send();
            }
            return xmlHttp.responseText;
        } else {
            return this.ajaxSync(url, params);
        }
    },

    ajaxAsync: function (url, params, callback, timeoutCallback, timeout) {
        var xmlHttp = this.getXmlHttp();
        var that = this;
        var timer = null;
        if (timeoutCallback){
            if (!timeout){
                timeout = 5000;
            }
            timer = setTimeout(timeoutCallback, timeout);
        }
        xmlHttp.onreadystatechange = function () {
            that.ajaxCallback(xmlHttp, timer, callback);
        };
        var paramStr = '';
        for (var p in params) {
            paramStr += p + '=' + params[p] + '&';
        }
        xmlHttp.open('POST', url, true);
        if (paramStr !== '') {
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlHttp.send(paramStr + '_t=' + Math.random());
        } else {
            xmlHttp.send();
        }
    },

    ajaxSync: function (url, params) {
        var xmlHttp = this.getXmlHttp();
        var paramStr = '';
        for (var p in params) {
            paramStr += p + '=' + params[p] + '&';
        }
        xmlHttp.open('POST', url, false);
        if (paramStr !== '') {
            xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xmlHttp.send(paramStr + '_t=' + Math.random());
        } else {
            xmlHttp.send();
        }
        return xmlHttp.responseText;
    },

    connectWebViewJavascriptBridge: function (callback) {
        if (window.WebViewJavascriptBridge) {
            callback(WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function () {
                callback(WebViewJavascriptBridge);
            }, false);
        }
    },

    callIOSMethod: function (methodName, params) {
        BaseJs.connectWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler(methodName, params, function (response) {

            });
        });
    },

    closeWechat: function () {
        var browser = navigator.userAgent;
        if (browser.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            WeixinJSBridge.call('closeWindow');
        }
    },

    toAppHome: function () {
        var browser = navigator.userAgent;
        if (browser.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            window.history.back();
        } else if (!!browser.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            this.callIOSMethod('toFinishActivity', null);
        } else {
            if (window.nativeMobileDom){
                window.nativeMobileDom.toFinishActivity();
            }
        }
    },

    tokenTimeOut: function () {
        var browser = navigator.userAgent;
        if (browser.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
            window.history.back();
        } else if (!!browser.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            this.callIOSMethod('tokenTimeOut', null);
        } else {
            if (window.nativeMobileDom){
                window.nativeMobileDom.tokenTimeOut();
            }
        }
    }

};
if (BaseJs.developMode === false) {
    BaseJs.loginName = '';
    BaseJs.passWord = '';
    BaseJs.organizationId = '';
    BaseJs.dataSourceName = '';
    BaseJs.initData();
}
if(BaseJs.loginName === ''){
    BaseJs.saveUserAndPwd();
}
