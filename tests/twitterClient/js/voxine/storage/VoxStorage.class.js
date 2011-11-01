/**
 * VoxStorage.class
 * 
 * Handle generic storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass'
    ], 
    function(VoxClass) {

/**
 * PRIVATE----------------------------------------------------------
 */
        
        var save = function(key, object) {
            var storableObject = this.serialize(object);
            var securedObject = this.secure(storableObject);
            this.persist(key, securedObject);
        };
        
        var load = function(key) {
            var securedObject = this.recover(key);
            var storableObject = this.unsecure(securedObject);
            return this.unserialize(storableObject);
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
        
        //TODO virtual: redefine for specific storage
        var persist = function(key, securedObject) {
        };
        
        //TODO virtual: redefine for specific storage
        var recover = function(key) {
        };
                
		
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        //it this necesary? if it were real OOP this would be a virtual class
        //never instantiated

    }
);
