<template>
<div class="container">
	<h1>ok1 {{num}}</h1>
	<ok-inner></ok-inner>
</div>
</template>
<script>
	import okInner from "./okInner.vue";
    export default {
        data () {
            return {
                num:123
			}
        },
        components:{
            okInner:okInner
        }
    }
</script>