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
    var private = {
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
    };
    
    /**
     * Attaches events to actions (callbacks) for the template.
     * 
     * @param template string
     */
    var attachEvents = function (template) {
        var bindings = private.bindingsMap[template];

        for (var key in bindings) {
            var actions = bindings[key];
            for (var event in actions) {
                $('#'+key).bind(event, actions[event]);
            }
        };
    };
    
    var setBindingsMap = function(bindingsMap) {
        private.bindingsMap = bindingsMap;
    };
    
    /**
     * Renders the view and attaches its events.
     * 
     * @param template string The template's name.
     * @param target string
     * @param data array
     */
    var render = function(template, target, data) {
        var view = new VoxView(template, target);
        view.render(data);
        
        attachEvents(template);
    };

    /**
     * PUBLIC INTERFACE--------------------------------------------------------------
     */
    return VoxClass.Class(
        'VoxController',
        null,
        {
            bindingsMap: setBindingsMap,
        	render: render
        });
});