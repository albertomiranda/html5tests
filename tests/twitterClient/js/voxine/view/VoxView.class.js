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
            "target": null,
            "caller": null,
            "data": null
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
            private.data = data;
            console.log(private);
            
            //console.log(data);
            //if no data was specified handle error
            if (data == undefined) {
                console.log("RENDER ERROR: NO DATA"); //TODO: implement error handling system
            } 
            
            //if no template was specified handle error
            if (private.template == null || private.template == undefined) {
                console.log("RENDER ERROR: NO TEMPLATE"); //TODO: implement error handling system
            }
            
            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(this);
            var View = this;
            this.bind('viewLoaded', function(template){
                console.log(this); return false;
                var output = Mustache.to_html(template, this.data);
                    
                console.log(this.data.testName + ": TARGET: " + this.target);
                return false;

                //if no target was specified and caller uses trigger,
                //trigger template loaded event
                if (private.target == null || private.target == undefined) {
                    if(private.caller.trigger !== undefined) {
                        private.caller.trigger('parsed', output);
                    }
                }

                //assign output to target element
                $(private.target).html(output);
            }, private);
            
            var View = this;
            $.ajax({
                url: 'js/app/views/' + private.template,
                success: function(template){
                    console.log(private);
                    //View.trigger('viewLoaded', template);
                }
            });
        };
        
        //Return the Class
        return VoxClass.Class(
            'VoxView',
            null,
            {   
                /**
                 * Public constructor.
                 * 
                 * @author Alberto Miranda <alberto@nextive.com>
                 * @param string template Template file to use
                 * @param string target View element where to render output
                 * @param object caller Object instantiating VoxView. Used for bindings.
                 */
                constructor: function(template, target, caller) {
                    //add mediator
                    var Mediator = new VoxMediator();
                    Mediator.mixin(this);
                    this.bind('viewLoaded', function(template){
                        renderTemplate(template);
                    });
                    
                    console.log("NEW VoxView: TARGET: " + target);
                    if (template === undefined) {
                        return "VIEW ERROR: NO TEMPLATE"; //TODO: implement error handling system
                    }

                    //set private properties
                    private.template = template;
                    private.caller = caller;
                    private.target = target;

                    //public properties
                    this.test = target;

                    //public methods
                    this.render = render;
                }
            }
        ); 
    }
);