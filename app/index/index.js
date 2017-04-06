import Vue from 'vue/dist/vue.js'
import Favlist from './components/Favlist'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

new Vue({
    el: '#app',
	render:rd=>rd(Favlist)
    //components: { Favlist }
})