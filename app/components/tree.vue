<template>
<li>
	<div>
		<i class="glyphicon" v-bind:class="{'glyphicon-minus':open,'glyphicon-plus':!open}" v-if="hasChild" v-on:click="toggle()"></i>
		<label><input type="checkbox" v-model="model.checked" v-on:change="toggleSelect(model)">{{model.name}}</label>
	</div>
	<ul v-show="open" v-if="hasChild">
		<treeSelf v-for="item in model.item" v-bind:model="item" v-bind:key="item.onlyId"></treeSelf>
		<treeSelf v-for="item in model.item" v-bind:model="item" ></treeSelf>
	</ul>
</li>
</template>
<script>
	export default{
	    name:"treeSelf",/*使用name递归组建*/
		props:["model"],/*外部传递过来的数据通过model互通*/
		data:function(){
	        return {
	            open:true,
				lis:{"name":"Jack","age":25}
			}
		},
		methods:{
		    toggle:function(){
		        this.open = !this.open;
		        /*测试watch监听数据变化*/
		        this.lis.name = "Kate-" + (this.open.toString());
			},
			toggleSelect:function(model){
		        var item = model["item"];
		        var checked = model["checked"];
                if(!!item && typeof item === "object"){
                    for(var i=0;i<item.length;i++){
                        var currentItem = item[i];
                        currentItem["checked"] = checked;
                        this.toggleSelect(currentItem);
                    }
                }else{
                    return;
                }
			}
		},
		computed:{
		    /*用于简单的数据监听响应,输出结果,可直接用this访问到*/
		    hasChild:function(){
		        return this.model.item && this.model.item.length;
			}
		},
		watch:{
		    /*用于较复杂的数据监听响应，异步数据*/
            lis:{
                deep: true,
                //immediate: true,
                handler: function(val, oldVal) {
                    console.log(val===oldVal);/*???*/
					/*
					Note: when mutating (rather than replacing) an Object or an Array,
					the old value will be the same as new value because they reference
					the same Object/Array. Vue doesn’t keep a copy of the pre-mutate value.
					*/
				}
			},
			"lis.name":function(val, oldVal){
                console.log(val,oldVal);/*???*/
			}
		},
		components:{

		}
	}
</script>
