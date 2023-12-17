import Vue from 'vue'
import router from './router/index'// 路由
import App from './app.vue'
import Vant from 'vant'//移动端ui
import Common from './common/index'// 全局方法
import 'vant/lib/index.css'//vant样式
import 'vant/lib/icon/local.css'//自定义字体图标
import './assets/styles/main.css'// 当前项目自定义样式
import './assets/styles/iconfont.css'
import './plugins/rem.js';//配合postcss-pxtorem插件，自动计算根元素字体大小
import store from './store/index'

import vueTree from 'vue-tree-jf'
Vue.use(vueTree);

Vue.use(Common);
Vue.use(Vant);

// 设置axios的默认路径
BaseAxios.defaults.baseURL = setAxiosBaseUrl(modulePath.mobilePath.teacherEvaluation);

//国际化
new Vue({
	mounted() {
		sessionStorage.loginUserId = modulePath.getQueryString('userId');
		modulePath.defaultParams['userId'] = sessionStorage.loginUserId;
		// modulePath.defaultParams['sys_username']=modulePath.getQueryString('sys_username');
	},
	el: '#app',
	router: router,
	store,
	template: '<App/>',
	components: { App }
})