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
         * Automatic unique id creation test.
         * @coverage: getInstance, constructor
         */
        var automaticUniqueObjectId = function() {
            
            var instance1 = VoxObject.getInstance('remote', 'AD82KLM20EFN');
            var instance2 = VoxObject.getInstance('local', 'Asf3efdfasdf');
            console.assert(instance1.getId() === 1);
            console.assert(instance2.getId() === 2);
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        
        /**
         * Testing options for the class.
         * @coverage constructor, getOptions, setOptions
         */
        var optionsTests = function() {
            
            //Tests null options.
            var testInstance = VoxObject.getInstance('local', 'key1234');
            console.assert(testInstance.getOptions() === Object(testInstance.getOptions()));
            
            //Tests with options
            testInstance = VoxObject.getInstance('remote', 'key12345', {silentMode: true});
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
                var testInstance = VoxObject.getInstance('invalidType', 'key000', {silentMode: false});
            } catch(e) {
                console.assert(e === "Invalid Storage Type");
            }
            
            //Checks type and key.
            testInstance = VoxObject.getInstance('local', 'key1234', {silentMode: false});
            console.assert(testInstance.getStorageKey() === 'key1234');
            console.assert(testInstance.getStorageType() === 'local');
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        }
        
        return  {
            automaticUniqueObjectId: automaticUniqueObjectId,
            optionsTests: optionsTests,
            initValues: initValues
        };
    }
);
