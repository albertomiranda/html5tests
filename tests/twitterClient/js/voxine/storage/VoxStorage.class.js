/**
 * VoxStorage.class
 * 
 * Handle generic storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass',
    'voxine/tools/VoxTools.class',
    'voxine/storage/VoxLocalStorage.class',
    'voxine/storage/VoxSessionStorage.class'
], 
function(VoxClass, VoxTools) {
    

/**
* POLYMORPHISM------------------------------------------------------
*/
    /*
     *
     *TODO: move responsability for creating specific storage
     *to factory if it requires more than just calling a constructor.
     *e.g if RemoteStorage requires to set parameters to the class
     *
     **/
    
    var child = null;
    var getChild = function(){
        if(child === null){
            child = new (window[childName])();
        }
        
        return child;
    }
    
    var className = 'VoxStorage';
    var subTypeName;
    var childName;
    
    var setSubType = function(tName){
        var tools = new VoxTools();
        subTypeName = tName;
        childName = 'Vox' + tools.ucfirst(tName) + className.slice(3);
    }
    
    var polymorphic = function (functionName)
    {
        var instance = getChild();
        var args = Array.prototype.slice.call(arguments).splice(1);
        
        return instance[functionName].apply(instance, args);
    }
        
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
        polymorphic("persist", key, securedObject);
    };

    var recover = function(key) {
        return polymorphic("recover", key);
    };

    var remove = function(key) {
        polymorphic("remove", key);
    };
    
/**
 * PUBLIC INTERFACE-----------------------------------------------------------
 */
    
    
    return VoxClass.Class(
        className,
        null,
        {
            load: load,
            save: save,
            erase: erase,
            setSubType : setSubType
        }
        
        
    );
});
