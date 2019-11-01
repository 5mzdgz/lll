<template>
    <div class="rule-box">
        <p class="title">活动规则</p>
        <div class="content-box">
            <p>1、用户可以通过老良利小程序进入“邀请好友得返利”活动页面，邀请好友注册成为新用户。该新用户注册90天内确认收货的订单（保养订单除外），邀请人可获得订单实际付款金额20%的返利；90天后确认收货的订单（保养订单除外），邀请人可获得订单实际付款金额5%的返利。</p>
            <p>2、返利金额将在订单确认收货的24小时内到账，用户可在“我的-钱包“中查看明细。钱包金额可用商品订单、保养订单支付，钱包余额达到100元可提现。快去邀请好友来注册吧~</p>
            <p>3、新用户指的是手机或者微信账号从未注册过老良利商城的用户。</p>
            <p>4、若被邀请好友已经是老良利商城的用户，则邀请无效。</p>
            <p>5、如用户以不正当手段参与本活动（包括但不限于洗钱、套现、作弊领取、恶意刷单、虚假交易、不当使用、违背诚实信用等），一经发现，本平台将视情节严重程度按照相关规则进行处罚，包括但不限于取消用户邀请资格、撤销相关违规交易、收回奖励（包括已使用的金额）、依法追究其法律责任。</p>
            <p>6、本平台可以根据本活动的实际举办情况对活动规则进行变动或调整，相关变动或调整将公布在活动页面上，公布后依法生效。</p>
            <p>7、如出现不可抗力或情势变更的情况（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则可依据相关法律法规的规定主张免责。</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Rule'
}
</script>

<style lang="scss" scoped>
.rule-box {
    width: 5rem;
    height: 8rem;
    background: #F98359;
    border-radius: .2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
        font-size: .34rem;
        line-height: .9rem;
        color: #fff;
    }
    .content-box {
        width: 4rem;
        height: 6.4rem;
        background: #fff;
        overflow: hidden;
        overflow-y: auto;
        text-align: justify;
        padding: .2rem;
        p {
            font-size: .2rem;
            line-height: .4rem;
            color: #707070;
            margin-bottom: .1rem;
        }
    }
}
</style>
