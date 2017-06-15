<template>
<div class="container">
	<h3>ok22222</h3>
	<div  class="wrapper" v-iscroll >
		<div class="scroller">
			<div id="pullDown">
				<span class="pullDownIcon"></span><span class="pullDownLabel">Pull down to refresh...</span>
			</div>
			<ul>
				<li v-for="item in lists">Pretty row {{item}}</li>
			</ul>
			<div id="pullUp">
				<span class="pullUpIcon"></span><span class="pullUpLabel">Pull up to refresh...</span>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	import Vue from "vue";
    import iscroll from '../../src/directives/iscroll';
    Vue.use(iscroll,{
        probeType: 2,/*支持scroll*/
        mouseWheel: true,
        scrollbars: true,
        fadeScrollbars: true,
        click: true,
        preventDefault: true,
        tap: true,
        bounce: true,
        disableTouch: true
    });
    export default {
        data () {
            return {
                lists:[
                    0,1,2,3,4,5,6,7,8,9,10,11,12,13,0,1,2,3,4,5,6,7,8,9,10,11,12,13
				]
			}
        }
    }
</script>
<style>
	.wrapper {
		position: absolute;
		z-index: 1;
		top: 52px;
		bottom: 52px;
		left: 0;
		width: 100%;
		background: #ccc;
		overflow: hidden;
	}

	.scroller {
		position: absolute;
		z-index: 1;
		-webkit-tap-highlight-color: rgba(0,0,0,0);
		width: 100%;
		-webkit-transform: translateZ(0);
		-moz-transform: translateZ(0);
		-ms-transform: translateZ(0);
		-o-transform: translateZ(0);
		transform: translateZ(0);
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		-webkit-text-size-adjust: none;
		-moz-text-size-adjust: none;
		-ms-text-size-adjust: none;
		-o-text-size-adjust: none;
		text-size-adjust: none;
	}

	.scroller ul {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
		text-align: left;
	}

	.scroller li {
		padding: 0 10px;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #ccc;
		border-top: 1px solid #fff;
		background-color: #fafafa;
		font-size: 14px;
	}
</style>