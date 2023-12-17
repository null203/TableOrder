<template>
<div>
    <div class="sear-wrap">
        <van-dropdown-menu>
            <van-dropdown-item v-model="schoolTermId" :options="schoolTermList" @change='changeSchoolTerm'/>
        </van-dropdown-menu>
    </div>
    <div class="qs-list-wrap">
      <van-list
        v-model="listLoading"
        :offset='50'
        class='mt68'
        :immediate-check='false'
        :finished="listFinished"
        finished-text="没有更多了"
        @load="onLoad">
            <van-panel
            :title="item.name"
            :status="item.statusName"
            class='mb15'
            :class="{'qs-play':item.startStatus=='2','qs-close':item.startStatus=='1' || item.startStatus=='0'}"
            v-for='(item,index) in list'
            :key='item.id'>
                <div class="qs-list-item">学校：{{item.schoolName}}</div>
                <div class="qs-list-item">学年学期：{{item.schoolTermName}}</div>
                <div class="qs-list-item">考试类型：{{item.activityKindName}}</div>
                <div class="qs-list-item">截止日期：{{item.endDate}}</div>
                <div class="qs-list-item">进度：{{item.personalProcess}}</div>
                <div slot='footer' class='tr'>
                    <template v-if='item.startStatus == "1"'>
                        <template v-if='item.kindMap.hasOwnProperty("1")'>
                            <van-button size="small" class='mr6' @click="join(item,'1')">查看自评</van-button>
                        </template>
                        <template v-if='item.kindMap.hasOwnProperty("2")'>
                            <van-button size="small" class='mr6' @click="join(item,'2')">查看群评</van-button>
                        </template>
                        <template v-if='item.kindMap.hasOwnProperty("4")'>
                            <van-button size="small" class='mr6' @click="join(item,'4')">查看领导评</van-button>
                        </template>
                    </template>
                    <template v-else>
                        <template v-if='item.kindMap.hasOwnProperty("1")'>
                            <van-button size="small" class='mr6' @click="join(item,'1')">{{item.kindMap['1'] == '0' ? '自评' : '查看自评'}}</van-button>
                        </template>
                        <template v-if='item.kindMap.hasOwnProperty("2")'>
                            <van-button size="small" class='mr6' @click="join(item,'2')">{{item.kindMap['2'] == '0' ? '群评' : '查看群评'}}</van-button>
                        </template>
                        <template v-if='item.kindMap.hasOwnProperty("4")'>
                            <van-button size="small" class='mr6' @click="join(item,'4')">{{item.kindMap['4'] == '0' ? '领导评' : '查看领导评'}}</van-button>
                        </template>
                        <van-button v-if='item.status == "0"' type="info" size="small" class='mr6' @click="doSubmit(item,index)">提交</van-button>
                    </template>
                </div>
            </van-panel>
        </van-list>
    </div>
</div>
</template>

