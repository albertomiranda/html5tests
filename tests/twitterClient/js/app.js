// Filename: app.js
define([
  'VoxClass',
  "voxine/core/VoxMediator.class",
  'jQuery',
  "voxine/tools/Tools.class",
  "app/Bindings.class",
  "lib/mustache"
], function(VoxClass, VoxMediator, $, Tools, Bindings) {
    return VoxClass.Class(
        'App',
        null,
        {
            initialize: function() {
                var ToolsInstance;
                //start
                $(document, this).ready(function(){
                    //set default bindings
                    var bindingInstance = new Bindings();
                    bindingInstance.apply();
                    //detect mobile
                    ToolsInstance = new Tools();
                    if(ToolsInstance.isMobile()) ToolsInstance.welcomeMobile();
                    //ToolsInstance.runTests();
                    
                    var pub = {}, sub = {name: 'Pedro'};
                    var mediator = new VoxMediator();
                    
                    //mix mediator into pub object
                    mediator.mixin(pub);
                    
                    //bind (event, callback, context)
                    var callback = function(){alert(this.name);};
                    pub.bind('helloworld', callback, sub);
                    
                    //trigger(event)
                    pub.trigger('helloworld');
                    
                    pub.unbind('helloworld', callback);
                    pub.trigger('helloworld');
                });
            }
        })
});
