import Vue from 'vue';
import Favlist from './components/Favlist';
import vSelect from 'vue-select';
import VueRouter from 'vue-router';
//import jQuery from 'jquery';

/*引入路由*/
import fooPost from "./components/foo/fooPosts.vue"

Vue.use(VueRouter);
Vue.component('v-select', vSelect);

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

/*嵌套路由*/
const routes = [
    {   //name:"foo",/*有默认子路由(path为空)的话，父路由的name得去掉*/
        path: '/foo',
        component: Foo,
        children:[
            // UserHome will be rendered inside User's <router-view>
            // when /user/:id is matched
            { name:"foo_index",path: '', component: Foo_Index,meta: { breadcrumbList: [ { label: '用户首页'}] }},
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            { name:"foo_profile",path: 'profile', component: Foo_Profile,meta: { breadcrumbList: [ { label: '用户资料'}] }},
            // UserPosts will be rendered inside User's <router-view>
            // when /user/:id/posts is matched
            { name:"foo_posts",path: 'posts', component: Foo_Posts,meta: { breadcrumbList: [ { label: '用户登录'}] } }
        ],
        meta: {breadcrumbList: [ { label: '用户'}]}
    },
    {
        //name:"bar",/*有默认子路由(path为空)的话，父路由的name得去掉*/
        path: '/bar',
        component: Bar,
        children:[
            { name:"bar_index",path: '', component: Bar_Index,meta: { breadcrumbList: [ { label: '用户首页'}] }},
            { name:"bar_profile",path: 'profile', component: Bar_Profile,meta: { breadcrumbList: [ { label: '用户资料'}] }},
            { name:"bar_posts",path: 'posts', component: Bar_Posts,meta: { breadcrumbList: [ { label: '用户登录'}] } }
        ],
        meta: {breadcrumbList: [ { label: '用户'}]}
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes: routes
})

router.beforeEach(function (to, from, next) {
    /*可以在这里进行权限控制*/
    console.log(to);
    window.scrollTo(0, 0);
    next();/*必须这一步才能进入下个页面*/
})

router.afterEach(function (transition) {
    //console.log(transition);
})

var vm = new Vue({
    el: '#app',
	//render:rd=>rd(Favlist)
    data:{
      m:"Hello World!"
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
        }
    }
});

//console.log(vm)
//vm.m = "Hello World!";//可以通过props:[".."]传递给单文件组建