/**
 * Tests for VoxObject Class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define(
    [
        'voxine/model/VoxObject.class'
    ],
    function(VoxObject) {
        
        /**
         * Test for client and server Keys.
         * @coverage: constructor
         */
        var objectKeysTest = function() {
            var instance = new VoxObject('session', 'ss', {silentMode: false});
            console.assert(Object.prototype.toString.call(instance.clientKey) == '[object String]');
            console.assert(instance.serverKey === null);
            instance.serverKey = 23;
            console.assert(instance.serverKey !== null);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Testing options for the class.
         * @coverage constructor, getOptions, setOptions
         */
        var optionsTests = function() {
            
            //Tests null options.
            var testInstance = new VoxObject('local');
            console.assert(testInstance.options === Object(testInstance.options));
            //Tests with options
            testInstance = new VoxObject('session', "stK", {silentMode: true});
            console.assert(testInstance.options.silentMode === true);

            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Testing init values.getSt
         * @coverage: constructor validation.
         * 
         */
        var initValues = function() {
            
            //Check invalid type exception.
            try {
                var testInstance = new VoxObject('invalidType', 'stk',{silentMode: false});
            } catch(e) {
                console.assert(e === "VoxStorageFactory : Invalid Storage Type: invalidType");
            }
            
            //Checks type and key.
            testInstance = new VoxObject('local', 'stk', {silentMode: false});
            console.assert(testInstance.storageKey === 'stk');
            console.assert(testInstance.storageType === 'local');
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Tests for collection key associations.
         * @coverage: setCollection, getAssociatedCollectionKeys,
         *            belongsToCollection, removeAssociation,
         *            removeAllAssociations, hasCollectionAssociation
         */
        var testKeyAssociation = function() {
            var testInstance = new VoxObject('local', {silentMode: false});
            testInstance.setCollection(['ck1', 'ck2', 'ck3']);
            
            //Test multiple key association
            console.assert(testInstance.associatedKeys.length === 3);
            
            //Test single key association
            testInstance.setCollection('ck4');
            console.assert(testInstance.associatedKeys.length === 4);
            
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
         * Object storage load test.
         * @coverage: load, save
         */
        var loadAndSaveTest = function() {
            var objectToBeStored, objectToBeLoaded;
            //Save
            objectToBeStored = new VoxObject('local', 'stk1', {silentMode: false});
            console.log(objectToBeStored.clientKey, "1");
            objectToBeStored.save();
            console.log(objectToBeStored.clientKey, "2");
            //Load
            objectToBeLoaded = new VoxObject('local', 'stk1', {silentMode: false});
            console.log(objectToBeLoaded.clientKey, "3");
            objectToBeLoaded.load();
            console.log(objectToBeLoaded.clientKey, "4");
            
            //
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
            var objectToBeLoaded = new VoxObject('local', 'stk1', {silentMode: false});
            objectToBeLoaded.remove();
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        return  {
            objectKeysTest: objectKeysTest,
            optionsTests: optionsTests,
            initValues: initValues,
            testKeyAssociation: testKeyAssociation,
            loadAndSaveTest: loadAndSaveTest,
            removeTest: removeTest
        };
    }
);
