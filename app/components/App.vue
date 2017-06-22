<template>
<div class="container">
	<h2 class="text-center">欢迎界面88887687987987888</h2>
	<h3>父组件里面的text:<input type="text" v-model="text">{{text}}</h3>
	<fav-list v-bind:mm="text" v-on:mchange="mchangeFromChild"></fav-list>
	<a @click="changePermission()" class="btn btn-primary">权限添加</a>
	<ul class="tree">
		<tree v-for="item in info.list" v-bind:model="item" v-bind:key="item.onlyId"></tree>
	</ul>
	<div class="box-center-v" style="height: 100px; width:200px; border: 1px solid #ddd;">
		<span>center</span>
	</div>
	<router-link to="/ok1" class="btn btn-block btn-default">Go to Ok1</router-link>
	<router-link to="/ok2" class="btn btn-block btn-default">Go to Ok1</router-link>
</div>
</template>
<script>
	import '../../src/assets/sass/style.scss'
	import favList from  "./Favlist";
    import tree from  "./tree";
    export default {
        data () {
            console.log(this,this.permission);
            return {
                num:1,
				selected:"foo",
				list:[{name:"Jack"},{name:"Kate"},{name:"Jim"}],
				text:"Hello world!",/*子组件接收到的数据不能跟父组件双向绑定*/
                info:{"list":[{"onlyId":"patientManage","name":"患者库","item":[{"onlyId":"patientAccount","name":"患者管理","item":[{"onlyId":"editPatient","name":"修改患者资料","item":null,"checked":true},{"onlyId":"addPatient","name":"增加患者","item":null,"checked":true},{"onlyId":"deletePatient","name":"删除患者","item":null,"checked":true},{"onlyId":"viewPatient","name":"查看患者资料","item":null,"checked":true}],"checked":true}],"checked":true}]}
            }
        },
		methods:{
            changePermission:function(){
                this.permission.push("add");
                console.log(this.permission);
                window.sessionStorage.setItem("permission",this.permission);
            },
            mchangeFromChild(v){
                this.text = v;
			}
		},
		components:{
            favList,
            tree
		}
    }
</script>
<style>
	.container{ background: #f5f5f5;}
	.container ul{ color: #999; background: #f5f5f5;}
</style>