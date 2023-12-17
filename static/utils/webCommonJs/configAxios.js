/**
 * BaseAxios axios示例，全局http请求名称
 * @param {String} proJectPath 项目路径
 * @description 设置axios默认地址：从地址栏获取 or 项目路径 or 默认路径
 */
function setAxiosBaseUrl(proJectPath) {
  var baseUrl = '';
  if (proJectPath && proJectPath.isIndependentPath) {
    baseUrl = proJectPath.serverPath == '' ? modulePath.defaultPath.serverPath : proJectPath.serverPath;
  }else{
    var path = window.location.href.toLowerCase();
    if (path.indexOf('v3Url') != -1) {
      baseUrl = modulePath.getQueryString('v3Url');
    } else {
      var dcName = modulePath.dcName == '' ? 'dc' : modulePath.dcName;
      baseUrl = path.split('/')[0] + '//' + path.split('/')[2] + '/' + dcName;
    }
  }

  sessionStorage.basePath = baseUrl;
  console.log("%cbaseUrl:" + baseUrl, "color:orange;font-weight:bold");
  return baseUrl;
}

var BaseAxios = axios.create();
modulePath.initData();
BaseAxios.defaults.withCredentials = true // 设置cross跨域 并设置访问权限 允许跨域携带cookie信息
BaseAxios.defaults.params = {}
BaseAxios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// BaseAxios.defaults.headers['Authorization'] = 'Bearer ' + sessionStorage.fsToken
BaseAxios.defaults.transformRequest = [function (data, config) {//这里还是有用的
  // 如果没有额外设置请求头，就返回QS序列化的数据
  if (!config['Content-Type']) {
    return Qs.stringify(data);
  }
  //如果请求头是form-data格式直接返回，不需要序列化
  var contentType = config['Content-Type'].toLowerCase();
  if (contentType.indexOf('x-www-form-urlencoded') != -1) {
    return JSON.stringify(data);
  } else if (contentType.indexOf('form-data') != -1) {
    return data;
  } else {
    return Qs.stringify(data);
  }
}]
// BaseAxios.defaults.timeout = 5000; // 设置请求超时时间

// 添加请求拦截器
var defaultParams = modulePath.defaultParams;
BaseAxios.interceptors.request.use(function (config) {
  if (JSON.stringify(defaultParams) !== '{}') {
    if (config.method === 'post') {
      for (var key in defaultParams) {
        config.data[key] = defaultParams[key]
      }
    } else if (config.method === 'get') {
      config.params = {}
      for (var key in defaultParams) {
        config.params[key] = defaultParams[key]
      }
    }
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
var repeatFlag=false;//防止重复判断
BaseAxios.interceptors.response.use(function (response) {
  // console.log(response.request.responseURL)
  if(!repeatFlag){
    repeatFlag=true;
    if (response.request.responseURL.indexOf('welcome!welcome.action') > -1 || response.request.responseURL.indexOf('cas/login') > -1) { // 未登录
      var refresh=confirm('检测到您长时间没有操作或者已经退出，点击确定重新登陆！');
      if(refresh){
        window.location.href = response.request.responseURL;
      }
    }
  }
  return response
}, function (error) {
  /*if(error.response.status === 504 || error.response.status === 500){
    location.href='/#/500';
  }*/
  return Promise.reject(error)
})