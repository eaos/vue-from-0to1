<template>
<div class="container">
	<div  class="wrapper" id="wrapper" v-iscroll="{'param':scrollParam,'func':loadData}">
		<div class="scroller">
			<ul>
				<li v-for="item in lists">{{item}}</li>
			</ul>
		</div>
		<div id="pullDown" class="pull-bar">
			<span class="pullDownIcon"><i class="glyphicon glyphicon-arrow-down"></i></span><span class="pullDownLabel">下拉刷新</span>
		</div>
		<div id="pullUp" class="pull-bar">
			<span class="pullUpIcon"></span><span class="pullUpLabel">上拉刷新</span>
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
				pullDownPage:1,
                pullUpPage:1,
                scrollParam:{
                    //startY:-52,
                    probeType: 2,/*支持scroll*/
                    mouseWheel: true,
                    scrollbars: true,
                    fadeScrollbars: true,
                    click: true,
                    preventDefault: true,
                    tap: true,
                    bounce: true,
                    disableTouch: false
				}
			}
        },
		beforeRouteEnter:function(to,from,next){
            /*数据请求完成之后再跳转页面的处理*/
            console.log(Promise);/*ES6自带promise*/
			/*promise实现多个接口数据请求完成之后，同时取数据*/
            Promise.all([Vue.http.get("/api/options.json"),Vue.http.get("/api/options2.json")]).then(
                function(res){
                    console.log(res);
                    /*跳转下一页*/
                    next(vm=>{
                        vm.lists.unshift(res[0].data.result.data[1]["title"]);
					})
				},
				function(error){
                    console.log(error);
                    alert("数据失败不能进入页面！");
				}
			);
		},
        created(){
            /*this.loadData(function(txt){
                console.log(txt);
			});*/
		},
		methods:{
            loadData:function(callback,flag){
                var _this = this;
				/*开发环境实际上是src目录下的options.json,服务器express使用的虚拟目录static,开放文件夹访问，跟打包之后的静态文件目录保持一致，static又可以映射到api上面，跟线上接口地址保持一直*/
                _this.$http.get("/api/options.json").then(function(res){
                    console.info(res);
                    if(flag=="pullDown"){
                        console.log(_this.pullDownPage++);
                        _this.lists.unshift(_this.pullDownPage+res.data.result.data[1]["title"]);
                    }else if(flag=="pullUp"){
                        console.log(_this.pullUpPage++);
                        _this.lists.push(flag+_this.pullUpPage);
                    }else{
                        _this.lists.unshift(res.data.result.data[0]["title"]);
					}
                    if(typeof callback == "function"){
                        callback("数据请求完成");
					}
                },function(res){
                    console.log("页面数据拉取失败");
                });
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
		transition:transform 2s cubic-bezier(0.1, 0.57, 0.1, 1);
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
		overflow: hidden;
	}

	.pullDownIcon{ transition:transform 1s ease 0s; display:block; height: 20px; width: 20px; text-align: center; line-height: 20px; width: 100%;}
	.flip .pullDownIcon{
		transform:rotate(180deg);
	}

	/*.scroll-loading{
		transform:translate(0px, 52px) translateZ(0px) !important;
	}*/

	.pull-bar{ height:42px; text-align: center; width: 100%; padding-top: 10px;}
	#pullDown{ position: absolute; top:0; left: 0;}
	#pullDown.loading{ z-index:2;}
	#pullUp{ position: absolute; bottom:0; left: 0;}
	#pullUp.loading{ z-index:2;}
</style>