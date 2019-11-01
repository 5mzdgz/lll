<template>
  <div class="detail-tabbar-container">
		<div class="tabbar-container">
			<dl>
        <!-- <router-link to="/home"> -->
				  <dd @click="goHome"><img src="@/assets/image/home/h5_home.png" alt=""></dd>
        <!-- </router-link> -->
				<dd @click="goRouterCart"><img src="https://img.laoliangli.com/label/my/cart_icon.png" alt=""></dd>
				<dd @click="addCollection"><img src="https://img.laoliangli.com/label/my/like_icon.png" alt=""></dd>
			</dl>
			<button class="add-cart" @click="showCustomPopupClick(1)">加入购物车</button>
			<button class="pay" @click="showCustomPopupClick(2)">立即购买</button>
		</div>
    <div class="show-model" v-if="isSuccss">
        <div class="icon-img">
          <img src="@/assets/image/home/icon_succss.png" alt="">
        </div>
        <p>{{succssTitle}}</p>
      </div>
		<CustomPopup ref="CustomPopupRef" class="coustom-container">
			<div slot="PoperContent" class="PoperContentView">
				<div class="popup-top">
					<div class="popup-img">
						<img :src="isSmallImg.imgUrl" alt="">
					</div>
					<div class="product-info">
						<p class="product-title">{{productObj.title}}</p>
						<p class="product-attribbes"><span v-for="item in attributes" :key="item">{{item}} </span></p>
						<p class="product-price">￥{{productObj.nowPrice}}</p>
					</div>
					<i class="el-icon-circle-close" @click="closerButton"></i>
				</div>
				<div class="popup-middle">
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
				<div class="count-box">
					<span>购买数量</span>
					<dl>
						<dd @click="addCount(-1)">-</dd>
						<dd>{{number}}</dd>
						<dd @click="addCount(1)">+</dd>
					</dl>
				</div>
				<button class="confrim" @click="confrimCart()">确定</button>
			</div>
		</CustomPopup>

	</div>
</template>

<script>
import CustomPopup from '@/pages/moblie/common/CustomPopup'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
	name: 'DetailTabbar',
	inject: ['reload'],
	components: {
		CustomPopup
	},
	data() {
		return {
      isSuccss: false,
      succssTitle: '',
      index: 0,
      // 商品数量
      number: 1,
      // 判断弹窗
      num: null,
      // 详情页主大图
      mainImg: "",
			// bigImg: '',
			// 小图
			isSmallImg: [],
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
	mounted () {
		this.id = this.$route.query.id
		this.plist = this.$store.state.detailData
    // console.log(this.id)

	},
	methods: {
    // 加入购物车弹窗
		showCustomPopupClick(num) {
      // this.skuId = this.id
      this.num = num
			this.$refs.CustomPopupRef.showCustom()
			this.plist = this.$store.state.detailData
			// this.reload()
			// console.log(this.plist)
			this.getTextareaData(this.id)
    },
    // 关闭弹窗
		closerButton() {
      this.number = 1
			this.$refs.CustomPopupRef.maskClick()
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
      // console.log(this.skuId)
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
      // console.log(this.plist)
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
      // this.skuId = id
      // console.log(skuId)
      // console.log(this.data[0][this.skuName])
      try {
        // this.data = JSON.parse(this.attrs)
        let isHas = false;
        for (let i = 0; i < this.data.length; i++) {
          if (skuId == this.data[i][this.skuName] || skuId === this.data[i][this.skuName]) {
            isHas = true;
            break;
          }
          // this.skuId = this.data[i][this.skuName];
        }
        this.skuId = isHas ? skuId : this.data[0][this.skuName]; 
        // console.log(this.skuName)
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
			this.attributes = result
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
          // console.log(this.curr)
					// console.log(this.skuId)
					// console.log(result)
        }
        // 如需要展示message时，可以开放
        // this.message = s.join('\u3000-\u3000')
      }
    },
    /**
     * 切换商品属性时
     */
    changeSku() {
      this.mainImg = ""
      this.thumbImgs = []
			this.detailImgs = []
      for (let i = 0; i < this.plist.length; i++) {
        if (this.plist[i].id === this.skuId) {
					this.productObj = this.plist[i]
					// console.log(this.productObj)
          this.productObj.imgs.filter(item => {
            if (item.isDetail) {
              this.detailImgs.push(item.imgUrl)
						}
					})
					this.isSmallImg = this.productObj.imgs.find(item => {
						return item.isSmall == true
					})
        }
      }
      // console.log(this.mainImg);
      // console.log(this.thumbImgs);
			// console.log(this.detailImgs)
			// console.log(this.isSmallImg)
			// console.log(this.attributes)
    },

    /**
     * 加减数量
     *  */
    addCount (number) {
      if (number > 0) {
        this.number++
      } else {
        this.number--
        if (this.number < 1) {
          this.number = 1
        }
      }
    },

    /**
     * 确定加入购物车
     */
    confrimCart () {
      const item = [{
        pid: this.productObj.id,
        qty: this.number
      }]
      // console.log(item)
      if (this.num === 1) {
        this.getAddCart(item)
      } else {
        this.getPayData(item)
      }
      this.closerButton()
    },
    /***
     * 发送加入购物车请求
     */
    getAddCart (item) {
      this.axios.post(this.domain.Base_M3_URL + '/l/v1/cart/add', item).then(this.getAddCartScc)
    },
    /**
     * 加入购物车成功回调
     */
    getAddCartScc (res) {
      // console.log(res)
      if (res.data.code === '200') {
        this.isSuccss = true
        this.succssTitle = '加入购物车成功'
        setTimeout(() => {
            this.isSuccss = false
        }, 1000)
      }
    },
    /**
		 * 立即购买
		 */
		getPayData (item) {
			this.axios.post(this.domain.Base_M3_URL + '/l/v2/order/confirm/product/list', item).then((res) => {
				// console.log(res.data.data)
				const payData = res.data.data
				// const obj = JSON.stringify(res.data.data)
				if (res.data.code === '200') {
					// 传对象方法一
					this.$store.dispatch('addPayData', payData)
					// 传对象方法二
          // this.$router.push('/mobile/pay?obj='+obj)
          this.$router.push('/mobile/pay')
				}
			})
    },
    /**
     * 去购物车
     * 
     */
    goRouterCart () {
      this.$router.replace('/mobile/cart')
      sessionStorage.setItem('selected', 'cart')
    },
    /**
     * 加入收藏夹
     */
    addCollection () {
      // const id = this.id
      // console.log(this.id)
      this.axios.post(this.domain.Base_M2_URL + '/l/v1/user/collect/add?ids=' + this.id).then((res) => {
        if (res.data.code === '200') {
          // console.log(res)
          this.isSuccss = true
          this.succssTitle = '移入收藏夹成功'
          setTimeout(() => {
            this.isSuccss = false
          }, 1000)
        }
      })
    },
    /**
     * 返回home
     */
    goHome () {
      this.$router.push('/home')
      sessionStorage.setItem('selected', 'home')
    }
	}
}
</script>

