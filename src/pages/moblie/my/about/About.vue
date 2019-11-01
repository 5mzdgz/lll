<template>
	<div class="about-container">
		<header-nav :navTitle="navTitle"></header-nav>
		<div class="about-box">
			<div class="about-banner">
				<img src="@/assets/image/about/about_bannr.png" alt="">
			</div>
			<div class="introduce-box">
				<div class="title">
					<h1>公司介绍</h1>
					<h6>COMPANYINTRODUCTION</h6>
					<div class="line"></div>
				</div>
				<p>老良利坚持纯手工艺文化+时尚设计的传承，自成立以来，我们就致力于打造全民时尚品牌，采用“线上多渠道”+“线下连锁”的运营模式。</p>
				<p>设计灵感来源于情感、自然、浪漫与个性，独具匠心的运用各种时尚元素和材质，每个系列都充满了独特的设计感和情感内涵。我们怀着至诚、至善的态度，制作至信、至精的产品，将时尚珠宝的幸福体验带给每一位客户。</p>
			</div>
			<div class="culture-box">
				<div class="title">
					<h1>公司文化</h1>
					<h6>ENTERPRISECULTURE</h6>
					<div class="line"></div>
				</div>
				<div class="culture-img">
					<img src="https://img.laoliangli.com/label/my/about_culture.png" alt="">
				</div>
			</div>
			<div class="culture-item" v-for="(item,index) in cultrue" :key="index">
				<span class="culture-left">{{item.title}}</span>
				<i class="el-icon-caret-right"></i>
				<span class="culture-right">{{item.sub}}</span>
			</div>
			<div class="brand-box">
				<div class="logo-box">
					<img src="@/assets/image/about/about_logo.png" alt="">
				</div>
				<div class="title">
					<h1>公司品牌</h1>
					<h6>BRANDINTRODUCTION</h6>
					<div class="line"></div>
				</div>
				<p>老良利传承家族纯手工艺的制作方式，将国际时尚的设计理念与传统纯手工艺相结合，碰撞出璀璨的艺术火花。</p>
				<p>我们精心设计、严控细节，让每一件珠宝，都是完美精巧的艺术品。</p>
				<p>老良利相信珠宝应该具有内涵和使命，因此将浮动的情愫幻化成灵动的线条，</p>
				<p>把情感的寄语灌注在金属中，用宝石点亮灵魂，</p>
				<p>让每一件珠宝蕴含的情感都熠熠生辉，相伴永随。</p>
				<div class="message-box">
					<img src="@/assets/image/about/about_message.png" alt="">
				</div>
			</div>
			<div class="technology-box">
				<div class="title">
					<h1>工艺理念</h1>
					<h6>TECHNOLOGICALCONCE</h6>
					<div class="line"></div>
				</div>
				<p>以国际标准925银作为主要材质，因其理想的硬度，搭配半宝石、天然宝石等，能更好的呈现出精美时尚的珠宝。老良利拥有实力出众专业制作团队，累积多年的醇熟技艺，以精致传统的纯手工方式，雕琢出每一寸完美细节，力求每一件珠宝的独特精致</p>
				<div class="technology-img">
					<img src="@/assets/image/about/about_idea.png" alt="">
				</div>
			</div>
			<div class="advantage-box">
				<div class="title">
					<h1>品牌优势</h1>
					<h6>BRANDADVANTAGE</h6>
					<div class="line"></div>
				</div>
				<div class="advantage-img">
					<img src="@/assets/image/about/about_advantage.png" alt="">
				</div>
				<div class="content-box">
					<p>设计：浪漫时尚，潮流个性</p>
					<p>制作：优质选材，精湛工艺</p>
					<p>保障：七天无理由退换</p>
					<p>服务：专业团队，终身售后</p>
				</div>
			</div>
			<div class="wxrq-code">
				<div class="login-sub">
					<p>更多功能与资讯请微信扫二维码</p>
					<p>关注微信公众号或进入微信小程序</p>
				</div>
				<div class="rq-code">
					<img src="@/assets/image/home/rq_code.png" alt="">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import HeaderNav from '@/pages/moblie/common/HeaderNav'
