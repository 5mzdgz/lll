<template>
  <div class="maintain">
    <nav-pc></nav-pc>
    <div class="maintain-con">
      <div class="notice-nav">
        <div class="nav-bar">
          <router-link to="/">首页<i class="el-icon-arrow-right"></i></router-link>
          <span class="nav-shop">保养建议</span>
        </div>
      </div>
      <div class="m-content clearfix">
        <ul class="info-con clearfix">
          <p>珠宝由优质宝石与贵金属等材质匠心制作而成为保持细腻色泽，我们建议您妥善保养珍藏</p>
          <li>佩戴建议：</li>
          <p>*请避免接触化学物品：粉底、隔离霜、香水等化妆品，易与饰品发生化学反应，请完成化妆后再佩戴。</p>
          <p>*请避免与硬物撞击：与硬物撞击或刮蹭，会磨损饰品表面电镀层，产生刮痕，增加氧化的接触，请尽量避免。</p>
          <p>*请勿遇水佩戴：请在洗澡或游泳前摘下饰品，沐浴露等会严重分解表面镀层，潮湿环境会增加氧化的速度，应保持饰品干燥。</p>
          <p>*请勿睡觉时佩戴：睡觉时珠宝易发生揉压和变形，应在睡前取下饰品。</p>
          <!-- <li>保修期限</li>
          <p>免费保修期为6个月（自收货日期开始计算）。超出保修期的根据实际情况收取维修材料及工本费。
维修周期为10-15天，请提前和客服预约保修时间。</p> -->
          <li>保养建议：</li>
          <p>*定期擦拭：建议用软布轻拭表面的油脂，请勿使用擦银布或洗银水。</p>
          <p>*分开密封保存：长时间不佩戴时，应将珠宝擦拭干净连同氧化纸分开放入密封小袋和包装盒内，避免刮碰和氧化。</p>
          <!-- <li>非售后范围
            <ul class="info-three">
              <li>1、退换货时因包装不善或物流因素造成的产品表面刮花、磨损等问题。</li>
              <li>2、包装、赠品类不提供售后维修。</li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
import NavPc from '@/pages/web/home/Nav_pc'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'MaintainPc',
  components: {
    NavPc,
    FooterPc
  }
}
</script>

<style lang="scss" scoped>
.maintain {
  background: #fff;
}
.maintain-con {
  .notice-nav {
    background-color: #f6f6f6;
    .nav-bar {
      height: 28px;
      line-height: 28px;
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      a {
        color: #787878;
        i {
          padding: 0 4px;
        }
      }
      .nav-shop {
        color: #8e7c77;
      }
    }
  }
  .m-content {
    line-height: 24px;
    width: 896px;
    margin: 100px auto;
    .info-con {
      li {
        list-style-type: disc;
        font-size: 24px;
        color: rgb(49, 49, 49);
        margin-bottom: 30px;
        .info-three {
          &:first-child {
            margin-top: 30px;
          }
          li {
            list-style-type: none;
            font-size: 16px;
            color: #6f6f6f;
          }
        }
      }
      p {
        font-size: 16px;
        color: #6f6f6f;
        padding-bottom: 30px;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
