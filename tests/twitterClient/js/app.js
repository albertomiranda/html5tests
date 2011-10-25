// Filename: app.js
define([
  'jQuery',
  "Voxine/tools/Tools.class",
  "Voxine/core/Namespace.class",
  "app/twitter/Twitt.class",
  "app/twitter/Twitter.class",
  "templates/twitt.template",
  "lib/mustache"
], function($, Tools, Voxine, Twitt, Twitter, twittTemplate){
  var initialize = function(){
	  //init Voxine namespaces
  	
      Voxine.namespace('Voxine.Tools', Tools);
      Voxine.namespace('Voxine.templates.twittTemplate', twittTemplate);
      
      Twitter.getTweets({q:"Bieber"}, function(tweetList) { console.log(tweetList); });
      
      //start
      $(document).ready(function(){
          if(Voxine.Tools.isMobile()){
              Voxine.Tools.welcomeMobile();
          }
          Voxine.Tools.runTests();
      });
  }

  return { 
    initialize: initialize
  };
});