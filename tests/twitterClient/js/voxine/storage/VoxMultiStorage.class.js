/**
 * VoxMultiStorage.class
 * 
 * Handle generic storage operations to multiple targets
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass'
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
    
    var className = 'VoxMultiStorage';
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
    };

    var load = function(key) {
    };
    
    var erase = function(key){
    }

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
