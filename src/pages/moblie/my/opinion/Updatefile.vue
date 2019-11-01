<template>
  <div>
    <div class="fileCon">
      <div class="list">
        <div v-for="(item,index) in imgList" :key="index">
          <div class="close" @click="close(index)">
            <img src="@/assets/image/home/close.png" alt="">
          </div>
          <img :src="item" />
        </div>
        <div class="add-box" v-show="maxStatus" @click="chooseType">
          <img src="https://img.laoliangli.com/label/common/addimg_icon.png" alt="">
          <p>添加照片</p>
        </div>
      </div>
    </div>
    <input id="upload_file" type="file" class="file-input" accept="image/png,image/jpeg,image/jpg" :multiple="multiple" @change="inputChange" style="display: none" />
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  data() {
    return {
      maxStatus: true,
      files: []
    }
  },
  props: {
    multiple: Boolean,
    max: Number,
    imgList: Array,

  },
  methods: {
    chooseType() {
      document.getElementById("upload_file").click();
    },
    close(index) {
      this.imgList.splice(index, 1);
      this.files.splice(index, 1);
      this.$emit('getImgFile', this.files)
      this.maxStatus = this.imgList == this.max ? false : true;
    },
    async inputChange(e) {
      var that = this
      let files = e.target.files;
      this.files.push(files);
      // console.log(this.files)
      this.$emit('getImgFile', this.files)
      let len = this.imgList.length + files.length;
      if (len > this.max) {
        document.getElementById("upload_file").value = "";
        this.$toast(`最多允许上传${this.max}张`);
        return;
      }
      // 预览上传图片
      var file = files[0]
      if(window.FileReader) {
        var fr = new FileReader();  
        fr.onloadend = function(e) {  
          // console.log(e.target.result)
          that.imgList.push(e.target.result)
        };  
        fr.readAsDataURL(file);  //也是利用将图片作为url读出
      }
      // 创建form表单对象
      // let form = new FormData();
      // form.append("file", file);
      // let uploadAll = [].slice.call(files ,0).map(this.upload);
      // 使用object.values(files)，测试安卓存在兼容性问题，替换为[].slice.call(files ,0)
       
      // Indicator.open({//上传中效果，可自行替换。
      //   text: "上传中...",
      //   spinnerType: "fading-circle"
      // });
      // let result = await Promise.all(uploadAll);
      // document.getElementById("upload_file").value = '';
      // Indicator.close();
    },
    // upload(file, index) {
    //   return new Promise(async (resolve, reject) => {
    //     let form = new FormData();
    //     form.append("file", file);
    //     // form.append("***");//根据上传入参添加参数
    //     let result = await this.axios.post(this.domain.Base_M2_URL + '/l/v1/feedback/upload', form);
    //     if (result.cd != 0) {//失败处理
    //       this.$toast(`第${index + 1}张(${file.name})上传出错(已忽略)`);
    //       resolve(result);
    //       return;
    //     }
    //     this.imgList.push(result.data.url);
    //     if (this.imgList.length == this.max) {
    //       this.maxStatus = false;
    //     }
    //     resolve(result);
        
    //   });
    // }
  }
};
</script>


 <style lang="scss" scoped>
.fileCon {
  width: 100%;
  min-height: 1.64rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .list {
    width: 100%;
    min-height: 1.64rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > div {
      width: 1.64rem;
      height: 1.64rem;
      margin: 10px 10px 10px 0;
      position: relative;
      background: #eee;
      & > img {
        width: 100%;
        height: 100%;
      }
      .close {
        width: 15px;
        height: 15px;
        background-size: 100%;
        position: absolute;
        top: -7px;
        right: -7px;
        img {
          width: 100%;
        }
      }
    }
    .add-box {
      width: 1.64rem;
      height: 1.64rem;
      border: 1px dashed #D5D5D5;
      text-align: center;
      margin-top: .1rem;
      background: #fff;
      img {
        margin: .36rem 0 .16rem 0;
        width: .64rem;
        height: .54rem;
      }
      p {
        font-size: .28rem;
        color: #D5D5D5;
      }
    }
  }
}
// .add-image {
//   width: 50px;
//   height: 50px;
//   background-image: url(/images/addImg.png);
//   background-size: 100%;
// }
</style>