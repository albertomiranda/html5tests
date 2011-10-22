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
require(
    [
        "Voxine/tools/Tools.class",
        "Voxine/core/Namespace.class",
        "app/twitter/Twitt.class",
        "templates/twitt.template",
        "lib/mustache"
    ], 
    function(Tools, Voxine, Twitt, twittTemplate) {
        //init Voxine namespaces
        Voxine.namespace('Voxine.Tools', Tools);
        Voxine.namespace('Voxine.templates.twittTemplate', twittTemplate);
        
        //start
        $(document).ready(function(){
            if(Voxine.Tools.isMobile()){
                Voxine.Tools.welcomeMobile();
            }
            Voxine.Tools.runTests();
        });
    }
);
//------------------------------------------------------------------------------