<script>
export default {
    mounted() {
        let that=this;
        that.$store.commit('setTitle',that.$route.meta.title);
        that.$store.commit('setArrowFlag',that.$route.meta.showArrow);
        //that.getAuthority();
    },
    data() {
        return {
            loadDataFlag:false,
            listLoading: false,
            listFinished: false,
            schoolTermList:[],
            schoolTermId:'',
            list:[],
            pageSize:10,
            pageNum:1,
        };
    },
    methods: {
        onLoad(){
            this.getData('onLoad');
            this.pageNum++;
        },
        getAuthority(){//获取权限和基本信息
            let that = this;
            BaseAxios.post('/pe/indicator!index.action',{})
                .then((res) => {
                    sessionStorage.currentUserId=res.data.currUserId;
                    sessionStorage.currentSchoolId=res.data.currSchoolId;
                    sessionStorage.currentSchoolTermId=res.data.currSchoolTermId;
                    let codeArr=res.data.operations.map(val=>{
                        return val.code;
                    })
                    if(codeArr.join(',').indexOf('bd_operation_cypj')  == -1){
                        that.$toast('您没有参与评价的权限！');
                    }else{
                        that.getSchoolTerms();
                    }
                })
                .catch((error) => {
                    that.$toast('获取权限失败');
                });
        },
        getSchoolTerms(){//获取学期
            let that = this;
            that.listLoading = true;
            BaseAxios.post('/pe/evaluationActivity!getSchoolTerms.action',{})
                .then((res) => {
                    if(res.data.length > 0){
                        res.data.forEach(val => {
                            val.text=val.name;
                            val.value=val.id;
                        });
                    }
                    that.schoolTermId=sessionStorage.currentSchoolTermId;
                    that.getData();
                    that.schoolTermList=[].concat(res.data);
                })
                .catch((error) => {
                    that.listLoading = false;
                    that.$toast('获取学期失败');
                });
        },
        changeSchoolTerm(data){
            this.pageNum=1;
            this.list=[];
            this.listFinished=false;
            this.getData();
        },
        getData(type){
            let that=this;
            let params={};
            // 防止重复提交
            if(that.loadDataFlag){
                return;
            }

            params.pageNum = that.pageNum;
            params.pageSize = that.pageSize;
            params.schoolTermId = that.schoolTermId;

            that.loadDataFlag=true;
            BaseAxios.post('/pe/evaluationResult!getEvaluatingActivityPage.action', params)
            .then((res) => {
                that.listLoading=false;
                that.loadDataFlag=false;
                if(res.data.list.length < 10){
                    that.listFinished=true;
                }else{
                    that.pageNum++;
                }

                res.data.list.forEach(val=>{
                    val.statusName='';
                    val.kindArr=[];
                    if(val.kindMap.hasOwnProperty('1')){
                        val.kindArr.push('自评');
                    }
                    if(val.kindMap.hasOwnProperty('2')){
                        val.kindArr.push('群评');
                    }
                    if(val.kindMap.hasOwnProperty('4')){
                        val.kindArr.push('领导评');
                    }
                    val.kind=val.kindArr.join(',');

                    switch (val.startStatus) {
                        case '1':
                            val.statusName='结束';
                            break;
                        case '2':
                            val.statusName='进行中';
                            break;
                    }

                    //自评:1，群评:2，领导评:4
                    switch (Number(val.activityKind)) {
                        case 7:
                            val.activityKindName='自评，群评，领导评';
                            break;
                        case 6:
                            val.activityKindName='群评，领导评';
                            break;
                        case 5:
                            val.activityKindName='自评，领导评';
                            break;
                        case 4:
                            val.activityKindName='领导评';
                            break;
                        case 3:
                            val.activityKindName='自评，群评';
                            break;
                        case 2:
                            val.activityKindName='群评';
                            break;
                        case 1:
                            val.activityKindName='自评';
                            break;
                    }
                })
                if(type =='onLoad'){
                    that.list=that.list.concat(res.data.list);
                }else{
                    that.list=[].concat(res.data.list);
                }
            })
            .catch((error) => {
                that.loadDataFlag=false;
                that.listLoading=false;
                console.log(error)
            });
        },
        join(item,type){//按指标评价
            let that=this;
            let params={};
            params.name=item.name;
            params.id=item.id;
            params.kind=type;
            if(item.startStatus == '1'){
                params.isSaveFlag='1';
            }else{
                params.isSaveFlag=item.kindMap[type];
            }
            sessionStorage.joinParams=JSON.stringify(params);
            that.$router.push({
               name:'showTree',
            })
        },
        doSubmit(row,index){//提交
            let that=this;
            let pocessArr=row.personalProcess.split('/');
            if(parseInt(pocessArr[0]) != parseInt(pocessArr[1])){
                that.$toast('请评价完再提交!');
                return;
            }
            
            let params={};

            that.$toast.loading({
                duration:0,
                forbidClick: true,
                loadingType: 'spinner',
                overlay:false
            });

            params.activityId=row.id;

            // 验证是否可以提交
            BaseAxios.post('/pe/evaluationResult!validateSubmitResult.action', params)
                .then((res) => {
                    that.$toast.clear();
                    that.$dialog.confirm({
                        title: '提示',
                        message: res.data.replace(';',',')+'继续提交吗？',
                        theme: 'round-button',
                        beforeClose,//异步关闭
                    })
                    function beforeClose(action, done) {
                        done();
                        if (action === 'confirm') {
                            that.$toast.loading({
                                duration:0,
                                forbidClick: true,
                                loadingType: 'spinner',
                                overlay:false
                            });
                            BaseAxios.post('/pe/evaluationResult!saveSubmit.action', params)
                                .then((res) => {
                                    that.$toast.success('操作成功');
                                    that.list[index].status='1';
                                    for(let key in that.list[index].kindMap){
                                        that.list[index].kindMap[key] = '1';
                                    }
                                })
                                .catch((error) => {
                                    that.$toast('请求失败');
                                    console.log(error);
                                });
                        }
                        
                    }
                })
                .catch((error) => {
                    that.$toast('请求失败');
                    console.log(error);
                });
        }
    }
}
</script>