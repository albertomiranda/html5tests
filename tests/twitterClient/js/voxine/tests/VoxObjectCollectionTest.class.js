/**
 * Test for  VoxObjectCollection.class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(
    [
        'voxine/collection/VoxObjectCollection.class',
        'app/models/filter/UserFilter.class',
        'voxine/model/VoxObject.class',
        'app/models/User.class'
    ],
    function(VoxObjectCollection, UserFilter, VoxObject, UserModel) {
        
        var collection;
        
        /**
         * Creation and init values.
         * @coverage: constructor, getOptions, setOptions, getSize
         */
        var createNewCollection = function() {
            var filter = new UserFilter({id:"1", name: "Test", email:"youremail@mailify.com"});
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
                console.assert(e === "Duplicate object. Object with Id = " + objInstance.getObjectId() + " already exists.");
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
            console.assert(objInstance === collection.getItem(objInstance.getObjectId()));
            
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
            console.assert(collection.removeItem(objInstance.getObjectId()) === true);
            //Silent mode true
            objInstance = new VoxObject('local', 'silentModeTrue', {silentMode: true});
            console.log("%cSilent Mode -> True: Add and Remove actions shouldn't be showed", "color:#0000FF; font-weight:bold;");
            collection.addItem(objInstance);
            console.assert(collection.removeItem(objInstance.getObjectId()) === true);
            
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
        
        var filterTest = function() {
            var filter = {
                id: '12',
                name: 'Sapo Pepe',
                email: 'testyoursapo@sapopepe.wtr'
            };
            var myFilter = new UserFilter(filter);
            console.log(myFilter);
            collection.reset();
            collection.addItem(new UserModel('local', 'stum1', {silentMode: false}, 1, "Juan Arribillaga", "juan.arribillaga@globant.com"));
            collection.addItem(new UserModel('local', 'stum2', {silentMode: false}, 2, "Ricardo Noir", "ricky@nob.com"));
            collection.addItem(new UserModel('local', 'stum3', {silentMode: false}, 3, "Rolando Schiavi", "rolo@bocajuniors.com.ar"));
            
            
            
            console.log(collection);
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