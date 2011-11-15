/**
 * VoxSingleStorage.class
 * 
 * Handle generic storage operations to one target
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass',
    'voxine/tools/VoxTools.class'
], 
function(VoxClass) {
    

/**
* POLYMORPHISM------------------------------------------------------
*/
    
    var child = null;
    var setChild = function(chld){child = chld;}
        
/**
* PRIVATE----------------------------------------------------------
*/
    var save = function(object) {
        persist(key(object), formatForStorage(data(object)), extendedInfo(object));
    };

    var load = function(object) {
        recover(key(object), extendedInfo(object));
    };
    
    var erase = function(object){
        remove(key(object), extendedInfo(object));
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
    
    var extendedInfo = function(object){
        return getExtendedInfo(object);
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
        var data = undefined;
        
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
        
        return obj;
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
    var getExtendedInfo = function(extendedInfo){
        var catchedExtendedInfo = undefined;
        
        if(extendedInfo !== undefined){
            catchedExtendedInfo = {};
            catchedExtendedInfo.gatewayUrl = extendedInfo.gatewayUrl;
            catchedExtendedInfo.commLayer = extendedInfo.commLayer;

            catchedExtendedInfo.onSuccess = getCatchedCallBack(extendedInfo.onSuccess);
            catchedExtendedInfo.onError = getCatchedCallBack(extendedInfo.onError);
        }
        
        return catchedExtendedInfo;
    }
    
    var getCatchedCallBack = function(callBack){
        var catchedCallBack = undefined;
        
        if(callBack !== undefined){
        //will create a new copy of processAndCallback with its own callback attribute???
            catchedCallBack = new processAndCallback(callBack);
            //catchedCallBack.callBack = callBack;
        }
        
        return catchedCallBack;
    }
    
    var processAndCallback = function(origCallBack){
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
            load: load,
            save: save,
            erase: erase,
            setChild : setChild
        }
        
        
    );
});
