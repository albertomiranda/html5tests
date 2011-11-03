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
        'voxine/tests/VoxObjectCollectionTest.class',
        'voxine/tests/VoxStorageTest.class',
        'voxine/tests/VoxControllerTest.class',
        'voxine/tests/VoxConfigTest.class'
    ],
    function (
        $,
        VoxViewTest,
        VoxMediatorTest,
        VoxObjectTest,
        VoxObjectCollectionTest,
        VoxStorageTest,
        VoxControllerTest,
        VoxConfigTest
    ) {
        /**
         * Runs the collection of tests specified by parameter
         *
         * @param {array} tests
         * @author Esteban S. Abait <esteban.abait@nextive.com>
        */
        var runTest = function(tests) {
            var i, l, test;
            
            console.group('New test run: ' + new Date());
            
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
            
            console.groupEnd();
        };
        var runAll = function() {
            this.runTest(["VoxView",
                          "VoxMediator",
                          "VoxObject",
                          "VoxObjectCollectionTest",
                          "VoxStorage",
                          "VoxController",
                          "VoxConfig"
                          ]);
        }
        return {
            runTest : runTest,
            runAll : runAll,
            VoxView: VoxViewTest,
            VoxMediator: VoxMediatorTest,
            VoxObject: VoxObjectTest,
            VoxObjectCollection: VoxObjectCollectionTest,
            VoxStorage: VoxStorageTest,
            VoxController: VoxControllerTest,
            VoxConfig: VoxConfigTest
        };
    }
);
