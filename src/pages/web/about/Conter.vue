<template>
  <div class="my-center">
    <div class="banner">
      <img src="@/assets/image/about/banner.png" />
    </div>
    <div class="about-info">
      <h1>公司介绍</h1>
      <img src="@/assets/image/about/CompanyIntroduct.png" alt="">
      <div class="info">
        <p>老良利坚持纯手工艺文化+时尚设计的传承，自成立以来，我们就致力于打造全民时尚珠宝品牌，采用“线上多渠道”+“线下连锁”的运营模式。</p>
        <p class="info-btm">设计灵感来源于情感、自然、浪漫与个性，独具匠心的运用各种时尚元素和材质，每个系列都充满了独特的设计感和情感内涵。我们怀着至诚、至善的态度，制作至信、至精的产品，将时尚珠宝的幸福体验带给每一位客户。</p>
      </div>
    </div>
    <div class="corporate-culture">
      <h1>企业文化</h1>
      <ul>
        <li>
          <h2>服务</h2>
          <img class="btm-img" src="@/assets/image/about/Corporate.gif" />
          <h4>顾客至上</h4>
          <h4>服务至上</h4>
        </li>
        <li> <img src="@/assets/image/about/Corporate.png" /></li>
        <li>
          <h2>诚信</h2>
          <img class="btm-img" src="@/assets/image/about/Corporate.gif" />
          <h4>企业如人</h4><h4>诚信为本</h4>
        </li>
        <li><img src="@/assets/image/about/Corporate.png" /></li>
        <li>
          <h2>敬业</h2>
          <img class="btm-img" src="@/assets/image/about/Corporate.gif" />
          <h4>专业执着</h4><h4>精益求精</h4>
        </li>
        <li><img src="@/assets/image/about/Corporate.png" /></li>
        <li>
          <h2>激情</h2>
          <img class="btm-img" src="@/assets/image/about/Corporate.gif" />
          <h4>乐观向上</h4><h4>勇敢拼搏</h4>
        </li>
        <li><img src="@/assets/image/about/Corporate.png" /></li>
        <li>
          <h2>共赢</h2>
          <img class="btm-img" src="@/assets/image/about/Corporate.gif" />
          <h4>开放合作</h4>
          <h4>互利共赢</h4>
        </li>
      </ul>
      <img class="right-img" src="@/assets/image/about/corporateculture.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCenter'
}
</script>

<style lang="scss" scoped>
.my-center {
  margin-bottom: 100px;
  .banner {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 20.83%;
    img {
      width: 100%;
    }
  }
  .about-info, .corporate-culture {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    h1 {
      text-align: center;
      font-size: 32px;
      letter-spacing: 16px;
      margin: 100px 0;
    }
    .info {
      position: absolute;
      width: 536px;
      height: 500px;
      right: 0;
      top: 132px;
      p {
        float: right;
        width: 416px;
        font-size: 18px;
        height: 36px;
        line-height: 36px;
        color: #2f2f2f;
        letter-spacing: 1px;
        padding: 96px 50px;
        text-indent: 38px;
      }
      .info-btm {
        padding-top: 0;
      }
    }
  }
  .corporate-culture {
    height: 532px;
    ul {
      padding-left: 80px;
      li {
        float: left;
        width: 24px;
        height: 318px;
        text-align: center;
        padding: 0 18px;
        margin-top: 50px;
        h2 {
          margin-top: 28px;
          font-size: 24px;
          color: #272727;
        }
        .btm-img {
          width: 10px;
          height: 6px;
          margin: 30px 0;
        }
        h4 {
          font-size: 16px;
          color: #5e5e5e;
          padding-bottom: 10px;
        }
      }
    }
    .right-img {
      width: 400px;
      height: 400px;
      float: right;
    }
  }
}
</style>
