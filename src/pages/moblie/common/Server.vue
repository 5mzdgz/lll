<template>
	<div class="server-container">
		<div v-if="isShow">
			<div :class="{opation_box: isShow}" @click="handleHide"></div>
			<div :class="{server_box: isShow}">
				<div class="img-box">
					<img src="@/assets/image/home/wxrq_code.png" alt="">
				</div>
				<p>请微信扫二维码</p>
				<p>进入微信小程序联系客服</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: 'Server',
    data () {
		return {
			isShow: false
		}
	},
	methods: {
        handleShow () {
            this.isShow = true
        },
		handleHide () {
			this.isShow = false
		}
	}
}
</script>

<style lang="scss" scoped>
.server-container {
	.opation_box {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #000;
		opacity: .4;
		z-index: 99;
	}
	.server_box {
		position: fixed;
		top: 20%;
		left: 15%;
		width: 70%;
		overflow: hidden;
		height: 0;
		background: #fff;
		border-radius: .2rem;
		padding-bottom: 82%;
        z-index: 999;
		text-align: center;
		.img-box {
			margin: .4rem auto;
			width: 67%;
			overflow: hidden;
			height: 0;
			padding-bottom: 67%;
			img {
				width: 100%;
			}
		}
		p {
			font-size: .2rem;
			line-height: .4rem;
		}
	}
}
</style>

