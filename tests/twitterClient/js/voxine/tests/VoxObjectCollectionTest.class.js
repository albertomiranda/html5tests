/**
 * Test for  VoxObjectCollection.class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(
    [
        'voxine/collection/VoxObjectCollection.class',
        'voxine/model/VoxObject.class',
        'app/models/User.class'
    ],
    function(VoxObjectCollection, VoxObject, UserModel) {
        
        var collection;
        
        /**
         * Creation and init values.
         * @coverage: constructor, getOptions, setOptions, getSize
         */
        var createNewCollection = function() {
            collection = new VoxObjectCollection('local', 'StKey123', {silentMode: false}, {name: 'Juan'});
            console.assert(collection.options.silentMode === false);
            console.assert(collection.size === 0);
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
            console.assert(collection.size === 1);
            
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
            console.assert(objInstance === collection.getItem(objInstance.clientKey));
            
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
            console.assert(collection.removeItem(objInstance.clientKey) === true);
            //Silent mode true
            objInstance = new VoxObject('local', 'silentModeTrue', {silentMode: true});
            console.log("%cSilent Mode -> True: Add and Remove actions shouldn't be showed", "color:#0000FF; font-weight:bold;");
            collection.addItem(objInstance);
            console.assert(collection.removeItem(objInstance.clientKey) === true);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        var saveTest = function() {
            collection.addItem(new VoxObject('local', 'stk', {silentMode: false}));
            collection.addItem(new VoxObject('local', 'stk', {silentMode: false}));
            collection.addItem(new VoxObject('local', 'stk', {silentMode: false}));
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
            console.assert(collection.size === 0);
            
            console.log("%cSilent Mode -> False: Reset event should be showed", "color:#0000FF; font-weight:bold;");
            clonedCollection.options = {silentMode: true};
            clonedCollection.reset();
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Tests for filter methods.
         * @coverage filterBy
         */
        var filterTest = function() {
            var filter = {
                name: 'Ju'
            };
            collection.options = {silentMode: true};
            collection.reset();
            collection.addItem(new UserModel('local', 'stum1', {silentMode: true}, 1, "Juan Arribillaga", "juan.arribillaga@globant.com"));
            collection.addItem(new UserModel('local', 'stum2', {silentMode: true}, 2, "Ricardo Rojaiju", "ricky@nob.com"));
            collection.addItem(new UserModel('local', 'stum3', {silentMode: true}, 3, "Rolando Schiavi", "rolo@bocajuniors.com.ar"));
            var filteredCollection = collection.filterBy(filter);
            console.assert(filteredCollection.size === 2);
            filteredCollection = collection.filterBy({name: 'Ju', email: 'zulma@lobato.com'}, true);
            console.assert(filteredCollection.size === 0);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        }
        
        return  {
            createNewCollection: createNewCollection,
            bindEvents: bindEvents,
            addItem: addItem,
            getItem: getItem,
            removeItem: removeItem,
            resetCollection: resetCollection,
            saveTest: saveTest,
            filterTest: filterTest
        };
    }
);