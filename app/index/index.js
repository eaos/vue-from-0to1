import Vue from 'vue'
import Favlist from './components/Favlist'
import vSelect from 'vue-select'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.component('v-select', vSelect)

const Foo = { template: '<div>foo {{$route.params.id}} <br/><router-view></router-view></div>',watch: {
    '$route' (to, from) {
        //console.log(from,to);
    }
}}

const Bar = { template: '<div>bar {{$route.params.id}}</div>',watch: {
    '$route' (to, from) {
        //console.log(from,"to",to);
    }
}}

const Foo_Index = { template: '<div>foo_Index</div>',watch: {
    '$route' (to, from) {
        //console.log(from,to);
    }
}}

const Foo_Profile = { template: '<div>foo_Profile</div>',watch: {
    '$route' (to, from) {
        //console.log(from,to);
    }
}}

const Foo_Posts = { template: '<div>foo_Posts</div>',watch: {
    '$route' (to, from) {
        //console.log(from,to);
    }
}}

/*嵌套路由*/
const routes = [
    {   name:"foo",
        path: '/foo', component: Foo,children:[
            // UserHome will be rendered inside User's <router-view>
            // when /user/:id is matched
            { path: '', component: Foo_Index,meta: { breadcrumbList: [ { label: '用户首页'}] }},
            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            { path: 'profile', component: Foo_Profile,meta: { breadcrumbList: [ { label: '用户资料'}] }},
            // UserPosts will be rendered inside User's <router-view>
            // when /user/:id/posts is matched
            { path: 'posts', component: Foo_Posts,meta: { breadcrumbList: [ { label: '用户登录'}] } }
        ],meta: { breadcrumbList: [ { label: '用户'}] }
    },
    { path: '/bar/:id', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes: routes
})

/*router.beforeEach(function (transition) {
    console.log(transition);
    //window.scrollTo(0, 0);
})*/

router.afterEach(function (transition) {
    console.log(transition);
})

var vm = new Vue({
    el: '#app',
	//render:rd=>rd(Favlist)
    data:{
      m:""
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
        }
    }
});

//console.log(vm)
vm.m = 2;//可以通过props:[".."]传递给单文件组建