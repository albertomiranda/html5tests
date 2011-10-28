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
        //init Voxine namespaces	
        Voxine.namespace('Voxine.Tools', Tools);
        Voxine.namespace('Voxine.templates.twitt', twittTemplate);
        Voxine.namespace('Voxine.TwitterController', TwitterController);
        //get tweets when loading app
        //TwitterController.getTweets();
      
        //start
        $(document).ready(function(){
            //set default bindings
            var bindingInstance = new Bindings();
            bindingInstance.apply();
            
            //detect mobile
            if(Voxine.Tools.isMobile()) Voxine.Tools.welcomeMobile();
           
            //Voxine.Tools.runTests();
        });
    }

    return { 
        initialize: initialize
    };
});