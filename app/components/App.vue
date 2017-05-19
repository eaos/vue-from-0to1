<template>
<div>
	APP
</div>
</template>
<script>
    export default {
        props:["mm","pms"],
        data () {
            return {
                num:1,
				selected:"foo",
				list:[{name:"Jack"},{name:"Kate"},{name:"Jim"}],
				Mymm:this.mm,/*子组件接收到的数据不能跟父组件双向绑定*/
            }
        },
		methods:{
            deleteItem:function(item){
                this.list.splice(this.list.indexOf(item),1);
			}
		},
        computed: {/*用于简单的数据监听响应,输出结果*/
            reverseMM: function(){
                return this.Mymm.split("").reverse().join("");
            }
        },
        watch:{/*用于较复杂的数据监听响应，异步数据*/
            mm:function(v){
                console.log(v);
                this.Mymm = v;
			},
            Mymm:function(v){
                //console.log(this);
                this.$emit("mchange",v);/*向外部发送广播,通知父级组建执行mchang关联的方法*/
            }
		}
    }
</script>
<style>
    html{
        background: #fff;
    }
</style>