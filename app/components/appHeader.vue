<template>
<div class="header">
	<nav-bar></nav-bar>
</div>
</template>
<script>
    import navBar from './navBar'
    export default {
        props:["pms"],/*从其他页面(父级组建)通过别名pms传递过来的数据*/
        data () {
            //console.log(this);
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