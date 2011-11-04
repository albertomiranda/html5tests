/**
 * VoxStorage.class
 * 
 * Handle generic storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass',
    'voxine/storage/VoxLocalStorage.class',
    'voxine/storage/VoxSessionStorage.class'
], 
function(VoxClass) {
    

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
        subTypeName = tName;
        childName = 'Vox' + ucfirststrict(tName) + className.slice(3);
    }
    
    var polymorphic = function (functionName)
    {
        var instance = getChild();
        var args = Array.prototype.slice.call(arguments).splice(1);
        
        return instance[functionName].apply(instance, args);
    }
    
    var ucfirststrict = function(str){
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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

    //TODO to json
    var serialize = function(object) {
        return object;
    };

    //TODO from json
    var unserialize = function(object) {
        return object;
    };

    //TODO VoxSecurity.encrypt(string)
    var secure = function(object) {
        return object;
    };

    //TODO VoxSecurity.decrypt(string)
    var unsecure = function(object) {
        return object;
    };

    var persist = function(key, securedObject) {
        polymorphic("persist", key, securedObject);
    };

    var recover = function(key) {
        return polymorphic("recover", key);
    };

/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
    
    
    return VoxClass.Class(
        className,
        null,
        {
            load: load,
            save: save,
            setSubType : setSubType
        }
        
        
    );
});
