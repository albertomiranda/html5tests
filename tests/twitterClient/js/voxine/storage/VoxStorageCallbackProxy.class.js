/**
 * VoxStorageCallbackProxy.class
 * 
 * Wrapper that holds a callback, process the response and pass to the original
 * callback
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass'
], 
function(VoxClass) {

    var className = 'VoxStorageCallbackProxy';
    
    var originalCallback;
    var dataFormater;
    /**
     * Class constructor.
     */
    var constructor = function(origCallback, formater) {
        originalCallback = origCallback;
        dataFormater = formater;
    };
    
    var proxy = function(rawResponse){
        if(originalCallback !== undefined){
            console.log("Processing raw response...");
            var response = dataFormater(rawResponse);
            
            console.log("Resending processed response...");
            originalCallback(response);
        }else{
            console.log("Callback still UNdefined");
        }
    }
        

/**
 * PUBLIC INTERFACE----------------------------------------------------
 */
    
    
    return VoxClass.Class(
        className,
        null,
        {
            constructor: constructor,
            proxy : proxy
        }
        
        
    );
});
