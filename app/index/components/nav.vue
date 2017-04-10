<template>
<div>
	<div v-for="item in list">
		{{item.name}} <button v-on:click="deleteItem(item)">删除</button>
	</div>
	<router-link to="/foo">Go to Foo</router-link>
	<router-link to="/bar">Go to Bar</router-link>
	<v-select v-model="selected" :options="['foo','bar']"></v-select>
	{{mm}}
</div>
</template>
<script>
    export default {
        props:["mm"],
        data () {
            return {
                msg: 'Hello World!',
				selected:"foo",
				list:[{name:"Jack"},{name:"Kate"},{name:"Jim"}]
            }
        },
		methods:{
            deleteItem:function(item){
                this.list.splice(this.list.indexOf(item),1);
			}
		}
    }
</script>
<style>
    html{
        background: #fff;
    }
</style>