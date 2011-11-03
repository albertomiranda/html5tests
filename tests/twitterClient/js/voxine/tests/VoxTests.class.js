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
        'voxine/tests/VoxStorageTest.class',
        'voxine/tests/VoxControllerTest.class'
    ],
    function (
        $,
        VoxViewTest,
        VoxMediatorTest,
        VoxObjectTest,
        VoxStorageTest,
        VoxControllerTest
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
                    if (Object.prototype.toString.call(objectData[t]) == '[object Function]') {
                        console.info('----Running test case "' + t + '"');
                        try {
                            objectData[t]();
                        } catch (e) {
                            console.error("There was an error executing the function " + t, e);
                        }
                        
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
                          "VoxStorage",
                          "VoxController"
                          ]);
        }
        return {
            runTest : runTest,
            runAll : runAll,
            VoxView: VoxViewTest,
            VoxMediator: VoxMediatorTest,
            VoxObject: VoxObjectTest,
            VoxStorage: VoxStorageTest,
            VoxController: VoxControllerTest
        };
    }
);

