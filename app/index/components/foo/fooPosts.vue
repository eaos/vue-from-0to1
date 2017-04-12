<template>
<div>
	<form id="form">
		<p><input type="text" v-model="num" datatype="n2-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "></p>
		<p><input type="text" v-model="num" datatype="e" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "></p>
		<button type="submit">提交</button>
	</form>
	{{num}}
</div>
</template>
<script>
    import validForm from '../../../../src/validform.min';
    //console.log(jQuery);
    //console.log(validForm);
    export default {
        data () {
            return {
                num:1
            }
        },
        mounted () {/*以前的ready*/
            console.log($);
            var demo = $("#form").Validform({
                tiptype:"3",
                showAllError:true,
                callback:function(){},
                ajaxurl:{
                    success:function(data,obj){
                        //console.log(data);
                    }
                }
            });

        }
    }
</script>
<style>
    html{
        background: #fff;
    }
</style>