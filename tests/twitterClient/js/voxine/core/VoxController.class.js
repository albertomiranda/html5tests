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
     * PRIVATE METHODS----------------------------------------------------------
     */
    /**
     * Attaches events to actions (callbacks) for the template.
     * 
     * @param template string
     */
    var attachEvents = function (template) {
        var bindings = this.bindingsMap[template];

        for (var key in bindings) {
            var actions = bindings[key];
            for (var event in actions) {
                $('#'+key).bind(event, actions[event]);
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
    var render = function(template, target, data) {
        var view = new VoxView(template, target);
        view.render(data);
        
        this.attachEvents(template);
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
             *	  "templateName": {
             *        "elementId": {
             *	          "event": "action",
             *            "event2": "action2"
             *	      }
             *	  },
             *    "templateName2": {
             *	      "elementId": {
             *	          "event": "action"
             *	      },
             *		  "elementId2": {
             *	          "event": "action"
             *	      }
             *	  }
             *	}
             */
            bindingsMap: {},
        	render: render
        });
});