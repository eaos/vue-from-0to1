<template>
<div class="header">
	<nav-bar v-bind:pmst="permission"></nav-bar>
</div>
</template>
<script>
    import '../../src/assets/css/bootstrap.css'
    import navBar from './navBar'
    export default {
        props:["pms"],
        data () {
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