/**
* Framework Tests.
* This is a tests hub where all available tests are published to public
* interface to be used.
*
* @author Alberto Miranda <alberto@nextive.com>
* @author Esteban Abait <esteban.abait@nextive.com>
*/
define(
    [
        'jQuery',
        'voxine/tests/VoxViewTest.class',
        'voxine/tests/VoxMediatorTest.class',
        'voxine/tests/VoxObjectTest.class',
        'voxine/tests/VoxStorageTest.class'
    ],
    function (
        $,
        VoxViewTest,
        VoxMediatorTest,
        VoxObjectTest,
        VoxStorageTest
    ) {
        /**
* Runs the collection of tests specified by parameter
*
* @param {array} tests
* @author Esteban S. Abait <esteban.abait@nextive.com>
*/
        var runTest = function(tests) {
            var i, l, test;
            
            for (i=0, l = tests.length; i < l; ++i) {
                console.group('Running tests for ' + tests[i]);
                var objectData = this[tests[i]];
                for (var t in objectData) {
                    if (typeof objectData[t] == "function") {
                        console.info('----Running test case "' + t + '"');
                        objectData[t]();
                        console.log('-----------------------------------');
                    }
                };
                console.groupEnd();
            };
        };
        var runAll = function() {
            this.runTest(["VoxView",
                          "VoxMediator",
                          "VoxObject",
                          "VoxStorage"
                          ]);
        }
        return {
            runTest : runTest,
            runAll : runAll,
            VoxView: VoxViewTest,
            VoxMediator: VoxMediatorTest,
            VoxObject: VoxObjectTest,
            VoxStorage: VoxStorageTest
        };
    }
);

