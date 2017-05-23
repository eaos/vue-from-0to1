<template>
<div class="header">
	<nav-bar v-bind:pmst="permission"></nav-bar>
</div>
</template>
<script>
    import '../../src/assets/css/bootstrap.css'
    import navBar from './navBar'
    export default {
        props:["pms"],/*从其他页面(父级组建)通过别名pms传递过来的数据*/
        data () {
            console.log(this);
            return {
                permission:this.pms
			}
        },
		methods:{},
        components:{
            navBar
        }
    }
</script>
<style>
	.header{margin-bottom: 10px;}
</style>