/**
 * Tests for VoxObject Class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define(
    [
        'voxine/model/VoxObject.class',
        'voxine/storage/VoxStorageFactory.class'
    ],
    function(VoxObject, VoxStorageFactory) {
        
        /**
         * Automatic unique id creation test.
         * @coverage: getInstance, constructor
         */
        var automaticUniqueObjectId = function() {
            
            var instance1 = new VoxObject('session', 'AD82KLM20EFN');
            var instance2 = new VoxObject('local', 'Asf3efdfasdf');
            console.assert(instance1.getObjectId() === 1);
            console.assert(instance2.getObjectId() === 2);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        
        /**
         * Testing options for the class.
         * @coverage constructor, getOptions, setOptions
         */
        var optionsTests = function() {
            
            //Tests null options.
            var testInstance = new VoxObject('local', 'key1234');
            console.assert(testInstance.getOptions() === Object(testInstance.getOptions()));
            
            //Tests with options
            testInstance = new VoxObject('session', 'key12345', {silentMode: true});
            console.assert(testInstance.getOptions().silentMode === true);

            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Testing init values.
         * @coverage: getStorageKey, getStorageType, constructor validation.
         * 
         */
        var initValues = function() {
            
            //Check invalid type exception.
            try {
                var testInstance = new VoxObject('invalidType', 'key000', {silentMode: false});
            } catch(e) {
                console.assert(e === "Invalid Storage Type");
            }
            
            //Checks type and key.
            testInstance = new VoxObject('local', 'key1234', {silentMode: false});
            console.assert(testInstance.getStorageKey() === 'key1234');
            console.assert(testInstance.getStorageType() === 'local');
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Tests for collection key associations.
         * @coverage: setCollection, getAssociatedCollectionKeys,
         *            belongsToCollection, removeAssociation,
         *            removeAllAssociations, hasCollectionAssociation
         */
        var testKeyAssociation = function() {
            var testInstance = new VoxObject('local', 'key1234', {silentMode: false});
            testInstance.setCollection(['ck1', 'ck2', 'ck3']);
            
            //Test multiple key association
            console.assert(testInstance.getAssociatedCollectionKeys().length === 3);
            
            //Test single key association
            testInstance.setCollection('ck4');
            console.assert(testInstance.getAssociatedCollectionKeys().length === 4);
            
            //Belongs to collection
            console.assert(testInstance.belongsToCollection("ck3") === 2);
            console.assert(testInstance.belongsToCollection("ck5") === false);
            
            //Remove one item
            testInstance.removeAssociation("ck2");
            console.assert(testInstance.belongsToCollection("ck2") === false);
            
            //Remove multiple items
            console.assert(testInstance.removeAssociation(["ck1", "ck3"]) === true);
            
            //Remove no complete
            testInstance.setCollection('ck11');
            console.assert(testInstance.removeAssociation(["ck11", "ck33"]) === false);
            
            //remove all
            testInstance.removeAllAssociations();
            console.assert(testInstance.hasCollectionAssociation() === false);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Object storage save test.
         * @coverage: save
         */
        var saveTest = function() {
            //Local Storage
            var testInstance = new VoxObject('local', 'key1234', {silentMode: false});
            testInstance.save();
            
            //Remote Storage
            //** TODO **
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Object storage load test.
         * @coverage: load
         */
        var loadTest = function() {
            var factory = new VoxStorageFactory();
            
            //Local Storage
            var storage = factory.getStorage('local');
            
            //Existing stored object.
            var object = storage.load("key1234");
            object.options.loadedFromStorage = true;
            var voxObjectInstance = new VoxObject(object.storageType, object.storageKey, object.options);
            voxObjectInstance.setObjectId(object.objectId);
            voxObjectInstance.setCollection(object.associatedCollectionKeys);
            console.assert(voxObjectInstance.getStorageKey() === 'key1234');
            
            //Non existing stored object
            object = storage.load("keyNonExisting");
            console.assert(object == null);
            
            
            //Remote Storage
            // ** TODO **
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Object remove test
         * @coverage: remove
         * 
         */
        var removeTest = function() {
            var factory = new VoxStorageFactory();
            var storage = factory.getStorage('local');
            var object = storage.load("key1234");
            object.options.loadedFromStorage = true;
            console.assert(object === Object(object));
            
            var voxObjectInstance = new VoxObject(object.storageType, object.storageKey, object.options);
            voxObjectInstance.setObjectId(object.objectId);
            voxObjectInstance.setCollection(object.associatedCollectionKeys);
            voxObjectInstance.remove();
            object = storage.load("key1234");
            console.assert(object == null); //was removed.
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        return  {
            automaticUniqueObjectId: automaticUniqueObjectId,
            optionsTests: optionsTests,
            initValues: initValues,
            testKeyAssociation: testKeyAssociation,
            saveTest: saveTest,
            loadTest: loadTest,
            removeTest: removeTest
        };
    }
);
