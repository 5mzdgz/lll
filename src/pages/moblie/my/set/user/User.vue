<template>
	<div class="user-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="user-box">
			<div class="header-box">
				<div class="header-img" @click="changeHeadImg">
					<img :src="headImgUrl" alt="">
				</div>
				<input id="upload_file" type="file" class="file-input" accept="image/png,image/jpeg,image/jpg" @change="inputChange"/>
				<span>编辑头像</span>
			</div>

			<router-link to="/mobile/set/user/nickname">
				<div class="item-box">
					<span class="left">昵称</span>
					<span class="middle">{{nickname}}</span>
					<i class="el-icon-arrow-right"></i>
				</div>
			</router-link>

			<div class="item-box" @click="handleSexVisible">
				<span class="left">性别</span>
				<span class="middle">{{sex}}</span>
				<i class="el-icon-arrow-right"></i>
			</div>

			<router-link to="/mobile/set/user/autograph">
				<div class="item-box">
					<span class="left">个性签名</span>
					<span class="middle">{{autograph}}</span>
					<i class="el-icon-arrow-right"></i>
				</div>
			</router-link>

			<mt-popup v-model="sexVisible" position="bottom" class="region-popup">
				<div class="btn">
					<span class="cancle" @click="cancle">取消</span>
					<span class="sureMap" @click="sureMap">确定</span>
				</div>
				<mt-picker :slots="sexArr" @change="onValuesChange" :itemHeight="40"></mt-picker>
			</mt-popup>
		</div>
	</div>
</template>

<script>
// <cropper :headerImage="headerImage" @getHeaderImage="newHeaderImage"></cropper>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import cropper from '@/pages/moblie/common/Cropper'
import Cropper from 'cropperjs' 
export default {
	name: 'User',
	inject: ['reload'],
	components: {
		HeaderNav,
		cropper
  },
	data () {
		return {
			navTitle: '修改个人资料',
			headImgUrl: '',
			nickname: '',
			autograph: '未填写',
			headerImage: '',
			sexVisible: false,
			sex: '男',
			sexValus: '',
			sexArr: [
        {
          flex: 1,
          values: ['男','女'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
		}
	},
	mounted () {
		this.getUserInfoData()
	},
	methods: {
		/**
		 * 性别选项
		 */
		handleSexVisible () {
			this.sexVisible = true
		},
		onValuesChange (values) {
			// console.log(values.values)
			this.sexValus = values.values[0]
		},
		/**
		 * 取消
		 */
		cancle () {
			this.sexVisible = false
		},
		/**
		 * 确认修改性别
		 */
		sureMap () {
			// console.log(this.sexValus)
			if (this.sexValus !== this.sex) {
				var num
				if (this.sexValus === '男') {
					num = 1
				} else {
					num = 2
				}
				const data = {
					sex: num
				}
				this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/sex/update', data).then((res) => {
					if (res.data.code === '200') {
						this.sex = this.sexValus
					}
				})
			}
			this.sexVisible = false
		},
		/**
		 * 获取用户信息
		 *  */ 
		getUserInfoData () {
			this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/info').then(this.getUserInfoScc)
		},

		getUserInfoScc (res) {
			// console.log(res.data.data)
			if (res.data.code === '90001' || res.data.code === '90002') {
				this.reload()
			}
			const userData = res.data.data
			if (userData) {
				// this.userData = resData
				this.$store.dispatch('addUserData', userData)
				// 图片是否存在，时间戳用于区分old , new 图
				this.headImgUrl = userData.headImgUrl ? userData.headImgUrl + '?t=' + (new Date().getTime()) : 'https://img.laoliangli.com/label/my/authorImg_icon.png'
				
				this.nickName = decodeURIComponent(userData.nickname)
				if (!userData.nickname || userData.nickname === 'null') {
					this.nickname = '未填写'
				} else {
					this.nickname = decodeURIComponent(userData.nickname)
				}
				if (!userData.autograph || userData.autograph === 'null') {
					this.autograph = '未填写'
				} else {
					this.autograph = decodeURIComponent(userData.autograph)
				}
				if (userData.sex === 1) {
					this.sex = '男'
				} else {
					this.sex = '女'
				}
			}
		},
		newHeaderImage(newImg){
			this.headerImage = newImg
		},
		/**
		 * 修改头像
		 */
		changeHeadImg () {

		},
		/**
		 * 修改头像
		 */
		inputChange (e) {
			var that = this
      let files = e.target.files;
      // console.log(files[0])
      let len = files.length;
      if (len > 1) {
        // document.getElementById("upload_file").value = "";
        this.$toast(`最多允许上传 1 张`);
        return;
			}
			// 预览上传图片
			var file = files[0]
			
    //   if(window.FileReader) {
    //     var fr = new FileReader();  
    //     fr.onloadend = function(e) {  
		  // console.log(e.target.result)
        //   that.headImgUrl = e.target.result
        // };  
        // fr.readAsDataURL(file);  //也是利用将图片作为url读出
			// }
			// console.log(file)
			let form = new FormData();
			form.append('file', file);
			// console.log(form.get('file'))
			let config = {
				headers: {
					'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
				}
			}
			this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/upload/image', form, config).then((res) => {
				// console.log(res)
				if (res.data.code === '200') {
					this.headImgUrl = res.data.data + '?t=' + (new Date().getTime())
					this.$toast(`修改头像成功`);
				} else {
					this.$toast(`修改头像失败`);
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.user-container {
	position: relative;
	.user-box {
		position: absolute;
		top: 2rem;
		background-color: #fff;
		border-radius: .24rem;
		height: 4.5rem;
		width: 95%;
		margin: 0 2.5%;
		box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
		text-align: center;
		.header-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			height: 2.3rem;
			margin-top: -1rem;
			overflow: hidden;
			.header-img, .file-input {
				box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
				width: 1.96rem;
				height: 1.96rem;
				border-radius: 100%;
				overflow: hidden;
				img {
					display: block;
					width: 100%;
				}
			}
			.file-input {
				margin-top: -1.96rem;
				opacity: 0;
			}
			span {
				font-size: .2rem;
				margin-top: .1rem;
			}
		}
		.item-box {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: .42rem 0 .14rem 0;
			margin: 0 .32rem;
			justify-content: space-between;
			border-bottom: 1px solid #D6D6D6;
			.left {
				width: 1.2rem;
				font-size: .3rem;
				color: #C2C2C2;
				text-align: left;
				margin-right: .2rem;
			}
			.middle {
				color: #000000;
				font-size: .24rem;
				width: 3.7rem;
				line-height: .3rem;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 1;
				word-break: break-all;
				-webkit-box-orient:vertical;
				overflow: hidden;
				text-align: left;
			}
			i {
				color: #C2C2C2;
				font-size: .3rem;
			}
		}
		.region-popup {
			width: 100%;
			.btn {
				height: .8rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				span {
					width: 1rem;
					height: .8rem;
					line-height: .8rem;
				}
			}
		}
	}
}
</style>

