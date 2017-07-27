<template>
<div class="container">
	<h1>ok1 {{num}}</h1>
	<ok-inner>
		<h3 slot="slotName">soltName Here Here will be slot in the slot</h3>
		<h4 slot="slot2">solt2 will be slot here</h4>
	</ok-inner>
	<input type="text" class="form-control" v-model="searchKey"/>
	<h3>Lists</h3>
	<div v-for="(item, index) in lists">
		{{item.id}}-{{item.name}}-{{index}}
	</div>
	<h3>filterList</h3>
	<div v-for="(item, index) in filterList">
		{{item.id}}-{{item.name}}-{{index}}
	</div>
	<button @click="orderById(1)">按升序排序</button>
	<button v-on:click="orderById(-1)">按降序排序</button>
	<br/>
	{{lists}}
</div>
</template>
<script>
	import okInner from "./okInner.vue";
    export default {
        data () {
            return {
                num:123,
				lists:[{"id":"1","name":"Milk"},{"id":"2","name":"Pepto Bismol"},{"id":"3","name":"Peanut Butter"},{"id":"4","name":"Cookies"},{"id":"5","name":"Donuts"}],
				searchKey:""
			}
        },
		methods:{
            orderById:function(reverse){
                var order = (reverse && reverse < 0) ? -1 : 1;
                //var arr = (this.lists).slice(0);// sort on a copy to avoid mutating original array
                //var arr = JSON.parse(JSON.stringify(this.lists));
                var arr = this.copyArr(this.lists);/*对象深度复制*/
                //console.log(arr);
                //arr[0]["name"]="xxxxxxxxxxxxxxxxxxx";
                this.lists = arr.sort(function (a, b) {
                    return (a.id-b.id) * order;
                });
            },
            arrayMis: function (a, b) {/*两个数组的交集和差集*/
                let arrA = []
                let arrB = [];
                a.forEach(function (val) {
                    if (b.indexOf(val) >= 0) {
                        arrA.push(val)
                    } else {
                        arrB.push(val)
                    }
                });

                return [arrA, arrB]
            },
            copyArr : function (arr){
                var newArr = arr.map(function(e){
                    if(typeof e === 'object'){
                        return Object.assign({},e)
                    }else{
                        return e
                    }
				});
                return newArr;
               /* return arr.map((e)=>{
                    if(typeof e === 'object'){
                        return Object.assign({},e)
                    }else{
                        return e
                    }
                })*/
            }
		},
		computed:{
            filterList:function(){
                var ths = this;
                var lists = ths.lists;
                var key = ths.searchKey;
                return lists.filter(function (item) {
                    return item["name"].toLowerCase().indexOf(key.toLowerCase()) != -1;
                });
            }
		},
        components:{
            okInner:okInner
        }
    }
</script>