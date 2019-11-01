import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import store from './store'
import { domain } from './common/utils'
// import common from './common/common'
import './assets/stylus/iconfont.css'
import './assets/stylus/reset.css'
import './assets/stylus/border.css'
import './common/font/font.css'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/stylus/my-mint.scss'
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import fastClick from 'fastclick'
import MintUI from 'mint-ui'
// import VueJsonp from 'vue-jsonp'
import routerCategory from './common/address'
// Vue.use(VueJsonp)

Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(MintUI)

// Vue.prototype.$messagebox = MessageBox
// element 样式大小默认
Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 }
Vue.prototype.$routerCategory = routerCategory

Vue.config.productionTip = false
// 移动端300毫秒延迟
fastClick.attach(document.body)

// 判断PC还是移动端
Vue.prototype._isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag
}

// 跳转回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

Vue.prototype.domain = domain
// axios.defaults.baseURL = '/api'
// 传递cookie
// axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json'


Vue.prototype.axios = axios

// 保留两位小数
Vue.filter('floatTotal', function(value) {
  value = Number(value)
  return value.toFixed(2)
})

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // common,
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 超时
axios.defaults.timeout = 5000
// let loadinginstace
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  var requestUrl = config.url
  var loginUrl = domain.Base_M2_URL + '/l/v1/user/login/reg'
  var vcodeUrl = domain.Base_M2_URL + '/l/v1/user/vcode'
  var wxOauthUrl = domain.Base_M2_URL + '/l/v1/third/user/wechat/oauth2'
  var accessUrl = domain.Base_M2_URL + '/l/v1/get/accessToken'
  var weixinSignUrl = domain.Base_M2_URL + '/l/v1/get/weixin/sign'
  // var loginUrl = domain.Base_M2_URL + '/l/v1/user/login/reg'
  // var vcodeUrl = domain.Base_M2_URL + '/l/v1/user/vcode'
  if(requestUrl.indexOf(domain.Base_M2_URL) >= 0 || requestUrl.indexOf(domain.Base_M3_URL)  >= 0){
    if (sessionStorage.getItem('accessToken')) {
      // console.log("不等于空设置accessToken")
      config.headers['accessToken'] = sessionStorage.getItem('accessToken')　
    }else{
      // console.log("等于空设置accessToken")
      App.methods.getAccessToken2(axios,domain.Base_M2_URL + '/l/v1/get/accessToken?')
      config.headers['accessToken'] = sessionStorage.getItem('accessToken')
    }
    //console.log(config)
    config.headers.loginToken = localStorage.getItem('loginToken')
    //console.log(config.headers.loginToken)

    if(config.url.indexOf(weixinSignUrl) >= 0 || config.url.indexOf(accessUrl) >= 0){
      return config;
    }
    if (config.url !== vcodeUrl && config.url !== loginUrl && config.url !== wxOauthUrl) {
      // console.log("会员中心地址或者订单中心地址请求")
      if (!localStorage.getItem('loginToken')) {
        // 判断是否存在loginToken
        router.replace({
          path: '/mobile/login',
          // query: {redirect: router.currentRoute.fullPath}
        })
        return Promise.reject("请登录")
      }
    }
  }

  return config
}, function (error) {
    // 报错处理
    return Promise.reject(error)
  }
)

// 请求响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response);
  if (response.status === 200 || response.status === 304) {
    if (response.data.code === '105') {
      localStorage.removeItem('loginToken')
      router.replace({
        path: '/mobile/login',
        query: { redirect: router.currentRoute.fullPath }
      })
    } else if (response.data.code === '90001' || response.data.code === '90002') {
      //console.log('90001')
      App.methods.getAccessToken2(axios,domain.Base_M2_URL + '/l/v1/get/accessToken?')
    }
  } 
 
  return response
}, function(error) {
  // console.log(error);
  return Promise.reject(error)
})

