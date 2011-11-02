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
<<<<<<< HEAD
=======
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
            this.bind('viewLoaded', this.makeRender, private);
            
            var View = this;
            $.ajax({
                url: 'js/app/views/' + private.template + '.php',
                success: function(template){
                    //console.log(private);
                    View.trigger('viewLoaded', template);
                }
            });
        };
        
        var makeRender = function(template){
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
            };
        
        //Return the Class
>>>>>>> branch 'master' of http://eabait@github.com/albertomiranda/html5tests.git
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
                    console.log("NEW VoxView: TARGET: " + target);
                    if (template === undefined) {
                        return "VIEW ERROR: NO TEMPLATE"; //TODO: implement error handling system
                    }

                    //set private properties
                    this.template = template;
                    this.caller = caller;
                    this.target = target;

                    //public properties
                    this.test = target;
<<<<<<< HEAD
                },
                render : function(data) {
                    this.data = data;
                    //console.log('render ' + private);
                    
                    //console.log(data);
                    //if no data was specified handle error
                    if (data == undefined) {
                        console.log("RENDER ERROR: NO DATA"); //TODO: implement error handling system
                    } 
                    
                    //if no template was specified handle error
                    if (this.template == null || this.template == undefined) {
                        console.log("RENDER ERROR: NO TEMPLATE"); //TODO: implement error handling system
                    }
                    
                    var data = this.data;
                    var target = this.target;
                    
                    var onLoadTemplate = function(template){
                        var output = Mustache.to_html(template, this.data);          
                        console.log(target);
                    };
                    
                    $.ajax({
                        url: 'js/app/views/' + this.template,
                        success: onLoadTemplate
                    });
=======

                    //public methods
                    this.render = render;
                    this.makeRender = makeRender;
>>>>>>> branch 'master' of http://eabait@github.com/albertomiranda/html5tests.git
                }
            }
        ); 
    }
);
