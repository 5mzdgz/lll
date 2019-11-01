<template>
	<div class="autograph-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="autograph-box">
			<p>有兴趣的个人介绍会吸引更多粉丝哦</p>
      <textarea v-model="autograph" placeholder="个性签名" name="" id="" cols="30" rows="10"></textarea>
		</div>
    <button @click="confrimAutograph">确认修改</button>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
    name: 'Autograph',
    components: {
		HeaderNav
    },
    data () {
      return {
        navTitle: '个性签名',
        autograph: ''
      }
    },
    mounted () {
      const autograph = decodeURIComponent(this.$store.state.userData.autograph)
      // console.log(autograph)
      if (autograph === 'null') {
        this.autograph = ''
      } else {
        this.autograph = autograph
      }
    },
    methods: {
      confrimAutograph () {
        // console.log(this.autograph)
        const data = {
          autograph: encodeURIComponent(this.autograph)
        }
        this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/autograph/update', data).then((res) => {
          // console.log(res)
          if (res.data.code === '200') {
            this.$router.go(-1)
          }
        })
      }
    }
}
</script>

<style lang="scss" scoped>
.autograph-box {
  p {
    color: #929090;
    padding: .1rem .2rem;
  }
  textarea {
    width: 96%;
    background: #fff;
    padding: 2%;
    font-size: .3rem;
    resize: none;
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

