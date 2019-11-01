import {
  ADD_CART,
  REDUCE_CART
} from './types.js'

export default {
  // setToken (state, token) {
  //   state.token = token
  //   localStorage.setItem('loginToken', token)
  // },
  // delToken (state) {
  //   state.token = ''
  //   localStorage.removeItem('loginToken')
  // },
  updateTabbarShow(state, payload){
    state.isTabbar = payload
  },
  ADD_COMMENT (state, detailData) {
    state.detailData = detailData
  },
  TOP_TOPDATA (state, topData) {
    state.topData = topData
  },
  NEW_NEWDATA (state, newData) {
    state.newData = newData
  },
  ADD_GOODS (state, goods) {
    state.goods = goods
  },
  ADD_PAY_DATA (state, payData) {
    state.payData = payData
  },
  ADD_GO_PAY_NUMBER (state, goPayNumber) {
    state.goPayNumber = goPayNumber
  },
  ADD_ADDRESS (state, address) {
    state.address = address
  },
  CHECKED_ADDRESS (state, checkedAddress) {
    state.checkedAddress = checkedAddress
  },
  ADD_USER_DATA (state, userData) {
    state.userData = userData
  },
  ADD_INVITE_USER (state, inviteUser) {
    state.inviteUser = inviteUser
  },
  ADD_WALLET_DATA (state, walletData) {
    state.walletData = walletData
  },
  ADD_CASH_DATA (state, cashData) {
    state.cashData = cashData
  },
  ADD_CONSUM_AMOUNT (state, consumAmount) {
    state.consumAmount = consumAmount
  },
  ADD_ORDER_DATA (state, orderData) {
    state.orderData = orderData
  },
  ADD_MAINTAIN_ITEM (state, maintainItem) {
    state.maintainItem = maintainItem
  },
  ADD_PROVINCE_ARR (state, provinceArr) {
    state.provinceArr = provinceArr
  },
  ADD_CITY_ARR (state, cityArr) {
    state.cityArr = cityArr
  },
  ADD_AREA_ARR (state, areaArr) {
    state.areaArr = areaArr
  }
}
