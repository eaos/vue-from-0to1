<template>
<div>
	<div v-for="item in list">
		{{item.name}} <button v-on:click="deleteItem(item)">删除</button>
	</div>
	<v-select v-model="selected" :options="['foo','bar']"></v-select>
</div>
</template>
<script>
    export default {
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