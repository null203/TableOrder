<template>
    <div class="login-wrap">

        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="tableNum"
                type="digit"
                name="tableNum"
                label="桌号"
                placeholder="桌号"
                :rules="[{ required: true, message: '请填写桌号' }]"
            />

            <van-field label="设备ID" name="deviceId" v-model="deviceId" readonly />

            <div class="mt16">
                <van-button round block type="info" native-type="submit" class="wp90">确定</van-button>
            </div>
        </van-form>

    </div>
</template>

<script>
export default {
    mounted() {
        let that = this;
        that.$store.commit('setTitle', that.$route.meta.title);
        that.$store.commit('setArrowFlag', that.$route.meta.showArrow);

        let tableNum = localStorage.getItem("tableNum");
        let deviceId = localStorage.getItem("deviceId");
        if (!!tableNum){
            console.log('tableNum', tableNum)
            that.$router.push({
                name:'selectNum',
            });
        }
        if (!deviceId){
            deviceId = that.guid();
            localStorage.setItem("deviceId", deviceId);
        }
        that.deviceId = deviceId;
    },
    data() {
        return {
            username: 'test',
            password: 'test1111',
            tableNum: '1',
            deviceId: '',
        };
    },
    methods: {
        onSubmit(values) {
            let that = this;
            console.log('submit', values);
            localStorage.setItem("tableNum", values.tableNum);
            localStorage.setItem("storeName", "大龙城西川口店");
            that.$router.push({
               name:'selectNum',
            });
        },

        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
    }
}
</script>