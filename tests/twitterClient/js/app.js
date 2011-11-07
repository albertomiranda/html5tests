Vox = {};

// Filename: app.js
define([
  'VoxClass',
  'jQuery',
  'voxine/tools/VoxTools.class',
  'app/Bindings.class',
  'voxine/tests/VoxTests.class',
  'Modernizr',
  'voxine/core/VoxPolyfillsLoader.class'
], function(VoxClass, $, VoxTools, Bindings, VoxTests, Modernizr, Polyfills) {
    Vox.tests = VoxTests;
    
    //POLYFILL LOADING
    var loader = new Polyfills();
    loader.yepnope ([
        {
            test : Modernizr.localstorage,
            nope : 'lib/storage_polyfill/sessionstorage.1.4'
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