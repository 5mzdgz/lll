<template>
  <div class="product-search">
    <div class="product-list">
      <ul>
        <li class="choice">筛选:</li>
        <li>新品</li>
        <li>人气</li>
        <li class="price" @click="changeSort()">价格
          <i class="el-icon-caret-top" :class="{active:isActive}"></i>
          <i class="el-icon-caret-bottom" :class="{active:isSort}"></i>
        </li>
        <li class="search">
          <input type="text" placeholder="输入饰品名称">
          <i class="el-icon-search"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSearch',
  data () {
    return {
      isActive: false,
      isSort: false
    }
  },
  methods: {
    changeSort () {
      this.isActive = !this.isActive
      if (this.isActive) {
        this.isSort = false
      } else {
        this.isSort = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-search {
  overflow: hidden;
  height: 32px;
  max-width: 1200px;
  padding-top: 100px;
  margin: 0 auto;
  .product-list {
    ul {
      user-select: none;
      min-width: 780px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      :hover {
        background: #f8f5f4;
        border: 1px solid #8e7c77;
        color: #8e7c77;
      }
      .choice {
        background: none;
        width: 40px;
        background: none;
        border: none;
      }
      .choice:hover {
        background: none;
      }
      .search {
        width: 240px;
        float: right;
        border: none;
        margin-right: 2px;
      }
      .price {
        width: 70px;
        padding-right: 10px;
      }
      li {
        position: relative;
        float: left;
        width: 82px;
        border-radius: 15px;
        background: #f5f5f5;
        margin-right: 14px;
        cursor: pointer;
        input {
          width: 210px;
          background: #f5f5f5;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          padding: 0 15px;
          font-size: 14px;
          color:#8f8f8f;
        }
        i {
          z-index: 999;
          margin-left: 8px;
        }
        i:hover {
          color: #333;
          border: none;
        }
        .el-icon-caret-top {
          position: absolute;
          top: 5px;
          right: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          width: 14px;
          height: 14px;
          bottom: 5px;
          right: 10px;
        }
        .el-icon-caret-top,.el-icon-caret-bottom:hover {
          border: none;
          background: none;
        }
        .el-icon-search {
          position: absolute;
          top: 7px;
          right: 15px;
          font-size: 16px;
          width: 16px;
        }
        .active {
          color: #ababab;
        }
      }
    }
  }
}
</style>
