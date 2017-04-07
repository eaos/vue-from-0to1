<template>
<div>
	<div v-for="item in list">{{item.name}}</div>
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
        }
    }
</script>
<style>
    html{
        background: #fff;
    }
</style>