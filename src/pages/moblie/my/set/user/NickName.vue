<template>
	<div class="nickname-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="nickname-box">
			<p>长度不得超过18个字符</p>
      <input type="text" placeholder="请填写昵称" maxlength="18" v-model="nickname"/>
		</div>
    <button @click="confrimNickName">确认修改</button>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
  name: 'NickName',
  components: {
  HeaderNav
  },
  data () {
    return {
      navTitle: '昵称',
      nickname: ''
    }
  },
  mounted () {
    const nickname = decodeURIComponent(this.$store.state.userData.nickname)
    // console.log(nickname)
    if (nickname === 'null') {
      this.nickname = ''
    } else {
      this.nickname = nickname
    }
  },
  methods: {
    confrimNickName () {
      // console.log(this.nickname)
      const data = {
        nickname: encodeURIComponent(this.nickname)
      }
      this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/nickname/update', data).then((res) => {
        if (res.data.code === '200') {
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nickname-box {
  p {
    color: #929090;
    padding: .1rem .2rem;
  }
  input {
    height: .8rem;
    font-size: .3rem;
    width: 96%;
    background: #fff;
    padding: 2%;
  }
}
button {
  position: fixed;
  bottom: 0;
  height: .8rem;
  color: #fff;
  width: 100%;
  background: #e72c2c;
}
</style>

