<template>
	<div class="none">
		<div class="header-nav">
			<dl>
				<dd class="left">
					<div @click="back"><img src="https://img.laoliangli.com/label/common/arrow_left.png" alt="" /></div>
					<div @click="goHome"><img src="https://img.laoliangli.com/label/common/home_icon.png" alt=""/></div>
				</dd>
				<dd class="middle">{{navTitle}}</dd> 	
				<dd class="right"></dd>
			</dl>
		</div>
	</div>
	
</template>

<script>

export default {
	name: 'HeaderNav',
	inject:['reload'],
	props: ['navTitle'],
	methods: {
		back () {
			const success = JSON.parse(sessionStorage.getItem('success'))
			const fail = JSON.parse(sessionStorage.getItem('fail'))
			const walletPayFlag = JSON.parse(sessionStorage.getItem('walletPayFlag'))
			const WechatBrowser = JSON.parse(sessionStorage.getItem('WechatBrowser'))
			// console.log(walletPayFlag)
			if (success !== -1 || fail !== -1) {
				if (walletPayFlag) {
					// console.log(walletPayFlag)
					this.$router.go(-1)
				} else {
					if (WechatBrowser) {
						this.$router.go(-2)
					} else {
						this.$router.go(-3)
					}
				}
			} else {
				this.$router.go(-1)
			}
		},
		goHome () {
			sessionStorage.setItem('selected', 'home')
			this.$router.push('/home')
		}
	}
}
</script>

<style lang="scss" scoped>
.none {
	height: .8rem;
	width: 100%;
	overflow: hidden;
}
.header-nav {
	position: fixed;
	top: 0;
	height: .8rem;
	line-height: .8rem;
	z-index: 999;
	width: 100%;
	background: #fff;
	box-shadow:2px .04rem .08rem rgba(221,221,221,0.22);
	padding: 0 .1rem;
	dl {
		overflow: hidden;
		display: flex;
		flex-direction: row;
		align-items: center;
		dd {
			&.middle {
				text-align: center;
				width: 50%;
				font-size: .24rem;
				color: #1e1e1e;
			}
			&.left,.right {
				width: 25%;
				display: flex;
				flex-direction: row;
				align-items: center;
				border: 1px solid #eee;
				height: .6rem;
				border-radius: .3rem;
				div {
					flex: 1;
					text-align: center;
					border-right: 1px solid #eee;
					height: .6rem;
					line-height: .6rem;
					img {
						width: .35rem;
					}
				}
				div:nth-child(2) {
					border-right: none;
				}
			}
			&.left {
				text-align: left;
			}
			
		}
	}
}
</style>
