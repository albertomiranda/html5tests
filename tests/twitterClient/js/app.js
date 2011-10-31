// Filename: app.js
define([
  'classHandler',
  'jQuery',
  "voxine/tools/Tools.class",
  "app/Bindings.class",
  "lib/mustache"
], function(ClassHandler, $, Tools, Bindings) {
    return ClassHandler.Class(
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
