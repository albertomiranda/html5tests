/**
 * This is the app entry point.
 * Here we'll define the initial structure and require needed javascript 
 * building blocks.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
//------------------------------------------------------------------------------
Voxine = {}; //we want Voxine to be globally accessible (one global to rule them all!)
//Voxine.templates = {};
//Voxine.Tools = {};
    
//Require.js allows us to configure shortcut alias
require.config({
    paths: {
        jQuery: 'lib/jquery/jquery-wrapper'
        /*,
        Underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone'
        */
    }
});

require(
    [
     	"app",
     	"order!lib/jquery/1.6.4/jquery-min"
    ], 
    function(App) {
        App.initialize();
    }
);
//------------------------------------------------------------------------------
