import IScroll from 'iscroll/build/iscroll-probe'
const VIScroll = {
    install(Vue, options) {
        let isc = null;
        Vue.directive('iscroll', {
            bind(el, binding, vnode) {

                // 判断输入参数
                let vtype = binding.value ? [].toString.call(binding.value) : undefined;

                // 设置iscorll属性的参数
                let iscrollOptions  = vtype === '[object Object]' ? binding.value : options;

                // 阻止touchmove默认事件
                el.addEventListener('touchmove', event => {
                    event.preventDefault();
                })

                // 使用vnode绑定iscroll是为了让iscroll对象能够夸状态传递，避免iscroll重复建立
                // vnode.scroll = new IScroll(el, iscrollOptions);
                isc = new IScroll(el, iscrollOptions);

                isc.on('scroll', function () {
                   console.log(parseInt(this.y))
                });

            },
            inserted: function(el, binding,vnode, oldVnode){
                setTimeout(()=> {
                    isc.refresh();
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