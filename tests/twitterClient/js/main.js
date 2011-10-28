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
    
//Require.js allows us to configure shortcut alias
require.config({
    paths: {
        dojo: 'lib/wrapper/dojo.module',
        classHandler: 'voxine/core/ClassHandler.module',
        jQuery: 'lib/jquery/jquery-wrapper',
        jQueryMobile: 'lib/jquery-mobile/jquery-mobile-wrapper'
    }
});

require(
    [
     	"app",
     	"order!lib/jquery/1.6.4/jquery-min",
     	"order!lib/jquery-mobile/1.0rc2/jquery-mobile-min"
    ], 
    function(App) {
        App.initialize();
    }
);
//------------------------------------------------------------------------------
