/**
 * Framework Tests: VoxMediator
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['Voxine/model/VoxObject.class'],
    function(VoxObject) {
        /**
         * Test VoxObject Creation.
         */
        var voxObjectTest = function() {
            var instance1 = VoxObject.getInstance('remote', 'AD82KLM20EFN');
            var instance2 = VoxObject.getInstance('local', 'Asf3efdfasdf');
            console.log('VoxObject instance created: ID->' + instance1.getObjectId());
            console.log('VoxObject instance created: ID->' + instance2.getObjectId());
        };
        
        return  {
            "default": voxObjectTest
        };
    }
);
