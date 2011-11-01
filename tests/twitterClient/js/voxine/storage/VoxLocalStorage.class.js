/**
 * VoxLocalStorage.class
 * 
 * Handle local storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass'
    ], 
    function(VoxClass) {

/**
 * PRIVATE----------------------------------------------------------
 */
        
        var persist = function(key, securedObject) {
            window.localStorage.setItem(key, securedObject);
        };
        
        var recover = function(key) {
            return window.localStorage.getItem(key);
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxLocalStorage',
            'VoxStorage',
            {
            	load: this.load,
                save: this.save
            }
        );
		
    }
);
