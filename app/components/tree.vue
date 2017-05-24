<template>
<li>
	<div>
		<i v-if='hasChild' class="glyphicon " :class="[open?'glyphicon-minus':'glyphicon-plus']" @click='toggle'></i>
		<input type="checkbox" v-model="model.checked" @change="toggleSelect(model,model.checked)">{{model.name}}
	</div>
	<ul v-show="open" v-if='hasChild'>
		<treeSelf v-for="item in model.item" v-bind:model="item" v-bind:key="item.onlyId"></treeSelf>
	</ul>
</li>
</template>
<script>
    export default {
        name:"treeSelf",/*使用name递归组建*/
		props:["model"],
        data () {
            return {
                open: true,
                //hasChild: true
			}
        },
        created(){},
		methods:{
            toggle: function() {
                if(this.hasChild) {
                    this.open = !this.open
                }
            },
			toggleSelect:function(model,e){
                //console.log(e);
                if(typeof model.item=="object"){
                    for(var i in model["item"]){
                        var cueItem = model["item"][i];
                        cueItem["checked"]=e;
                        this.toggleSelect(cueItem,e);
                    }
				}else{
                    return false;
				}
			}
		},
        computed:{/*用于简单的数据监听响应,输出结果*/
            hasChild:function(){
                return this.model.item && this.model.item.length
            }
        },
        watch:{/*用于较复杂的数据监听响应，异步数据*/},
        components:{}
    }
</script>