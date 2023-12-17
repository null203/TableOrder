<template>
    <div class="grid-wrap">

        <div class="grid-title">请选择用餐人数</div>

        <van-grid>
            <van-grid-item v-for="n in size" v-bind:key="n">
                <van-button 
                    type="default" 
                    :class="n == guestNum ? 'wp80 grid-seleced' : 'wp80'"
                    @click="guestNum = n"
                >{{n}}人</van-button>
            </van-grid-item>
        </van-grid>

        <div class="mt16">
            <van-button round block type="info" @click="onSubmit" class="wp90">确定</van-button>
        </div>

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
        that.guestNum = that.$store.state.guestNum;
    },
    data() {
        return {
            size: 20,
            guestNum: 1,
        };
    },
    methods: {
        onSubmit() {
            let that = this;
            console.log('num', that.guestNum);
            that.$store.commit('setGuestNum', that.guestNum);
            that.$router.push({
               name:'menu',
            });
        },
    }
}
</script>