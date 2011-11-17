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
    'voxine/tools/VoxTools.class',
    'voxine/storage/VoxStorageCallbackProxy.class'
], 
function(VoxClass, VoxStringHelper) {

    var className = 'VoxSingleStorage';
    
    /**
     * Class constructor.
     */
    var constructor = function() {
        var Mediator = new VoxMediator();
        Mediator.mixin(this);
        console.log('Constructed ' + className);
        console.log(this);
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
        persist(
            object.storageKey,
            formatForStorage(object.prune()), 
            connConfig(object, 'save'));
    };

    var load = function(object) {
        recover(
            object.storageKey,
            connConfig(object, 'load'));
    };
    
    var erase = function(object){
        remove(
            object.storageKey,
            connConfig(object, 'erase'));
    }

/**
 * Data Extraction----------------------------------------------------
 */
    var key = function(object){
        return object.storageKey;
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
        var data;
        
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
                    //LB: prefiero q devuelva el string sin procesar aunque sea
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
        var processedConnConfig;
        
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
        var wrappedCallBack;
        
        var callBack = object[callBackName];
        
        if(callBack === undefined){
            console.log(callBackName + ' no definido. Pasando a manejador por defecto');
            callBack = new defaultCallback(callBackName);
        }else{
            console.log(callBackName + ' encontrado');
        }
        
        wrappedCallBack = new VoxStorageCallbackProxy(callBack, formatFromStorage).proxy;
        
        return wrappedCallBack;
    }
    
    var defaultCallback = function(callBackName){
        var cbn = callBackName;
        return function(response){
            console.log(cbn + ' por defecto lanzado');
            console.log(this);
            trigger(cbn, response); //xq esto no anda??? contexto puto
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
            load: load,
            save: save,
            erase: erase,
            setChild : setChild
        }
        
        
    );
});
