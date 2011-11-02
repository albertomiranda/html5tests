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
], function(VoxClass, $, Tools, Bindings) {
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
		
		for (key in bindings) {
			actions = bindings[key];
			for (event in actions) {
				$('#'+key).bind(event, actions[event]);
			}
		};
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
        	 *	      "elementId": {
        	 *	          "event": "action",
        	 *			  "event2": "action2"
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
        	
        	/**
        	 * 
        	 */
            render: function(template, target, data) {
				var view = new VoxView(template, target);
				view.render(data);
				
				this.attachEvents(template);
            },
        });
});