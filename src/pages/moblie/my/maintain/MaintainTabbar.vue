<template>
    <div class="maintain-tabbar">
        <div class="tabbar-left">
            <span>预估费用：</span>
            <span class="total" v-if="!estimate">￥{{totalPrice | floatTotal}}</span>
            <span class="total" v-else>待评估</span>
        </div>
        <button @click="confrimOrder" :disabled="isDisabled">预约下单</button>
        <mt-popup
            v-model="clauseVisible"
            popup-transition="popup-fade">
            <Clause />
        </mt-popup>
    </div>
</template>

<script>
import Clause from './Clause'
export default {
    name: 'MaintainTabbar',
    components: {
        Clause
    },
    data () {
        return {
            clauseVisible: false,
            isDisabled: true,
            totalPrice: 0,
            estimate: false
        }
    },
    computed: {
        maintainItem () {
            return this.$store.state.maintainItem
        }
    },
    watch: {
        maintainItem: {
            handler (newV, oldV) {
                // console.log(newV, oldV)
                this.totalPrice = newV.totalPrice
                this.isDisabled = newV.isDisabled
                this.estimate = newV.estimate
            },
            deep:true
        }
    },
    mounted () {
        
    },
    methods: {
        confrimOrder () {
            const contactItem = JSON.parse(localStorage.getItem('contactItem'))
            if (!contactItem) {
                this.$toast({
                    message: '还未填写联系信息哦',
                })
            } else {
                this.clauseVisible = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.maintain-tabbar {
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    box-shadow: 0px -1px .12rem rgba(0,0,0,0.04);
    z-index: 999;
    .tabbar-left {
        margin-left: .44rem;
        font-size: .28rem;
        color: #6B6B6B;
        .total {
            color: #EC4E4E;
        }
    }
    button[disabled] {
        background: #ddd !important;
    }
    button {
        width: 32%;
        height: 1rem;
        color: #fff;
        font-size: .3rem;
        background: #EC4E4E;
    }
    .mint-popup {
        border-radius: .25rem;
    }
}
</style>