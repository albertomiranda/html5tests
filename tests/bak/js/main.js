/**
 * This is the app entry point.
 * Here we'll define the initial structure and require needed javascript 
 * building blocks.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
//------------------------------------------------------------------------------
Voxine = {};
Voxine.templates = {};
Voxine.Tools = {};
require(
    [
        "app/twitter/Twitt.class",
        "app/tools/Tools.class",
        "templates/twitt.template",
        "lib/mustache"
    ], 
    function(Twitt, Tools, twittTemplate) {
        Voxine.Tools = Tools;
        Voxine.templates.twittTemplate = twittTemplate;
        
	//INIT
        $(document).ready(function(){
            Voxine.Tools.isMobile();
            Voxine.Tools.runTests();
        });
    }
);
//------------------------------------------------------------------------------
