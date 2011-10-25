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
        "app/twitter/models/Twitter.class",
        "Voxine/tools/Tools.class",
        "Voxine/core/Namespace.class",
        "app/twitter/models/Twitt.class",
        "templates/twitt.template",
        "app/twitter/Bindings.class",
        //"Voxine/renderers/HtmlRenderer.class",
        "lib/mustache"
    ], 
    function(Twitter, Tools, Voxine, Twitt, twittTemplate, Bindings, HtmlRenderer) {
        //init Voxine namespaces
        Voxine.namespace('Voxine.Tools', Tools);
        Voxine.namespace('Voxine.Twitter', Twitter);
        Voxine.namespace('Voxine.HtmlRenderer', HtmlRenderer);
        Voxine.namespace('Voxine.templates.twittTemplate', twittTemplate);
        
        //set default bindings
        Bindings.apply();
        
        //start
        $(document).ready(function(){
            if(Voxine.Tools.isMobile()){
                Voxine.Tools.welcomeMobile();
            }
            //Voxine.Tools.runTests();
        });
    }
);
//------------------------------------------------------------------------------
