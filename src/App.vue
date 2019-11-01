<template>
  <div id="app">
    <!-- <keep-alive include="Home,Category"> -->
      <router-view v-if="isRouterAlive"></router-view>
    <!-- </keep-alive> -->
    <!-- <Tabbar v-if="isTabbar"></Tabbar> -->
  </div>
</template>

<script>
import Tabbar from '@/pages/moblie/common/Tabbar'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    Tabbar
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      platform: null,
      ipAddress: null,
      phoneModel: null,
      sysversion: null,
      imei: '1234567890',
      version: null,
      shippingMethods: null
    }
  },
  watch: {
    '$route.path':function (newVal,oldVal) {
      // console.log(newVal, oldVal)
      let success = newVal.indexOf('success')
      let fail = newVal.indexOf('fail')
      sessionStorage.setItem('success', success)
      sessionStorage.setItem('fail', fail)
		} 
    // $route(to,from){
      //判断是否显示tabbar
      // alert(to.path);
      // if (to.path == '/home' || to.path == '/mobile/category' || to.path == '/mobile/cart' || to.path == '/mobile/my'){
      //   if (this._isMobile()) {
      //     this.$store.commit('updateTabbarShow', true)
      //   }
      // } else {
      //   this.$store.commit('updateTabbarShow', false)
      // }
    // }
  },
  computed: {
     ...mapState([
      'isTabbar'
    ]),
    ...mapGetters([
      'getTabbarShow'
    ])
  },
  created () {
    // this.ready()
    if (sessionStorage.getItem("store") ) {   //页面加载前读取sessionStorage里的状态信息
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    } 

    window.addEventListener("beforeunload",()=>{   //在页面刷新前将vuex里的信息保存到sessionStorage里
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      // console.log("微信浏览器")
      sessionStorage.setItem('WechatBrowser', true)
    } else {
      // console.log("不是微信浏览器")
      sessionStorage.setItem('WechatBrowser', false)
    }
  },
  mounted () {
    // console.log(this.status)
    if (this.$route.name === 'Home' || this.$route.name === 'Home_p') {
      if (this._isMobile()) {
        // alert(this.$route.name)
        // alert('手机端')
        // this.$store.commit('updateTabbarShow', true)
        sessionStorage.setItem('selected', 'home')
        this.$router.replace('/home')
      } else {
        // alert(this.$route.name)
        // this.$store.commit('updateTabbarShow', false)
        this.$router.replace('/')
      }
    } else {
      // this.$store.commit('updateTabbarShow', false)
    }
    this.getAccessToken()
    if (!sessionStorage.getItem('shippingMethods')) {
      // console.log('222')
      this.setShippingMethods()
    }
  },
  methods: {
    /**
     * 局部刷新
     */
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    ready () {
      var ipAddress = sessionStorage.getItem("ipAddress")
      var platform = sessionStorage.getItem("platform")
      var phoneModel = sessionStorage.getItem("phoneModel")
      var sysversion = sessionStorage.getItem("sysversion")
      var version = sessionStorage.getItem("version")

      if(!ipAddress){
        this.setIpAddress()
      }else{
        this.ipAddress = ipAddress
      }
      if(!platform){
        this.setPlatform()
      }else{
        this.platform = platform
      }
      if(!phoneModel || !sysversion || !version){
        this.setPhoneModelAndSys()
      }else{
        this.phoneModel = phoneModel
        this.sysversion = sysversion
        this.version = version
      }
      
      // 判断客户端
      // const ua = window.navigator.userAgent.toLowerCase()
      // if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //   // 是Android
      //   this.platform = 'anzhuo'
      //   this.$store.state.platform = 'android'
      // } else {
      //   // 这个是ios
      //   this.platform = 'ios'
      //   this.$store.state.platform = 'ios'
      // }
      // // 判断手机操作系统
      // const u = navigator.userAgent, app = navigator.appVersion
      // const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //g
      // const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
      // if (isAndroid) {
      //   //这个是安卓操作系统
      //   this.platform = 'anzhuo'
      //   this.$store.state.platform = 'android'
      //   console.log('这个是安卓操作系统')
      // }
      // if (isIOS) {
      //   //这个是ios操作系统
      //   this.platform = 'ios'
      //   this.$store.state.platform = 'ios'
      //   console.log('这个是ios操作系统')
      // }
      

    },
    setPlatform (){
      // 判断pc和移动端
      if (!this._isMobile()) {
        // pc端
        this.platform = 'pc'　
      } else {
        // 移动端
        this.platform = 'web'
      }
       sessionStorage.setItem("platform", this.platform)
    },
    setIpAddress (){
      // 获取ip
      // const cip = returnCitySN["cip"]
      this.axios.get(this.domain.Base_M2_URL + '/l/getip').then((res) => {
        // console.log(res.data.data)
        this.ipAddress = res.data.data
        sessionStorage.setItem("ipAddress", this.ipAddress)　
      })
    },
    setPhoneModelAndSys () {
      //判断数组中是否包含某字符串
      Array.prototype.contains = function(needle) {
        for (i in this) {
          if (this[i].indexOf(needle) > 0)
            return i
        }
        return -1
      }
      // 移动设备型号获取
      var device_type = navigator.userAgent //获取userAgent信息
      // document.write(device_type) //打印到页面
      var md = new MobileDetect(device_type) //初始化mobile-detect
      var os = md.os() //获取系统
      var model = ''
      if (os == "iOS") { //ios系统的处理
        var ver =  md.version("iPhone")
        this.version = ver
        os = md.os() + ' ' + ver
        model = md.mobile()
      } else if (os == "AndroidOS") {//Android系统的处理
        var ver =  md.version("Android")
        this.version = ver
        os = md.os() + ver
        var sss = device_type.split(";")
        var i = sss.contains("Build/")
        if (i > -1) {
          model = sss[i].substring(0, sss[i].indexOf("Build/"))
        }
      }

      this.phoneModel = model
      this.sysversion = os

      sessionStorage.setItem("phoneModel", this.phoneModel)
      sessionStorage.setItem("sysversion", this.sysversion)
      sessionStorage.setItem("version", this.version)
      
    },
    // 获取accessToken
    getAccessToken () {
      this.ready()
      const param =  'platform=' + this.platform +  '&ipAddress=' + this.ipAddress + '&phoneModel=' + this.phoneModel + '&sysversion=' + this.sysversion
       
      // console.log(param)
      this.axios.post(this.domain.Base_M2_URL + '/l/v1/get/accessToken?'+ param).then(this.getAccessTokenScc)
    },
    getAccessToken2 (axios,url) {
      this.ready()
      const param =  'platform=' + this.platform +  '&ipAddress=' + this.ipAddress + '&phoneModel=' + this.phoneModel + '&sysversion=' + this.sysversion
      axios.post(url + param).then(this.getAccessTokenScc)
      //console.log("请求成功" + sessionStorage.getItem("accessToken"))
      
    },
    getAccessTokenScc (res) {
      // console.log(res.data.data)
      sessionStorage.setItem("accessToken", res.data.data)
    },
    /**
     * 获取物流信息
     */
    setShippingMethods () {
      this.axios.get(this.domain.Base_M3_URL + '/shipping/list').then((res) => {
        const resData = JSON.stringify(res.data.data)
        // console.log(resData)
        if (res.data.code === '200') {
          sessionStorage.setItem('shippingMethods', resData)
        }
      })
    }
  }
}
</script>

<style>

</style>
