import Vue from 'vue';
import Favlist from './components/Favlist';
/*引入路由组件文件*/
import fooPost from "./components/foo/fooPosts.vue"
/*使用路由*/
import VueRouter from 'vue-router';

/*
// 增强原方法，好处是旧的业务模块不需要任何变动
VueRouter.prototype.go = function () {
    this.isBack = true
    window.history.go(-1)
};

// 或者你可以新建一个方法
VueRouter.prototype.goBack = function () {
    this.isBack = true
    this.go(-1)
};
*/


Vue.use(VueRouter);
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
//import validForm from '../../src/validform';
//import valid from '../../src/directives/validform';
//Vue.directive('valid',valid);
//console.log(valid);
//console.log(jQuery);
//console.log(validForm);

/*引入组件*/
import vSelect from 'vue-select';
Vue.component('v-select', vSelect);

/*Vue.directive('valid',{
    bind: function(el, binding){
        var demo = $(el).Validform({
            tiptype:"4",
            //ajaxPost:true,
            showAllError:true,
            callback:function(){
                (binding.value)()
                return false;
            },
            ajaxurl:{
                success:function(data,obj){
                    //console.log(data);
                }
            }
        });
        //console.log('bind:',binding.value);
    },
    inserted: function(el, binding){
        console.log('insert:',binding.value);
    },
    update: function(el, binding, vnode, oldVnode){
        el.focus();
        console.log(el.dataset.name);//这里的数据是可以动态绑定的
        console.table({
            name:binding.name,
            value:binding.value,
            oldValue:binding.oldValue,
            expression:binding.expression,
            arg:binding.arg,
            modifiers:binding.modifiers,
            vnode:vnode,
            oldVnode:oldVnode
        });
    },
    componentUpdated: function(el, binding){
        console.log('componentUpdated:',binding.name);
    },
    unbind:function(){

        console.log("unbind");
    }
});*/

/*Foo模块路由和子页面*/
const Foo = { template: '<div>foo {{$route.params.id}} <br/><router-view></router-view></div>'};
const Foo_Index = { template: '<div>foo_Index</div>'};
const Foo_Profile = { template: '<div>foo_Profile</div>'};
const Foo_Posts = fooPost;

/*Bar模块路由和子页面*/
const Bar = { template: '<div>bar {{$route.params.id}}<router-view></router-view></div>'};
const Bar_Index = { template: '<div>bar_Index</div>'};
const Bar_Profile = { template: '<div>bar_Profile</div>'};
const Bar_Posts = { template: '<div>bar_Posts</div>'};

const Page403 = { template: '<div>403 无权限访问此页面！</div>'};

/*嵌套路由*/
const routes = [
    {   //name:"foo",/*有默认子路由(path为空)的话，父路由的name得去掉*/
        path: '/foo',
        component: Foo,
        children:[
            // UserHome will be rendered inside User's <router-view>
            // when /user/:id is matched
            { name:"foo_index",path: '', component: Foo_Index,meta:{ breadcrumbList: [ { label: '用户首页'}],permission:"add",title:"用户首页"}},
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            { name:"foo_profile",path: 'profile', component: Foo_Profile,meta: { breadcrumbList: [ { label: '用户资料'}],title:"用户资料",permission:"custom"}},
            // UserPosts will be rendered inside User's <router-view>
            // when /user/:id/posts is matched
            { name:"foo_posts",path: 'posts', component: Foo_Posts,meta: { breadcrumbList: [ { label: '用户登录'}],title:"用户登录",permission:"custom"}}
        ],
        meta: {breadcrumbList: [ { label: '用户'}],title:"用户",permission:"custom"}
    },
    {
        //name:"bar",/*有默认子路由(path为空)的话，父路由的name得去掉*/
        path: '/bar',
        component: Bar,
        children:[
            { name:"bar_index",path: '', component: Bar_Index,meta: { breadcrumbList: [ { label: '用户首页'}],permission:"add",title:"Bar 用户首页"}},
            { name:"bar_profile",path: 'profile', component: Bar_Profile,meta: { breadcrumbList: [ { label: '用户资料'}],title:"Bar 用户资料",permission:"custom"}},
            { name:"bar_posts",path: 'posts', component: Bar_Posts,meta: { breadcrumbList: [ { label: '用户登录'}],title:"Bar 用户登录",permission:"custom"} }
        ],
        meta:{breadcrumbList: [ { label: '用户'}],title:"bar 用户",permission:"custom"}
    },
    {
        name:"403",
        path: '/403',
        component: Page403,
        meta: {breadcrumbList:[ { label: '403页面'}],permission:"custom",title:"403 禁止访问"}
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes: routes
});

/*模拟设置权限 保存到sessionStorage*/
window.sessionStorage.setItem("permission",["edit","delete",'custom']);
Vue.prototype.permission = (window.sessionStorage.getItem("permission")).split(",");


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

import permission from '../../src/directives/permission';
Vue.directive('permission',permission);


/*实例化Vue*/
var vm = new Vue({
    el: '#app',
	//render:rd=>rd(Favlist)
    data:{
        m:"Hello World!",
        transitionName:"slides",
        permission:Vue.prototype.permission
    },
    components:{
        favList:Favlist,
        //navBar:navBar
    },
    router:router,
    methods:{
        pushUrl:function(){
            router.push({ name: 'foo',params:{'id':112},query: { page: '1' }})
            /*等同于<router-link :to="{ name: 'foo', params: { id: 112 }}">User</router-link>*/
        },
        parentChange:function(v){
            console.log(v);
            this.m = v;
        },
        updatePms:function(f){
            if(f){
                this.permission.push("add");
            }else{
                this.permission.splice(this.permission.indexOf("add"),1);
                router.push({name:"foo_index"})
            }
        },
        hasPermission:function(c){
            if(this.permission.indexOf(c)>-1){
                return true;
            }else{
                return false;
            }
        }
    }/*,
    watch: {
        '$route' (to, from) {
            const toDepth = to.path.split('/').length;
            const fromDepth = from.path.split('/').length;
            console.log(to,from);
            this.transitionName = toDepth < fromDepth ? 'slide' : 'slide-back'
        }
    }*/
});

//console.log(vm)
//vm.m = "Hello World!";//可以通过props:[".."]传递给单文件组建