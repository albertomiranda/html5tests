/**
 * VoxStorage.class
 * 
 * Handle generic storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define(['VoxClass'], function(VoxClass) {
    /**
     * PUBLIC ----------------------------------------------------------
     */
    return VoxClass.Class(
        'VoxStorage',
        null,
        {
            save: function(key, object) {
                var storableObject = this.serialize(object);
                var securedObject = this.secure(storableObject);
                this.persist(key, securedObject);
            },

            load: function(key) {
                var securedObject = this.recover(key);
                var storableObject = this.unsecure(securedObject);
                return this.unserialize(storableObject);
            },

            //TODO to json
            serialize: function(object) {
                return object;
            },

            //TODO from json
            unserialize: function(object) {
                return object;
            },

            //TODO VoxSecurity.encrypt(string)
            secure: function(object) {
                return object;
            },

            //TODO VoxSecurity.decrypt(string)
            unsecure: function(object) {
                return object;
            },

            //TODO virtual: redefine for specific storage
            persist: function(key, securedObject) {
                
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
                
            },

            //TODO virtual: redefine for specific storage
            recover: function(key) {
            }
        }
    );
});
