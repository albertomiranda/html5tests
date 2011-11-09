/**
 * VoxMultiStorage.class
 * 
 * Handle generic storage operations to multiple targets
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([
    'VoxClass',
    'voxine/helpers/VoxStringHelper.class'
    ], 
function(VoxClass, VoxStringHelper) {
    

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
        childName = 'Vox' + VoxStringHelper.ucfirst(tName) + className.slice(3);
    }
    
    var polymorphic = function (functionName)
    {
        var instance = getChild();
        var args = Array.prototype.slice.call(arguments).splice(1);
        
        return instance[functionName].apply(instance, args);
    }
        
/**
* Multiplicity------------------------------------------------------
*/
    var targets = [];
    var addTarget = function(storage){
        targets.push(storage);
    }
    
    var callAllTargets;

/**
* PRIVATE----------------------------------------------------------
*/
    var save = function(key, object) {
        var i;
        var size = targets.length;
        for (i = 0; i < size; ++i) {
            targets[i].save(key, object);
        }
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
