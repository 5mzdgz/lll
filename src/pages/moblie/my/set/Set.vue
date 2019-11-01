<template>
	<div class="set">
		<header-nav :navTitle="navTitle"></header-nav>
		<ul>
			<li v-for="(item, index) in setArr" :key="index" @click="goSetItemClick(item.id)">
				<div class="item" v-if="item.grade">
					<div class="left-box">
						<img :src="item.iconImg" alt="">
						<span>{{item.setTitle}}</span>
					</div>
					<i class="el-icon-arrow-right"></i>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'set',
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '设置',
			setArr: [
				{
					id: 1,
					iconImg: 'https://img.laoliangli.com/label/common/my_info_icon.png',
					setTitle: '编辑个人资料',
					grade: true
				},
				{
					id: 2,
					iconImg: 'https://img.laoliangli.com/label/common/reset_password_icon.png',
					setTitle: '设置支付密码',
					grade: true
				},
				{
					id: 3,
					iconImg: 'https://img.laoliangli.com/label/common/switch_icon.png',
					setTitle: '切换账号',
					grade: true
				}
			]
		}
	},
	mounted () {
		const grade = Number(this.$route.query.grade)
		const setArr = this.setArr
		if (!grade) {
			setArr.forEach((item)=>{
				if (item.id === 2) {
					item.grade = false
				}
			})
			this.setArr = setArr
    	}
	},
	methods: {
		goSetItemClick (id) {
			if (id === 1) {
				this.$router.push({name: 'User'})
			} else if (id === 2) {
				this.$router.push({name: 'Membership'})
			} else if (id === 3) {
				this.$router.push({name: 'Login'})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.set {
	ul {
		li {
			.item {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				padding: 0 .28rem;
				height: 1rem;
				margin: .2rem 0;
				background-color: #fff;
				box-shadow:2px 4px 8px rgba(0,0,0,0.05);
				.left-box {
					img {
						width: .52rem;
						height: .52rem;
						margin-right: .24rem;
					}
				}
				i {
					font-size: .45rem;
				}
			}
		}
	}
}
</style>