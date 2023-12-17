<!-- 
	@Author: zhouchanghong
	@Date: 2020-03-20 16:32:29
	@Email: 68zch@163.com
-->
<style>
	.error-page{position: absolute;left:0;top:0;right:0;bottom:0; background: #332f63;padding-top:45%;}
	.error-text{
	  text-align: center;
	  margin: 40px 15px;
	  color:#8c8aa7;
	  font-size: 1rem;
	  line-height: 30px;
	}
	.zoom-area { 
	  max-width: 490px;
	  margin: 30px auto 30px;
	  font-size: 19px;
	  text-align: center;
	}
	.link-container {
	  text-align: center;
	}
	a.more-link {
	  text-transform: uppercase;
	  font-size: 13px;
	    background-color: #92a4ad;
	    padding: 10px 15px;
	    border-radius: 0;
	    color: #416475;
	    display: inline-block;
	    margin-right: 5px;
	    margin-bottom: 5px;
	    line-height: 1.5;
	    text-decoration: none;
	  margin-top: 50px;
	  letter-spacing: 1px;
	}
	.error-container {
	  text-align: center;
	  font-size: 5rem;
	  font-family: 'Catamaran', sans-serif;
	  font-weight: 800;
	  margin: 20px 15px;
	}
	.error-container > span {
	  display: inline-block;
	  line-height: 0.7;
	  position: relative;
	  color: #FFB485;
	}
	.error-container > span {
	  display: inline-block;
	  position: relative;
	  vertical-align: middle;
	}
	.error-container > span:nth-of-type(1) {
	  color: #D1F2A5;
	  animation: colordancing 4s infinite;
	}
	.error-container > span:nth-of-type(3) {
	  color: #F56991;
	  animation: colordancing2 4s infinite;
	}
	.error-container > span:nth-of-type(2) {
	  width: 90px;
	  height: 90px;
	  border-radius: 999px;
	}
	.error-container > span:nth-of-type(2):before,
	.error-container > span:nth-of-type(2):after {
		border-radius: 0%;
		content:"";
		position: absolute;
		top: 0; left: 0;
		width: inherit; height: inherit;
	  border-radius: 999px;
		box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
					inset 0 30px 0 rgba(239, 250, 180, 0.4),
					inset -30px 0 0 rgba(255, 196, 140, 0.4),	
					inset 0 -30px 0 rgba(245, 105, 145, 0.4);
	  animation: shadowsdancing 4s infinite;
	}
	.error-container > span:nth-of-type(2):before {
		-webkit-transform: rotate(45deg);
		   -moz-transform: rotate(45deg);
				transform: rotate(45deg);
	}

	.screen-reader-text {
	    position: absolute;
	    top: -9999em;
	    left: -9999em;
	}
	@keyframes shadowsdancing {
	  0% {
	    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
					inset 0 30px 0 rgba(239, 250, 180, 0.4),
					inset -30px 0 0 rgba(255, 196, 140, 0.4),	
					inset 0 -30px 0 rgba(245, 105, 145, 0.4);
	  }
	  25% {
	    box-shadow: inset 30px 0 0 rgba(245, 105, 145, 0.4),
					inset 0 30px 0 rgba(209, 242, 165, 0.4),
					inset -30px 0 0 rgba(239, 250, 180, 0.4),	
					inset 0 -30px 0 rgba(255, 196, 140, 0.4);
	  }
	  50% {
	     box-shadow: inset 30px 0 0 rgba(255, 196, 140, 0.4),
					inset 0 30px 0 rgba(245, 105, 145, 0.4),
					inset -30px 0 0 rgba(209, 242, 165, 0.4),	
					inset 0 -30px 0 rgba(239, 250, 180, 0.4);
	  }
	  75% {
	   box-shadow: inset 30px 0 0 rgba(239, 250, 180, 0.4),
					inset 0 30px 0 rgba(255, 196, 140, 0.4),
					inset -30px 0 0 rgba(245, 105, 145, 0.4),	
					inset 0 -30px 0 rgba(209, 242, 165, 0.4);
	  }
	  100% {
	    box-shadow: inset 30px 0 0 rgba(209, 242, 165, 0.4),
					inset 0 30px 0 rgba(239, 250, 180, 0.4),
					inset -30px 0 0 rgba(255, 196, 140, 0.4),	
					inset 0 -30px 0 rgba(245, 105, 145, 0.4);
	  }
	}
	@keyframes colordancing {
	  0% {
	    color: #D1F2A5;
	  }
	  25% {
	    color: #F56991;
	  }
	  50% {
	    color: #FFC48C;
	  }
	  75% {
	    color: #EFFAB4;
	  }
	  100% {
	    color: #D1F2A5;
	  }
	}
	@keyframes colordancing2 {
	  0% {
	    color: #FFC48C;
	  }
	  25% {
	    color: #EFFAB4;
	  }
	  50% {
	    color: #D1F2A5;
	  }
	  75% {
	    color: #F56991;
	  }
	  100% {
	    color: #FFC48C;
	  }
	}
</style>
<template>
	<div class='error-page'>
		<section class="error-container">
			<span>4</span>
			<span><span class="screen-reader-text">0</span></span>
			<span>1</span>
		</section>
		<div class='error-text'>
			<div>抱歉，您没有权限访问该页面</div>
			<div>Sorry, you don't have permission to access this page!</div>
		</div>
	</div>
</template>
<script>
export default {
	mounted(){
		
	},
    data(){
        return {
            
        };
    },
    methods:{

    }
};
</script>