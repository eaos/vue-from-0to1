import IScroll from 'iscroll/build/iscroll-probe'
const VIScroll = {
    install(Vue, options) {
        let isc = null;
        Vue.directive('iscroll', {
            bind(el, binding, vnode) {
                // 判断输入参数
                let vtype = binding.value.param ? [].toString.call(binding.value.param) : undefined;

                // 设置iscorll属性的参数
                let iscrollOptions  = vtype === '[object Object]' ? binding.value.param : options;

                // 阻止touchmove默认事件
                el.addEventListener('touchmove', event => {
                    event.preventDefault();
                })

                // 使用vnode绑定iscroll是为了让iscroll对象能够夸状态传递，避免iscroll重复建立
                // vnode.scroll = new IScroll(el, iscrollOptions);
                isc = new IScroll(el, iscrollOptions);

               /* isc.on("scrollCancel",function(){
                    console.log("scrollCancel");
                    if(this.y>50){
                        //this.scrollY = 52;
                        alert(this.scrollY);
                        this.scrollTo(0,52,100);
                    }
                });*/

            },
            inserted: function(el, binding,vnode, oldVnode){
                setTimeout(()=> {
                    isc.refresh();
                    var pullDown = $("#pullDown");
                    var pullUp = $("#pullUp");
                    isc.on('scroll', function () {
                        console.log(parseInt(this.y))
                        if(this.y>50){
                            pullDown.addClass('flip');
                            pullDown.html('松开加载更多!');
                            $(el).addClass("flip-loading");
                        }
                        if(this.y<this.maxScrollY-50){
                            pullUp.addClass('flip');
                            pullUp.html('松开加载更多!');
                            $(el).addClass("flip-loading");
                        }
                    });

                    isc.on('scrollEnd', function () {

                        if($(el).hasClass("flip-loading")&&pullDown.hasClass("loading")){
                            binding["value"]["func"](function(){
                                setTimeout(function(){
                                    $(el).removeClass("flip-loading");
                                    pullDown.removeClass('loading');
                                    console.log("end");
                                    //isc.refresh();
                                },1000);
                            },'pullDown');
                        }
                        if($(el).hasClass("flip-loading")&&pullUp.hasClass("loading")){
                            binding["value"]["func"](function(){
                                setTimeout(function(){
                                    $(el).removeClass("flip-loading");
                                    pullUp.removeClass('loading');
                                    console.log("end");
                                    //isc.refresh();
                                },1000);
                            },"pullUp");
                        }
                    });

                    $(el).on("touchend",function(e){
                        console.log("eee");
                        if($(el).hasClass("flip-loading")&&pullDown.hasClass("flip")){
                            pullDown.removeClass('flip').addClass('loading');
                            pullDown.html('数据加载中...');
                            //isc.scrollTo(0,0,1000);
                        }
                        if($(el).hasClass("flip-loading")&&pullUp.hasClass("flip")){
                            pullUp.removeClass('flip').addClass('loading');
                            pullUp.html('数据加载中...');
                        }

                    });


                }, 0)
            },
            update(el, binding, vnode, oldVnode) {
                // 将scroll绑定到新的vnode上
                //vnode.scroll = oldVnode.scroll;
                // 使用settimeout让refresh跳到事件流结尾，保证refresh时数据已经更新完毕
                setTimeout(()=> {
                    isc.refresh();
                }, 0)
            },
            componentUpdated: function(el, binding){},
            unbind(el, binding, vnode, oldVnode) {
                /**
                 * 解除绑定时要把iscroll销毁
                 */
                //vnode.scroll = oldVnode.scroll;
                isc.destroy();
                isc = null;
            }
        })
    }
}

export default VIScroll;