<template>
  <div class="content">
    <div class="content-top">
      <img src="@/assets/image/introduction/banner_1.png" alt="">
    </div>
    <div class="content-middle">
      <h1>品牌故事</h1>
      <span>老良利传承家族纯手工艺的制作方式，</span>
      <span>将国际时尚的设计理念与传统纯手工艺相结合，碰撞出璀璨的艺术火花。</span>
      <span>我们精心设计、严控细节，让每一件珠宝，都是完美精巧的艺术品。</span>
      <span>老良利相信珠宝应该具有内涵和使命，因此将浮动的情愫幻化成灵动的线条，</span>
      <span>把情感的寄语灌注在金属中，用宝石点亮灵魂，</span>
      <span>让每一件珠宝蕴含的情感都熠熠生辉，相伴永随。</span>
      <img src="@/assets/image/introduction/Message.png" alt="">
    </div>
    <div class="technology">
      <div class="t-cantianer">
        <div class="tech-left">
          <h1>工艺理念</h1>
          <div class="emtpy"></div>
          <p>以国际标准925银作为主要材质，因其理想的硬度，搭配半宝石、天然宝石等，能更好的呈现出精美时尚的珠宝。老良利拥有实力出众专业制作团队，累积多年的醇熟技艺，以精致传统的纯手工方式，雕琢出每一寸完美细节，力求每一件珠宝的独特精致。</p>
        </div>
        <div class="tech-right">
          <img src="@/assets/image/introduction/Technological.png" alt="">
        </div>
      </div>
    </div>
    <div class="advantage">
      <h1>品牌优势</h1>
      <div class="a-info">
        <div class="a-img">
          <img src="@/assets/image/introduction/Brand.png" />
        </div>
        <div class="info-p">
          <p>设计：浪漫时尚，潮流个性</p>
          <p>制作：优质选材，精湛工艺</p>
          <p>保障：七天无理由退换</p>
          <p>服务：专业团队，终身售后</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntContent'
}
</script>

<style lang="scss" scoped>
.content {
  .content-top {
    overflow: hidden;
    height: 0;
    width: 100%;
    padding-bottom: 20.83%;
    img {
      width: 100%;
    }
  }
  .content-middle {
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      font-size: 32px;
      color: rgb(44, 44, 44);
      text-align: center;
      margin: 100px 0 60px 0;
    }
    span {
      font-size: 18px;
      height: 36px;
      line-height: 36px;
      color: rgb(41, 41, 41);
    }
    img {
      margin: 63px 0 73px 0;
      width: 346px;
      height: 396px;
    }
  }
  .technology {
    background-color:#f5f6f6;
    height: 600px;
    .t-cantianer {
      overflow: hidden;
      width: 1200px;
      margin: 0 auto;
      .tech-left {
        float: left;
        width: 600px;
        h1 {
          font-size: 32px;
          margin: 168px 0 48px 93px;
          color: #2c2c2c;
        }
        .emtpy {
          width: 40px;
          height: 4px;
          background-color: rgb(61, 61, 61);
          margin: 0 0 48px 93px;
        }
        p {
          width: 426px;
          margin-left: 93px;
          font-size: 16px;
          height: 28px;
          line-height: 28px;
          color: #2c2c2c;
        }
      }
      .tech-right {
        float: left;
        width: 224px;
        height: 439px;
        margin: 100px 0 61px 199px;
        img {
          width: 100%;
        }
      }
    }
  }
  .advantage {
    position: relative;
    h1 {
      font-size: 32px;
      color: #2c2c2c;
      margin: 100px 0;
      text-align: center;
      letter-spacing: 16px;
    }
    .a-info {
      width: 1200px;
      height: 454px;
      margin: 0 auto;
      padding-bottom: 100px;
      .a-img {
        float: left;
        width: 496px;
        height: 454px;
        img {
          width: 100%;
        }
      }
      .info-p {
        float: left;
        width: 216px;
        margin: 120px 0 120px 116px;
        p {
          font-size: 18px;
          color: rgb(93, 93, 93);
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