export default {
	name: 'About',
	components: {
		HeaderNav
	},
	data () {
		return {
			navTitle: '公司介绍',
			cultrue: [
				{ title: '服务', sub: '顾客至上 服务至上' },
				{ title: '诚信', sub: '企业如人 诚信为本' },
				{ title: '敬业', sub: '专业执着 精益求精' },
				{ title: '激情', sub: '乐观向上 勇敢拼搏' },
				{ title: '共赢', sub: '开放合作 互利共赢' }

			]
		}
	}
}
</script>

<style lang="scss" scoped>
.about-container {
	.about-box {
		text-align: center;
		background: #fff;
		.about-banner {
			overflow: hidden;
			width: 100%;
			height: 0;
			padding-bottom: 44%;
			img {
				width: 100%;
			}
		}
		.introduce-box {
			margin: 0 auto;
			p {
				padding: 0 6%;
				font-size: .2rem;
				text-align: left;
				line-height: .5rem;
			}
		}
		.culture-box {
			.culture-img {
				margin: 0 3%;
				overflow: hidden;
				width: 94%;
				height: 0;
				padding-bottom: 43.47%;
				img {
					width: 100%;
				}
			}
		}
		.culture-item {
			width: 76%;
			overflow: hidden;
			height: 0;
			padding-bottom: 16%;
			left: 12%;
			margin-left: 12%;
			border-bottom: 1px solid #eee;
			span,i {
				margin-top: 10%;
			}
			i {
				padding: 0 .3rem;
			}
			.culture-left {
				color: #272727;
				font-size: .28rem;
			}
			.culture-right {
				color: #5E5E5E;
				font-size: .24rem;
			}
		}
		.brand-box {
			.logo-box {
				margin-top: .5rem;
				margin-left: 28%;
				overflow: hidden;
				width: 43.47%;
				height: 0;
				padding-bottom: 18.13%;
				img {
					width: 100%;
				}
			}
			p {
				padding: 0 18%;
				font-size: .2rem;
				line-height: .45rem;
			}
			.message-box {
				margin: 4% 22%;
				overflow: hidden;
				height: 0;
				width: 56.53%;
				padding-bottom: 64.53%;
				img {
					width: 100%;
				}
			}
		}
		.technology-box {
			width: 100%;
			overflow: hidden;
			clear: both;
			p {
				float: left;
				width: 42.4%;
				font-size: .2rem;
				text-align: left;
				line-height: .4rem;
				margin-top: 10%;
				margin-left: 7%;
			}
			.technology-img {
				margin-left: -7%;
				float: right;
				width: 56%;
				overflow: hidden;
				height: 0;
				padding-bottom: 86%;
				img {
					width: 100%;
				}
			}
		}
		.advantage-box {
			overflow: hidden;
			width: 100%;
			.advantage-img {
				float: left;
				width: 50.13%;
				height: 0;
				overflow: hidden;
				padding-bottom: 73.87%;
				img {
					width: 100%;
				}
			}
			.content-box {
				width: 45.6%;
				float: right;
				margin-top: 1rem;
				p {
					text-align: left;
					font-size: .2rem;
					padding-bottom: .25rem;
				}
			}
		}
		.wxrq-code {
			.login-sub {
				width: 100%;
				p {
					width: 100%;
					text-align: center;
					font-size: .2rem;
					margin-bottom: .16rem;
				}
			}
			.rq-code {
				overflow: hidden;
				width: 100%;
				height: 0;
				padding-bottom: 52%;
				img {
					width: 100%;
				}
			}
		}
		.title {
			h1 {
				font-size: .38rem;
				color:#1E1E1E;
				padding-top: .5rem;
			}
			h6 {
				padding: .08rem 0 .06rem 0;
				font-size: .01rem;
				color: #808080;
			}
			.line {
				margin-left: 42.4%;
				margin-bottom: .3rem;
				width: .9rem;
				height: .03rem;
				background: #434343;
			}
		}
	}
}
</style>

