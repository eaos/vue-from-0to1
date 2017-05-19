import App from '../../app/components/App';
import foo_Posts from '../../app/components/fooPosts';

/*Foo模块路由和子页面*/
const Foo = { template: '<div><router-view></router-view></div>'};
const Foo_Index = { template: '<div>foo_Index</div>'};
const Foo_Profile = { template: '<div>foo_Profile</div>'};
const Foo_Posts = foo_Posts;

/*Bar模块路由和子页面*/
const Bar = { template: '<div><router-view></router-view></div>'};
const Bar_Index = { template: '<div>bar_Index</div>'};
const Bar_Profile = { template: '<div>bar_Profile</div>'};
const Bar_Posts = { template: '<div>bar_Posts</div>'};

const Page403 = { template: '<div>403 无权限访问此页面！</div>'};
const Page404 = { template: '<div>404 找不到页面！</div>'};

/*嵌套路由*/
const routes = [
    {
        name:"index",
        path: '/',
        component: App,
        meta: {breadcrumbList:[ { label: 'App'}],permission:"custom",title:"首页"}
    },
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
    },
    {
        name:"404",
        path: '*',
        component: Page404,
        meta: {breadcrumbList:[ { label: '404页面'}],permission:"custom",title:"404 页面未找到"}
    }
]

export default routes