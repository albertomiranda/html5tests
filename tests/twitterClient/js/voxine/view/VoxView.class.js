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
                }
            }
        ); 
    }
);