<style lang="scss" scoped>
.tabbar-container {
	position: fixed;
	width: 100%;
	height: .8rem;
	line-height: .8rem;
	bottom: 0;
	background: #fff;
	z-index: 10;
	dl {
		width: 41%;
		dd {
			float: left;
			width: 33.33%;
			text-align: center;
			img {
				width: .35rem;
				height: .35rem;
			}
		}
	}
	.add-cart, .pay{
		float: left;
		line-height: .8rem;
		width: 29.5%;
		font-size: .24rem;
		background: #E72C2C;
		color: #fff;
	}
	.add-cart {
		background: #606060;
	}
}
.coustom-container {
	.PoperContentView {
		background: #FFFFFF;
		border-top-left-radius: .32rem;
		border-top-right-radius: .32rem;
		.popup-top {
			display: flex;
			flex-direction: row;
			padding: .5rem .2rem .3rem .2rem;
			.popup-img {
				overflow: hidden;
				width: 32%;
				height: 0;
				padding-bottom: 32%;
				img {
					width: 100%;
				}
			}
			.product-info {
				width: 64%;
				margin-left: .3rem;
				.product-title {
					width: 90%;
					font-size: .22rem;
					line-height: .34rem;
					color:#1E1E1E;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;
					word-break: break-all;
					-webkit-box-orient:vertical;
					overflow: hidden;
				}
				.product-attribbes {
					width: 90%;
					font-size: .18rem;
					color:#6B6B6B;
					padding-top: .1rem;
				}
				.product-price {
					font-size: .28rem;
					color:#E72C2C;
					padding-top: .1rem;
				}
			}
			i {
				font-size: .4rem;
			}
		}
		.popup-middle {
      // overflow: hidden;
			padding: 0 .2rem .3rem .2rem;
      // height: .5rem;
      line-height: .5rem;
			dl {
				clear: both;
				overflow: hidden;
        height: .5rem;
        line-height: .5rem;
        margin-bottom: .1rem;
				dt {
					width: .6rem;
					text-align: left;
				}
				dt,
				dd {
					float: left;
					height: .4rem;
					line-height: .4rem;
					margin-left: .1rem;
					color: #8e7c77;
					background: #fff;
          font-size: .25rem;
					.item {
						color: #8e7c77;
						font-size: .2rem;
						// font-weight: bold;
						width: .8rem;
						height: .5rem;
						margin: 0 .1rem;
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
						color: #fff;
            // border: 1px solid #8e7c77;
            border-radius: 3px;
						background: #E72C2C;
					}
					.top-but {
						margin: .1rem;
					}
					#skuId {
						height: .24rem;
						font-size: .14rem;
						line-height: .24rem;
					}
				}
			}
			dl.hl {
				background: #fff;
			}
		}
		.count-box {
			clear: both;
			overflow: hidden;
			height: .3rem;
			line-height: .6rem;
			padding: 0 .2rem 1.8rem .2rem;
			span {
				font-size: .3rem;
				color:#313131;
			}
			dl {
				float: right;
				clear: both;
				overflow: hidden;
				dd {
					float: left;
					font-size: .3rem;
					width: .7rem;
					text-align: center;
					background: #f6f6f6;
					height: .6rem;
				}
			}
		}
		.confrim {
			position: fixed;
			width: 100%;
			height: .8rem;
			line-height: .8rem;
			bottom: 0;
			background: #E72C2C;
			color: #fff;
			overflow: hidden;
			font-size: .3rem;
		}
	}
}
.show-model {
  position: fixed;
  top: 40%;
  left: 33.33%;
  width: 32%;
  height: 0;
  overflow: hidden;
  padding-bottom: 32%;
  background:rgba(0,0,0,1);
  opacity: 0.7;
  border-radius: .1rem;
  z-index: 999;
  .icon-img {
    overflow: hidden;
    width: 41.25%;
    height: 0;
    margin-left: 33.33%;
    margin-top: 20%;
    padding-bottom: 29.58%;
    img {
      width: 100%;
    }
  }
  p {
    padding-top: 20%;
    padding-left: 12%;
    font-size: .2rem;
    color: #fff;
  }
}
</style>
