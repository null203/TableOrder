<template>
    <div>
        <van-nav-bar :left-arrow='arrowFlag' fixed :title="title" :z-index='90' class='nav-bg' @click-left="onClickLeft" @click-right="onClickRight" 
            :right-text="lang == 'ch' ? '日本語' : '中文'">
        </van-nav-bar>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            lang: 'ch'
        };
    },
    computed: {
        title() {
            return this.$store.state.title;
        },
        arrowFlag() {
            return this.$store.state.arrowFlag;
        },
        quotaFlag() {
            return this.$store.state.quotaFlag;
        }
    },
    methods: {
        onClickLeft() {
            window.history.go(-1);
        },
        onClickRight() {
            if (this.lang == 'ch'){
                this.lang = 'jp';
            } else {
                this.lang = 'ch';
            }
            console.log('lang', this.lang)
        }
    }
};
</script>
