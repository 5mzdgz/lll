<template>
  <div class="introduction">
    <nav-pc></nav-pc>
    <int-content></int-content>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
import NavPc from '@/pages/web/home/Nav_pc'
import IntContent from '@/pages/web/introduction/Content'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'IntroductionPc',
  components: {
    NavPc,
    IntContent,
    FooterPc
  }
}
</script>

<style lang="scss" scoped>
.introduction {
  background: #fff;
}
</style>
