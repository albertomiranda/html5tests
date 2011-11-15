/**
 * Test model user to test VoxObject.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(
    [
        'VoxClass',
        'voxine/model/VoxObject.class'
    ], 
    function(VoxClass, VoxObject) {
        var constructor = function(storageType, storageId, options, id, name, email) {
            this.inherited(storageType, storageId, options);
            this.id = id;
            this.name = name;
            this.email = email;
        };
        
        var properties = {
            "name": null
        };
        
        var obj = VoxClass.Class(
            'User',
            VoxObject,
            {
                constructor: constructor
            }
        );
            
        /*
        obj.prototype.__defineGetter__("name", function(){
            return properties.name + " Rivers";
        });
        obj.prototype.__defineSetter__("name", function(name){
            return properties.name = name + " Setter";
        });
        */
        Object.defineProperty(obj, 'email', {
            get: function(){
                return 'got ' + properties.email;
            },
            set: function(email){
                properties.email = 'set ' + email;
            }
        });
        
        return obj;
    }
);
