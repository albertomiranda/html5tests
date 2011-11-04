/**
 * VoxSessionStorage.class
 * 
 * Handle local storage operations using session methods
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
            console.log('Guardando "' + key + '"="' + securedObject + '"');
            window.sessionStorage.setItem(key, securedObject);
        };
        
        var recover = function(key) {
            console.log('Recuperando "' + key + '"');
            return window.sessionStorage.getItem(key);
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxSessionStorage',
            null,
            {
                persist : persist,
                recover : recover
            }
        );
		
    }
);


