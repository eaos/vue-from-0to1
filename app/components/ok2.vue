<template>
<div class="container">
	<div  class="wrapper" id="wrapper" v-iscroll="{'param':scrollParam,'func':loadData}">
		<div class="scroller">
			<ul>
				<li v-for="item in lists">Pretty row {{item}}</li>
			</ul>
		</div>
		<div id="pullDown" class="pull-bar">
			<span class="pullDownIcon"></span><span class="pullDownLabel">下拉刷新...</span>
		</div>
		<div id="pullUp" class="pull-bar">
			<span class="pullUpIcon"></span><span class="pullUpLabel">上拉刷新...</span>
		</div>
	</div>
</div>
</template>
<script>
	import Vue from "vue";
    import iscroll from '../../src/directives/iscroll';
    Vue.use(iscroll);
    export default {
        data () {
            return {
                lists:[
                    0,1,2,3,4,5,6,7,8,9,10,11,12,13,0,1,2,3,4,5,6,7,8,9,10,11,12,13
				],
				page:1,
                scrollParam:{
                    //startY:-52,
                    probeType: 2,/*支持scroll*/
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: true,
                    click: true,
                    preventDefault: true,
                    tap: true,
                    //bounce: true,
                    disableTouch: false
				}
			}
        },
		methods:{
            loadData:function(f,flag){
                console.log(this.page++,flag);
               if(flag=="pullDown"){
                   this.lists.unshift(16);
			   }else{
                   this.lists.push(17);
			   }
                f();
			}
		}
    }
</script>
<style>
	.wrapper {
		position: absolute;
		z-index:1;
		top:52px;
		bottom: 52px;
		right: 0;
		left: 0;
		width: 100%;
		background: #ccc;
		overflow: hidden;
	}

	/*.flip-loading{ top: 52px;}*/

	.scroller {
		position: absolute;
		z-index:1;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		width: 100%;
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-text-size-adjust: none;
		-moz-text-size-adjust: none;
		-ms-text-size-adjust: none;
		-o-text-size-adjust: none;
		text-size-adjust: none;
	}

	.scroller ul {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
		text-align: left;
	}

	.scroller li {
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #fff;
		background-color: #fafafa;
		font-size: 14px;
	}

	.pull-bar{ height:52px; line-height: 52px; text-align: center; width: 100%;}
	#pullDown{ position: absolute; top:0; left: 0;}
	#pullDown.loading{ z-index:2;}

	#pullUp{ position: absolute; bottom:0; left: 0;}
	#pullUp.loading{ z-index:2;}
</style>