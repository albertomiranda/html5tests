/**
 * VoxLocalStorage.class
 * 
 * Handle local storage operations using localstorage methods
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
            window.localStorage.setItem(key, securedObject);
        };
        
        var recover = function(key) {
            console.log('Recuperando "' + key + '"');
            return window.localStorage.getItem(key);
        };
                
        var remove = function(key) {
            console.log('Eliminando "' + key + '"');
            return window.localStorage.removeItem(key);
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxLocalStorage',
            null,
            {
                persist : persist,
                recover : recover,
                remove: remove
            }
        );
		
    }
);
