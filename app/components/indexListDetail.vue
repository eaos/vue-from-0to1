<template>
	<div class="container">
		<h4>{{info.title}}</h4>
		<div class="containerDetail">
			<p>{{info.content}}</p>
		</div>
	</div>
</template>
<script>
	import Vue from "vue";
    export default {
        data () {
            return {
                info:{}
            }
        },
        beforeRouteEnter:function(to,from,next){
			/*数据请求完成之后再跳转页面的处理*/
            /*ES6自带promise*/
			/*promise实现多个接口数据请求完成之后，同时取数据*/
            //console.log(to);
            Promise.all([Vue.http.get("./api/detail?id="+to.params.id)]).then(
                function(res){
					/*请求成功之后跳转下一页*/
                    next(vm=>{
                        vm.info = res[0].data.info;
                    })
                },
                function(error){
                    console.log(error);
                    alert("数据失败不能进入页面！");
                }
            );
        },
        created:function(){},
        methods:{}
    }
</script>