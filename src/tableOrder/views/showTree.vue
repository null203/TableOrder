<template>
<div class="tree-wrap">
    <vue-tree :treeData='treeData' ref='vtree' @clickNode ='getNodes'></vue-tree>
</div>
</template>

<script>
export default {
    mounted() {
        let that=this;
        that.$store.commit('setTitle',that.$route.meta.title);
        that.$store.commit('setArrowFlag',that.$route.meta.showArrow);
        that.joinParams=JSON.parse(sessionStorage.joinParams);
        that.getTree();
    },
    data() {
        return {
            joinParams:{
                name:'',
                id:'',
                kind:'',
                isSaveFlag:''
            },
            treeData:[],
            joinData:{},
            allQuotaList:[]
        };
    },
    methods: {
        initTree(arr){//递归初始化标准树
            let that=this;
            arr.forEach(val=>{
                if(val.hasOwnProperty('children')){
                    that.initTree(val.children);
                }
                if(val.hasOwnProperty('answered')){
                    that.allQuotaList.push(val);
                    if(val.answered){
                        val.icon='file';
                    }
                    if(that.joinData.contentMap[val.id] != undefined){

                    }
                }
                val.text=val.title;
                delete val.title
            })
        },
        /* initTree2(arr){//过滤没有评价标准的四级指标
            let that=this;
            if(arr&&arr.length){
                return arr.filter(v=>{
                    if(v.children){
                        v.children = that.initTree2(v.children);
                        if(v.children == null || v.children.length == 0) return false
                    }else if(that.joinData.contentMap[v.id] == undefined){
                        return false
                    }
                    v.text=v.title;
                    if(v.hasOwnProperty('answered')){
                        if(v.answered){
                            v.icon='file';//已评价过得显示绿色按钮图标
                        }
                        that.allQuotaList.push(v);//将所有四级指标取出放到一个数组里
                    }
                    return true
                })
            }
            return arr
        }, */
        getTree(){
            let that=this;
            that.$toast.loading({
                duration:0,
                forbidClick: true,
                loadingType: 'spinner',
                overlay:false
            });

            let params={};
            params.id=that.joinParams.id;
            params.evaluatingUserId=sessionStorage.currentUserId;
            params.kind=that.joinParams.kind;

            BaseAxios.post('/pe/evaluationResult!initEvaluating.action',params)
                .then((res) => {
                    that.$toast.clear();
                    that.joinData=res.data;
                    that.initTree(res.data.tree);
                    that.treeData=[].concat(res.data.tree);
                })
                .catch((error) => {
                    that.$toast('获取指标树失败');
                });
        },
        getNodes(node){
            let that=this;
            if(node.hasOwnProperty('children')){
                that.$toast('请选择四级指标！');
                return false;
            }
            if(that.joinData.contentMap[node.id] == undefined){
                that.$toast('当前指标没有设置标准,不可评价！');
                return false;
            }
            // 用户显示所点击指标的信息
            let nodeInfo={};
            nodeInfo=node;
            switch (that.joinParams.kind) {
                case '1':
                    nodeInfo.evalType='自评';
                    break;
                case '2':
                    nodeInfo.evalType='群评';
                    break;
                case '4':
                    nodeInfo.evalType='领导评';
                    break;
            }
            nodeInfo.kind=that.joinData.extendMap[node.id].kind;
            nodeInfo.kindName=that.joinData.extendMap[node.id].kind == '0' ? '单选' : '多选';
            nodeInfo.note=that.joinData.extendMap[node.id].note == '' ? '暂无说明' : that.joinData.extendMap[node.id].note;
            sessionStorage.nodeInfo=JSON.stringify(nodeInfo);
            sessionStorage.joinData=JSON.stringify(that.joinData);
            sessionStorage.allQuotaList=JSON.stringify(that.allQuotaList);
            that.$router.push({
                name:'evaluate'
            })
        }
    }
}
</script>