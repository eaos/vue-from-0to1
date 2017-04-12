<template>
<div>
	<form id="form" v-valid="{'fun':submit,'data':list}" >
		<p><input type="text" v-model="num" datatype="n2-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "></p>
		<p><input type="text" v-model="em" datatype="e" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "></p>
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
                num:1,
				em:"111@qq.com",
				list:[]
            }
        },
        mounted () {/*以前的ready*/
           /* console.log($);
            var _this = this;
            var demo = $("#form").Validform({
                tiptype:"4",
                //ajaxPost:true,
                showAllError:true,
                callback:function(){
                    _this.submit();
                    return false;
				},
                ajaxurl:{
                    success:function(data,obj){
                        //console.log(data);
                    }
                }
            });*/
        },
		methods:{
            submit(el){
                console.log("submit");
                console.log(el);
                var _this = this;
                $.ajax({
                    url:"post",
                    type:"POST",
                    dataType:"json",
                    data:'{"code":"GetScore","msg":"","id":"123"}',
                    success:function(data){

					},
					error:function(){
                        console.log("error");
                        _this.list = ["123"];
					}
                });
			}
		}
    }
</script>
<style>
    html{
        background: #fff;
    }
</style>