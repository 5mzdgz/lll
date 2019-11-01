<template>
  <div class="about">
    <nav-pc></nav-pc>
    <my-center></my-center>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
import NavPc from '@/pages/web/home/Nav_pc'
import MyCenter from '@/pages/web/about/Conter'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'AboutPc',
  components: {
    NavPc,
    MyCenter,
    FooterPc
  }
}
</script>

<style lang="scss" scoped>
.about {
  background: #fff;
}
</style>
