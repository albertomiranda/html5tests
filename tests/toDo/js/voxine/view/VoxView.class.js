/**
 * VoxView.class
 * 
 * Handles view rendering.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
define(
    [
        'VoxClass',
        'mustache',
        'voxine/core/VoxMediator.class'
    ],
    function(VoxClass, Mustache, VoxMediator) {
        var private = {
            "template": null,
            "caller": null,
            "target": null,
            "data": null
        };
        
        /**
         * Public constructor.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param string template Template file to use
         * @param string target View element where to render output
         * @param object caller Object instantiating VoxView. Used for bindings.
         */
        var constructor = function(template, target) {
            //console.log("NEW VoxView: TARGET: " + target);
            if (template === undefined) {
                console.log("VIEW ERROR: NO TEMPLATE"); //TODO: implement error handling system
            };

            //set private properties
            private.template = template;
            private.target = target;
        };
        
        /**
         * Renders set template with passed data.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object data
         */
        var render = function(data) {
            this.data = data;

            //if no data was specified handle error
            if (data == undefined) {
                console.log("RENDER ERROR: NO DATA"); //TODO: implement error handling system
            } 

            //if no template was specified handle error
            if (private.template == null || private.template == undefined) {
                //console.log("RENDER ERROR: NO TEMPLATE"); //TODO: implement error handling system
            }

            var target = private.target; //we need it in the context of this function!
            var View = this;
            var viewLoaded = function(template){
                console.log('TARGET: ' + target);
                var output = Mustache.to_html(template, data);
                
                //assign to target if set
                if (target) {
                    console.log('+ assign to target');
                    $(target).html(output);
                }
                
                //theres no target, trigger event passing template to listener
                if (View.trigger) {
                    View.trigger('parsed', output);
                }
            };

            //view assync loading
            $.ajax({
                url: 'js/app/views/' + private.template,
                success: viewLoaded
            });
        };
        
        //return object
        return VoxClass.Class(
            'VoxView',
            null,
            {   
                constructor: constructor,
                render : render
            }
        ); 
    }
);
