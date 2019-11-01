<template>
<div class="new">
  <div class="new-products">
    <div>
      <img class="new-img" :src="list.imgUrl" />
    </div>
  </div>
  <div class="brand">
    <el-row>
      <el-col><h3>品牌工艺</h3></el-col>
      <el-col>
        <p>品牌运用独特的镶嵌工艺，将每一颗宝石与珠宝完美结合呈现，折射出璀璨的光芒，</p>
        <p>珠宝上优雅的色泽，是以光亮电镀技术镀上蕴含18K金成分的镀层，</p> 
        <p>同时加入抗氧保护层，令珠宝保色持久靓丽，佩戴舒适顺滑。</p>
      </el-col>
      <el-col>
        <div class="brand-img">
          <img :src="btmList.imgUrl" />
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
export default {
  name: 'NewBrandPc',
  props: {
    list: Object,
    btmList: Object
  }
}
</script>

<style lang="scss" scoped>
.new {
  .new-products {
    overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 38.5%;
    .new-img {
      width: 100%;
      height: 100%;
    }
  }
  .brand {
    user-select: none;
    background:#fff;
    text-align: center;
    .el-row {
      margin: 0 auto;
      width: 650px;
      h3 {
        font-size: 32px;
        color: #2c2c2c;
        padding-top: 15.38%;
        padding-bottom: 12.3%;
        letter-spacing: 32px;
      }
      p {
        width: 600px;
        font-size: 14px;
        color: #5d5d5d;
        letter-spacing: 2px;
        height: 28px;
        line-height: 28px;
        margin: 0 auto;
      }
      .brand-img {
        width: 500px;
        height: 285px;
        margin: 0 auto;
        padding: 50px 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
