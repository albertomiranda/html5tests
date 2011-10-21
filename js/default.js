/**
 * Default global tools and required functionality
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */

//------------------------------------------------------------------------------
//INIT
$(document).ready(function(){
	Voxine.utilities.global.isMobile();
});
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//Namespace support
var Voxine = Voxine || {};

Voxine.namespace = function(ns_string) {
	var parts = ns_string.split('.'),
		parent = Voxine,
		i;
	
	//Strip redundant leading global
	if (parts[0] === 'Voxine') {
		parts = parts.slice(1);
	}
	
	for (i = 0; i < parts.length; i += 1) {
		//create a property if it doesn't exist
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		}
		parent = parent[parts[i]];
	}
	return parent;
};
//------------------------------------------------------------------------------

Voxine.namespace('Voxine.utilities.global');
Voxine.utilities.global = (function() {
	return {
	    "isMobile": function(){
	        //mobile detection
	        var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
	        if (mobile) {  
	            alert('Enjoy your mobile experience!');
	            // Hides mobile browser's address bar when page is done loading.
	            window.addEventListener('load', function(e) {
	                setTimeout(function() {window.scrollTo(0, 1);}, 1);
	            }, false);
	        }
	    },
	
	    "checkCacheUpdate": function(){
	        window.applicationCache.addEventListener('updateready', function(e) {
	          if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
	            window.applicationCache.swapCache();
	            if (confirm('A new version of this site is available. Load it?')) {
	              window.location.reload();
	            }
	          }
	        }, false);
	    }
	};   
}());