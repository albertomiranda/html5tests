// Filename: app.js
define([
  'VoxClass',
  'jQuery',
  "voxine/tools/Tools.class",
  "app/twitter/Bindings.class",
  "lib/mustache"
], function(VoxClass, $, Tools, Bindings) {
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
                });
            }
        })
});
