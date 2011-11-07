/**
 * VoxSessionSingleStorage.class
 * 
 * Handle local storage operations using session methods
 * 
 * Session storage is intended for short-lived data
 * Data stored in the sessionStorage object is shared only 
 * with pages from the same domain opened in the same window/tab and 
 * does not persist after the window/tab is closed. 
 * Every time a user opens a page in a new window/tab, 
 * the browser creates a new session storage database.
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
                
        var remove = function(key) {
            console.log('Eliminando "' + key + '"');
            return window.sessionStorage.removeItem(key);
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxSessionSingleStorage',
            null,
            {
                persist : persist,
                recover : recover,
                remove: remove
            }
        );
		
    }
);


