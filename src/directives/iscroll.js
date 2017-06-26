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
                    //isc.scrollTo(0,52,1000);
                    var pullDown = $("#pullDown");
                    var pullUp = $("#pullUp");

                    /*滑动过程到一定距离显示文字提示*/
                    isc.on('scroll', function () {
                        console.log(parseInt(this.y))
                        if(this.y>40){
                            pullDown.addClass('flip');
                            pullDown.find(".pullDownLabel").html('松开加载更多');
                            $(el).addClass("flip-loading");
                        }else if(this.y<40&&this.y>0){
                            $(el).removeClass("flip-loading");
                            pullDown.removeClass('flip');
                            pullDown.find(".pullDownLabel").html('下拉刷新');
                        }

                        if(this.y<this.maxScrollY-40){
                            pullUp.addClass('flip');
                            pullUp.html('松开加载更多');
                            $(el).addClass("flip-loading");
                        }
                    });

                    /*滑动结束加载数据，模拟加载完成之后隐藏loading,初始化dom*/
                    isc.on('scrollEnd', function () {
                        if($(el).hasClass("flip-loading")&&pullDown.hasClass("loading")){
                            binding["value"]["func"](function(t){
                                console.log(t);
                                setTimeout(function(){
                                    $(el).removeClass("flip-loading");
                                    pullDown.removeClass('loading');
                                    //$(".scroller").removeClass("scroll-loading");
                                    $(".scroller").css({
                                        "transition-duration":"0.5s",
                                        "-webkit-transform":"translate(0px, 0px)"
                                    });
                                    pullDown.html('<span class="pullDownIcon"><i class="glyphicon glyphicon-arrow-down"></i></span><span class="pullDownLabel">下拉刷新</span>');
                                    console.log("end");
                                    setTimeout(function(){
                                        $(".scroller").css({
                                            "transition-duration":"0s",
                                        });
                                    },500);
                                    //isc.refresh();
                                },1000);
                            },'pullDown');
                        }
                        if($(el).hasClass("flip-loading")&&pullUp.hasClass("loading")){
                            binding["value"]["func"](function(t){
                                console.log(t);
                                setTimeout(function(){
                                    $(el).removeClass("flip-loading");
                                    pullUp.removeClass('loading');
                                    pullUp.html('<span class="pullUpIcon"></span><span class="pullUpLabel">上拉刷新</span>');
                                    console.log("end");
                                    //isc.refresh();
                                },1000);
                            },"pullUp");
                        }
                    });

                    /*监听原生事件松开手指时执行loading效果*/
                    $(el).on("touchend",function(e){
                        console.log("touchend");
                        if($(el).hasClass("flip-loading")&&pullDown.hasClass("flip")){
                            //$(".scroller").addClass("scroll-loading");
                            $(".scroller").css({
                                "-webkit-transform":"translate(0px, 52px)"
                            });
                            pullDown.removeClass('flip').addClass('loading');
                            pullDown.html('<span class="pullDownIcon"><span class="my-spinner"></span></span> <span class="pullUpLabel">数据加载中</span>');
                            //isc.scrollTo(0,52,1000);
                        }
                        if($(el).hasClass("flip-loading")&&pullUp.hasClass("flip")){
                            pullUp.removeClass('flip').addClass('loading');
                            pullUp.html('<span class="my-spinner"></span>');
                        }
                    });


                }, 0)
            },
            update(el, binding, vnode, oldVnode) {
                // 将scroll绑定到新的vnode上
                //vnode.scroll = oldVnode.scroll;
                // 使用settimeout让refresh跳到事件流结尾，保证refresh时数据已经更新完毕
                console.log("update");
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