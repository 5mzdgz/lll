<template>
  <div class="new-address">
    <header-nav :navTitle="navTitle"></header-nav>
    <div class="address-box">
      <div class="address-item">
        <div class="adddress-label">联系人</div>
        <input type="text" placeholder="名字" v-model="userName" />
      </div>
      <div class="address-item">
        <div class="adddress-label">手机号码</div>
        <input type="text" placeholder="11位手机号码" maxlength="11" v-model="phone" />
      </div>
      <div class="address-item">
        <div @click="handleRegionClick">
          <div class="adddress-label" >选择地区</div>
          <input type="text" placeholder="省份 城市 区/县" v-model="region" disabled="true"/>
        </div>
        <i class="el-icon-location-outline" @click.prevent="map"></i>
      </div>
      <div class="address-item">
        <div class="adddress-label">详细地址</div>
        <textarea placeholder="街道门牌信息" maxlength="50" v-model="address" />
      </div>
      <div class="address-item">
        <div class="adddress-label">邮政编码</div>
        <input type="text" placeholder="100000" maxlength="6" v-model="postalCode" />
      </div>
      <div class="address-item ">
        <div class="adddress-label-set">设置默认地址</div>
        <mt-switch class="set-default" v-model="setValue"></mt-switch>
      </div>
    </div>
    <button @click="confrimAddress">确认地址</button>
    <mt-popup v-model="regionVisible" position="bottom" class="region-popup">
      <p class="cancle" @click="cancle">取消</p>
      <p class="sureMap" @click="sureMap">确定</p>
      <mt-picker :slots="myAddressSlots" valueKey="name" :visibleItemCount="5" @change="onValuesChange" :itemHeight="40"></mt-picker>
    </mt-popup>
    <!-- <my-map :ismap="ismap"></my-map>
     -->
    <!-- <div id="iframe">
      高德
      <iframe class="map-item" v-if="ismap" id="getAddress" @load="loadiframe"
              src="https://m.amap.com/picker/?key=a341fbb4972db5b3e275c56826aee85b"
              style="width:100%; height:100%;position: absolute;z-index:22222;"></iframe>
    </div> -->
    <div id="iframe">
      <!-- 腾讯 -->
      <iframe id="mapPage" v-if="ismap" class="map-item" width="100%" height="100%" frameborder=0 
        :src="href">
      </iframe>
    </div>
    <!-- 获取当前位置 -->
    <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
      src="https://apis.map.qq.com/tools/geolocation?key=C42BZ-GYNCG-DYVQ6-IAAI5-CDQIJ-AWF4T&referer=老良利">
    </iframe>
  </div>
</template>

