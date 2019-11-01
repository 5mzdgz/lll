<template>
    <div class="maintain-middle">
        <ul>
            <li v-for="(item, index) in maintainData" :key="index">
                <div class="maintain-nav" v-if="!(index === 2 && !maintainData[2].checked)" @click="maintainNavClick(index)">
                    <div class="title">{{item.maintianTitle}}</div>
                    <div class="middle">
                        <span class="sub">{{item.maintianSub}}</span>
                        <span class="phone">{{item.maintianPhone}}</span>
                    </div>
                    <i class="el-icon-arrow-right" :class="{rotate: item.checked}"></i>
                </div>

                <dl v-if="index === 0" :class="{contacts: !item.checked}">
                    <dd>
                        <span>联系人</span>
                        <input v-focus type="text" maxlength="20" v-model="contacts">
                    </dd>
                    <dd>
                        <span>联系电话</span>
                        <input type="number" maxlength="11" v-model="contactPhone">
                    </dd>
                    <dd>
                        <button :disabled="disabled" @click="contactBtn(index)">确定</button>
                    </dd>
                </dl>

                <ul v-if="index === 1" :class="item.checked ? 'category':'category_active'">
                    <li v-for="(matItem, key) in maintainArr" :key="key" @click="checkMatItem(key)">
                        <img :src="matItem.matImgUrl" alt="">
                        <p>{{matItem.matName}}</p>
                        <i class="el-icon-success" v-show="matItem.checked"></i>
                    </li>
                </ul>

                <ul v-if="index === 2" :class="item.checked && categoryArr.length > 0 ? 'attribute' : 'attribute_active'">
                    <li v-for="(attrItem, attrIndex) in categoryArr" :key="attrIndex" @click="attrItemClick(attrIndex)">
                        <div>
                            <span>{{attrItem}}</span>
                            <i class="el-icon-success" v-show="attrIndex === cateIndex"></i>
                        </div>
                    </li>
                </ul>
                <p class="precious" v-if="index === 3 && item.checked">·待评估服务项目展示，具体保养项目工艺师检测后，会给出专业建议·</p>
                <ul class="project" v-show="index === 3" :class="!item.checked ? 'project_active':''">
                    <li v-show="item.checked" v-for="(proItem, proIndex) in projectArr" :key="proIndex" @click="projectItemClick(proItem.sid)" :class="proItem.checked ? 'project_item': ''">
                        <div class="project-left">
                            <p class="title">
                                <span>{{proItem.serviceName}}</span>
                                <i class="el-icon-question" @click.stop="introduceClick()"></i>
                            </p>
                             <mt-popup
                                v-model="introduceVisible"
                                popup-transition="popup-fade">
                                <div class="msg-box">
                                    <p>{{proItem.serviceName}}</p>
                                    <div class="introduce">{{proItem.serviceRemark}}</div>
                                </div>
                            </mt-popup>
                            <p class="sub" v-if="proItem.serviceSubName !== proItem.serviceName">{{proItem.serviceSubName}}</p>
                        </div>
                        <div class="project-right" v-if="proItem.estimate"><p class="estimate">价格以工艺师评估后为准</p></div>
                        <div class="project-right" v-else>
                            <p class="activity-price">
                                <span class="price-name">{{proItem.msomList.length > 0?'活动价：':'价格：'}}</span>
                                <span class="price">￥{{proItem.nowPrice}}</span>
                                <span class="symbol">/{{proItem.unit}}</span>
                            </p>
                            <p class="origin-price" v-if="proItem.msomList.length > 0">
                                <span class="price-name">原价：</span>
                                <span class="price">￥{{proItem.servicePrice}}</span>
                                <span class="symbol">/{{proItem.unit}}</span>
                            </p>
                        </div>
                        <i class="el-icon-success active-icon" v-show="proItem.checked"></i>
                        <div class="count-box" v-show="proItem.checked && !proItem.estimate">
                            <i class="el-icon-remove-outline reduce" @click.stop="onReduceNum(proIndex)"></i>
                            <div class="count">{{proItem.qty}}</div>
                            <i class="el-icon-circle-plus add" @click.stop="onAddNum(proIndex)"></i>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="bottom-tip">·以上为预估保养费用，最终以工艺师检测后为准·</li>
        </ul>
        <mt-popup
            v-model="msgVisible"
            popup-transition="popup-fade">
            <div class="msg-box">
                <p>订单备注</p>
                <textarea v-focus name="msg" v-model="msg" placeholder="请填写您的订单备注~"></textarea>
                <button class="msg" @click="msgClick">确定</button>
            </div>
        </mt-popup>
    </div>
