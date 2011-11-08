/**
 * Test model user to test VoxObject.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass',
    'voxine/model/VoxObject.class'
    ], 
    
    function(VoxClass, VoxObject) {
        
        var constructor = function(id, name, email) {
            this.setId(id);
            this.setName(name);
            this.setEmail(email);
        };
        
        var setId = function(id) {
            this.id = id;
        };
        
        var getId = function() {
            return this.id;
        };
        
        var setName = function(name) {
            this.name = name;
        };
        
        var getName = function() {
            return this.name;
        };
        
        var setEmail = function(email) {
            //Email could be validated using a helper.
            this.email = email;
        };
        
        var getEmail = function() {
            return this.email;
        };
        
        
        return VoxClass.Class(
            'User',
            VoxObject,
            {
                constructor: constructor,
                setId: setId,
                getId: getId,
                setName: setName,
                getName: getName,
                setEmail: setEmail,
                getEmail: getEmail
            }
        );
    }
);
