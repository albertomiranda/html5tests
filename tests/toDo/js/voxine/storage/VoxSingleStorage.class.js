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
            formatForStorage(object), 
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

    var formatForStorage = function(object){
        var storableData = serialize(object);
        return storableData;
    }
    
    var formatFromStorage = function(storableData){
        var data = unserialize(storableData);
        return data;
    }
    
    var serialize = function(object) {
        var str;
            
        if(object.toJSON !== undefined){
            str = object.toJSON();
        }else{
            str = JSON.stringify(object.prune());
        }
        
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
    var connConfig = function(object, storageOperation){
        var processedConnConfig;
        
        if(object !== undefined){
            processedConnConfig = {};
            processedConnConfig.toString = function(){return 'processedConnConfig';};
            processedConnConfig.gatewayUrl = object.gatewayUrl;
            processedConnConfig.commLayer = object.commLayer;

            storageOperation = VoxStringHelper.ucfirst(storageOperation)
            var successCallBackName = 'on' + storageOperation + 'Success';
            var errorCallBackName = 'on' + storageOperation + 'Error';
            
            processedConnConfig.onSuccess = 
                getWrappedCallBack.apply(this, [object, successCallBackName]);
            processedConnConfig.onError = 
                getWrappedCallBack.apply(this, [object, errorCallBackName]);
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
        var formater = getFormaterOrDefault.apply(this, [object]);
        var callbackContext = object;//si es default callback lo ignora
        
        var wrappedCallBack = 
            new VoxStorageCallbackProxy(callBack, formater, callbackContext).getProxy();
        
        return wrappedCallBack;
    }
    
    var getFormaterOrDefault = function(object){
        return (object.fromJSON !== undefined)
            ? object.fromJSON
            : formatFromStorage;
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
