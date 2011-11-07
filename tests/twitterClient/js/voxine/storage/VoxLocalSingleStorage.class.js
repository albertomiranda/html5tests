/**
 * VoxLocalSingleStorage.class
 * 
 * Handle local storage operations using localstorage methods
 * 
 * The local storage mechanism allows to store data for more than a single session.
 * The localStorage object is functionally identical to the sessionStorage, 
 * except that data stored in the local storage area is persistent 
 * and not limited to the lifetime of the window/tab.
 * The local storage area is shared across multiple windows/tabs 
 * thus being suitable for use in multi-transaction scenarios.
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
            'VoxLocalSingleStorage',
            null,
            {
                persist : persist,
                recover : recover,
                remove: remove
            }
        );
		
    }
);
