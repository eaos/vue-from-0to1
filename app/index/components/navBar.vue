<template>
	<ul class="nav">
		<li v-for="item in navList">
			<router-link :to="{ path:item.path,params:{ id:item.param }}">{{item.name}}</router-link>
			<ul v-if="item.children">
				<li v-for="citem in item.children">
					<router-link :to="{ path:citem.path,params:{ id:citem.param }}">{{citem.name}}</router-link>
				</li>
			</ul>
		</li>
	</ul>
</template>
<script>
    export default {
        data () {
            return {
                navList:[
                    {
                        name:"nav-1",param:"",path:"/foo",children:[{name:"nav-1-1",param:"1",path:"/foo/1"}, {name:"nav-1-2",param:"2",path:"/foo/2"}]
                    },
                    {
                        name:"nav-2",param:"",path:"/foo",children:[{name:"nav-2-1",param:"1",path:"/foo/1"}, {name:"nav-2-2",param:"2",path:"/foo/2"}]
                    }
                ]
            }
        }
    }
</script>
<style>
	.nav [class$="active"]{ color: #ff8800; } /*class属性以active结尾*/
</style>