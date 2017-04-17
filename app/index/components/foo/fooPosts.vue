<template>
<div>
	<form id="form" v-valid="{'fun':submit,'data':list}" >
		<p><input type="text" id="mobile" name="mobile" v-model="info.num" datatype="n2-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "></p>
		<p><input type="text" v-model="info.em" datatype="e" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "></p>
		<p>验证，单选需要value和name</p>
		<p><input type="radio" value="1" name="sex" v-model="info.picked" datatype="*1-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "><label>One</label></p>
		<p><input type="radio" value="2" name="sex" v-model="info.picked" datatype="*1-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "><label>Two</label></p>
		<p><span>Picked: {{ info.picked }}</span></p>
		<p>验证，复选框不需要value,需要name</p>
		<p><input type="checkbox" name="checks" v-model="info.check.color" datatype="*1-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "><label>One</label></p>
		<p><input type="checkbox" name="checks" v-model="info.check.font" datatype="*1-20" nullmsg="请填写姓名！" errormsg="姓名格式不对！" sucmsg=" "><label>Two</label></p>
		<p><span>Picked: {{ info.check }}</span></p>
		<button type="submit">提交</button>
	</form>
	{{info.num}}
</div>
</template>
<script>
    import Vue from 'vue';
    import validForm from '../../../../src/validform.min';
    import valid from '../../../../src/directives/validform';
    Vue.directive('valid',valid);
    //console.log(valid);
    //console.log(jQuery);
    //console.log(validForm);
    export default {
        data () {
            return {
				info:{
                    num:1,
                    em:"111@qq.com",
                    picked:"",
					check:{
                        color:"",
						font:""
					}
				},
				list:[]
            }
        },
        beforeRouteEnter:function(to,from,next){
            console.log("beforeRouteEnter",this);
            next(vm=>{/*this不能访问实例对象，只能通过next的vm*/
                console.log(vm);
                vm.info.num = 2333;
            });
        },
        created:function(){//created||beforeRouteEnter 一般在这里进行页面载入之前预加载数据
		 console.log("created",this.info);
            $.ajax({
                url:"post",
                type:"POST",
                dataType:"json",
                data:'{"code":"GetScore","msg":"","id":"123"}',
                success:function(data){

                },
                error:function(){
                    console.log("error");
                    alert("页面数据拉取失败");
                    //_this.list = ["123"];
                }
            });
		},
        mounted () {/*以前的ready*/
          console.log("mounted",this);
			/*  var _this = this;
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