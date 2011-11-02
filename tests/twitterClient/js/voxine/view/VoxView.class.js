/**
 * VoxView.class
 * 
 * Handles view rendering.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
define(
    [
        'mustache',
        'voxine/core/VoxMediator.class',
    ],
    function(Mustache, VoxMediator) {
        var private = {
            "template": null,
            "target": null,
            "caller": null
        };
        
        /**
         * Renders template inside target element using passed data.
         * If no target was specified returns output.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object data
         * @return string
         */
        var render = function(data) {
            //console.log(data);
            //if no data was specified handle error
            if (data == undefined) {
                console.log("RENDER ERROR: NO DATA"); //TODO: implement error handling system
            } 
            
            //if no template was specified handle error
            if (private.template == null || private.template == undefined) {
                console.log("RENDER ERROR: NO TEMPLATE"); //TODO: implement error handling system
            }
            
            require(
                ['text!app/views/' + private.template],
                function(template) {
                    var output = Mustache.to_html(template, data);
                    
                    console.log(data.testName + ": TARGET: " + private.target);

                    //if no target was specified and caller uses trigger,
                    //trigger template loaded event
                    if (private.target == null || private.target == undefined) {
                        if(private.caller.trigger !== undefined) {
                            private.caller.trigger('parsed', output);
                        }
                    }
                    
                    //assign output to target element
                    $(private.target).html(output);
                }
            );
        };
        
        /**
         * Public constructor.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param string template Template file to use
         * @param string target View element where to render output
         * @param object caller Object instantiating VoxView. Used for bindings.
         */
        return function(template, target, caller) {
            console.log("NEW VoxView: TARGET: " + target);
            if (template === undefined) {
                return "VIEW ERROR: NO TEMPLATE"; //TODO: implement error handling system
            }
            
            //set private properties
            private.template = template;
            private.caller = caller;
            private.target = target;
            
            //public properties
            this.test = 'PUBLIC';
            
            //public methods
            this.render = render;
        }
    }
);