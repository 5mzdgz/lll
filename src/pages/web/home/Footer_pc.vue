<template>
  <div class="my-footer">
   <el-row>
     <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
       <ul>
         <li class="service">客户服务</li>
         <li class="phone">0755-28914801</li>
         <li>
          <router-link to="/web/notice">
          购物须知
          </router-link>
         </li>
         <li>
           <router-link to="/web/maintain">
           保养建议
           </router-link>
         </li>
       </ul>
     </el-col>
     <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
       <ul>
         <li class="info">信息</li>
         <li><router-link to="/web/introduction">品牌介绍</router-link></li>
         <li><router-link to="/web/cooperation">品牌合作</router-link></li>
         <li><router-link to="/web/about">关于我们</router-link></li>
       </ul>
     </el-col>
     <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
       <ul>
         <li class="home"><router-link to="/">首页</router-link></li>
         <li><router-link to="/web/product" style="font-size: 14px;">产品中心</router-link></li>
       </ul>
     </el-col>
     <!-- <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
       <ul>
         <li class="home"><router-link to="/">更多功能请微信扫二维码</router-link></li>
         <li><router-link to="/web/product" style="font-size: 14px;">关注微信公众号或进入微信小程序</router-link></li>
       </ul>
     </el-col> -->
     <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
       <div class="code-box-one">
         <img src="@/assets/image/home/wxrq_code.png" alt="">
         <p>微信小程序</p>
       </div>
       <div class="code-box-two">
         <img src="@/assets/image/home/wxrq_code1.png" alt="">
         <p>微信公众号</p>
       </div>
     </el-col>
   </el-row>
   <div class="reaord">
     ©2019 LAOLIANGLI
     <a href="http://www.beian.miit.gov.cn/">粤ICP备19070964号-1</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterPc'
}
</script>

<style lang="scss" scoped>
$footer-color: #5e5e5e;
.my-footer {
  user-select: none;
  line-height: 14px;
  font-size: 12px;
  background: #f5f6f6;
  .el-row {
    padding: 70px 0px 20px 20px;
    max-width: 1200px;
    margin: 0 auto;
    .code-box-one {
      float: left;
      margin-right: 100px;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
      p {
        line-height: 30px;
      }
    }
    .code-box-two {
      float: left;
      // margin: 0 50px;
      text-align: center;
      img {
        width: 150px;
        height: 150px;
      }
      p {
        line-height: 30px;
      }
    }
    ul {
      .phone {
        color: $footer-color;
        letter-spacing: 2px;
      }
      li {
        padding: 10px 0;
        a{
          font-size: 12px;
          color: $footer-color;
          &:hover {
            font-size: 14px;
            color: #222;
          }
        }
        i {
          font-size: 32px;
          padding-right: 20px;
        }
      }
      .service, .info {
        font-size: 14px;
        color: #222;
        a {
          font-size: 14px;
          color: #222;
        }
      }
      .home {
        font-size: 14px;
        color: $footer-color;
        a{
          font-size: 14px;
          color: $footer-color;
        }
      }
    }
  }
  .reaord {
    font-family: "PingFang";
    margin-top: 4px;
    height: 30px;
    line-height: 30px;
    background: #eaecec;
    text-align: center;
    font-size: 12px;
    color: #272525;
    letter-spacing: 1px;
    span {
      padding-left: 10px;
    }
  }
}
@media (max-width:900px) {
  .el-row {
    width: 780px;
  }
}
</style>
