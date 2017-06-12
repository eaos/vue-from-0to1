<template>
<div class="container">
	<h1>ok1 {{num}}</h1>
	<ok-inner></ok-inner>
	<input type="text" class="form-control" v-model="searchKey"/>
	<div v-for="(item, index) in filterList">
		{{item.id}}-{{item.name}}-{{index}}
	</div>
	<button @click="orderById(-1)">按升序排序</button>
	<button @click="orderById(1)">按降序排序</button>
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
              var arr = (this.lists).slice();
              // sort on a copy to avoid mutating original array
              this.lists = arr.sort(function (a, b) {
                  return (b.id-a.id) * order;
              });
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