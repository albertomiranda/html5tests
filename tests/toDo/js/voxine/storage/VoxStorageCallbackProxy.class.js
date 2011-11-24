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
    
    /**
     * Class constructor.
     */
    var constructor = function(origCallback, formater) {
        this.originalCallback = origCallback;
        this.dataFormater = formater;
        this.callbackContext = null;
        
        var args = Array.prototype.slice.call(arguments).splice(2);
        if(args.length > 0){
            this.callbackContext = args[0];
        }
    };
    
    var getProxy = function(){
        var context = this;//cacheo para q no pierda contexto
        return function(rawResponse){
            if(context.originalCallback !== undefined){
                console.log("Processing raw response...");
                var response = context.dataFormater(rawResponse);

                console.log("Resending processed response...");
                context.originalCallback.apply(context.callbackContext, [response]);
            }else{
                console.log("Callback still UNdefined on:");
                console.log(this);
                console.log(context);
            }
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
            getProxy : getProxy
        }
        
        
    );
});
