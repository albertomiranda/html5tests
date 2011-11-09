/**
 * Tests for VoxStringHelper Class
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define(
    [
        'voxine/helpers/VoxStringHelper.class'
    ],
    function(VoxStringHelper) {
        
        /**
         * Test ucfirst method.
         * @coverage: ucfirst
         */
        var ucfirstTest = function() {
            console.assert(VoxStringHelper.ucfirst("test") === "Test");
            console.log('%cFinished', 'color: green; font-weight:bold;');
        }
        
        /**
         * Test contain method.
         * @coverage: contain
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
        
        /**
         * Performance measurement.
         */
        var performTest = function() {
            console.profile('VoxStringHelperTest');
            VoxStringHelper.ucfirst("myTest");
            VoxStringHelper.contain("att", "pattern");
            VoxStringHelper.equalTo("A", "B");
            console.profileEnd();
        };

        return  {
            ucfirstTest: ucfirstTest,
            containTest: containTest,
            equalToTest: equalToTest,
            performTest: performTest
        };
    }
);
