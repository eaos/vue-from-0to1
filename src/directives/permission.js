let ele;
export default {
  bind: function(el, binding){
      console.log("指令=======Start");
      console.log('bind:',binding);
    },
    inserted: function(el, binding){
        console.log('insert:');
        if($.inArray(binding.value[0],binding.value[1])==-1){
            el.dataset.name="xxcxx";
            ele = $(el).remove();
        }
    },
    update: function(el,binding,vnode,oldVnode){
        //console.log(el.dataset.name="xxcxx");//这里的数据是可以动态绑定的
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
        if($.inArray(binding.value[0],binding.value[1])!=-1){
           if(el.dataset.name=="xxcxx"){
               console.log($(oldVnode.elm));
               $(vnode.elm).html("ewqeqwewq");
           }
        }
    },
    componentUpdated: function(el, binding){
        console.log('componentUpdated:',binding.name);
    },
    unbind:function(el,binding){
        console.log("unbind",binding);
    }
}