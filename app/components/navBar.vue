<template>
	<ul class="nav">
		<li v-for="item in navList" v-if="hasPermission(item.permission)">
			<router-link :to="{path:item.path}">{{item.name}}</router-link>
			<ul v-if="item.children">
				<li v-for="citem in item.children" v-if="hasPermission(citem.permission)">
					<router-link :to="{path:citem.path}">{{citem.name}}</router-link>
				</li>
			</ul>
		</li>
		<!--<button v-permission="['delete',permission]">无权限</button>
		<button v-permission="['edit',permission]">有编辑权限</button>-->
	</ul>
</template>
<script>
    //import permission from '../../../src/directives/permission';
    export default {
        props:['pmst'],
        data () {
            return {
                navList:[
                    {
                        name:"foo",path:"/foo",permission:"custom",children:[{name:"foo-1",path:"/foo/profile",permission:"add"}, {name:"foo-2",path:"/foo/posts",permission:"custom"}]
                    },
                    {
                        name:"bar",path:"/bar",permission:"custom",children:[{name:"bar-1",path:"/bar/profile",permission:"custom"}, {name:"bar-2",path:"/bar/posts",permission:"add"}]
                    }
                ],
                permission:this.pmst
            }
        },
		methods:{
            hasPermission:function(c){
                if(this.permission.indexOf(c)>-1){
                    return true;
                }else{
                    return false;
                }
            }
		}
    }
</script>
<style>
	.nav [class$="active"]{ color: #ff8800; } /*class属性以active结尾*/
</style>