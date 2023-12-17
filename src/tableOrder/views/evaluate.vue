<template>
<div>
    <div class="eval-exchange hand" @click='exchangeView'><van-icon name="exchange" /></div>
    <div class="eval-wrap pt68" style="padding-bottom:60px;">
        <div class="eval-info">
            <a href="javascript:void(0)" class="fr mr10 blue" v-if="joinParams.isSaveFlag == '0' && nodeInfo.evalType != '自评' && quotaUserList.length > 0" @click='openModal'>批量评价</a>
            <div class="fl ml10">当前进度：<span>{{joinData.process}}</span></div>
        </div>
        <van-panel>
            <div class="eval-quota-info"><span>指标名称：</span>{{nodeInfo.text}}</div>
            <div class="eval-quota-info"><span>指标分值：</span>{{nodeInfo.score}}</div>
            <div class="eval-quota-info"><span>编号：</span>{{nodeInfo.code}}</div>
            <div class="eval-quota-info"><span>题型：</span>{{nodeInfo.kindName}}</div>
            <div class="eval-quota-info"><span>评价类型：</span>{{nodeInfo.evalType}}</div>
            <div class="eval-quota-info"><span>评价说明：</span>{{nodeInfo.note}}</div>
        </van-panel>

        <!-- 单选 -->
        <div v-if='nodeInfo.kind == "0"'>
            <template v-if='quotaUserList.length > 0'>
                <van-panel v-for='(item,itemIndex) in quotaUserList' :key='item.id'>
                    <template #header>
                        <div class="eval-header">
                            <div class="fr" v-if='!item.uploadFlag && joinParams.isSaveFlag != "1"' @click='item.uploadFlag=true'>文件上传</div>
                            <span>{{item.displayName}}</span>
                        </div>
                    </template>

                    <van-checkbox class="eval-radio" v-model="con.selected" icon-size="24px" v-for='(con,conIndex) in item.contentList' :key='item.id+"_"+con.id' :disabled="joinParams.isSaveFlag == '1'" @click='changeRadio(item,con)'>{{con.content}} {{con.showScore}}分</van-checkbox>
                    <template v-if='item.uploadFlag' #footer>
                        <van-uploader
                        v-if='item.attName.length > 0'
                        :deletable="joinParams.isSaveFlag == '1' ? false : true"
                        :max-count="1"
                        :max-size="10000 * 1024"
                        @click.native='getUploadIndex(itemIndex)'
                        :before-delete='deleteFile'
                        v-model="item.filelist"
                        :after-read="afterRead"
                        :before-read="beforeRead"
                        @oversize="onOversize"/>

                        <van-uploader
                        v-else
                        :deletable="joinParams.isSaveFlag == '1' ? false : true"
                        :max-count="1"
                        :max-size="10000 * 1024"
                        @click.native='getUploadIndex(itemIndex)'
                        :before-delete='deleteFile'
                        :after-read="afterRead"
                        :before-read="beforeRead"
                        @oversize="onOversize"/>
                        <p class="f14 grey" v-if='item.attName != ""'>文件名称：{{item.attName}}</p>
                    </template>
                </van-panel>
            </template>
            <template v-else>
                <van-empty description="暂无数据"/>
            </template>
        </div>

        <!-- 多选 -->
        <div v-else>
            <template v-if='quotaUserList.length > 0'>
                <van-panel v-for='(item,itemIndex) in quotaUserList' :key='item.id'>
                    <template #header>
                        <div class="eval-header">
                            <div class="fr" v-if='!item.uploadFlag && joinParams.isSaveFlag != "1"' @click='item.uploadFlag=true'>文件上传</div>
                            <span>{{item.displayName}}</span>
                        </div>
                    </template>

                    <van-checkbox shape="square" class="eval-radio" v-model="con.selected" icon-size="24px" v-for='(con,conIndex) in item.contentList' :key='item.id+"_"+con.id' :disabled="joinParams.isSaveFlag == '1'" @click.native='changeCheckBox(item,con)'>{{con.content}} {{con.showScore}}分</van-checkbox>
                    <div class="error f14 ml10" v-if='item.scoreFlag'>{{item.scoreTips}}</div>
                    <template v-if='item.uploadFlag' #footer>
                        <van-uploader
                        v-if='item.attName.length > 0'
                        :deletable="joinParams.isSaveFlag == '1' ? false : true"
                        :max-count="1"
                        :max-size="10000 * 1024"
                        @click.native='getUploadIndex(itemIndex)'
                        :before-delete='deleteFile'
                        v-model="item.filelist"
                        :after-read="afterRead"
                        :before-read="beforeRead"
                        @oversize="onOversize"/>

                        <van-uploader
                        v-else
                        :deletable="joinParams.isSaveFlag == '1' ? false : true"
                        :max-count="1"
                        :max-size="10000 * 1024"
                        @click.native='getUploadIndex(itemIndex)'
                        :before-delete='deleteFile'
                        :after-read="afterRead"
                        :before-read="beforeRead"
                        @oversize="onOversize"/>
                        <p class="f14 grey" v-if='item.attName != ""'>文件名称：{{item.attName}}</p>
                    </template>
                </van-panel>
            </template>
            <template v-else>
                <van-empty description="暂无数据"/>
            </template>
        </div>
    </div>

    <!-- <van-tabbar v-model='footerKey' active-color='#455a64'>
        <van-tabbar-item class="frem1" @click.native="changeFooter(0)">上一个</van-tabbar-item>
        <van-tabbar-item class="frem1" @click.native="changeFooter(1)"  v-if="joinParams.isSaveFlag != '1' && quotaUserList.length > 0">保存({{(quoatIndex+1)+'/'+totalProcess}})</van-tabbar-item>
        <van-tabbar-item class="frem1" v-else>({{(quoatIndex+1)+'/'+totalProcess}})</van-tabbar-item>
        <van-tabbar-item class="frem1" @click.native="changeFooter(2)">下一个</van-tabbar-item>
    </van-tabbar> -->
    <div class='deal-footer' :class="{'footer-width':btnStyleFlag}">
        <span class="footer-btn" @click="changeFooter(0)" v-if="showPrevFlag">上一个</span>
        <span class="footer-btn footer-btn-save" @click="changeFooter(1)" v-if="joinParams.isSaveFlag != '1' && quotaUserList.length > 0">保存({{(quoatIndex+1)+'/'+totalProcess}})</span>
        <span class="footer-btn" v-else>({{(quoatIndex+1)+'/'+totalProcess}})</span>
        <span class="footer-btn" @click="changeFooter(2)" v-if='showNextFlag'>下一个</span>
    </div>

    <!-- 批量评价 -->
    <van-dialog v-model="modalFlag" title="批量评价" show-cancel-button @confirm='batchSave'>
        <!-- 单选 -->
        <template v-if='nodeInfo.kind == 0'>
            <van-radio-group class="eval-radio" v-model='batchId'>
                <van-radio class="mb15" :name='item.id' v-for='item in batchData' :key='item.id'>{{item.content}} ({{item.showScore}})分</van-radio>
            </van-radio-group>
        </template>
        <!-- 多选 -->
        <template v-else>
            <van-checkbox-group class="eval-radio" v-model='batchIdArr' @change='valBatchScore'>
                <van-checkbox shape="square" class="mb10" :name='item.id' v-for='item in batchData' :key='item.id'>{{item.content}} ({{item.showScore}})分</van-checkbox>
            </van-checkbox-group>
        </template>
    </van-dialog>
