/**
 * VoxSingleStorage.class
 * 
 * Handle generic storage operations to one target
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass',
    'voxine/helpers/VoxStringHelper.class',
    'voxine/tools/VoxTools.class'
], 
function(VoxClass, VoxStringHelper) {
    

    /**
     * Class constructor.
     */
    var constructor = function() {
        var Mediator = new VoxMediator();
        Mediator.mixin(this);
    };
        
/**
* POLYMORPHISM------------------------------------------------------
*/
    
    var child = null;
    var setChild = function(chld){child = chld;}
        
/**
* PRIVATE----------------------------------------------------------
*/
    var save = function(object) {
        var storageOperation = 'save'; //pasaría el valor directamente
        persist(
            key(object), //pondría object.getStorageKey() directamente. @Q170
            formatForStorage(data(object)), //pondría object.prune() directamente. @Q170
            connConfig(object, storageOperation));
    };

    var load = function(object) {
        var storageOperation = 'load'; //pasaría el valor directamente
        recover(
            key(object), //pondría object.getStorageKey() directamente. @Q170
            connConfig(object, storageOperation));
    };
    
    var erase = function(object){
        var storageOperation = 'erase'; //pasaría el valor directamente
        remove(
            key(object), //pondría object.getStorageKey() directamente. @Q170
            connConfig(object, storageOperation));
    }

/**
 * Data Extraction----------------------------------------------------
 */
    var key = function(object){
        return object.getStorageKey();
    }
    
    var data = function(object){
        return object.prune();
    }
    

/**
 * Data processing----------------------------------------------------
 */

    var formatForStorage = function(data){
        var storableData = serialize(data);
        var securedData = secure(storableData);
        return securedData;
    }
    
    var formatFromStorage = function(securedData){
        var data = undefined; //lo mismo es var data;
        
        if(securedData !== undefined){
            var storableData = unsecure(securedData);
            data = unserialize(storableData);
        }
        
        return data;
    }
    
    var serialize = function(data) {
        var str = JSON.stringify(data);
        console.log("Serialized obj :" + str);
        return str;
    };

    var unserialize = function(string) {
        var obj = string;
        
        console.log("Attemping to parse: " + string);
        try{
            obj = JSON.parse(string);
        }catch(e){
            console.log("Error while parsing: " + e);
        }
        
        return obj; //pondría esto en la línea 100, si hubo un error
                    //entonces devuelve un valor undefined
    };

    //TODO VoxSecurity.encrypt(string)
    var secure = function(object) {
        return object;
    };

    //TODO VoxSecurity.decrypt(string)
    var unsecure = function(object) {
        return object;
    };

/**
 * Virtual methods----------------------------------------------------
 */

    var persist = function(key, securedData, extendedInfo) {
        return child.persist(key, securedData, extendedInfo);
    };

    var recover = function(key, extendedInfo) {
        return child.recover(key, extendedInfo);
    };

    var remove = function(key, extendedInfo) {
        return child.remove(key, extendedInfo);
    };
    
/**
 * Asinchronous response-----------------------------------------------
 */
    /*
     * Returns an object that contains conn info and
     * wrapped callbacks based on storage operation
     */
    var connConfig = function(extendedInfo, storageOperation){
        var processedConnConfig = undefined; //var processedConnConfig;
        
        if(extendedInfo !== undefined){
            processedConnConfig = {};
            processedConnConfig.gatewayUrl = extendedInfo.gatewayUrl;
            processedConnConfig.commLayer = extendedInfo.commLayer;

            storageOperation = VoxStringHelper.ucfirst(storageOperation)
            var successCallBackName = 'on' + storageOperation + 'Success';
            var errorCallBackName = 'on' + storageOperation + 'Error';
            
            processedConnConfig.onSuccess = getWrappedCallBack(extendedInfo, successCallBackName);
            processedConnConfig.onError = getWrappedCallBack(extendedInfo, errorCallBackName);
        }
        
        return processedConnConfig;
    }
    
    /*
     * Looks for a callback function on the object and returns
     * a wrapped version
     */
    var getWrappedCallBack = function(object, callBackName){
        var wrappedCallBack = undefined; //var wrappedCallBack;
        
        var callBack = object[callBackName];
        
        if(callBack === undefined){
            console.log(callBackName + ' no definido. Pasando a manejador por defecto');
            callBack = function(response){
                var cbn = callBackName;
                console.log(cbn + ' por defecto lanzado');
                //trigger(cbn, response); //xq esto no anda??? contexto puto
            }
        }else{
            console.log(callBackName + ' encontrado');
        }
        
        //will create a new copy of wrappedWithFormater with its own callback attribute???
        wrappedCallBack = new wrappedWithFormater(callBack);
        //catchedCallBack.callBack = callBack;
        
        return wrappedCallBack;
    }
    
    /*
     * Wraps the callback so it catches the response, formats it 
     * and then calls the orignal callback with the formated data
     */
    var wrappedWithFormater = function(origCallBack){
        var callBack = origCallBack;
        
        return function(rawResponse){
            if(callBack !== undefined){
                console.log("Processing raw response...");
                var response = formatFromStorage(rawResponse);
                console.log("Resending processed response...");
                callBack(response);
            }else{
                console.log("Callback still UNdefined");
            }
        }
        
    }

/**
 * PUBLIC INTERFACE----------------------------------------------------
 */
    
    
    return VoxClass.Class(
        'VoxSingleStorage',
        null,
        {
            constructor: constructor,
            load: load,
            save: save,
            erase: erase,
            setChild : setChild
        }
        
        
    );
});
