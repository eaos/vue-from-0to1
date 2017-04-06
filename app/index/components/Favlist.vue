<template>
<div>
	<div v-for="n in [0,1,2]">ttt</div>
	<v-select v-model="selected" :options="['foo','bar']"></v-select>
</div>
</template>
<script>
    export default {
        data () {
            return {
                msg: 'Hello World!',
				selected:"foo"
            }
        }
    }
</script>
<style>
    html{
        background: #fff;
    }
</style>