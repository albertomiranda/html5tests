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
            connConfig.apply(this, [object, 'save'])
        );
    };

    var load = function(object) {
        this.child.recover(
            object.storageKey,
            connConfig.apply(this, [object, 'load'])
        );
    };
    
    var erase = function(object){
        this.child.remove(
            object.storageKey,
            connConfig.apply(this, [object, 'erase'])
        );
    };
    
/**
 * Data processing----------------------------------------------------
 */

    var formatForStorage = function(data){
        var storableData = serialize(data);
        return storableData;
    }
    
    var formatFromStorage = function(storableData){
        var data = unserialize(storableData);
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
            processedConnConfig.toString = function(){return 'processedConnConfig';};
            processedConnConfig.gatewayUrl = extendedInfo.gatewayUrl;
            processedConnConfig.commLayer = extendedInfo.commLayer;

            storageOperation = VoxStringHelper.ucfirst(storageOperation)
            var successCallBackName = 'on' + storageOperation + 'Success';
            var errorCallBackName = 'on' + storageOperation + 'Error';
            
            processedConnConfig.onSuccess = 
                getWrappedCallBack.apply(this, [extendedInfo, successCallBackName]);
            processedConnConfig.onError = 
                getWrappedCallBack.apply(this, [extendedInfo, errorCallBackName]);
        }
        
        return processedConnConfig;
    }
    
    /*
     * Looks for a callback function on the object and returns
     * a wrapped version
     */
    var getWrappedCallBack = function(object, callBackName){
        var callBack = 
            getCallBackOrDefault.apply(this, [object, callBackName]);
        var wrappedCallBack = 
            new VoxStorageCallbackProxy(callBack, formatFromStorage).getProxy();
        
        return wrappedCallBack;
    }
    
    var getCallBackOrDefault = function(object, callBackName){
        var foundCallBack = object[callBackName];
       
        if(foundCallBack === undefined){
            console.log(callBackName + ' no definido. Pasando a manejador por defecto');
            foundCallBack = getDefaultCallback.apply(this, [callBackName]);
        }else{
            console.log(callBackName + ' encontrado');
        }
        
        return foundCallBack;
    }
    
    var getDefaultCallback = function(callBackName){
        var cbn = callBackName;
        var context = this;//cacheo para q no pierda contexto
        
        return function(response){
            console.log(cbn + ' por defecto lanzado');
            context.trigger(cbn, response);
        }
    }

/**
 * PUBLIC INTERFACE----------------------------------------------------
 */
    var toString = function(){
        var str = className;
        if(this.child !== undefined){
            str += ' ( ';
            str += this.child.toString();
            str +=  ' )';
        }
        
        return str;
    }
    
    return VoxClass.Class(
        className,
        null,
        {
            constructor: constructor,
            load: load,
            save: save,
            erase: erase,
            toString : toString
        }
        
        
    );
});
