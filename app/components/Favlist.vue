<template>
<div>
	<nav-bar v-bind:pmst="permission"></nav-bar>
	<div v-for="item in list">
		{{item.name}} <button v-on:click="deleteItem(item)">删除</button>
	</div>
	<router-link to="/foo">Go to Foo</router-link>
	<router-link to="/bar">Go to Bar</router-link>
	<div><input type="number" v-model="num">{{num}}</div>
	<v-select v-model="selected" :options="['foo','bar']"></v-select>
	<div><input type="text" v-model="Mymm"> {{Mymm}}</div>
	<div>子组件接收到的数据不能跟父组件双向绑定</div>
	<!--<div><input type="text" v-model="mm"> {{mm}} </div>-->
	<div>{{reverseMM}}</div>
</div>
</template>
<script>
    import navBar from './navBar.vue'
    export default {
        props:["mm","pms"],
        data () {
            return {
                num:1,
				selected:"foo",
				list:[{name:"Jack"},{name:"Kate"},{name:"Jim"}],
				Mymm:this.mm,/*子组件接收到的数据不能跟父组件双向绑定*/
                permission:this.pms
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
		},
        components:{
            navBar:navBar
        }
    }
</script>