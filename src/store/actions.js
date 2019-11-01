import { ADD_CART, REDUCE_CART } from './types.js'

export default {
  addCart ({
    commit,
    state
  }) {
    commit(ADD_CART, 1)
  },
  reduceCart ({
    commit,
    state
  }) {
    commit(REDUCE_CART, 1)
  },
  addComment({commit}, detailData) {
    commit('ADD_COMMENT', detailData)
  },
  topData({commit}, topData) {
    commit('TOP_TOPDATA', topData)
  },
  newData({commit}, newData) {
    commit('NEW_NEWDATA', newData)
  },
  addGoods({commit}, goods) {
    commit('ADD_GOODS', goods)
  },
  addPayData({commit}, payData) {
    commit('ADD_PAY_DATA', payData)
  },
  addGoPayNumber({commit}, goPayNumber) {
    commit('ADD_GO_PAY_NUMBER', goPayNumber)
  },
  addAddress({commit}, address) {
    commit('ADD_ADDRESS', address)
  },
  checkedAddress({commit}, checkedAddress) {
    commit('CHECKED_ADDRESS', checkedAddress)
  },
  addUserData({commit}, userData) {
    commit('ADD_USER_DATA', userData)
  },
  addInviteUser({commit}, inviteUser) {
    commit('ADD_INVITE_USER', inviteUser)
  },
  
  addWalletData({commit}, walletData) {
    commit('ADD_WALLET_DATA', walletData)
  },

  addCashData({commit}, cashData) {
    commit('ADD_CASH_DATA', cashData)
  },

  addConsumAmount({commit}, consumAmount) {
    commit('ADD_CONSUM_AMOUNT', consumAmount)
  },
  addOrderData({commit}, orderData) {
    commit('ADD_ORDER_DATA', orderData)
  },
  addMaintainItem({commit}, maintainItem) {
    commit('ADD_MAINTAIN_ITEM', maintainItem)
  },
  addProvinceArr({commit}, provinceArr) {
    commit('ADD_PROVINCE_ARR', provinceArr)
  },
  addCityArr({commit}, cityArr) {
    commit('ADD_CITY_ARR', cityArr)
  },
  addAreaArr({commit}, areaArr) {
    commit('ADD_AREA_ARR', areaArr)
  }
}
