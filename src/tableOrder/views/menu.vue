<template>
    <div class="content">

        <van-row>
            <van-col span="16">

                <van-tabs>
                    <van-tab v-for="index in 8" :title="'测试标签 ' + index" v-bind:key="index">
                        <van-grid :column-num="3">
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                            <van-grid-item icon="photo-o" text="文字" />
                        </van-grid>
                    </van-tab>
                </van-tabs>

            </van-col>
            
            <van-col span="8">

                <van-row class="order-title">
                    注文リスト
                </van-row>

                <div class="order-list">
    
                    <van-row class="order-item">
                        <van-col span="12">食べ放題</van-col>
                        <van-col span="12" class="order-item-price">￥1980</van-col>
                    </van-row>
                    <van-row class="order-child">
                        <van-col span="12">棒棒鶏</van-col>
                        <van-col span="12" class="order-item-count">
                            <van-stepper theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>
                    <van-row class="order-child">
                        <van-col span="12">青椒肉絲</van-col>
                        <van-col span="12" class="order-item-count">
                            <van-stepper theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>
                    <van-row class="order-child">
                        <van-col span="12">自家製棒餃子</van-col>
                        <van-col span="12" class="order-item-count">
                            <van-stepper theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>
                    <van-row class="order-child">
                        <van-col span="12">麻婆豆腐</van-col>
                        <van-col span="12" class="order-item-count">
                            <van-stepper theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>
    
                    <van-row class="order-item">
                        <van-col span="12">回鍋肉</van-col>
                        <van-col span="12" class="order-item-price">￥1480</van-col>
                    </van-row>
                    <van-row class="order-child">
                        <van-col span="12"></van-col>
                        <van-col span="12" class="order-item-count">
                            <van-stepper theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>
    
                    <van-row class="order-item">
                        <van-col span="12">コーンスープ</van-col>
                        <van-col span="12" class="order-item-price">￥480</van-col>
                    </van-row>
                    <van-row class="order-child">
                        <van-col span="12"></van-col>
                        <van-col span="12" class="order-item-count">
                            <van-stepper theme="round" button-size="22" disable-input />
                        </van-col>
                    </van-row>

                    <template v-for="item in list">
                        <van-row class="order-item">
                            <van-col span="12">test{{item}}</van-col>
                            <van-col span="12" class="order-item-price">￥480</van-col>
                        </van-row>
                        <van-row class="order-child">
                            <van-col span="12"></van-col>
                            <van-col span="12" class="order-item-count">
                                <van-stepper theme="round" button-size="22" disable-input />
                            </van-col>
                        </van-row>
                    </template>

                </div>

            </van-col>
        </van-row>

        <van-submit-bar :price="1980000" decimal-length="" button-text="注文する" button-type="info" @submit="onSubmit" />

    </div>
</template>

<script>
export default {
    mounted() {
        let that = this;
        let storeName = localStorage.getItem("storeName");
        let tableNum = localStorage.getItem("tableNum");
        that.$store.commit('setTitle', storeName + ' ' + tableNum + '号桌');
        that.$store.commit('setArrowFlag', that.$route.meta.showArrow);
    },
    data() {
        return {
            list: 10,
            guestNum: 1,
        };
    },
    methods: {
        onSubmit() {
            console.log('submit');
        },
    }
}
</script>