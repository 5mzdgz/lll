<template>
  <div class="phone-container">
    <header-nav :navTitle="navTitle"></header-nav>
		<ul>
      <li><input type="text" placeholder="+86 输入您的手机号" maxlength="11" v-model="phone"/></li>
      <li>
        <input type="text" placeholder="输入验证码" maxlength="4" v-model="code"/>
        <button v-bind:disable="disable" @click="getCode">{{sendCode}}</button>
      </li>
      <button class="phone-login" @click="handleLogin">登录</button>
    </ul>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
  name: 'phone',
  components: {
		HeaderNav
  },
  data () {
    return {
      navTitle: '手机注册登录',
      phone: '',
      code: '',
      type: 1,
      sendCode: '获取验证码',
      disable: true,
      toastInstanse: null
    }
  },
  methods: {
    getCode () {
      const ph = this.phone
      let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
      if (ph == '') {
        this.$toast({
          message: '手机号不能为空',
          position: 'top'
        })
        return false
      } else if (!myreg.test(ph)) {
        this.$toast({
          message: '请输入正确的手机号',
          position: 'top'
        })
        // this.$message.error('请输入正确的手机号')
        return false
      } else {
        this.getPhoneCode()
      }
    },
    // 获取验证码
    getPhoneCode () {
      const vcode = {
        type: this.type,
        phone: this.phone
      }
      // console.log(vcode)
      this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/vcode', vcode).then(this.getPhoneCodeScc)
    },
    getPhoneCodeScc (res) {
      // console.log(res)
      let num = 61
      let timer = setInterval(() => {
        num--;
        if (num <= 0) {
          clearInterval(timer)          
          this.sendCode = '重新发送'
          this.disable = false
        } else {
          this.sendCode = num + ' s'
        }
      }, 1000)
    },
    // 手机登录
    handleLogin () {
      let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
      if (this.phone == '') {
         this.$toast({
          message: '手机号不能为空',
          position: 'top'
        })
        return false
      } else if (!myreg.test(this.phone)) {
         this.$toast({
          message: '请输入正确的手机号',
          position: 'top'
        })
        return false
      }
      if (this.code == '') {
         this.$toast({
          message: '验证码不能为空',
          position: 'top'
        })
        return false
      } else {
        this.getLoginToken()
      }
      // console.log(this.disable)
      // console.log(this.$store.state.accessToken)
    },
    
    getLoginToken () {
      const platform = sessionStorage.getItem("platform")
      const data = {
        type: this.type,
        phone: this.phone,
        vcode: this.code,
        source: platform,
        inviteUser: this.$store.state.inviteUser
      }
      // console.log(data)
      this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/login/reg',data).then(this.getLoginTokenScc)
    },
    getLoginTokenScc (res) {
      // console.log(res.data)
      if (res.data.code === '200') {
        localStorage.setItem('loginToken', res.data.data.token)
        // this.$router.push('/mobile/login')
        this.$router.replace('/mobile/my')
        sessionStorage.setItem('selected', 'my')
        // console.log('00')
      }
      // console.log(localStorage.getItem('loginToken'))
    }
  }
}
</script>

<style lang="scss" scoped>
.phone-container {
  height: 100vh;
  background: #fff;
  ul {
    text-align: center;
    margin-top: 30%;
    width: 100%;
    li {
      width: 77.6%;
      text-align: left;
      margin-left: 11.2%;
      border-bottom: 1px solid #eee;
      margin-bottom: .62rem;
      font-size: .38rem;
      input {
        width: 70%;
      }
      button {
        text-align: center;
        background: #fff;
        color: #80B4F0;
        font-size: .25rem;
      }
    }
  }
  .phone-login {
    width: 68.53%;
    height: .75rem;
    line-height: .75rem;
    font-size: .36rem;
    text-align: center;
    border-radius: .37rem;
    background: #8E7C77;
    color: #fff;
  }
}
</style>

