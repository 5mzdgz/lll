<template>
  <div class="info-top">
    <div class="list-left">
      <pic-zoom :previewImg="mainImg" :zoomImg="mainImg"></pic-zoom>
      <ul class="list-row">
        <li
          class="list-img"
          @mouseenter="enter(index)"
          v-for="(item, index) in thumbImgs"
          :key="index"
        >
          <img :src="item" :class="{active_one:index==isShow}" @click="clickSelect(index)" />
        </li>
      </ul>
    </div>
    <div class="list-right">
      <h2>{{productObj.title}}</h2>
      <p class="price-con">
        <span class="price">￥{{productObj.nowPrice}}</span>
        <!-- <span class="free">包邮</span> -->
      </p>
      <p class="product-info">{{productObj.subTitle}}</p>
      <!-- <div class="category-color">颜色分类:</div>
      <div class="category-img">
        <img src="@/assets/image/product_30.gif" />
        <img src="@/assets/image/product_30.gif" />
        <img src="@/assets/image/product_30.gif" />
        <img src="@/assets/image/product_30.gif" />
      </div>-->
      <div>
        <!-- <label>
          默认选中:
          <input type="text" name="skuId" id="skuId" v-bind:value="skuId">
        </label>-->
        <!-- <button @click="getTextareaData" class="top-but"> 重新加载数据 </button> 当前属性ID：{{ skuId }}  -->
        <dl
          v-for="(item, key, index) in list.result"
          class="content"
          v-bind:class="{hl: highKeys[key]}"
          :key="index"
        >
          <dt>{{key}} :</dt>
          <dd>
            <button
              class="item"
              v-for="(value, index) in item"
              @click="handleActive(key, value)"
              v-bind:class="{active: value.active, disabled: !value.active && value.disabled}"
              :key="index"
            >{{ value.name }}</button>
          </dd>
        </dl>
        <!-- 已经选择：{{ message }} -->
      </div>
      <!-- <div class="computed">
        <div class="add"><i class="el-icon-minus"></i></div>
        <span class="total">1</span>
        <div class="reduce"><i class="el-icon-plus"></i></div>
      </div>-->
      <!-- <p class="purchase">
        <button>购买连接<i class="el-icon-arrow-right"></i></button>
        <span><i class="iconfont">&#xe618;</i>分享</span>
        <span><i class="iconfont">&#xe60e;</i>收藏</span>
      </p>-->
    </div>
    <div class="series">
      <div class="detail-img-box" v-for="(btnItem, index) in detailImgs" :key="index">
        <img :src="btnItem" />
      </div>
    </div>
  </div>
</template>

