import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
Vue.use(VueRouter);

/*模拟设置权限 保存到sessionStorage*/
window.sessionStorage.setItem("permission",["edit","delete",'custom','haha']);
Vue.prototype.permission = (window.sessionStorage.getItem("permission")).split(",");

import routes from '../src/config/routes'
const router = new VueRouter({
   // linkActiveClass: 'active',/*设置当前链接的class*/
    //mode: 'history',
    //saveScrollPosition: true, //记住页面的滚动位置 html5模式适用
    routes: routes
});

/*进入页面之前*/
router.beforeEach(function(to, from, next){
    /*可以在这里进行权限控制*/
    console.log(Vue.prototype.permission);
    if(Vue.prototype.permission.indexOf(to.meta.permission)!=-1){
        next();/*必须这一步才能进入下个页面*/
    }else{
        next("/403");
        //alert("暂无权限访问此页面！");
    }
    window.scrollTo(0,0);
});

/*进入页面之后*/
router.afterEach(function (transition) {
    console.log(transition.meta.title);
    window.document.title = transition.meta.title;
});

/*实例化Vue*/
import appHeader from './components/appHeader'
import appFooter from './components/appFooter'
var vm = new Vue({
    el: '#app',
	//render:rd=>rd(App),
    router:router,
    components:{
        appHeader,
        appFooter
    }
});