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
    var save = function(key, object) {
        var storableObject = serialize(object);
        var securedObject = secure(storableObject);
        persist(key, securedObject);
    };

    var load = function(key) {
        var securedObject = recover(key);
        var storableObject = unsecure(securedObject);
        return unserialize(storableObject);
    };
    
    var erase = function(key){
        remove(key);
    }

    var serialize = function(object) {
        var str = JSON.stringify(object);
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

    var persist = function(key, securedObject) {
        return child.persist(key, securedObject);
    };

    var recover = function(key) {
        return child.recover(key);
    };

    var remove = function(key) {
        return child.remove(key);
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