<script>
import PicZoom from "@/pages/web/detail/PicZoom";
export default {
  name: "ListLeft",
  components: {
    PicZoom
  },

  data() {
    return {
      isShow: 0,
      index: 0,
      // 详情页主大图
      mainImg: "",
      // bigImg: '',
      // 橱窗显示图
      thumbImgs: [],
      // 详情显示图
      detailImgs: [],
      productObj: {},
      attributes: [],
      data: [],
      skuId: "",
      skuName: "skuId",
      // 属性名称信息
      keys: [],
      // 数据集合{list.result list.items}
      list: {},
      plist: [],
      // 分隔符
      spliter: "\u2299",
      result: {},
      message: "",
      highKeys: {}
    }
  },
  created() {
    /**
     * 创建节点,请求数据
     *  **/
    this.id = this.$route.query.id;
    console.log(this.id)
    this.productData(this.id);
  },
  methods: {
    /**
     * 请求
     * **/
    productData(id) {
      var purl = "/l/v1/product/base/many?id=" + id;
      this.axios.get(this.domain.Base_M1_URL + purl).then(this.getProductList);
    },
    /***
     * 数据重组渲染开始
     */
    getProductList(res) {
      let that = this;
      const resData = res.data;
      // console.log(resData)
      if (resData.code === '200' && resData.data) {
        const productList = resData.data;
        this.plist = productList;
        // console.log(this.plist)
        that.getTextareaData(this.id);
      }
    },
    powerset(arr) {
      let ps = [[]];
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0, len = ps.length; j < len; j++) {
          ps.push(ps[j].concat(arr[i]));
        }
      }
      return ps;
    },
    /**
     * 初始化数据
     * @return
     */
    initData() {
      this.result = {};
      this.keys = this.getAllKeys();
      for (let i = 0; i < this.keys.length; i++) {
        this.highKeys[this.keys[i]] = false;
      }
      this.list = this.combineAttr(this.data, this.keys);
      this.initSeleted(this.skuId);
      this.buildResult(this.list.items);
      this.updateStatus(this.getSelectedItem());
      this.showResult();
      // console.log(result)
    },
    zuzhuang() {
      // console.log(this.plist)
      for (let i = 0; i < this.plist.length; i++) {
        // console.log(this.plist[i].id)
        var JsonString = "{}";
        var jsonObj = JSON.parse(JsonString);
        this.plist[i].attributes.forEach(attr => {
          // console.log(attr.keyName)
          // console.log(attr.valueName)
          jsonObj[attr.keyName] = attr.valueName;
        });
        jsonObj["skuId"] = this.plist[i].id;
        this.data.push(jsonObj);
      }
      // console.log(JSON.stringify(this.data))
      // console.log(this.data)
    },
    /**
     * 获取数据进行初始化
     * @return
     */
    getTextareaData(id) {
      // console.log(id)
      this.zuzhuang();
      // let data = document.getElementById('values').value
      // 可以获取当前请求地址的id
      let skuId = id; // 默认选中的商品ID
      try {
        // this.data = JSON.parse(this.attrs)
        let isHas = false;
        for (let i = 0; i < this.data.length; i++) {
          if (skuId === this.data[i][this.skuName] || skuId == this.data[i][this.skuName] ) {

            isHas = true;
            break;
          }
        }
        this.skuId = isHas ? skuId : this.data[0][this.skuName];
        this.initData();
      } catch (e) {
        this.data = [];
      }
      // console.log(data)
    },

    /**
     * 正常属性点击
     */
    handleNormalClick(key, value) {
      for (let i in this.list.result[key]) {
        if (i !== value.name) {
          this.list.result[key][i].active = false;
        } else {
          this.list.result[key][i].active = true;
        }
      }
    },
    /**
     * 无效属性点击
     */
    handleDisableClick(key, value) {
      this.list.result[key][value.name]["disabled"] = false;
      // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
      for (let i in this.list.result) {
        if (i !== key) {
          for (let x in this.list.result[i]) {
            this.list.result[i][x].active = false;
          }
        }
      }
      this.updateStatus(this.getSelectedItem());
    },
    /**
     * 高亮行
     */
    highAttributes: function() {
      for (let key in this.list.result) {
        this.highKeys[key] = true;
        for (let attr in this.list.result[key]) {
          if (this.list.result[key][attr].active === true) {
            this.highKeys[key] = false;
            break;
          }
        }
      }
    },
    /**
     * 点击事件处理
     * @param  key   点击的行
     * @param  value 点击的按钮的数据
     */
    handleActive: function(key, value) {
      if (value.active === true) {
        return false;
      }
      this.handleNormalClick(key, value);
      if (value.disabled === true) {
        this.handleDisableClick(key, value);
      }
      this.updateStatus(this.getSelectedItem());
      this.highAttributes();
      this.showResult();
    },

    /**
     * 计算属性
     * @param  {[type]} data [description]
     * @param  {[type]} keys [description]
     * @return {[type]}      [description]
     */
    combineAttr(data, keys) {
      let allKeys = [];
      let result = {};

      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let values = [];
        for (let j = 0; j < keys.length; j++) {
          let key = keys[j];
          if (!result[key]) {
            result[key] = {};
          }
          if (!result[key][item[key]]) {
            result[key][item[key]] = {
              name: item[key],
              active: false,
              disabled: true
            };
          }
          values.push(item[key]);
        }
        allKeys.push({
          path: values.join(this.spliter),
          sku: item["skuId"]
        });
      }
      // console.log(allKeys)
      return {
        result: result,
        items: allKeys
      };
    },

    /**
     * 获取所有属性
     * @return {[type]} [description]
     */
    getAllKeys() {
      let arrKeys = [];
      for (let attribute in this.data[0]) {
        if (!this.data[0].hasOwnProperty(attribute)) {
          continue;
        }
        if (attribute !== this.skuName) {
          arrKeys.push(attribute);
        }
      }
      return arrKeys;
    },

    getAttruites(arr) {
      let result = [];
      for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].path);
      }
      return result;
    },

    /**
     * 生成所有子集是否可选、库存状态 map
     */
    buildResult(items) {
      let allKeys = this.getAttruites(items);

      for (let i = 0; i < allKeys.length; i++) {
        let curr = allKeys[i];
        let sku = items[i].sku;
        let values = curr.split(this.spliter);
        let allSets = this.powerset(values);

        // 每个组合的子集
        for (let j = 0; j < allSets.length; j++) {
          let set = allSets[j];
          let key = set.join(this.spliter);

          if (this.result[key]) {
            this.result[key].skus.push(sku);
          } else {
            this.result[key] = {
              skus: [sku]
            };
          }
        }
      }
      // console.log(allKeys)
    },

    /**
     * 获取选中的信息
     * @return Array
     */
    getSelectedItem() {
      let result = [];
      for (let attr in this.list.result) {
        let attributeName = "";
        for (let attribute in this.list.result[attr]) {
          if (this.list.result[attr][attribute].active === true) {
            attributeName = attribute;
          }
        }
        result.push(attributeName);
      }
      return result;
    },

    /**
     * 更新所有属性状态
     */
    updateStatus(selected) {
      for (let i = 0; i < this.keys.length; i++) {
        let key = this.keys[i];
        let data = this.list.result[key];
        // let hasActive = !!selected[i]
        let copy = selected.slice();

        for (let j in data) {
          let item = data[j]["name"];
          if (selected[i] === item) {
            continue;
          }
          copy[i] = item;
          let curr = this.trimSpliter(copy.join(this.spliter), this.spliter);
          this.list.result[key][j]["disabled"] = this.result[curr]
            ? false
            : true;
        }
      }
    },

    trimSpliter(str, spliter) {
      // ⊙abc⊙ => abc
      // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
      let reLeft = new RegExp("^" + spliter + "+", "g");
      let reRight = new RegExp(spliter + "+$", "g");
      let reSpliter = new RegExp(spliter + "+", "g");
      return str
        .replace(reLeft, "")
        .replace(reRight, "")
        .replace(reSpliter, spliter);
    },
    /**
     * 初始化选中
     * @param  mixed|Int|String skuId 需要选中的skuId
     * @return {[type]}       [description]
     */
    initSeleted(skuId) {
      for (let i in this.data) {
        if (this.data[i][this.skuName] === skuId || this.data[i][this.skuName] == skuId) {
          for (let x in this.data[i]) {
            if (x !== this.skuName) {
              this.list.result[x][this.data[i][x]].active = true;
            }
          }
          break;
        }
      }
    },
    /**
     * 显示选中的信息
     * @return
     */
    showResult() {
      let result = this.getSelectedItem();
      let s = [];
      for (let i = 0; i < result.length; i++) {
        let item = result[i];
        if (!!item) {
          s.push(item);
        }
      }
      if (s.length === this.keys.length) {
        let curr = this.result[s.join(this.spliter)];
        if (curr) {
          s = s.concat(curr.skus);
          this.skuId = curr.skus[0]; // 当选中后赋值给skuId
          this.changeSku();
          // console.log(this.skuId)
        }
        // 如需要展示message时，可以开放
        // this.message = s.join('\u3000-\u3000')
      }
    },
    /**
     * 切换商品属性时
     */
    changeSku() {
      this.mainImg = "";
      this.thumbImgs = [];
      this.detailImgs = [];
      for (let i = 0; i < this.plist.length; i++) {
        if (this.plist[i].id === this.skuId) {
          this.productObj = this.plist[i];
          this.productObj.imgs.filter(item => {
            if (item.isMain) {
              this.mainImg = item.imgUrl;
            }
            if (item.isThumb) {
              this.thumbImgs.push(item.imgUrl);
            }
            if (item.isDetail) {
              this.detailImgs.push(item.imgUrl);
            }
          });
        }
      }
      // console.log(this.mainImg);
      // console.log(this.thumbImgs);
      // console.log(this.detailImgs)
    },
    // 鼠标移动选中
    enter(index) {
      // this.middleImg = this.silderArr[index].imgUrl
      // this.bigImg = this.silderArr[index].imgUrl
    },
    // 点击选中
    clickSelect(index) {
      this.isShow = index;
      this.mainImg = this.thumbImgs[index];
      // this.bigImg = this.silderArr[index].imgUrl
    }
  }
};
</script>

