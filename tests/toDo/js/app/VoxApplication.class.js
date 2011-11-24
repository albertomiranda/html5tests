/**
 * VoxApplication.class
 * 
 * Application entry point
 */
define([
    'VoxClass',
    'Modernizr',
    'voxine/core/VoxPolyfillsLoader.class',
    'app/controllers/ListController.class'
    ], 
    function(VoxClass, Modernizr, Polyfills, ToDo) {

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
                window.app = new ToDo();
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