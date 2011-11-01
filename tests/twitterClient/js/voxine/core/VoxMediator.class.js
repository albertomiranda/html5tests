/**
 * VoxMediator.class
 * 
 * Core class to handle all module interactions through
 * a Publish-Subscribe event system.
 * 
 * Usage:
 *		var pub = {}, sub = {name: 'Pedro'};
 *      var mediator = new VoxMediator();
 *                 
 *      //mix mediator into pub object
 *      mediator.mixin(pub);
 *                  
 *      //callback, receives a parameter
 *      var callback = function(lastname) {alert(this.name + " " + lastname);};
 *      
 *      //bind the 'helloworld' event to callback on the sub object
 *      pub.bind('helloworld', callback, sub);
 *                 
 *      //triggers the 'helloworld' event, specify an optional parameter
 *      pub.trigger('helloworld', 'Sanchez');
 *      
 *      //unregisters the callback from the 'helloworld' event
 *      pub.unbind('helloworld', callback);
 *      
 *      //this shoudn't trigger anything
 *      pub.trigger('helloworld');
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([    
    'VoxClass'
    ], 
    function(VoxClass) {

        /**
         * PRIVATE METHODS----------------------------------------------------------
         */
        /**
         * Binds an event to a callback.
         * 
         * @param {string} channel the event to bind.
         * @param {function} the callback to be executed when the event is triggered.
         * @param {object} context if specified the callback will be called on this object
         * 			if not it will be called on 'this'
         * @return {object} the 'this' object. 
         */
        var bind = function(channel, fn, context) {
            this.channels = this.channels || {};
		    
            if (!this.channels[channel]) {
                this.channels[channel] = [];
            }
		    this.channels[channel].push({ context: (context || this), callback: fn });
		    
            return this;
        };
		
        var unbind = function(channel, fn) {
            var i, l, elem, list;
			
            if (!this.channels) {
                return false;
			};
			
            list = this.channels[channel];
			
            if (!list) {
                return false;
			};
			
            for (i = 0, l = list.length; i < l; i++) {
                elem = list[i].callback;
                if (elem === fn) {
                    list.splice(i);
                    break;
                }
            };
			
            return this;
        };
		 
        /**
         * Triggers a new event.
         * 
         * @param {string} channel the event to trigger.
         * @param {string | object | function} extra parameters that will be used 
         * 			by the callback specified in the bind function @see #bind.
         * @return {(boolean | object)} false if it cant't trigger the event or 'this'
         * 			if it can. 
         */
        var trigger = function(channel){
            if (!this.channels || !this.channels[channel]) {
                return false;
            }
			
            //to get any additional parameter passed to the function
            var args = Array.prototype.slice.call(arguments, 1);
		    
            for (var i = 0, l = this.channels[channel].length; i < l; i++) {
                var subscription = this.channels[channel][i];
                subscription.callback.apply(subscription.context, args);
            };
		        
            return this;    
        };
		
        /**
         * PUBLIC INTERFACE--------------------------------------------------------------
         */
        return VoxClass.Class(
            'VoxMediator',
            null,
            {   
                mixin: function(obj) {
            	    obj.bind = bind;
                    obj.unbind = unbind;
                    obj.trigger = trigger;
                }
            }
        );
    }
);
