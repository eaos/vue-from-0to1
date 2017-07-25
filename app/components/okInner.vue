<template>
<div class="container">
	<slot name="soltName"></slot>
	<h1>okInner 8989fdsgdf</h1>
	<form id="form">
		<p><input type="text" id="mobile" name="mobile"></p>
		<button type="submit">提交</button>
	</form>
	<slot name="slot2"></slot>
</div>
</template>
<script>
    import Vue from "vue";
    import valid from '../../src/directives/validform';
    Vue.directive('valid',valid);
    export default {
        data () {
            return {

			}
        }
    }
</script>