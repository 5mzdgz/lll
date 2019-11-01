<template>
  <div class="product-detail-container">
		<div v-for="(item, index) in detailImgArr" :key="index" class="img-box">
			<img class="detail-img" v-lazy="item.imgUrl">
		</div>
	</div>
</template>

<script>

export default {
	name: 'ProductDetail',
	props: {
		detailImgArr: Array
	}
}
</script>

<style lang="scss" scoped>
.product-detail-container {
	background: #f6f6f6;
	overflow: hidden;
	padding-top: .2rem;
	padding-bottom: 1rem;
	box-sizing: border-box;
	.img-box {
		img[lazy=loading] {
			width: 40px;
			height: 100px;
			margin: auto;
		}
		.detail-img {
			width: 100%;
		}
	}
}
</style>
