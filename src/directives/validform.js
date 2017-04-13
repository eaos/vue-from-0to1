let demo = {};
export default {
  bind: function(el, binding){
        demo = $(el).Validform({
            tiptype:"4",
            //ajaxPost:true,
            showAllError:true,
            callback:function(){
                (binding.value["fun"])(el);
                return false;
            },
            ajaxurl:{
                success:function(data,obj){
                    //console.log(data);
                }
            }
        });
        console.log('bind:',binding);
    },
    inserted: function(el, binding){
        console.log('insert:',binding.value);
    },
    update: function(el,binding,vnode,oldVnode){
        el.focus();
        console.log(demo);
        /*demo.addRule([
            {
                ele:"#mobile",
                ajaxurl:"../clinic/userManage/account/query-mobile?type=1"
            }
            ])*/
        console.log(el.dataset.name);//这里的数据是可以动态绑定的
        console.log(vnode);
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
    unbind:function(el,binding){
        console.log("unbind",binding);
    }
}