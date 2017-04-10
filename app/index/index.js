import Vue from 'vue'
import Favlist from './components/Favlist'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

new Vue({
    el: '#app',
	//render:rd=>rd(Favlist)
    components:{
        favList:Favlist
    }
})