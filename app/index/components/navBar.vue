<template>
	<ul class="nav">
		<li v-for="item in navList">
			<router-link :to="{path:item.path}">{{item.name}}</router-link>
			<ul v-if="item.children">
				<li v-for="citem in item.children">
					<router-link :to="{path:citem.path}">{{citem.name}}</router-link>
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
                        name:"foo",path:"/foo",children:[{name:"foo-1",path:"/foo/profile"}, {name:"foo-2",path:"/foo/posts"}]
                    },
                    {
                        name:"bar",path:"/bar",children:[{name:"bar-1",path:"/bar/profile"}, {name:"bar-2",path:"/bar/posts"}]
                    }
                ]
            }
        }
    }
</script>
<style>
	.nav [class$="active"]{ color: #ff8800; } /*class属性以active结尾*/
</style>