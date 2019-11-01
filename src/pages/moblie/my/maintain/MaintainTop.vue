<template>
    <div class="maintain-top">
        <div class="maintain-img">
            <img src="https://img.laoliangli.com/label/maintain/maintain.png" alt="">
        </div>
        <button class="contact-service" @click="serverClick">
            <span class="iconfont">&#xe61e;</span>
            <span class="service">联系客服</span>
            <i class="el-icon-arrow-right"></i>
        </button>
        <server ref="server"></server>
    </div>
</template>

<script>
import Server from '@/pages/moblie/common/Server'
export default {
    name: 'MaintainTop',
    components: {
        Server
    },
    data () {
        return {

        }
    },
    methods: {
        serverClick () {
            this.$refs.server.handleShow()
        }
    }
}
</script>

<style lang="scss" scoped>
.maintain-top {
    position: relative;
    .maintain-img {
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-bottom: 43.46%;
        img {
            width: 100%;
            display: block;
        }
    }
    .contact-service {
        position: absolute;
        right: 0;
        top: .28rem;
        height: .4rem;
        border-top-left-radius: .2rem;
        border-bottom-left-radius: .2rem;
        padding-left: .1rem;
        font-size: .24rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #EC4E4E;
        opacity: .69;
        color: #fff;
        .service {
            padding: 0 .06rem;
            font-size: .2rem;
        }
    }
}
</style>