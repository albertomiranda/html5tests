Vox = {};

// Filename: app.js
define([
  'VoxClass',
  'voxine/core/VoxMediator.class',
  'jQuery',
  'voxine/tools/VoxTools.class',
  'app/Bindings.class',
  'app/controllers/TwitterController.class',
  'voxine/tests/VoxTests.class',
  'Modernizr',
  'voxine/tools/VoxPolyfillsLoader.class',
  'lib/mustache'
], function(VoxClass, VoxMediator, $, VoxTools, Bindings, TwitterController, VoxTests, Modernizr, Polyfills) {
    Vox.tests = VoxTests;
    
    //POLYFILL LOADING
    var loader = new Polyfills();
    loader.yepnope ([
        {
            test : Modernizr.localstorage && Modernizr.sessionstorage,
            nope : 'lib/storage_polyfill/sessionstorage.1.4',
        }               
    ]);
    
    return VoxClass.Class(
        'App',
        null,
        {
            initialize: function() {
                //start
                $(document, this).ready(function(){
                    //set default bindings
                    var bindingInstance = new Bindings();
                    bindingInstance.apply();
                    
                    //detect mobile
                    var tools = new VoxTools;
                    if(tools.isMobile()) tools.welcomeMobile();
                });
            }
        })
});