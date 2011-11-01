/**
 * VoxMediator.class
 * 
 * Core class to handle all module interactions through
 * a Publish-Subscribe event system.
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
		 
		var trigger = function(channel){
			if (!this.channels || !this.channels[channel]) {
				return false;
			}
			
			//'arguments' is the name of a local, array-like object 
			//available inside every function
			var args = Array.prototype.slice.call(arguments, 1); //converts arguments into an array
		    
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
            	mixin: function(obj){
            		obj.bind = bind;
            		obj.unbind = unbind;
                    obj.trigger = trigger;
                }
            }
        );
	}
);
