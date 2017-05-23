<template>
	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#menu" aria-expanded="false">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<router-link class="navbar-brand" :to="{path:'/'}">Brand</router-link>
			</div>
			<div class="collapse navbar-collapse" id="menu">
				<ul class="nav navbar-nav">
					<li v-for="item in navList" class="dropdown" v-if="hasPermission(item.permission)">
						<router-link :to="{path:item.path}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{item.name}} <span class="caret"></span></router-link>
						<ul v-if="item.children" class="dropdown-menu">
							<li v-for="citem in item.children" v-if="hasPermission(citem.permission)">
								<router-link :to="{path:citem.path}">{{citem.name}}</router-link>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
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
                        name:"bar",path:"/bar",permission:"custom",children:[{name:"bar-1",path:"/bar/profile",permission:"add"}, {name:"bar-2",path:"/bar/posts",permission:"custom"}]
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
	.nav [class$="active"]{ color: #ff8800 !important; background: #fff} /*class属性以active结尾*/
</style>