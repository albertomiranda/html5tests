// Filename: app.js
define([
  'jQuery',
  'jQueryMobile',
  "voxine/tools/Tools.class",
  "voxine/core/Namespace.class",
  "app/twitter/models/Twitt.class",
  "app/twitter/controllers/TwitterController.class",
  "templates/twitt.template",
  "app/twitter/Bindings.class",
  "lib/mustache"
], function($, jQMobile, Tools, Voxine, Twitt, TwitterController, twittTemplate, Bindings){
    var initialize = function(){
        var ToolsInstance;
        
        //init Voxine namespaces	
        //FIXME: This should be removed with Namespace class.
        Voxine.namespace('Voxine.Tools', Tools);
        Voxine.namespace('Voxine.templates.twitt', twittTemplate);
        Voxine.namespace('Voxine.TwitterController', TwitterController);

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

    return { 
        initialize: initialize
    };
});