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
    var className = 'VoxMultiStorage';

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
    var save = function(object) {
        var i;
        var size = targets.length;
        
        for (i = 0; i < size; ++i) {
            targets[i].save(object);
        }
    };

    var load = function(object) {
        var data = null;
        
        var i;
        var size = targets.length;
        
        for (i = 0; i < size; ++i) {
            data = targets[i].load(object);
            
            if(data != null){
                break;
            }
        }
        
        return data;
    };
    
    var erase = function(object){
        var i;
        var size = targets.length;
        
        for (i = 0; i < size; ++i) {
            targets[i].erase(object);
        }
    }

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
            addTarget : addTarget
        }
        
        
    );
});
