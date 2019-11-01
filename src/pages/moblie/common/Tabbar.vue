<template>
  <div class="tabbar">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="home">
        <img v-if="this.selected == 'home'" slot="icon" src="https://img.laoliangli.com/label/tab/home_selected.png">
        <img v-else slot="icon" src="https://img.laoliangli.com/label/tab/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="category">
        <img v-if="this.selected == 'category'" slot="icon" src="https://img.laoliangli.com/label/tab/category_selected.png">
        <img v-else slot="icon" src="https://img.laoliangli.com/label/tab/category.png">
        分类
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img v-if="this.selected == 'cart'" slot="icon" src="https://img.laoliangli.com/label/tab/cart_selected.png">
        <img v-else slot="icon" src="https://img.laoliangli.com/label/tab/cart.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="my">
        <img v-if="this.selected == 'my'" slot="icon" src="https://img.laoliangli.com/label/tab/my-selected.png">
        <img v-else slot="icon" src="https://img.laoliangli.com/label/tab/my.png">
        我的
      </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Tabbar',
  data () {
    return {
      selected: sessionStorage.getItem('selected') ? sessionStorage.getItem('selected') : 'home',
      home: 'home',
      category: 'category',
      cart: 'cart',
      my: 'my'
    }
  },
  watch: {
    selected (val, oldVal) {
      // console.log(val)
      // click后打印出当前mt-tab-item的id
      sessionStorage.setItem('selected', val)
      // console.log(val)
      if (val === this.home) {
        this.$router.replace('/home')
      } else if (val === this.category) {
        this.$router.replace('/mobile/category')
      } else if (val === this.cart) {
        this.$router.replace('/mobile/cart')
      } else if (val === this.my) {
        this.$router.replace('/mobile/my')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mint-tabbar {
  position: fixed;
  height: 1rem;
  background: #fff;
}
</style>
