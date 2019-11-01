import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/moblie/home/Home'
import Homep from '@/pages/web/Home_p'


// import myMap from '@/pages/moblie/my/address/Map'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: //,
  routes: [
    // { path: '/', redirect: 'home_p'},
    { path: '/home', name: 'Home', component: Home },
    { path: '/mobile/category', name: 'Category', component: () => import('@/pages/moblie/category/Category') },
    { path: '/mobile/detail', name: 'Detail', component: () => import('@/pages/moblie/detail/Detail') },
    { path: '/mobile/cart', name: 'Cart', component: () => import('@/pages/moblie/cart/Cart') },
    { path: '/mobile/pay', name: 'Pay', component: () => import('@/pages/moblie/pay/Pay') },
    { path: '/mobile/pay/WechatJsApiPay', name: 'WechatJsApiPay', component: () => import('@/pages/moblie/pay/WechatJsApiPay') },
    { path: '/mobile/pay/result', name: 'PayResult', component: () => import('@/pages/moblie/pay/payResult/PayResult') },
    { path: '/mobile/pay/browserResult', name: 'BrowserResult', component: () => import('@/pages/moblie/pay/payResult/BrowserResult') },
    { path: '/mobile/pay/wallet/WechatJsApiPay', name: 'WalletWechatJsApiPay', component: () => import('@/pages/moblie/pay/walletResult/WechatJsApiPay') },
    { path: '/mobile/pay/wallet/result', name: 'WalletPayResult', component: () => import('@/pages/moblie/pay/walletResult/PayResult') },
    { path: '/mobile/pay/wallet/browserResult', name: 'WalletBrowserResult', component: () => import('@/pages/moblie/pay/walletResult/BrowserResult') },
    { path: '/mobile/pay/mat/WechatJsApiPay', name: 'MatWechatJsApiPay', component: () => import('@/pages/moblie/pay/matResult/WechatJsApiPay') },
    { path: '/mobile/pay/mat/result', name: 'MatPayResult', component: () => import('@/pages/moblie/pay/matResult/PayResult') },
    { path: '/mobile/pay/mat/browserResult', name: 'MatBrowserResult', component: () => import('@/pages/moblie/pay/matResult/BrowserResult') },
    { path: '/mobile/pay/success', name: 'Success', component: () => import('@/pages/moblie/pay/payResult/Success') },
    { path: '/mobile/pay/fail', name: 'Fail', component: () => import('@/pages/moblie/pay/payResult/Fail') },
    { path: '/mobile/pay/wallet/success', name: 'WalletSuccess', component: () => import('@/pages/moblie/pay/walletResult/Success') },
    { path: '/mobile/pay/wallet/fail', name: 'WalletFail', component: () => import('@/pages/moblie/pay/walletResult/Fail') },
    { path: '/mobile/pay/mat/success', name: 'MatSuccess', component: () => import('@/pages/moblie/pay/matResult/Success') },
    { path: '/mobile/pay/mat/fail', name: 'MatFail', component: () => import('@/pages/moblie/pay/matResult/Fail') },
    { path: '/mobile/address', name: 'Address', component: () => import('@/pages/moblie/my/address/Address'),
      // children: [
      //   { path: '/mobile/address/newaddress', name: 'NewAddress', component: NewAddress}
      // ]
    },
    { path: '/mobile/order', name: 'Order', component: () => import('@/pages/moblie/order/Order'),
      // children: [
      //   { path: '/mobile/order/detail', name: 'OrderDetail', component: OrderDetail }
      // ]
    },
    { path: '/mobile/order/detail', name: 'OrderDetail', component: () => import('@/pages/moblie/order/orderDetail/OrderDetail') },
    { path: '/mobile/aftermarket', name: 'Aftermarket', component: () => import('@/pages/moblie/my/aftermarket/Aftermarket') },
    { path: '/mobile/address/newaddress', name: 'NewAddress', component: () => import('@/pages/moblie/my/address/NewAddress') },
    // { path: '/mobile/address/map', name: 'Map', component: myMap },
    { path: '/mobile/coupon', name: 'Coupon', component: () => import('@/pages/moblie/my/coupon/Coupon') },
    { path: '/mobile/coupon/products', name: 'CouponProducts', component: () => import('@/pages/moblie/my/coupon/CouponProducts') },
    { path: '/mobile/collection', name: 'Collection', component: () => import('@/pages/moblie/my/collection/Collection') },
    { path: '/mobile/opinion', name: 'Opinion', component: () => import('@/pages/moblie/my/opinion/Opinion') },
    { path: '/mobile/server', name: 'myServer', component: () => import('@/pages/moblie/my/server/myServer') },
    { path: '/mobile/set/user', name: 'User', component: () => import('@/pages/moblie/my/set/user/User') },
    { path: '/mobile/set/membership', name: 'Membership', component: () => import('@/pages/moblie/my/set/membership/Membership') },
    { path: '/mobile/set/user/nickname', name: 'NickName', component: () => import('@/pages/moblie/my/set/user/NickName') },
    { path: '/mobile/set/user/autograph', name: 'Autograph', component: () => import('@/pages/moblie/my/set/user/Autograph') },
    { path: '/mobile/cropper', name: 'Cropper', component: () => import('@/pages/moblie/common/Cropper') },
    { path: '/mobile/my/set', name: 'Set', component: () => import('@/pages/moblie/my/set/Set') },
    { path: '/mobile/my/set/result/result', name: 'WalletResult', component: () => import('@/pages/moblie/my/set/result/WalletResult') },
    { path: '/mobile/my/set/mode/mode', name: 'Mode', component: () => import('@/pages/moblie/my/set/mode/Mode') },
    { path: '/mobile/my/set/mode/wxpay', name: 'Wxpay', component: () => import('@/pages/moblie/my/set/mode/Wxpay') },
    { path: '/mobile/my/invitation', name: 'Invitation', component: () => import('@/pages/moblie/my/invitation/Invitation') },
    { path: '/mobile/my/wallet', name: 'Wallet', component: () => import('@/pages/moblie/my/wallet/Wallet') },
    { path: '/mobile/my/maintain', name: 'Maintain', component: () => import('@/pages/moblie/my/maintain/Maintain') },
    { path: '/mobile/my/maintain/order', name: 'MaintainOrder', component: () => import('@/pages/moblie/my/maintain/MaintainOrder') },
    { path: '/mobile/my/maintain/detail', name: 'MaintainDetail', component: () => import('@/pages/moblie/my/maintain/MaintainDetail') },
    { path: '/mobile/my/maintain/opinion', name: 'MatOpinion', component: () => import('@/pages/moblie/my/maintain/MatOpinion') },
    { path: '/mobile/my/maintain/result', name: 'MaintainResult', component: () => import('@/pages/moblie/my/maintain/MaintainResult') },
    { path: '/mobile/my/maintain/photograph', name: 'Photograph', component: () => import('@/pages/moblie/my/maintain/Photograph') },
    { path: '/mobile/my/maintain/mail', name: 'Mail', component: () => import('@/pages/moblie/my/maintain/Mail') },
    { path: '/mobile/my/wallet/bill', name: 'Bill', component: () => import('@/pages/moblie/my/wallet/Bill') },
    { path: '/mobile/my/wallet/cash', name: 'Cash', component: () => import('@/pages/moblie/my/wallet/Cash') },
    { path: '/mobile/my/wallet/recharge', name: 'Recharge', component: () => import('@/pages/moblie/my/wallet/Recharge') },
    { path: '/mobile/my', name: 'My', component: () => import('@/pages/moblie/my/My'),
      // children: [
      //   { path: '/address', name: 'Address', component: Address}
      // ]
    },
    { path: '/mobile/about', name: 'About', component: () => import('@/pages/moblie/my/about/About') },
    { path: '/mobile/login', name: 'Login', component: () => import('@/pages/moblie/login/Login') },
    { path: '/mobile/phone', name: 'Phone', component: () => import('@/pages/moblie/phone/Phone') },
    // web
    { path: '/', name: 'Home_p', component: Homep },
    { path: '/web/product', name: 'Product_Pc', component: () => import('@/pages/web/Product_Pc') },
    { path: '/web/introduction', name: 'Introduction_Pc', component: () => import('@/pages/web/Introduction_Pc') },
    { path: '/web/about', name: 'About_Pc', component: () => import('@/pages/web/About_Pc') },
    { path: '/web/cooperation', name: 'Cooperation_Pc', component: () => import('@/pages/web/Cooperation_Pc') },
    { path: '/web/detail', name: 'Detail_Pc', component: () => import('@/pages/web/Detail_Pc') },
    { path: '/web/notice', name: 'notice_pc', component: () => import('@/pages/web/Notice_Pc') },
    { path: '/web/maintain', name: 'maintain_pc', component: () => import('@/pages/web/Maintain_Pc') }
  ]
})
