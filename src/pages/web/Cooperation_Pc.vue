<template>
  <div class="cooperation">
    <nav-pc></nav-pc>
    <coo-content></coo-content>
    <footer-pc></footer-pc>
  </div>
</template>

<script>
import NavPc from '@/pages/web/home/Nav_pc'
import CooContent from '@/pages/web/cooperation/Coo_content'
import FooterPc from '@/pages/web/home/Footer_pc'
export default {
  name: 'CooperationPc',
  components: {
    NavPc,
    CooContent,
    FooterPc
  }
}
</script>

<style lang="scss" scoped>
.cooperation {
  background: #fff;
}
</style>
