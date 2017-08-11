<template>
	<div class="container">
		<div  class="wrapper" id="wrapper" v-iscroll="{'param':scrollParam,'func':loadData}">
			<div class="scroller">
				<div class="list-group" style="padding: 10px;">
					<router-link :to="{name:'listDetail',params:{id:item.id}}" class="list-group-item" v-for="(item,idx) in lists" :key="idx">{{item.title}} Cras justo odio</router-link>
				</div>
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
    import '../../src/assets/sass/style.scss';
    import iscroll from '../../src/directives/iscroll';
    Vue.use(iscroll);
    export default {
        data () {
            return {
                lists:[],
                pullUpPage:2,
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
            Promise.all([Vue.http.post("./api/lists",{"code":"getList","page":1})]).then(
                function(res){
                    console.log(res);
					/*跳转下一页*/
                    next(vm=>{
                        vm.lists = res[0].data.list;
                    })
                },
                function(error){
                    console.log(error);
                    alert("数据加载失败！");
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

                if(flag=="pullDown"){
                    _this.$http.post("./api/lists",{"code":"getList","page":1}).then(function(res){
						_this.lists =  res.data.list;
                        if(typeof callback == "function"){
                            callback("数据请求完成");
                        }
                    },function(res){
                        console.log("页面数据拉取失败");
                    });
                }else if(flag=="pullUp"){
                    _this.$http.post("./api/lists",{"code":"getList","page":_this.pullUpPage}).then(function(res){
                        _this.pullUpPage++;
						_this.lists =  _this.lists.concat(res.data.list);
                        if(typeof callback == "function"){
                            callback("数据请求完成");
                        }
                    },function(res){
                        console.log("页面数据拉取失败");
                    });
                }

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

	.pull-bar{ height:42px; text-align: center; width: 100%; padding-top: 10px; display: none;}
	#pullDown{ position: absolute; top:0; left: 0;}
	#pullDown.loading{ z-index:2;}
	#pullUp{ position: absolute; bottom:0; left: 0;}
	#pullUp.loading{ z-index:2;}
</style>