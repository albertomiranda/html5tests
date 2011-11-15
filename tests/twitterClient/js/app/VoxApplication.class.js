/**
 * VoxApplication.class
 * 
 * Application entry point
 */
define([
    'VoxClass',
    'jQuery',
    'voxine/tools/VoxTools.class',
    'app/Bindings.class',
    'Modernizr',
    'voxine/core/VoxPolyfillsLoader.class'
    ], 
    function(VoxClass, $, VoxTools, Bindings, Modernizr, Polyfills) {

        //POLYFILL LOADING
        var loader = new Polyfills();
        loader.yepnope ([
            {
                test : Modernizr.localstorage,
                nope : 'lib/polyfills/sessionstorage.1.4'
            }
        ]);
        
        var initialize = function() {
            //start
            $(document, this).ready(function(){
                //set default bindings
                var bindingInstance = new Bindings();
                bindingInstance.apply();
                
                //detect mobile
                var tools = new VoxTools;
                if(tools.isMobile()) tools.welcomeMobile();
            });
        };
        
        return VoxClass.Class(
            'VoxApplication',
            null,
            {
                initialize: initialize
            }
        );
    }
);