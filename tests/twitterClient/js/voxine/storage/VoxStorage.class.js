/**
 * VoxStorage.class
 * 
 * Handle generic storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define(['VoxClass'], function(VoxClass) {
/**
* POLYMORPHISM------------------------------------------------------
*/
    var child = null;
    var getChild = function(){
        if(child === null){
            child = new (childName)();
        }
        
        return child;
    }
    
    var className = 'VoxStorage';
    var subTypeName;
    var childName;
    
    var setSubType = function(tName){
        subTypeName = tName;
        childName = 'Vox' + ucfirst(tName) + className.slice(3);
    }
    
    var polymorphic = function (functionName)
    {
        var instance = getChild();
        var args = Array.prototype.slice.call(arguments).splice(2);
        return instance[functionName](args);
    }
    
    var ucfirst = function(str){
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    var executeFunction = function(object, functionName){
        isFunct = Object.prototype.toString.call(object[functionName]) == '[object Function]';
        if(isFunct){
            return object[functionName].call(object);
        }
        else{
            console.log('This is not an executable function');
        }
    }
    
    var executeFunctionByName = function (functionName, context /*, args */) {
        var args = Array.prototype.slice.call(arguments).splice(2);
        var namespaces = functionName.split(".");
        var func = namespaces.pop();
        for(var i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(this, args);
    }
    
/**
* PRIVATE----------------------------------------------------------
*/
    var save = function(key, object) {
        console.log("entre a save");
        var storableObject = serialize(object);
        var securedObject = secure(storableObject);
        persist(key, securedObject);
    };

    var load = function(key) {
        console.log("entre a load");
        var securedObject = recover(key);
        var storableObject = unsecure(securedObject);
        return unserialize(storableObject);
    };

    //TODO to json
    var serialize = function(object) {
        console.log("entre a serialize");
        return object;
    };

    //TODO from json
    var unserialize = function(object) {
        console.log("entre a unserialize");
        return object;
    };

    //TODO VoxSecurity.encrypt(string)
    var secure = function(object) {
        console.log("entre a secure");
        return object;
    };

    //TODO VoxSecurity.decrypt(string)
    var unsecure = function(object) {
        console.log("entre a unsecure");
        return object;
    };

    //TODO virtual: redefine for specific storage
    var persist = function(key, securedObject) {
        polymorphic("persist", key, securedObject);
        
        console.log("entre a persist virtual, malo, malo");

        /**
         * (Posible) Mecanismo para recuperar el tipo de storage:
         *  var persistanceType = arguments.callee.getPersistanceType(); 
         *  
         *  y con ese type resolver que objeto usar, si local, remoto...
         *  
         *  ver diagrama
         *  
         *  Esteban (idea de Alberto).
         */

    };

    //TODO virtual: redefine for specific storage
    var recover = function(key) {
        console.log("entre a recover virtual, malo, malo");
    };

/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
    
    
    return VoxClass.Class(
        className,
        null,
        {
            load: load,
            save: save
        }
        
        
    );
});