<style lang="scss" scoped>
.info-top {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  .list-left {
    width: 540px;
    padding: 90px 104px 0 0px;
    .list-row {
      width: 540px;
      height: 100px;
      text-align: center;
      margin: 40px 50px 0 10px;
      .list-img {
        float: left;
        width: 100px;
        height: 100px;
        margin-right: 40px;
        img {
          width: 100px;
          height: 100px;
          cursor: pointer;
        }
        .active_one {
          border: 1px solid #8e7c77;
        }
      }
      :last-child {
        margin-right: 0px;
      }
    }
  }
  .list-right {
    position: absolute;
    right: 0;
    top: 90px;
    width: 496px;
    h2 {
      font-size: 24px;
      color: #252525;
      margin-bottom: 40px;
    }
    img {
      width: 100px;
      height: 100px;
    }
    p {
      font-size: 24px;
      margin-bottom: 36px;
      height: 24px;
      line-height: 24px;
      .price {
        color: #2e2e2e;
      }
      .free {
        width: 60px;
        font-size: 14px;
        color: #2c2c2c;
        border-radius: 12px;
        margin-left: 10px;
        margin-bottom: 3px;
        background-color: #f5f5f5;
        vertical-align: top;
        padding: 4px 16px;
      }
    }
    .product-info {
      font-size: 14px;
      color: #6b6b6b;
      height: 24px;
      line-height: 24px;
      // margin: 25px 0;
    }
    dl {
      clear: both;
      overflow: hidden;
      dt {
        width: 60px;
        text-align: left;
      }
      dt,
      dd {
        float: left;
        height: 40px;
        line-height: 40px;
        margin-left: 10px;
        color: #8e7c77;
        background: #fff;
        .item {
          color: #8e7c77;
          font-size: 14px;
          // font-weight: bold;
          width: 60px;
          height: 30px;
          margin: 0 10px;
          background: #fef4f4;
          // text-align: left;
        }
        button:after {
          background: #fff;
        }
        .disabled {
          color: #999;
          border: 1px dashed #999;
          background: #f5f5f5;
        }
        .active {
          color: #2c2c2c;
          border: 2px solid #8e7c77;
          background: #fff;
        }
        .top-but {
          margin: 10px;
        }
        #skuId {
          height: 24px;
          font-size: 14px;
          line-height: 24px;
        }
      }
    }
    dl.hl {
      background: #fff;
    }
    .category-color {
      font-size: 14px;
      color: #787878;
      padding: 30px 0 14px 0;
    }
    .category-img {
      img {
        width: 100px;
        height: 100px;
        margin-right: 14px;
        border: 1px solid #f5f5f5;
        cursor: pointer;
      }
    }
    .computed {
      overflow: hidden;
      margin: 40px 0;
      .total {
        float: left;
        padding: 3px 0;
        font-size: 18px;
        width: 80px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        background-color: #f7f7f7;
        margin-right: 6px;
      }
      i {
        float: left;
        width: 30px;
        font-size: 14px;
        font-weight: 700;
        height: 24px;
        color: #8e7c77;
        line-height: 24px;
        text-align: center;
        padding: 3px 0;
        margin-right: 6px;
        background-color: #f7f7f7;
      }
      i:hover {
        font-size: 18px;
        font-weight: 700;
        color: #2c2c2c;
        cursor: pointer;
      }
    }
    .purchase {
      height: 40px;
      line-height: 40px;
      button {
        font-size: 18px;
        width: 160px;
        height: 40px;
        padding-left: 5px;
        color: #8e7c77;
        background-color: #f5f5f5;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
          border: 1px solid #8e7c77;
        }
        i {
          margin-left: 10px;
        }
      }
      span {
        float: right;
        font-size: 14px;
        color: #6b6b6b;
        vertical-align: top;
        padding-left: 34px;
        cursor: pointer;
        i {
          margin-right: 8px;
        }
      }
    }
  }
  .series {
    margin: 100px auto;
    .detail-img-box {
      background: #fff;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
  }
}
</style>
