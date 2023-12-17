import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routerConfig'
// import i18n from '@comm/lang/questionnaire/index'

// 路由配置
Vue.use(VueRouter)
const RouterConfig = {
  mode: 'hash',
  routes
}
const router = new VueRouter(RouterConfig)

const Util = function(title) {
  title = title ?  title : '订餐系统';
  window.document.title = title;
}

router.beforeEach((to, from, next) => {
  Util(to.meta.title)
  next()
})
router.afterEach((to, from, next) => {
  //window.scrollTo(0, 0)
})

export default router
