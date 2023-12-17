<!-- 
	@Author: zhouchanghong
	@Date: 2020-04-15 14:49:24
	@Email: 68zch@163.com
	打分组件
-->
<style>
.qs-rate{display: inline-block;padding:4px;overflow:hidden;}
.qs-rate > span{float: left; width: 36px;height:32px; line-height:32px;text-align: center;border:1px solid #eee;border-right:0;}
.qs-rate > span:nth-child(5){border:1px solid #eee;}
.qs-rate > span.qs-on{color:#fff;}
.qs-rate span:nth-child(1).qs-on{background: rgb(138, 198, 245)}
.qs-rate span:nth-child(2).qs-on{background: rgb(112, 186, 246)}
.qs-rate span:nth-child(3).qs-on{background: rgb(81, 170, 245)}
.qs-rate span:nth-child(4).qs-on{background: rgb(54, 158, 242)}
.qs-rate span:nth-child(5).qs-on{background: rgb(35, 153, 250)}
.qs-rate i{float:left;font-style: normal;margin-left: 5px;margin-top: 6px;}
</style>
<template>
	<div class='qs-rate'>
		<span v-for='(item,index) in arr' :class="{'qs-on':index <= scoreIndex}" @click='getScore(item,index)'>{{item}}</span> 
		<i class='warning' v-if=" score== '' ">分</i>
		<i class='warning' v-else>{{score}}分</i>
	</div>
</template>
<script>
export default {
	mounted(){
		let that=this;
		that.arr=[].concat(that.scoreStr.split(','));
		that.score=that.value==''?'-1':that.value;
		that.arr.forEach((val,index)=>{//样式回显
			if(that.value == val){
				that.scoreIndex=index;
			}
		})
	},
	props:{
	    scoreStr:{//外部传入的已经格式化好的tree数据
	        type:String,
	        require:true,
	        default:function(){
	            return []
	        }
	    },
	    value: {
	        type:String,
	        default: '-1'
	    },
	},
    data(){
        return {
        	scoreIndex:-1,
        	arr:[],
            score:'-1',
        };
    },
    watch:{
        score(val){
            this.$emit('input',val);
            this.$emit('on-change',val);
        },
    },
    methods:{
    	getScore(item,index){
    		if(this.scoreIndex == index){
    			this.scoreIndex=-1;
    			this.score='';
    		}else{
	    		this.score=item;
	    		this.scoreIndex=index;
    		}
    	}
    }
};
</script>