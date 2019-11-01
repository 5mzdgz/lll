<template>
  <div class="notice">
    <nav-pc></nav-pc>
    <div class="notice-con">
      <div class="notice-nav">
        <div class="nav-bar">
          <router-link to="/">首页<i class="el-icon-arrow-right"></i></router-link>
          <span class="nav-shop">购物须知</span>
        </div>
      </div>
      <ul class="notice-top">
        <li>如何选购</li>
        <p>您可以微信搜索小程序 “老良利珠宝商城” 或手机直接访问<a href="https://www.laoliangli.com">老良利官网</a>，商城中查看到所售商品，您可以根据类别、新品、人气、价格选购心仪的宝贝。</p>
        <!-- <li>关于包邮</li>
        <p>全场商品满XX即享包邮，默认使用XX快递。如XX不到的地区，请在订单上备注能够到达的快递。</p> -->
        <li>关于发货时间</li>
        <p>周一至周五每天16:00前付款的订单，将于当天发出，此后订单将于第二天发出。
周末和节假日订单，将顺延至第一个工作日发出。</p>
        <li class="li-black">如何开具发票</li>
        <p class="p-black">在订单中备注开票信息，我们将在7个工作日内开具发票。如需退换商品，请将发票一同退回。</p>
        <li>代写贺卡</li>
        <p>老良利提供精美的礼盒、保修卡、手提袋，商城购物您还将收到发货单、宣传册，我们还提供代写贺卡服务，请您下单时备注贺卡内容。</p>
        <li>7天无理由退换
          <ul class="notice-btm">
            <li class="notice-day">商品到货日起7天内（按照物流签收后的第二天零时起计算时间，满168小时为7天）无理由退换，可以发起退换货申请。</li>
            <li>以下情况无法享受7天无理由退换服务：</li>
            <li>1、刻字、定制商品非质量问题；</li>
            <li>2、任何非老良利官网出售的商品；</li>
            <li>3、任何已使用的商品；</li>
            <li>4、因使用或保养不当导致质量问题的商品；</li>
            <li>5、产品的包装、配件、吊牌、保修卡、赠品、宣传册丢失，影响商品二次销售的；</li>
            <li>6、已开具发票，但未退回的</li>
            <li>因个人原因需要退换的，退换运费由买家承担；</li>
            <li>因商品破损或残缺等质量问题，退回运费由老良利承担；</li>
            <li>退回商品请保持原样退回，若影响商品二次销售，我们有权拒绝退换。</li>
            <li>饰品退回时，请务必利用防水小装分开包装，使用气泡纸包裹好，避免因产品晃动、接触雨水产生损坏，如因退回运输过程中产品和其他包装配件产生损坏，您需要承担相应费用。
我们收到退回商品后的3个工作日内，款项将原路退回。</li>
          </ul>
        </li>
        <li>30天免费更换新款
          <ul class="notice-server">
            <li>商品到货起30天内（按照物流签收后的第二天零时起计算时间），您可以免费更换等价新款商品，需要满足以下条件：</li>
            <li>1、新款售价等于或者低于原订单付款金额可以无理由更换；</li>
            <li>2、新款售价高于原订单付款金额的需要补差价更换；</li>
            <li>3、非刻字定制商品；</li>
            <li>4、换款邮费自理。</li>
          </ul>
        </li>
        <li>保修服务
          <ul class="notice-server">
            <li>1、凭保修服务卡和发货清单，可享受终身售后服务，售后团队为您提供一系列专业维修服务；</li>
            <li>2、免费维修期为6个月（以第一次收货开始计算，换新后无法延长）；</li>
            <li>3、免费维修期内，珠宝出现损伤、掉色、断裂情况，您可以免费更换一次（仅限同款同色）；</li>
            <li>4、超出6个月的根据实际情况收取维修材料及工本费；</li>
            <li>5、维修换货运费自理。</li>
          </ul>
        </li>
        <li>非售后范围
          <ul class="notice-after">
            <li>1、退换货时因包装不善或物流因素造成的商品表面刮花、磨损等问题；</li>
            <li>2、包装、赠品类不提供售后维修。</li>
          </ul>
        </li>
      </ul>
    </div>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
import NavPc from '@/pages/web/home/Nav_pc'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'NoticePc',
  components: {
    NavPc,
    FooterPc
  }
}
</script>

<style lang="scss" scoped>
.notice {
  background: #fff;
}
.notice-con {
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
  .notice-top {
    line-height: 24px;
    width: 896px;
    margin: 100px auto;
    p {
      font-size: 16px;
      color: #6f6f6f;
      padding-bottom: 60px;
      a {
        font-size: 18px;
        color: rgb(60, 116, 219);
      }
    }
    li {
      list-style-type: disc;
      font-size: 24px;
      margin-bottom: 30px;
      .notice-btm {
        li {
          list-style-type: none;
          margin-bottom: 30px;
          font-size: 16px;
          color: #6f6f6f;
        }
        .notice-day {
          border-bottom: 1px solid #f6f6f6;
          padding-bottom: 20px;
          margin-top: 30px;
          li {
            p {
              padding-bottom: 0;
            }
          }
        }
      }
      .notice-server, .notice-after {
        li {
          list-style-type: none;
          margin-bottom: 30px;
          font-size: 16px;
          color: #6f6f6f;
        }
        li:nth-child(1) {
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
