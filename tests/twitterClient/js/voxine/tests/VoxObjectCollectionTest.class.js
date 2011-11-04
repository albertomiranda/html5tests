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
         * Creation and init values.
         * @coverage: constructor, getOptions, setOptions, getSize
         */
        var createNewCollection = function() {
            var filter = new VoxFilter({id:"1", name: "Test"});
            collection = new VoxObjectCollection(filter, {silentMode: false});
            console.assert(collection.getOptions().silentMode === false);
            console.assert(collection.getSize() === 0);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Add items test
         * @coverage: addItem
         */
        var addItem = function() {
            var objInstance = new VoxObject('local', 'key1234', {silentMode: false});

            //Test adding a new element.
            collection.addItem(objInstance);
            console.assert(collection.getSize() === 1);
            
            //Test adding an existing element
            try {
                collection.addItem(objInstance);
            } catch (e) {
                console.assert(e === "Duplicate object. Object with Id = 6 already exists.");
            }
            
            //TODO: Test silentMode false and true
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Get items test
         * @coverage: getItem
         */
        var getItem = function() {
            var objInstance = new VoxObject('remote', 'key5678', {silentMode: false});
            collection.addItem(objInstance);
            
            //Test existing item.
            console.assert(objInstance === collection.getItem(objInstance.getId()));
            
            //Test non existing item.
            console.assert(collection.getItem(0) === null);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        return  {
            createNewCollection: createNewCollection,
            addItem: addItem,
            getItem: getItem
        };
    }
);