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
        var className = 'VoxLocalSingleStorage';
        var storage = window.localStorage;
        
        var persist = function(key, securedObject, callBacks) {
            console.log(className + ': Guardando "' + key + '"="' + securedObject + '"');
            
            var response = storage.setItem(key, securedObject);
            if(response === undefined){
                response = key;
            }
            
            callBacks.onSuccess(response);
        };
        
        var recover = function(key, callBacks) {
            console.log(className + ': Recuperando "' + key + '"');
            var item = storage.getItem(key);
            
            if(item !== null){
                callBacks.onSuccess(item);
            }else{
                callBacks.onError(item);
            }
        };
                
        var remove = function(key, callBacks) {
            console.log(className + ': Eliminando "' + key + '"');
            
            var response = storage.removeItem(key);
            if(response === undefined){
                response = key;
            }
            
            callBacks.onSuccess(response);
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
                remove : remove,
                toString : toString
            }
        );
		
    }
);
