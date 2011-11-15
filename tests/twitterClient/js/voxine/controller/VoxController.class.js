/**
 * VoxController.class
 * 
 * Renders the correct view and binds its events.
 * 
 * @author Pablo Martinez Dorr <pablo.martinez@nextive.com>
 */
define([
    'VoxClass',
    'jQuery'
], function(VoxClass, $) {
    /**
     * PRIVATE METHODS AND PROPERTIES ------------------------------------------
     */
    
    /**
     * Attaches events to actions (callbacks) for the template.
     * 
     * @param template string
     */
    var attachEvents = function (template, self) {
        var bindings = self.bindingsMap[template];
        console.log('ATTACHING EVENTS...');
        for (var key in bindings) {
            var actions = bindings[key];
            for (var event in actions) {
                console.log('ATTACHING ' + event + ' TO ' + key);
                $(key).bind(event, {controller: self}, actions[event]);
            }
        };
    };
    
    /**
     * Renders the view and attaches its events.
     * 
     * @param template string The template's name.
     * @param target string
     * @param data array
     */
    var render = function(template, target, data, callback) {
        var view = new VoxView(template, target);
        
        if (typeof callback != "undefined") {
            var Mediator = new VoxMediator();
            Mediator.mixin(view);
            view.bind('parsed', callback);
            
            var attach = attachEvents;
            var controller = this;
            var temp = template;
            view.bind('parsed', function () {attach(temp, controller);});
        }
        
        view.render(data);
    };

    /**
     * PUBLIC INTERFACE--------------------------------------------------------------
     */
    return VoxClass.Class(
        'VoxController',
        null,
        {
            /**
             * On the child controller this should be defined as follows:
             * 
             * bindingsMap = {
             *    "templateName": {
             *        "elementId": {
             *            "event": "action",
             *            "event2": "action2"
             *        }
             *    },
             *    "templateName2": {
             *        "elementId": {
             *            "event": "action"
             *        },
             *        "elementId2": {
             *            "event": "action"
             *        }
             *    }
             *  }
             */
            bindingsMap: {},
            render: render
        });
});