<script>
import md5 from 'js-md5'
import HeaderNav from '@/pages/moblie/common/HeaderNav'
import myMap from '@/pages/moblie/my/address/Map'
import add from '@/common/address'
export default {
  name: 'NewAddress',
  components: {
    HeaderNav,
    // C42BZ-GYNCG-DYVQ6-IAAI5-CDQIJ-AWF4T
    //5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4
	},
  data () {
    return { 
      lat: '',
      lng: '',
      ismap: false,
      navTitle: '编辑地址',
      regionVisible: false,
      userName: '',
      phone: '',
      province: '',
      city: '',
      area: '',
      region: null,
      address: '',
      postalCode: '',
      regionInit: false,
      setValue: false,
      myAddressSlots: [//省
        {
          flex: 1,
          values: this.changeProince(), //省份数组
          className: 'slot1',
          textAlign: 'center'
        },
        //分隔符
        {
          divider: true,
          content: '',
          className: 'slot2'
        },
        //市
        {
          flex: 1,
          values: this.changeCity('110000'),
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '',
          className: 'slot4'
        },
        //县
        {
          flex: 1,
          values: this.changeArea('110000999'),
          className: 'slot5',
          textAlign: 'center'
        }
      ],
    }
  },
  created () {
    // let sig = md5("/tools/locpicker?key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4&search=1&type=1&referer=无名字的柜子GeMI8N09fSrmUbOSAaq16r39z35YK89I")
    // let url = encodeURIComponent('?key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4&location=22.71991,114.24779&sig=fe4baefb5397c4b7812643ee6521a918')
    // console.log(sig)
    // console.log(url)
    // this.href = 'http://apis.map.qq.com/tools/locpicker?key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4=1&type=1&referer=老良利&sig='+ md5('/tools/locpicker?key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4=1&type=1&referer=老良利o0qGMg1taenRhmmKI2m3Yyx0Ci7c8s0q')
    this.href = 'http://apis.map.qq.com/tools/locpicker?key=C42BZ-GYNCG-DYVQ6-IAAI5-CDQIJ-AWF4T&search=1&type=1&referer=老良利'
    // console.log(this.href)
    // this.curHref = 'https://apis.map.qq.com/ws/geocoder/v1?key=C42BZ-GYNCG-DYVQ6-IAAI5-CDQIJ-AWF4T&location=22.71991,114.24779'
    this.getLatLng()
  },
  mounted () {
    this.id = this.$route.query.id
    // console.log(this.id)
    if (this.id) {
      this.setAddress(this.id)
    }
  },
  methods: {
    getLatLng () {
      var that = this
      window.addEventListener('message', function(event) {
        // 接收位置信息
        var loc = event.data;
        // console.log(loc);
        if (loc  && loc.module == 'geolocation') { //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
          that.lat = loc.lat
          that.lng = loc.lng
          // alert(loc.district)
          // console.log(loc.districe);
          if(!loc.districe){
              // alert('授权')
          }else{
            that.region = loc.province + ' ' + loc.city + ' ' + loc.district
            that.address = loc.addr
            that.province = loc.province
            that.city = loc.city
            that.area = loc.district
         }
          // that.getCurLocation()
        }
      }, false); 

    },
    /**
     * 获取当前地址
     */
    getCurLocation () {
      // const ip = sessionStorage.getItem('ipAddress')
      // let sig = md5("/ws/geocoder/v1?key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4&location=22.71991,114.24779GeMI8N09fSrmUbOSAaq16r39z35YK89I")
      // let url = '/api/ws/geocoder/v1?key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4&location=22.71991,114.24779&sig=' + sig
      // this.axios.get(url).then((res) => {
      // this.axios.get('/api/ws/geocoder/v1?key=C42BZ-GYNCG-DYVQ6-IAAI5-CDQIJ-AWF4T&location=22.71991,114.24779').then((res) => {
      // // this.axios.get('/api/ws/location/v1/ip?ip=113.118.116.67&key=5MUBZ-PKSK3-BXL3V-36KSL-UNWCJ-32FL4').then((res) => {
      //   console.log(res)
      //   const resData= res.data.result.address_component
      //   this.region = resData.province + ' ' + resData.city + ' ' + resData.district
      //   this.address = resData.street_number
      //   this.province = resData.province
      //   this.city = resData.city
      //   this.area = resData.district
      // })
      // console.log(this.lat)
      // const KEY ='C42BZ-GYNCG-DYVQ6-IAAI5-CDQIJ-AWF4T'; //key 秘钥自己申请
      // let url = encodeURIComponent('https://apis.map.qq.com/ws/geocoder/v1?&poi_options=address_format=short&get_poi=0');
      // // let lat = 22.71991
      // // let lng = 114.24779
      // let locationdata = this.lat+','+this.lng //纬度，经度
      // this.$jsonp(url,{
      //   key:KEY,
      //   callbackName: 'QQmap',
      //   output:'jsonp',
      //   location:locationdata
      // })
      // .then(json => {
      //   let address = json.result.address;
      //   console.log(json.result) //附近街道地址信息
      //   const resData= json.result.address_component
      //   this.region = resData.province + ' ' + resData.city + ' ' + resData.district
      //   this.address = resData.street_number
      //   this.province = resData.province
      //   this.city = resData.city
      //   this.area = resData.district
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    },
    /**
     * 腾讯地图组件
     */
    map () {
      // var url = window.location.href.split('#')[0]
      // add.address(url)
      // let iframe = document.getElementById('mapPage').contentWindow;
      var that = this
      window.addEventListener('message', function(event) {
        // console.log(event)
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          // console.log(loc)
          if (loc.poiname === "我的位置") {
            // that.$toast(`请选中有详细地址的选项`)
            that.address = loc.poiaddress
            that.ismap = false
          } else {
            var regex = /^(北京市|天津市|重庆市|上海市|香港特别行政区|澳门特别行政区)/;  
            var REGION_PROVINCE=[];  
            var addressBean = {  
              REGION_PROVINCE:null,  
              REGION_COUNTRY:null,  
              REGION_CITY:null,  
              ADDRESS:null};  
            function regexAddressBean(address, addressBean){  
                regex = /^(.*?[市州]|.*?地区|.*?特别行政区)(.*?[市区县])(.*?)$/g;  
                var addxress = regex.exec(address);  
                addressBean.REGION_CITY=addxress[1];  
                addressBean.REGION_COUNTRY=addxress[2];  
                // addressBean.ADDRESS=addxress[3]+"("+res.name+")";
                addressBean.ADDRESS = addxress[3] + loc.poiname;
                // console.log(addxress);  
            }  
            if(!(REGION_PROVINCE = regex.exec(loc.poiaddress))){  
              regex = /^(.*?(省|自治区))(.*?)$/;  
              REGION_PROVINCE = regex.exec(loc.poiaddress);  
              addressBean.REGION_PROVINCE= REGION_PROVINCE[1];  
              regexAddressBean(REGION_PROVINCE[3],addressBean);  
            } else {  
              addressBean.REGION_PROVINCE= REGION_PROVINCE[1];  
              regexAddressBean(loc.poiaddress, addressBean);  
            }
            // console.log(addressBean.REGION_PROVINCE, addressBean.REGION_CITY, addressBean.REGION_COUNTRY)
            // console.log(addressBean.ADDRESS)
            that.region = addressBean.REGION_PROVINCE + ' ' + addressBean.REGION_CITY + ' ' + addressBean.REGION_COUNTRY
            that.address = addressBean.ADDRESS
            that.province = addressBean.REGION_PROVINCE
            that.city = addressBean.REGION_CITY
            that.area = addressBean.REGION_COUNTRY
            that.ismap = false
          }
        }
      }, false);
      this.ismap = true
    },
    /**
     * 高德地图组件
     */
    // loadiframe() {
    //   let iframe = document.getElementById('getAddress').contentWindow;
    //   iframe.postMessage('hello', 'https://m.amap.com/picker/');
    //   window.addEventListener("message", function (e) {
    //     if (e.data.command != "COMMAND_GET_TITLE") {
    //       //业务代码
    //       // console.log(e)
    //       this.address = e.data.address
    //       this.ismap = false
    //     }

    //   }.bind(this), false);
    // },
    /***
     * 编辑地址回填
     */
    setAddress (id) {
      this.axios.get(this.domain.Base_M2_URL + '/l/v1/user/address/get?id=' + id).then((res) => {
        // console.log(res.data.data)
        const resData = res.data.data
        if (res.data.code === '200') {
          if (resData.isDefault === 1) {
            this.setValue = true
          } else {
            this.setValue = false
          }
          this.region = resData.province + ' ' + resData.city + ' ' + resData.area
          this.userName = resData.userName
          this.phone = resData.userPhone
          this.address = resData.address
          this.postalCode = resData.postCode
        }
      })
    },
    /**
     * 提交保存地址
     */
    confrimAddress () {
      // console.log(this.userName)
      // console.log(this.phone)
      // console.log(this.region)
      // console.log(this.address)
      // console.log(this.postalCode)
      // console.log(this.setValue)
      let isDefault
      if (this.setValue) {
        isDefault = 1
      } else {
        isDefault = 0
      }
      const obj = {
        userName: this.userName,
        userPhone: this.phone,
        // userName: decodeURIComponent(this.region),
        address: this.address,
        postCode: this.postalCode,
        province: this.province,
        city: this.city,
        area: this.area,
        country: '中国',
        isDefault: isDefault
      }
      let myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
       // 判断联系人
      if (obj.userName === '') {
        this.$toast({
          message: '联系人不能为空',
          position: 'top'
        })
        return false
      }
      if (obj.userPhone == '') {
        this.$toast({
          message: '手机号不能为空',
          position: 'top'
        })
        return false
      } else if (!myreg.test(obj.userPhone)) {
         this.$toast({
          message: '请输入正确的手机号',
          position: 'top'
        })
        return false
      }
      //  验证选择地区
      if (obj.province === '省份') {
       this.$toast({
          message: '选择地区不能为空',
          position: 'top'
        })
        return false
      }

      //  验证详细地址
      if (obj.address === '') {
        this.$toast({
          message: '详细地址不能为空',
          position: 'top'
        })
        return false
      }

      this.addAddress(obj)
    },
     /***
     * 添加地址 
     */
    addAddress (obj) {
      if(this.id) {
        // console.log(this.data.id)
        // let aUrl
        let key = 'id'
        let value = this.id
        obj[key] = value
        // console.log(obj)
        var aUrl = '/l/v1/user/address/update'
      } else {
        var aUrl = '/l/v1/user/address/add'
      }
      this.axios.post(this.domain.Base_M2_URL + aUrl, obj).then((res) => {
        // console.log(res)
        if (res.data.code === '200') {
          this.$router.go(-1)
        } else {
          this.$toast(`提交失败，请刷新`)
        }
      })
    },

    onValuesChange (picker, values) {
      if (this.regionInit) {
        //取值并赋值
        if (values[0] && values[1]  && values[2]) {

          this.region = values[0]["name"] + ' '+ values[1]["name"]+ ' ' + values[2]["name"]
          this.province = values[0]["name"]
          this.city = values[1]["name"]
          this.area = values[2]["name"]
          // this.id = values[0]["id"]
          // this.provinceCode = values[0]["code"];
          // this.cityCode = values[1]["code"];
          // this.countyCode = values[2]["code"];

          //给市、县赋值
          picker.setSlotValues(1, this.changeCity(values[0]["code"]))
          picker.setSlotValues(2, this.changeArea(values[1]["code"]))


          this.$emit("getRegion", this.region)
        }else {
          // console.log("数据不全");
        }
      } else {
        this.regionInit = true;
      }
    },
     /**
     * province
     */
    changeProince () {
     
      // let provinces = this.$store.state.provinceArr
      // JSON.parse()
      let provinces = JSON.parse(sessionStorage.getItem('provinceArr'))
      let provinceArr = []
      // console.log(provinces)
      if(provinces.length > 0) {
        provinces.forEach(function (item) {
          let obj = {}
          obj.name = item.name
          obj.code = item.code
          provinceArr.push(obj)
        });
      }
      return provinceArr
    },
    /**
     * city
     */
    changeCity (provinceCode) {
      if (!provinceCode){
          provinceCode = '110000'
        }
      // let cities = this.$store.state.cityArr

      let cities = JSON.parse(sessionStorage.getItem('cityArr'))
      let cityArr = []
      if (cities.length > 0) {
        cities.forEach(function (item) {
          if (item.provinceCode === provinceCode) {
            let obj = {}
            obj.name = item.name
            obj.code = item.code
            obj.provinceCode = item.provinceCode
            cityArr.push(obj)
          }
        })
      }
      return cityArr
    },
     /**
     * area
     */
    changeArea (cityCode) {
      if (!cityCode){
        cityCode = '110101'
      }
      // let areas = this.$store.state.areaArr
      let areas = JSON.parse(sessionStorage.getItem('areaArr'))
      // console.log(provinces)
      let areaArr = []
      if(areas.length > 0) {
        areas.forEach(function (item) {
          if (item.cityCode == cityCode) {
            let obj = {}
            obj.name = item.name
            obj.code = item.code
            obj.provinceCode = item.provinceCode
            obj.cityCode = item.cityCode
            areaArr.push(obj)
          }
        })
      }
      return areaArr
    },

    /**
     * 显示地址弹窗
     */
    handleRegionClick () {
      this.regionVisible = true
    },
    /**
     * 选择取消按钮
     */
    cancle () {
      this.regionVisible = false
    },
    /**
     * 确认按钮
     */
    sureMap () {
      this.regionVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.new-address {
  height: 100vh;
  padding-top: .8rem;
	background: #f6f6f6;
  .address-box {
    background: #fff;
    margin-top: .34rem;
    padding: 0 .36rem .22rem .36rem;
    border-top: 1px solid #D6D6D6;
    .address-item {
      position: relative;
      padding: .24rem 0 .14rem 0;
      width: 100%;
      border-bottom: 1px solid #D6D6D6;
      overflow: hidden;
      clear: both;
      i {
        // float: right;
        position: absolute;
        right: 0;
        top: .2rem;
        padding: .1rem;
      }
      .adddress-label {
        float: left;
        width: 25%;
        font-size: .3rem;
        line-height: .42rem;
        color:#000;
        margin-right: 4%;
      }
      .adddress-label-set {
        float: left;
        font-size: .3rem;
        line-height: .6rem;
        color:#000;
      }
      .mint-switch {
        float: right;
        .mint-switch-core {
          border-color: #FF4848;
          background-color: #FF4848;
        }
      }
      input,textarea {
        width: 63%;
        background: #fff;
        resize: none;
      }
    }
  }
  #iframe {
    .map-item {
      position: fixed;
      width: 100%;
      height: 100%;
      top: .7rem;
      background: #fff;
      z-index: 999;
    }
  }
  button {
    width: 68%;
    height: .75rem;
    border-radius: .12rem;
    background: #8E7C77;
    color: #fff;
    margin-left: 16%;
    margin-top: .4rem;
  }
  .region-popup {
    width: 100%;
    overflow: hidden;
    clear: both;
    p {
      text-align: center;
      width: 1rem;
      line-height: .8rem;
    }
    .cancle {
      float: left;
    }
    .sureMap {
      color: rgb(78, 190, 144);
      float: right;
    }
  }
}
</style>
