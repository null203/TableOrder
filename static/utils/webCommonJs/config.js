/**
 * @param defaultPath 配置所有模块默认的接口地址
 * @param serverPath  配置所有模块接口请求地址,配置为空时，将使用默认地址
 * @param defaultParams 配置axios默认参数
 * @param isIndependentPath 是为独立地址
 * @param dcName 接口平台部署时的项目名称，为空时默认拼接'dc'
 * 所有项目默认都从地址栏截取接口路径，每个模块可以通过设置isIndependentPath属性，为true则使用该项目下的serverPath路径，该项目下路径为空则默认使用全局路径defaultPath.serverPath
 * 模块中调用方式  modulePath.模块名.方法名
 */

// web与mobile公用配置文件
var modulePath = {
  dcName:'',//接口平台（一般为数校）部署名称，为空默认为"dc"
  //配置所有模块默认的接口地址
  defaultPath:{
    serverPath: 'http://1.116.31.117:7777/dc/',
    downloadPath: ''
  },
  //axios 默认参数配置
  defaultParams:{
    // 'sys_username':'lisi1',//新版通知用户
    'sys_username':'lizheng',
    'sys_password':'98741236',
    'dataSourceName':'SCHOOL_CONTEXT_DEFAUL',
    'sys_auto_authenticate': true,//调查问卷本地测试-需要隐掉
    'sys_token':''
    // 'userId':'20140923142329769262316155434533',
  },
  //工资
  wages:{
    serverPath: '',
    downloadPath: '',
    isIndependentPath:true
  },
  //系统管理
  sysManage:{
    serverPath:''
  },
  //系统基础数据
  sysBaseData:{
    isNavShowFlag:false,//是否放验证导航权限
    isIndependentPath:false,
    serverPath:'http://192.168.1.125:9990/dc-base-mysql/',
  },
  //直播管理
  videoLive:{
    serverPath:'',
    uploadPath:'http://192.168.1.7:23000/liveManager',//上传/下载/导出
    seconds:10,//实时排行榜时间设置（单位:s)
  },
  //易耗品管理
  consumablesManage:{
    serverPath:''
  },
  //信息发布
  infoRelease:{
    'serverPath':'',
    'uploadPath':'',//上传/下载/导出
    'copyUrl':'/static/web/infoReleaseTemplate/index.html#/?id=',
    isIndependentPath:true,
  },
  //信息发布模板
  infoReleaseTemplate:{
    'serverPath':'',
    isIndependentPath:true,
  },
  //移动端路径
  mobilePath:{
    //新版通知
    newNotice:{
      isIndependentPath:false,
    },
    //教师过程性评价
    teacherEvaluation:{
      'serverPath':'http://118.190.46.175:8111/',
      isIndependentPath:true,
    },
    //资产盘点
    assetsCheck:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //信息发布
    infoRelease:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //工资
    wages:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //课表
    timeTable:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //校内新闻
    schoolNews:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //作业管理
    homeworkManage:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //课堂考勤
    attendance:{
      serverPath:'',
      isIndependentPath:false,
    },
    //调查问卷
    questionnaire:{
      serverPath:'',
      isIndependentPath:true,//解决调查问卷二次分享接口报错问题（找不到正确的路径）
    },
    //成绩
    score:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //食堂管理
    canteenManagement:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //预约
    appointment:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //教师请假
    teacherforleave:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //报修
    repair:{
      'serverPath':'',
      isIndependentPath:true,
    },
    //易耗品
    storeroom:{
      'serverPath':'',
      isIndependentPath:true,
    },
  },
  // 初始化参数
  initData:function(){
    var url = window.location.href;
    // if (url.indexOf('sys_username') != -1) {
    //   if (this.defaultParams.sys_username === '') {
    //     this.defaultParams.sys_username = this.getQueryString('sys_username');
    //   }
    //   if (this.defaultParams.sys_password === '') {
    //     this.defaultParams.sys_password = this.getQueryString('sys_password');
    //   }
    //   if (this.defaultParams.dataSourceName === '') {
    //     this.defaultParams.dataSourceName = this.getQueryString('dataSourceName');
    //   }
    // } else {//通过sessionStorage传输用户名密码的情况（可以防止地址栏暴露隐私信息）
    //   if (this.defaultParams.sys_username === '') {
    //     this.defaultParams.sys_username = sessionStorage.userName;
    //   }
    //   if (this.defaultParams.sys_password === '') {
    //     this.defaultParams.sys_password = sessionStorage.pwd;
    //   }
    // }
    this.defaultParams.sys_token = this.getQueryString('sys_token');
  },
  // 获取地址栏参数
  getQueryString:function(name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return '';
  },
  //获取国际化标识
  getLanguage:function() {
    //pc端根据数校cookie判断国际化语言，移动端根据系统语言判断国际化语言
    if (navigator.userAgent.match(/mobile/i)) {
      return navigator.language === "en-us" ? 'en' : 'zh';
    }else{
      return this.getCookie('L10N_TRACK') === "en-US" ? 'en' : 'zh';
    }
    // return 'en';
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
  //返回应用列表
  connectWebViewJavascriptBridge:function(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', function () {
        callback(WebViewJavascriptBridge);
      }, false);
    }
  },

  callIOSMethod:function(methodName, params) {
    utils.connectWebViewJavascriptBridge(function (bridge) {
      bridge.callHandler(methodName, params, function (response) {

      });
    });
  },

  closeWechat:function() {
    var browser = navigator.userAgent;
    if (browser.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') {
      WeixinJSBridge.call('closeWindow');
    }
  },

  toAppHome:function() {//返回应用列表
    /*var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/Android/i) != null && ua.match(/browser/i) == null) {
      if (window.nativeMobileDom){
        window.nativeMobileDom.toFinishActivity();
      }
    }else if(ua.match(/iPhone/i) != null && ua.match(/safari/i) == null && ua.match(/applewebkit/i) != null && ua.match(/microMessenger/i) == null && ua.match(/qbwebviewtype/i) == null) {
      this.callIOSMethod('toFinishActivity', null);
    }else{
      window.history.back();
    }*/
    if(document.referrer.toLowerCase().indexOf('corpid')>-1){//从钉钉打开的应用
        dd.ready(function() {
            dd.biz.navigation.close();
        })
    }else{
       window.history.back(); 
    } 
  },
  loadJs:function(url, callback) {
    var script = document.createElement('script');
    script.type = "text/javascript";
    if (typeof(callback) != "undefined") {
      if (script.readyState) {
        script.onreadystatechange = function() {
          if (script.readyState == "loaded" || script.readyState == "complete") {
            script.onreadystatechange = null;
            callback();
          }
        }
      } else {
        script.onload = function() {
          callback();
        }
      }
    }
    script.src = url;
    document.body.appendChild(script);
  }
};
modulePath.initData();