</div>
</template>

<script>
export default {
    mounted() {
        let that=this;
        that.path=sessionStorage.basePath;
        that.currentUserId=sessionStorage.currentUserId;
        that.joinParams=JSON.parse(sessionStorage.joinParams);
        that.joinData=JSON.parse(sessionStorage.joinData);
        that.nodeInfo=JSON.parse(sessionStorage.nodeInfo);
        that.allQuotaList=JSON.parse(sessionStorage.allQuotaList);
        that.$store.commit('setTitle',that.$route.meta.title);
        that.$store.commit('setArrowFlag',that.$route.meta.showArrow);
        if(that.joinParams.kind == '1'){//自评
            that.userId=sessionStorage.currentUserId;
        }
        // 根据当前指标id获取指标索引值
        that.allQuotaList.forEach((val,valIndex)=>{
            if(that.nodeInfo.id == val.id){
                that.quoatIndex=valIndex;
            }
        })
        if(that.quoatIndex == that.allQuotaList.length - 1){
            that.showNextFlag=false;
            that.btnStyleFlag=true;
        }
        if(that.quoatIndex == 0){
            that.btnStyleFlag=true;
            that.showPrevFlag=false;
        }
        that.initData();
    },
    data() {
        return {
            path:'',
            footerKey:1,
            btnStyleFlag:false,//底部按钮宽度样式
            showPrevFlag:true,
            showNextFlag:true,
            isEvalFlag:false,//是否已经评价了，评价后切换指标需要提示是否以保存
            modalFlag:false,
            batchOverstepFlag:false,//多选弹窗分值超过指标分值标识
            modalTitle:'批量评价',
            joinParams:{
                name:'',
                id:'',
                kind:'',
                isSaveFlag:''
            },
            currentUserId:'',
            userId:'',
            joinData:{},
            nodeInfo:{
                score:'',
                kind:'',
                kindName:'',
                note:'',
            },
            quotaUserList:[],//评价人员
            batchData:[],//保存批量评价标准项
            batchId:'',//批量评价-存储单选id
            batchIdArr:[],//批量评价-存储多选id
            uploadIndex:0,
            allQuotaList:[],
            quoatIndex:0,//当前指标
            totalProcess:0,//总指标数
        };
    },
    methods: {
        // 删除附件
        deleteFile(file,detail){
            let that=this;
            that.uploadIndex=file.index;
            that.quotaUserList[file.index].attId='';
            that.quotaUserList[file.index].attName='';
            that.quotaUserList[file.index].url='';
            that.quotaUserList[file.index].deleteAttId=that.quotaUserList[file.index].oldAttId;
            that.quotaUserList[file.index].filelist=[{
                content:'',
                url:'',
                status:'',
                message: '',
                index:file.index
            }]
        },
        beforeRead(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                this.$toast('请上传 jpg 格式图片');
                return false;
            }
            return true;
        },
        onOversize(file) {
            this.$toast('请上传小于10M的图片');
        },
        getUploadIndex(itemIndex){
            this.uploadIndex=itemIndex;
        },
        afterRead(file){
            let that = this;
            that.$toast.loading({
                duration:0,
                forbidClick: true,
                loadingType: 'spinner',
                overlay:false
            });

            let params={};
            params.base64String=file.content;
            params.sourceFileName=file.file.name;

            BaseAxios.post('/pe/evaluationResult!uplodaBase64Pic.action',params)
                .then((res) => {
                    that.$set(that.quotaUserList[that.uploadIndex],'attId',res.data.id);
                    that.$set(that.quotaUserList[that.uploadIndex].filelist[0],'index',that.uploadIndex);
                    that.$set(that.quotaUserList[that.uploadIndex],'attName',file.file.name);
                    that.$set(that.quotaUserList[that.uploadIndex].filelist[0],'content',file.content);
                    that.$toast.success('上传成功');
                })
                .catch((error) => {
                    that.$toast.error('上传失败');
                });
        },
        changeFooter(key){
            let that=this;
            that.footerKey=key;
            switch (key) {
                case 0:
                    that.quoatIndex--;
                    that.btnStyleFlag=false;
                    that.showNextFlag=true;
                    if(that.isEvalFlag && that.joinParams.isSaveFlag != '1'){
                        that.$dialog.confirm({
                            title: '提示',
                            message: '切换指标之前请先保存当前页面评价数据',
                            theme: 'round-button',
                            beforeClose,//异步关闭
                        })
                        function beforeClose(action, done) {
                            if (action === 'confirm') {
                                that.save(3);
                            }
                            done();
                        }
                    }else{
                        that.changeNodeInfoByIndex();
                    }
                break;
                case 1:
                    that.save();
                break;
                case 2:
                    that.quoatIndex++;
                    that.btnStyleFlag=false;
                    that.showPrevFlag=true;
                    if(that.isEvalFlag &&  that.joinParams.isSaveFlag != '1'){
                        that.$dialog.alert({
                            title: '提示',
                            message: '切换指标会自动保存当前的评价数据',
                            theme: 'round-button',
                        })
                        .then(() => {
                            that.save(2);
                        })
                    }else{
                        that.changeNodeInfoByIndex();
                    }
                break;
            }
        },
        changeNodeInfoByIndex(){
            let that=this;
            that.nodeInfo=that.allQuotaList[that.quoatIndex];
            that.nodeInfo.kind=that.joinData.extendMap[that.nodeInfo.id].kind;
            that.nodeInfo.kindName=that.joinData.extendMap[that.nodeInfo.id].kind == '0' ? '单选' : '多选';
            that.nodeInfo.note=that.joinData.extendMap[that.nodeInfo.id].note == '' ? '暂无说明' : that.joinData.extendMap[that.nodeInfo.id].note;
            switch (that.joinParams.kind) {
                case '1':
                    that.nodeInfo.evalType='自评';
                    break;
                case '2':
                    that.nodeInfo.evalType='群评';
                    break;
                case '4':
                    that.nodeInfo.evalType='领导评';
                    break;
            }
            if(that.joinData.contentMap[that.allQuotaList[that.quoatIndex].id] == undefined){
                that.quotaUserList=[];
            }else{
                that.initData();
            }
            that.toggleFooterBtn();
        },
        toggleFooterBtn(){
            let that=this;
            if(that.quoatIndex == 0){
                setTimeout(() => {
                    that.$toast('已经是第一个了');
                }, 500);
                that.btnStyleFlag=true;
                that.showPrevFlag=false;
            }
            if(that.quoatIndex == that.allQuotaList.length - 1){
                setTimeout(() => {
                    that.$toast('已经是最后一个了');
                }, 500);
                that.btnStyleFlag=true;
                that.showNextFlag=false;
            }
        },
        exchangeView(){//切换树和评价页面
            let that=this;
            if(that.isEvalFlag){
                that.$dialog.alert({
                    title: '提示',
                    message: '切换指标会自动保存当前的评价数据',
                    theme: 'round-button',
                })
                .then(() => {
                    that.save(1);
                })
            }else{
                that.$router.go(-1);
            }
        },
        initData(){
            let that=this;
            let nodeId=that.nodeInfo.id;

            // 构造人员数据,为批量评价功能备份数据
            if(that.joinData.contentMap[nodeId]){//判断当前指标有没有标准项
                that.joinData.users.forEach((val,valIndex)=>{
                    val.scoreFlag=false;
                    val.uploadFlag=false;//设置上传控件按钮是否显示
                    val.scoreTips='标准分值之和已经超过指标分值，请重新选择';
                    val.deleteAttId='';
                    val.oldAttId='';
                    val.attId='';
                    val.url='';
                    val.attName='';
                    val.kind=that.joinData.extendMap[nodeId].kind;
                    val.filelist=[{
                        url: '',
                        status: '',
                        message: '',
                        index:valIndex,
                        content:''
                    }]
                    that.joinData.contentMap[nodeId].forEach(val2=>{
                        that.$set(val2,'selected',false);
                    })
                    val.contentList=that.joinData.contentMap[nodeId];
                })
                
                that.quotaUserList=[];
                let tempUserList=JSON.parse(JSON.stringify(that.joinData.users));
                if(that.joinParams.kind != '1'){//非自评去掉自己
                    that.quotaUserList=tempUserList.filter(function(val) {
                        return val.id != sessionStorage.currentUserId;
                    });
                }else{
                    that.quotaUserList=tempUserList.filter(val=>{
                        return val.id == that.userId;
                    })
                }
                if(that.quotaUserList.length == 0){
                    that.$toast('暂无可评价人员');
                }
                that.batchData=[].concat(that.joinData.contentMap[nodeId]);//为批量评价功能备份数据
                that.batchId='';
                that.batchIdArr=[];
                that.totalProcess=that.allQuotaList.length;
                //回显数据
                that.getAnswer(nodeId,1);
            }
        },
        getAnswer(itemId,type){//获取后台回显数据 type:1 切换指标获取答案 2：保存之后回显数据 不显示loading动画
            let that = this;
            let params={};

            if(type == 1){
                that.$toast.loading({
                    duration:0,
                    forbidClick: true,
                    loadingType: 'spinner',
                    overlay:false
                });
            }

            params.activityId=that.joinParams.id;
            params.evaluatingUserId=that.currentUserId;
            params.kind=that.joinParams.kind;
            params.itemId=itemId;
            params.way=1;//评价方式 0按人评价 1按指标评价

            BaseAxios.post('/pe/evaluationResult!getUserEvaluationResult.action',params)
                .then((res) => {
                    if(res.data.length > 0){
                        let tempObj={};
                        res.data.forEach(val=>{
                            tempObj[val.userId]={};
                            tempObj[val.userId].ids=val.answers[0].contentIds == null ? '' : val.answers[0].contentIds.join(',');
                            if(val.answers[0].hasOwnProperty('attId')){
                                tempObj[val.userId].attId='-1';
                                tempObj[val.userId].oldAttId=val.answers[0].attId;
                                tempObj[val.userId].url=val.answers[0].url;
                                tempObj[val.userId].attName=val.answers[0].attName;
                            }else{
                                tempObj[val.userId].attId='';
                                tempObj[val.userId].url='';
                                tempObj[val.userId].attName='';
                                tempObj[val.userId].oldAttId='';
                            }
                            tempObj[val.userId].deleteAttId='';
                        })
                        that.quotaUserList.forEach((val,valIndex)=>{
                            if(tempObj.hasOwnProperty(val.id)){
                                let ids=tempObj[val.id].ids;
                                val.oldAttId=tempObj[val.id].oldAttId;
                                val.attId=tempObj[val.id].attId;
                                val.url=tempObj[val.id].url;
                                val.uploadFlag=val.url.length > 0 ? true : false;
                                val.attName=tempObj[val.id].attName;
                                //当文件是图片时显示预览图
                                let fileType=val.attName.replace(/.+\./, "");
                                if('png,jpg,jpeg'.indexOf(fileType) != -1){
                                    val.filelist=[{
                                        url:that.path+tempObj[val.id].url,
                                        isImage:true,
                                        status: '',
                                        message: '',
                                        index:valIndex,
                                        content:''
                                    }]
                                }else{
                                    val.filelist=[{
                                        url:'',
                                        status: '',
                                        message: '',
                                        index:valIndex,
                                        content:''
                                    }]
                                }
                                
                                val.contentList.forEach(val2=>{
                                    if(ids.indexOf(val2.id) != -1){
                                        that.$set(val2,'selected',true);
                                    }else{
                                        that.$set(val2,'selected',false);
                                    }
                                })
                            } else{
                                val.oldAttId='';
                                val.attId='';
                                val.uploadFlag=false;
                                val.url='';
                                val.attName='';
                                val.filelist=[{
                                    url:'',
                                    status:'',
                                    message:'',
                                    index:valIndex,
                                    content:''//用于删除备用
                                }]
                            }
                            val.deleteAttId='';
                        })
                    }
                    if(type == 1){
                        that.$toast.clear();
                    }
                })
                .catch((error) => {
                    that.$toast.fail('请求失败');
                    that.$toast.clear();
                });
        },
        changeCheckBox(item,info){//判断所选分值是否大于指标分值
            let that=this;
            let sum=0;
            setTimeout(() => {
                item.contentList.forEach(val=>{
                    if(val.selected){
                        sum+=+val.showScore;
                    }
                })
                if(sum > that.nodeInfo.score){
                    item.scoreFlag=true;
                }else{
                    item.scoreFlag=false;
                }
                that.isEvalFlag=true;
            }, 300);
        },
        changeRadio(item,info){//判断所选分值是否大于指标分值
            let that=this;
            let sum=0;
            item.contentList.forEach(val=>{
                val.selected=false;
            })
            info.selected=true;

            setTimeout(() => {
                item.contentList.forEach(val=>{
                    if(val.selected){
                        sum+=+val.showScore;
                    }
                })
                if(sum > that.nodeInfo.score){
                    item.scoreFlag=true;
                }else{
                    item.scoreFlag=false;
                }
                that.isEvalFlag=true;
            }, 300);
        },
        openModal(){
            this.modalFlag=true;
            this.batchIdArr=[];
            // this.modalTitle=this.nodeInfo.kind == 0 ? '批量评价(单选)' : '批量评价(多选)';
        },
        valBatchScore(ids){
            let that=this;
            let sum=0;
            let idsStr=ids.join(',');
            that.batchData.forEach(val=>{
                if(idsStr.indexOf(val.id) != -1){
                    sum+=Number(val.showScore);
                }
            })
            if(sum > Number(that.nodeInfo.score)){
                that.batchOverstepFlag=true;
                that.$toast('标准分值之和已经超过指标分值，请重新选择');
            }else{
                that.batchOverstepFlag=false;
            }
        },
        batchSave(){//批量评价保存-初始化数据
            let that=this;
            if(that.batchOverstepFlag){
                that.$toast('标准分值之和已经超过指标分值，请重新选择');
            }else{
                // 批量选中
                let idStr=that.nodeInfo.kind == '0' ? that.batchId : that.batchIdArr.join(',');
                that.quotaUserList.forEach(val=>{
                    val.scoreFlag=false;//还原状态
                    val.contentList.forEach(val2=>{
                        if(idStr.indexOf(val2.id) != -1){
                            that.$set(val2,'selected',true);
                        }else{
                            that.$set(val2,'selected',false);
                        }
                    })
                })
                that.modalFlag=false;
                that.isEvalFlag=true;
            }
        },
        doSave(type){
            let that = this;
            let num=0;
            let params = {};

            that.$toast.loading({
                duration:0,
                forbidClick: true,
                loadingType: 'spinner',
                overlay:false
            });

            params.activityId=that.joinParams.id;
            params.kind=that.joinParams.kind;

            if(that.nodeInfo.kind == '0'){//单选
                for(let i=0;i<that.quotaUserList.length;i++){
                    let temContentIds='';
                    let tempScore=0;
                    for(let j=0;j<that.quotaUserList[i].contentList.length;j++){
                        if(that.quotaUserList[i].contentList[j].selected) {
                            temContentIds=that.quotaUserList[i].contentList[j].id;
                            tempScore=that.quotaUserList[i].contentList[j].showScore;
                        }
                    }
                    params['dtos['+i+'].contentIds']=temContentIds;
                    params['dtos['+i+'].score']=tempScore;
                    params['dtos['+i+'].userId']=that.quotaUserList[i].id;
                    params['dtos['+i+'].itemId']=that.nodeInfo.id;
                    if(that.quotaUserList[i].attId.length > 2){
                        params['dtos['+i+'].attId']=that.quotaUserList[i].attId;
                    }
                    if(that.quotaUserList[i].deleteAttId.length > 0){
                        params['dtos['+i+'].deleteAttId']=that.quotaUserList[i].oldAttId;
                    }
                }
            }else{
                that.quotaUserList.forEach((val,index)=>{
                    let ids=[];
                    let sum=0;
                    val.contentList.forEach(val2=>{
                        if(val2.selected) {
                            ids.push(val2.id);
                            sum+=Number(val2.showScore);
                        }
                    })
                    params['dtos['+index+'].contentIds']=ids.join(',');
                    params['dtos['+index+'].score']=sum.toFixed(1);
                    params['dtos['+index+'].userId']=val.id;
                    params['dtos['+index+'].itemId']=that.nodeInfo.id;
                    if(val.attId.length > 2){
                        params['dtos['+index+'].attId']=val.attId;
                    }
                    if(val.deleteAttId.length > 0){
                        params['dtos['+index+'].deleteAttId']=val.deleteAttId;
                    }
                })
            }

            BaseAxios.post('/pe/evaluationResult!saveResult.action', params)
                .then((res) => {
                    that.joinData.process=res.data;//更新进度
                    that.$toast.success('操作成功');
                    
                    that.isEvalFlag=false;
                    that.nodeInfo.answered=true;
                    // 评价之后不保存 点击切换按钮的情况下提示用户保存，保存成功之后显示指标选择页面
                    if(type == 1){
                        that.$router.push({name:'showTree'});
                    }
                    setTimeout(() => {
                        // that.getAnswer(that.nodeInfo.id,2);//上传附件多次保存出错，保存后重新获取下答案
                        that.changeNodeInfoByIndex();
                        // that.toggleFooterBtn();
                    }, 500);
                })
                .catch((error) => {
                    that.$toast.fail('请求失败');
                });
        },
        save(type){//保存
            let that = this;
            let sumName='';
            let teacherName='';

            // 检测是否有未填写的项
            for(let i = 0;i < that.quotaUserList.length; i++){
                if(that.quotaUserList[i].scoreFlag){
                    sumName=that.quotaUserList[i].displayName;
                    break;
                }
            }
            if(sumName.length > 0){
                that.$toast(sumName+'老师标准分值之和已经超过指标分值，请重新选择');
                return false;
            }

            // 检测是否有未填写的项
            for(let i = 0;i < that.quotaUserList.length; i++){
                let isSelected=false;
                for(let j = 0;j < that.quotaUserList[i].contentList.length; j++){
                    if(that.quotaUserList[i].contentList[j].selected) {
                        isSelected=true;
                        break;
                    }
                }
                if(!isSelected){
                    teacherName=that.quotaUserList[i].displayName;
                    break;
                }  
            }

            if(teacherName.length > 0){
                setTimeout(() => {
                    that.$dialog.confirm({
                        title: '提示',
                        message: teacherName+'老师还没有评价，是否继续保存？',
                        theme: 'round-button',
                        beforeClose,//异步关闭
                    })
                    function beforeClose(action, done) {
                        done();
                        setTimeout(() => {
                            if (action === 'confirm') {
                                that.doSave(type);
                            }
                        }, 300);
                    }
                }, 300);
            }else{
                that.doSave(type);
            }
        }
    }
}
</script>