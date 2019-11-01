<template>
  <div class="product-info-container">
		<div class="info-box">
			<div class="product-info-top">
				<div class="info-top-left">
					<p class="product-title">{{idDetailData.title}}</p>
					<p class="producdt-price">￥{{idDetailData.nowPrice}}</p>
					<p class="product-btm">快递:包邮</p>
				</div>
				<!-- <div class="info-top-right">
					<img src="https://img.laoliangli.com/label/my/share_icon.png" alt="">
					<span>分享</span>
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'ProductInfo',
	props: {
		idDetailData: Object
	}
}
</script>

<style lang="scss" scoped>
.product-info-container {
	width: 100%;
	.info-box {
		clear: both;
		overflow: hidden;
		width: 96%;
		height: 0;
		padding-bottom: 32.54%;
		margin: 2%;
		.info-top-left {
			float: left;
			width: 79%;
			.product-title {
				width: 100%;
				height: .31rem;
				font-size: .32rem;
				color:#2F2F2F;
				padding-top: 1px;
				display: -webkit-box;
				text-overflow: ellipsis;
				-webkit-line-clamp: 1;
				word-break: break-all;
				-webkit-box-orient:vertical;
				overflow: hidden;
			}
			.producdt-price {
				font-size: .42rem;
				font-weight: bold;
				color:#282828;
				padding: .39rem 0 .4rem 0;
			}
			.product-btm {
				font-size: .24rem;
				color:#6B6B6B;
			}
		}
		.info-top-right {
			float: right;
			img {
				width: .34rem;
				height: .34rem;
			}
			span {
				font-size: .24rem;
				color:#6B6B6B;
				padding-left: .2rem;
			}
		}
	}
}
</style>
