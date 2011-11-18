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
    var constructor = function(concreteStorage) {
        this.child = concreteStorage;
        
        var Mediator = new VoxMediator();
        Mediator.mixin(this);
    };
     
/**
* PRIVATE----------------------------------------------------------
*/
    var save = function(object) {
        this.child.persist(
            object.storageKey,
            formatForStorage(object.prune()), 
            connConfig(object, 'save')
        );
    };

    var load = function(object) {
        this.child.recover(
            object.storageKey,
            connConfig(object, 'load')
        );
    };
    
    var erase = function(object){
        this.child.remove(
            object.storageKey,
            connConfig(object, 'erase')
        );
    };
    
/**
 * Data processing----------------------------------------------------
 */

    var formatForStorage = function(data){
        var storableData = serialize(data);
        //var securedData = secure(storableData);
        return storableData;
    }
    
    var formatFromStorage = function(securedData){
        var data;
        
        if(securedData !== undefined){
            //var storableData = unsecure(securedData);
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
       
        var callBack = object[callBackName];
        
        if(callBack === undefined){
            console.log(callBackName + ' no definido. Pasando a manejador por defecto');
            callBack = new defaultCallback(callBackName);
        }else{
            console.log(callBackName + ' encontrado');
        }
        
        var wrappedCallBack = new VoxStorageCallbackProxy(callBack, formatFromStorage).proxy;
        
        return wrappedCallBack;
    }
    
    var defaultCallback = function(callBackName){
        var cbn = callBackName;
        return function(response){
            console.log(cbn + ' por defecto lanzado');
            console.log(this);
            //trigger(cbn, response); //xq esto no anda??? contexto puto
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
            erase: erase
        }
        
        
    );
});
