/**
 * Tests for VoxStringHelper Class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define(
    [
        'voxine/tools/helpers/VoxStringHelper.class'
    ],
    function(VoxStringHelper) {
        
        /**
         * Test contains method.
         * @coverage: contains
         */
        var containTest = function() {
            console.assert(VoxStringHelper.contain("att", "pattern"));
            console.assert(VoxStringHelper.contain("z", "pattern") === false);
            console.assert(VoxStringHelper.contain(undefined, "source") === false);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Test equalToTest
         * @coverage: equalTo
         */
        var equalToTest = function() {
            console.assert(VoxStringHelper.equalTo("equal", "equal"));
            console.assert(VoxStringHelper.equalTo("pepe", "sapo") === false);
            console.assert(VoxStringHelper.equalTo(undefined, "sapo") === false);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        var performTest = function() {
            console.profile('VoxStringHelperTest');
            VoxStringHelper.contain("att", "pattern");
            VoxStringHelper.equalTo("A", "B");
            console.profileEnd();
        };
        performTest();
        
        return  {
            containTest: containTest,
            equalTo: equalToTest
        };
    }
);
