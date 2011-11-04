/**
 * This is the app entry point.
 * Here we'll define the initial structure and require needed javascript 
 * building blocks.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */

//------------------------------------------------------------------------------
//Require.js allows us to configure shortcut alias
require.config({
    paths: {
        VoxClass: 'voxine/core/VoxClass.module',
        jQuery: 'lib/jquery/jquery-wrapper',
        jQueryMobile: 'lib/jquery-mobile/jquery-mobile-wrapper',
        mustache: 'lib/wrapper/mustache.module',
        Modernizr: 'lib/modernizr/modernizr-wrapper'
    }
});

require(
    [
     	"app",
     	"order!lib/jquery/1.6.4/jquery-min",
     	"order!lib/jquery-mobile/1.0rc2/jquery-mobile-min"
    ], 
    function(App) {
        var Application = new App();
        Application.initialize();
    }
);
//------------------------------------------------------------------------------