</template>

<script>
export default {
    name: 'MaintainMiddle',
    inject: ['reload'],
    data () {
        return {
            contacts: '',
            contactPhone: '',
            disabled: true,
            msgVisible: false,
            introduceVisible: false,
            msg: '',
            maintainArr: [],
            categoryArr: [],
            cateIndex: -1,
            projectArr: [],
            count: 0,
            checkedArr: [],
            maintainData: [
                {
                    maintianTitle: '联系人信息',
                    maintianSub: '',
                    maintianPhone: '',
                    checked: false,
                },
                {
                    maintianTitle: '材质选择',
                    maintianSub: '',
                    maintianPhone: '',
                    checked: false,
                },
                {
                    maintianTitle: '材质类别',
                    maintianSub: '',
                    maintianPhone: '',
                    checked: false,
                },
                {
                    maintianTitle: '保养项目',
                    maintianSub: '',
                    maintianPhone: '',
                    checked: false,
                },
                {
                    maintianTitle: '订单备注',
                    maintianSub: '(备注)',
                    maintianPhone: '',
                    checked: false,
                }
            ]
        }
    },
    created () {
        this.getMaintainArr()
        this.init()
    },
    mounted () {
        const contactItem = JSON.parse(localStorage.getItem('contactItem'))
        if (contactItem) {
            this.maintainData[0].maintianSub = contactItem.contacts
            this.maintainData[0].maintianPhone = contactItem.contactPhone
            this.contacts = contactItem.contacts
            this.contactPhone = contactItem.contactPhone
        }
    },
    watch: {
        // 联系人名称
        contacts (newValue, oldValue) {
            let len = newValue.length
            let phoneLen = this.contactPhone.length
            if (len > 0 && phoneLen === 11) {
                this.disabled = false
            } else {
                this.disabled = true
            }
        }, 
        // 联系人电话
        contactPhone (newValue, oldValue) {
            const myreg = /^1(3|4|5|6|7|8|9)\d{9}$/
            let contactLen = this.contacts.length
            let len = newValue.length
            if (len == 11 && contactLen > 0) {
                if (!myreg.test(newValue)) {
                    this.$toast({
                        message: '请输入正确的手机号',
                    })
                    return false
                } else {
                    this.disabled = false
                }
            } else {
                this.disabled = true
            }
        },
        msgVisible (newValue) {
            if (!newValue) {
                this.maintainData[4].checked = false
            }
        }
    },
    methods: {
        /**
         * 初始化状态
         */
        init () {
            for (let index = 0; index < this.maintainData.length; index++) {
                if (index === 0) {
                    this.maintainData[index].checked = true
                } else {
                    this.maintainData[index].checked = false
                }
            }
            // console.log(this.maintainData)
        },
        /**
         * 获取保养服务数据并初始数据
         */
        getMaintainArr () {
            // this.reload()
            this.axios.get(this.domain.Base_M1_URL + '/l/v1/mat/search').then((res) => {
                if (res.data.code === '200') {
                    const maintainArr = res.data.data
                    maintainArr.sort(function (a, b) {
                        return a.id - b.id
                    })
                    maintainArr.forEach((item) => {
                        item.checked = false
                        item.msmList.forEach((indexItem) =>{
                            indexItem.checked = false
                            indexItem.qty = 1
                            this.setProItem(indexItem)
                        })
                    })
                    this.maintainArr = maintainArr
                }
            })
        },
        /**
         * 点击导航栏
         */
        maintainNavClick (index) {
            let maintainData = this.maintainData
            for (let i = 0; i < maintainData.length; i++) {
                if (index === i) {
                    if (maintainData[index].checked) {
                        maintainData[index].checked = false
                    } else {
                        maintainData[index].checked = true
                        if (index === 4) {
                            this.msgVisible = true
                        }
                    }
                } else {
                    this.maintainData[i].checked = false
                }
            }
        },
        /**
         * msg确认
         */
        msgClick () {
            let maintainData = this.maintainData
            let maintainArr = this.maintainArr
            maintainData[4].maintianSub = this.msg
            maintainArr.forEach((item) => {
                if(item.checked) {
                    item.msg = this.msg
                }
            })
            this.maintainArr = maintainArr
            this.msgVisible = false
        },
        /**
         * 服务介绍
         */
        introduceClick () {
            this.introduceVisible = true
        },
        /***
         * 联系人按钮
         */
        contactBtn (index) {
            let maintainData = this.maintainData
            maintainData[index].checked = false
            maintainData[1].checked = true
            maintainData[index].maintianSub = this.contacts
            maintainData[index].maintianPhone = this.contactPhone
            const contactItem = {
                contacts: this.contacts,
                contactPhone: this.contactPhone
            }
            localStorage.setItem('contactItem', JSON.stringify(contactItem))
        },
        /**
         * 材质选择
         */
        checkMatItem (key) {
            // console.log(key)
            this.msg = ''
            this.cateIndex = -1
            let maintainArr = this.maintainArr
            let maintainData = this.maintainData
            maintainData[1].maintianSub = maintainArr[key].matName
            maintainData[4].maintianSub = '(备注)'
            for (let index = 0; index < maintainArr.length; index++) {
                maintainArr[index].checked = false
                if (key === index) {
                    maintainArr[key].checked = true
                    maintainArr[key].estimate = false
                    maintainArr[key].isDisabled = true
                    maintainArr[key].totalPrice = 0
                    this.$store.dispatch('addMaintainItem', maintainArr[key])
                    // 材质类别
                    let categoryArr = maintainArr[key].matCategorys
                    // 服务项目
                    let projectArr = maintainArr[index].msmList
                    this.categoryArr = categoryArr
                    this.projectArr = projectArr
                    if (maintainArr[key].isMoreMat) {
                        maintainData[2].checked = true
                        maintainData[3].checked = false
                    } else {
                        maintainData[2].checked = false
                        maintainData[3].checked = true
                    }
                }
            }
            this.maintainArr = maintainArr
        },
        /**
         * 服务项数据处理
         */
        setProItem (proItem) {
            let nowPrice = 0
            // 置空当前选择中的服务项
            proItem.checked = false
            let msomListItem = proItem.msomList
            if (msomListItem.length > 0) {
                for (let j in msomListItem) {
                    let timestamp = new Date().getTime()
                    let stime = Date.parse(new Date(msomListItem[j].startTime))
                    let etime = Date.parse(new Date(msomListItem[j].endTime))
                    // console.log(msomListItem[j])
                    // let stime = new Date(msomListItem[j].startTime.replace(/\-/g, '/')).getTime()
                    // let etime = new Date(msomListItem[j].endTime.replace(/\-/g, '/')).getTime()
                    // console.log(etime);
                    // 时间范围
                    if (timestamp > stime && timestamp < etime) {
                        nowPrice = msomListItem[j].offerPrice
                        proItem.nowPrice = nowPrice
                    }
                }
            } else {
                nowPrice = proItem.servicePrice
                proItem.nowPrice = nowPrice
            }
        },
        /**
         * 选择材质类别
         */
        attrItemClick (attrIndex) {
            this.cateIndex = attrIndex
            let maintainData = this.maintainData
            let categoryArr = this.categoryArr
            let maintainArr = this.maintainArr
            maintainData[3].checked = true
            maintainData[2].maintianSub = categoryArr[attrIndex]
            maintainArr.forEach((item) => {
                if(item.checked) {
                    item.categoryItem = categoryArr[attrIndex]
                }
            })
            this.maintainArr = maintainArr
        },
        /**
         * 选中保养项目
         */
        projectItemClick (id) {
            let projectArr = this.projectArr
            let checkedArr = this.checkedArr
            for (let i = 0; i < projectArr.length; i++) {
                if (projectArr[i].sid == id) {
                    if (projectArr[i].checked) {
                        projectArr[i].checked = false
                        // 删除选中项数组sid相同的项
                        checkedArr.forEach((item, index) => {
                            if (checkedArr[index].sid === projectArr[i].sid) {
                            checkedArr.splice(index, 1)
                            }
                        })
                        // count计数，拥于控制预约下单button禁用与解除
                        this.count--
                    } else {
                        projectArr[i].checked = true
                        this.count++
                        checkedArr.push(projectArr[i])
                    }
                }
            }
            // console.log(this.count)
            let isDisabled = false
            if (this.count <= 0) {
                isDisabled = true
            } else {
                isDisabled = false
            }
            // 只要选中待评估的项，预估费用为待评估
            let estimate = false
            for (let key in checkedArr) {
                if (checkedArr[key].estimate && checkedArr[key].checked) {
                    estimate = true
                }
            }
            // console.log(projectArr)
            
            let maintainArr = this.maintainArr
            maintainArr.forEach((item) => {
                if(item.checked) {
                    item.isDisabled = isDisabled
                    item.estimate = estimate
                }
            })
            this.maintainArr = maintainArr
            this.projectArr = projectArr
            // console.log(projectArr)
            this.checkTotals()
        },

        /**
         * 减少商品数量
         */
        onReduceNum (index) {
            let projectArr = this.projectArr
            // console.log(index)
            let qty = projectArr[index].qty
            if (qty <= 1) {
                return
            } else {
                projectArr[index].qty--
            }
            this.projectArr = projectArr
            this.checkTotals()
        },
        /**
         * 增加商品数量
         */
        onAddNum (index) {
            let projectArr = this.projectArr
            // console.log(index)
            projectArr[index].qty++
            this.projectArr = projectArr
            this.checkTotals()
        },
        /**
         * 计算
         */
        checkTotals () {
            let totalCount = 0
            let totalPrice = 0
            let projectArr = this.projectArr

            for (let i = 0; i < projectArr.length; i++) {
                let carData = projectArr[i]
                if (carData.checked) {
                    totalCount += carData.qty
                    totalPrice += carData.qty * carData.nowPrice
                }
            }
            // this.totalCount = totalCount
            // this.totalPrice = totalPrice
            let maintainArr = this.maintainArr
            maintainArr.forEach((item) => {
                if(item.checked) {
                    item.totalCount = totalCount
                    item.totalPrice = totalPrice
                    
                    this.maintainItem = item
                    this.$store.dispatch('addMaintainItem', item)
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.maintain-middle {
    position: absolute;
    top: 1.78rem;
    left: 4.5%;
    width: 91%;
    background: #fff;
    border-radius: .14rem;
    z-index: 10;
    box-shadow:0px 6px 12px rgba(0,0,0,0.16);
    margin-bottom: 1.3rem;
    ul {
        padding: .2rem;
        text-align: center;
        li {
            .maintain-nav {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                padding: .3rem 0;
                border-bottom: 1px solid #D6D6D6;
                .title {
                    font-size: .3rem;
                    width: 1.6rem;
                    text-align: left;
                }
                .middle {
                    color: #757575;
                    width: 3.2rem;
                    margin-left: .2rem;
                    display: -webkit-box;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 1;
                    word-break: break-all;
                    -webkit-box-orient:vertical;
                    overflow: hidden;
                    text-align: left;
                    .sub {
                       font-size: .26rem; 
                    }
                    .phone {
                        font-size: .22rem; 
                    }
                }
                i {
                    font-size: .4rem;
                    color: #EC4E4E;
                }
                .rotate {
                    transform: rotate(90deg);
                }
            }
            p {
                font-size: .2rem;
                color: #AEAEAE;
                margin-top: .1rem;
            }
            dl {
                dd {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    border-bottom: 1px solid #D6D6D6;
                    padding: .4rem 0 .12rem 0;
                    span {
                        color: #C2C2C2;
                        font-size: .28rem;
                        width: 1.6rem;
                        text-align: left;
                    }
                    input {
                        font-size: .24rem;
                        color: #000000;
                        font-weight: 500;
                    }
                    button {
                        width: 3rem;
                        height: .5rem;
                        background: #fff;
                        color: #EC4E4E;
                        border: 1px solid #EC4E4E;
                        border-radius: .12rem;
                        font-size: .26rem;
                    }
                    button[disabled] {
                        background: #ddd !important;
                        color: #fff !important;
                        border: 1px solid #ddd !important;
                    }
                }
                dd:nth-child(3) {
                    padding: .26rem 0;
                    justify-content: center;
                }
            }
            .contacts {
                height: 0;
                overflow: hidden;
            }
            .precious {
                font-size: .16rem;
                padding: .1rem 0;
                border-bottom: 1px solid #D6D6D6;
            }
            .category_active {
                height: 0;
                padding: 0;
                overflow: hidden;
            }
            .category {
                display: flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                border-bottom: 1px solid #D6D6D6;
                li {
                    padding: .13rem 0;
                    width: 33.33%;
                    display: block;
                    position: relative;
                    img {
                        width: 1.22rem;
                        height: 1.12rem;
                    }
                    p {
                        font-size: .3rem;
                        color: #000;
                    }
                    i {
                        position: absolute;
                        bottom: .5rem;
                        right: .25rem;
                        font-size: .4rem;
                        color: #EC4E4E;
                    }
                }
            }
            .attribute {
                display: -webkit-flex;
                flex-direction: row;
                align-items: center;
                flex-wrap: wrap;
                padding: .2rem;
                border-bottom: 1px solid #D6D6D6;
                li {
                    width: 33.33%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    margin: .2rem 0;
                    div {
                        width: 1.2rem;
                        height: .5rem;
                        line-height: .5rem;
                        border: 1px solid #6A6A6A;
                        border-radius: .12rem;
                        position: relative;
                        span {
                            font-size: .26rem;
                            color: #6A6A6A;
                        }
                        i {
                            position: absolute;
                            bottom: -6px;
                            right: -6px;
                            background: #fff;
                            color:#EC4E4E;
                            font-size: .35rem;
                        }
                    }
                }
            }
            .attribute_active {
                height: 0;
                padding: 0;
                overflow: hidden;
            }
            .project {
                border-bottom: 1px solid #D6D6D6;
                padding: .1rem 0;
                min-height: 1.5rem;
                li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;
                    position: relative;
                    height: 1.3rem;
                    border: 1px solid #BFBFBF;
                    border-radius: .12rem;
                    padding: 0 .2rem;
                    margin: .1rem 0;
                    text-align: left;
                    .project-left {
                        width: 50%;
                        .title {
                            font-size: .3rem;
                            line-height: .35rem;
                            color: #000;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            span {
                                max-width: 2.5rem;
                                display: -webkit-box;
                                text-overflow: ellipsis;
                                -webkit-line-clamp: 1;
                                word-break: break-all;
                                -webkit-box-orient:vertical;
                                overflow: hidden;
                            }
                            i {
                                color: #EC4E4E;
                                padding-left: .1rem;
                            }
                        }
                        .sub {
                            font-size: .19rem;
                            color: #000;
                        }
                    }
                    .project-right {
                        width: 50%;
                        padding-left: .3rem;
                        .estimate {
                            color: #EC4E4E;
                        }
                        .activity-price {
                            color: #EC4E4E;
                            font-size: .22rem;
                            .price {
                                font-size: .32rem;
                            }
                        }
                        .symbol {
                            font-size: .14rem;
                        }
                        .origin-price {
                            text-decoration: line-through;
                            text-decoration-color: #707070;
                            margin-top: .2rem;
                            font-size: .18rem;
                            color: #707070;
                        }
                    }
                    .active-icon {
                        position: absolute;
                        top: -5px;
                        right: -5px;
                        color: #EC4E4E;
                        background: #fff;
                        font-size: .34rem;
                    }
                    .count-box {
                        position: absolute;
                        bottom: .15rem;
                        right: .1rem;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        .count {
                            width: .4rem;
                            text-align: center;
                        }
                        .reduce {
                            color: #707070;
                        }
                        .add {
                            color: #EC4E4E;
                        }
                    }
                }
                .project_item {
                    border: 1px solid #EC4E4E;
                }
            }
            .project_active {
                height: 1.5rem;
                overflow: hidden;
            }
        }
        .bottom-tip{
            font-size: .2rem;
            color: #AEAEAE;
            margin-top: .1rem;
        }
    }
    .mint-popup {
        border-radius: .2rem;
        .msg-box {
            text-align: center;
            border-radius: .2rem;
            width: 4.6rem;
            padding: .2rem;
            p {
                font-size: .3rem;
                color: #545454;
            }
            textarea, .introduce {
                width: 4.2rem;
                font-size: .24rem;
                border: 1px solid #D6D6D6;
                margin: .26rem 0;
                padding: .2rem;
                resize: none
            }
            .msg {
                width: 100%;
                height: .6rem;
                background: #EC4E4E;
                color: #fff;
                border-radius: .12rem;
            }
            .introduce {
                line-height: .35rem;
                color: #757575;
                text-align: left;
            }
        }
    }
}
</style>