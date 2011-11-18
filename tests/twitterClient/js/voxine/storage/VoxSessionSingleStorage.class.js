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
        var className = 'VoxSessionSingleStorage';
        
        var persist = function(key, securedObject, callBacks) {
            console.log(className + ': Guardando "' + key + '"="' + securedObject + '"');
            callBacks.onSuccess(window.sessionStorage.setItem(key, securedObject));
        };
        
        var recover = function(key, callBacks) {
            console.log(className + ': Recuperando "' + key + '"');
            var item = window.sessionStorage.getItem(key);
            
            if(item !== null){
                callBacks.onSuccess(item);
            }else{
                callBacks.onError(item);
            }
        };
                
        var remove = function(key, callBacks) {
            console.log(className + ': Eliminando "' + key + '"');
            callBacks.onSuccess(window.sessionStorage.removeItem(key));
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        var toString = function(){
            return className;
        }
                
        return VoxClass.Class(
            className,
            null,
            {
                persist : persist,
                recover : recover,
                remove: remove,
                toString : toString
            }
        );
		
    }
);


