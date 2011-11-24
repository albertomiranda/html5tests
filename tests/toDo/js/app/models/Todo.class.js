/**
 * Todo object.
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([
        'VoxClass',
        'voxine/model/VoxObject.class'
    ],
    function(VoxClass, VoxObject) {
    
        var constructor = function(storageType, storageKey, options, done, activity) {
            this.done = done || false;
            this.activity = activity || 'empty to-do';
        };
        
        var toggle = function() {
            this.done = !this.done;
            this.trigger("todo:toogle", this.done);
        };
        
        var prune = function() {
            return {
                done : this.done,
                activity : this.activity,
                storageKey: this.storageKey, 
                storageType: this.storageType,
                clientKey: this.clientKey,
                serverKey: this.serverKey,
                associatedKeys : this.associatedKeys,
                options : this.options,
                gatewayUrl : this.gatewayUrl,
                commLayer : this.commLayer
            }
        };

        return VoxClass.Class(
            'Todo',
            VoxObject,
            {
                constructor: constructor,
                toggle : toggle,
                prune : prune
            }
        );
});
