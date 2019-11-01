<template>
  <div class="nav">
    <el-row :gutter="0">
      <el-col :xs="4" :sm="4" :md="4" :lg="11" :xl="12">
        <div class="logo-box">
           <router-link to="/">
            <img src="@/assets/image/logo.png" />
          </router-link>
        </div>
      </el-col>
      <el-col :xs="20" :sm="20" :md="20" :lg="13" :xl="12">
        <ul class="nav-list">
          <li
          v-for="(item, index) in navList"
          :key="index"
          >
            <router-link :to="item.path" class="nav-link" active-class="active" exact>
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'NavPc',
  data () {
    return {
      navList: [{
        title: '首页',
        path: '/'
      }, {
        title: '产品中心',
        path: '/web/product'
      }, {
        title: '品牌介绍',
        path: '/web/introduction'
      }, {
        title: '品牌合作',
        path: '/web/cooperation'
      }, {
        title: '关于我们',
        path: '/web/about'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  user-select: none;
  height: 70px;
  line-height: 70px;
  max-width: 1200px;
  margin: 0 auto;
  .el-row {
    .el-col {
      margin: 0 auto;
      .logo-box {
        float: left;
        width: 201.6px;
        height: 70px;
        img {
          width: 100%;
        }
      }
      .nav-list {
        margin-left: 98px;
        li{
          float: left;
          height: 28px;
          line-height: 28px;
          margin: 19px 25px 13px 25px;
          cursor: pointer;
          .nav-link {
            border: none;
            color: #303030;
          }
          .active {
            padding-bottom: 12px;
            border-bottom: 4px solid #e7e0dc;
          }
        }
      }
    }
  }
}
@media (max-width: 1024px) {
  .nav {
    width: 780px;
    font-size: 16px;
  }
}
</style>
