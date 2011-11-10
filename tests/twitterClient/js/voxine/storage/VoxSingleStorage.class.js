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
        var storableData = serialize(data(object));
        var securedData = secure(storableData);
        persist(key(object), securedData, extendedInfo(object));
    };

    var load = function(object) {
        var securedData = recover(key(object), extendedInfo(object));
        var storableData = unsecure(securedData);
        return unserialize(storableData);
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
        return object;
    }
    

/**
 * Data processing----------------------------------------------------
 */

    var serialize = function(data) {
        var str = JSON.stringify(data);
        console.log("Serialized obj :" + str);
        return str;
    };

    var unserialize = function(string) {
        return JSON.parse(string);
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
 * PUBLIC INTERFACE-----------------------------------------------------------
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
