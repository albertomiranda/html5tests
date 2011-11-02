/**
 * VoxStorage.class
 * 
 * Handle generic storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define(['VoxClass'], function(VoxClass) {
/**
* PRIVATE----------------------------------------------------------
*/
    var save= function(key, object) {
        alarm("entre a save");
        var storableObject = this.serialize(object);
        var securedObject = this.secure(storableObject);
        this.persist(key, securedObject);
    };

    var load= function(key) {
        alarm("entre a load");
        var securedObject = this.recover(key);
        var storableObject = this.unsecure(securedObject);
        return this.unserialize(storableObject);
    };

    //TODO to json
    var serialize = function(object) {
        alarm("entre a serialize");
        return object;
    };

    //TODO from json
    var unserialize = function(object) {
        alarm("entre a unserialize");
        return object;
    };

    //TODO VoxSecurity.encrypt(string)
    var secure = function(object) {
        alarm("entre a secure");
        return object;
    };

    //TODO VoxSecurity.decrypt(string)
    var unsecure = function(object) {
        alarm("entre a unsecure");
        return object;
    };

    //TODO virtual: redefine for specific storage
    var persist = function(key, securedObject) {
        alarm("entre a persist virtual, malo, malo");

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
        alarm("entre a recover virtual, malo, malo");
    }

/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
    
    
    return VoxClass.Class(
        'VoxStorage',
        null,
        {
            load: this.load,
            save: this.save
        }
        
        
    );
});
