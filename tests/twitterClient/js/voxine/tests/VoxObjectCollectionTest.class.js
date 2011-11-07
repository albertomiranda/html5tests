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
        
        var collection;
        
        /**
         * Creation and init values.
         * @coverage: constructor, getOptions, setOptions, getSize
         */
        var createNewCollection = function() {
            var filter = new VoxFilter({id:"1", name: "Test"});
            collection = new VoxObjectCollection('local', 'StKey123', {silentMode: false}, filter);
            console.assert(collection.getOptions().silentMode === false);
            console.assert(collection.getSize() === 0);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        
        var bindEvents = function() {
            collection.bind('collection:itemAdded', function(addedKey){
                console.warn("Item with key " + addedKey + " added");
            });
            collection.bind('collection:itemRemoved', function(removedKey){
                console.warn("Item with key " + removedKey + " removed");
            });
            collection.bind('collection:reseted', function(collectionKey){
                console.warn("Collection with key " + collectionKey + " reseted");
            });
        }
        
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
                console.assert(e === "Duplicate object. Object with Id = " + objInstance.getId() + " already exists.");
            }
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Get items test
         * @coverage: getItem
         */
        var getItem = function() {
            var objInstance = new VoxObject('session', 'key5678', {silentMode: false});
            collection.addItem(objInstance);
            //Test existing item.
            console.assert(objInstance === collection.getItem(objInstance.getId()));
            
            //Test non existing item.
            console.assert(collection.getItem(0) === null);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Test remove item function.
         * @coverage removeItem
         */
        var removeItem = function() {
            //Silent mode off
            var objInstance = new VoxObject('local', 'silentModeFalse', {silentMode: false});
            console.log("%cSilent Mode -> False: Add and Remove actions should be showed", "color:#0000FF; font-weight:bold;");
            collection.addItem(objInstance);
            console.assert(collection.removeItem(objInstance.getId()) === true);
            //Silent mode true
            objInstance = new VoxObject('local', 'silentModeTrue', {silentMode: true});
            console.log("%cSilent Mode -> True: Add and Remove actions shouldn't be showed", "color:#0000FF; font-weight:bold;");
            collection.addItem(objInstance);
            console.assert(collection.removeItem(objInstance.getId()) === true);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        var saveTest = function() {
            var objInstance = new VoxObject('local', '123ABC', {silentMode: false});
            collection.addItem(objInstance);
            objInstance = new VoxObject('local', '456ABC', {silentMode: false});
            collection.addItem(objInstance);
            objInstance = new VoxObject('local', '789ABC', {silentMode: false});
            collection.addItem(objInstance);
            
            collection.save();

            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Test reset and getSize functions
         * @coverage reset, getSize
         */
        var resetCollection = function() {
            var clonedCollection = Object();
            jQuery.extend(clonedCollection, collection);
            
            console.log("%cSilent Mode -> False: Reset event should be showed", "color:#0000FF; font-weight:bold;");
            collection.reset();
            console.assert(collection.getSize() === 0);
            
            console.log("%cSilent Mode -> False: Reset event should be showed", "color:#0000FF; font-weight:bold;");
            clonedCollection.setOptions({silentMode: true});
            clonedCollection.reset();
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        return  {
            createNewCollection: createNewCollection,
            bindEvents: bindEvents,
            addItem: addItem,
            getItem: getItem,
            removeItem: removeItem,
            resetCollection: resetCollection,
            saveTest: saveTest
        };
    }
);