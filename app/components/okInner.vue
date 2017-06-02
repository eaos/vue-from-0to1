<template>
<div class="container">
	<h1>okInner 8989fdsgdf</h1>
	<form id="form">
		<p><input type="text" id="mobile" name="mobile"></p>
		<button type="submit">提交</button>
	</form>
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