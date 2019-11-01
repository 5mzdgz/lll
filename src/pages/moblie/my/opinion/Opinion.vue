<template>
	<div class="opinion-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="opinion-box">
			<textarea :placeholder="placeholder" class="textarea-inherit" maxlength="140" v-model="submission" />
			<updatefile :multiple="true" :max=6 :imgList="imgList" @getImgFile="NewImgFile" ref="upload"></updatefile>
			<!-- <div class="add-box">
				<img src="https://img.laoliangli.com/label/common/addimg_icon.png" alt="">
				<p>添加照片</p>
			</div> -->
		</div>
		<div class="btn">
			<button @click="handleSubmission">提交反馈</button>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import updatefile from '@/pages/moblie/my/opinion/Updatefile'
export default {
	name: 'Opinion',
	components: {
		HeaderNav,
		updatefile
	},
	data () {
		return {
			navTitle: '意见反馈',
			placeholder: '写下老良利商城的功能建议或发现的系统问题，么么哒！',
			submission: '',
			imgList: [],
			files:[]
		}
	},
	methods: {
		handleSubmission () {
			// let picList = this.$refs.upload.imgList
			//console.log(this.submission)
			// console.log(picList)
			//console.log(this.files)
			// 创建form表单对象
			if (this.files.length === 0) {
				this.$toast({
					message: '至少上传一张图片',
				})
			}
			let fileFormData = new FormData();
			//console.log(this.files[0][0].name)
			for (let i = 0; i < this.files.length; i++) {
				//console.log(this.files[i][0])
				//console.log(this.files[i][0].name)
				fileFormData.append('files', this.files[i][0], this.files[i][0].name);
			}
			
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
				}
			}
			if (this.submission === '') {
				this.$toast({
					message: '反馈内容不能为空',
				})
				return false
			}
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/feedback/upload?content=' + this.submission, fileFormData, config).then((res) => {
				// console.log(res)
				if (res.data.code === '200') {
					this.submission = ''
					this.$toast(`感谢您宝贵建议`);
					this.$router.back(-1)
				}
			})
		},
		NewImgFile (newFile) {
			// console.log(newFile)
			this.files = newFile
		}
	}
}
</script>

<style lang="scss" scoped>
.opinion-container {
	background: #fff;
	height: 100vh;
	.opinion-box {
		text-align: center;
		padding-bottom: .3rem;
		margin: .3rem .24rem;
		border-bottom: 1px solid #D5D5D5;
		.textarea-inherit {
			height: 2rem;
			width: 94%;
			resize: none;
			font-size: .2rem;
			text-align: justify;
		}
		.add-box {
			width: 1.64rem;
			height: 1.64rem;
			border: 1px dashed #D5D5D5;
			text-align: center;
			margin-top: .1rem;
			img {
				margin: .36rem 0 .16rem 0;
				width: .64rem;
				height: .54rem;
			}
			p {
				font-size: .28rem;
				color: #D5D5D5;
			}
		}
	}
	.btn {
		text-align: center;
		button {
			background: #8E7C77;
			color: #fff;
			font-size: .28rem;
			width: 5rem;
			height: .65rem;
			border-radius: .12rem;
		}
	}
}
</style>

