/**
 * Test for  VoxObjectCollection.class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(
    [
        'voxine/collection/VoxObjectCollection.class',
        'voxine/collection/VoxFilter.class',
        'voxine/model/VoxObject.class'
    ],
    function(VoxObjectCollection, VoxFilter, VoxObject) {
        
        var collection = null;
        
        /**
         * Test VoxObjectCollection Creation.
         */
        var createNewCollection = function() {
            var filter = new VoxFilter({id:"1", name: "Test"});
            collection = new VoxObjectCollection(filter, {silentMode: false});
            console.assert(collection.getOptions().silentMode === false);
            console.assert(collection.getSize() === 0);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        var addItem = function() {
            var objInstance = VoxObject.getInstance('local', 'key1234', {silentMode: false});
            collection.addItem(objInstance);
            console.assert(collection.getSize() === 1);
        }
        
        return  {
            createNewCollection: createNewCollection,
            addItem: addItem
        };
    }
);