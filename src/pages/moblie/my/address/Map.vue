<template>
  <div>
    <div id="iframe">
      <iframe class="map-item" v-if="ismap" id="getAddress" @load="loadiframe"
              src="https://m.amap.com/picker/?key=a341fbb4972db5b3e275c56826aee85b"
              style="width:100%; height:100%;position: absolute;z-index:22222;"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myMap',
    props: ["ismap"],
    data() {
      return {
        locationData: {}
      }
    },
    created() {

    },
    methods: {
      loadiframe() {
        let iframe = document.getElementById('getAddress').contentWindow;
        iframe.postMessage('hello', 'https://m.amap.com/picker/');
        window.addEventListener("message", function (e) {
          if (e.data.command != "COMMAND_GET_TITLE") {
            //业务代码
						// console.log(e)
						// this.ismap = false
          }

        }.bind(this), false);
      },

    }
  }
</script>
<style>
  .map-item {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    background: #fff;
    z-index: 222;
  }
</style>