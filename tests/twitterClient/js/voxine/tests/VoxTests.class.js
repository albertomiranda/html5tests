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
        'voxine/tests/VoxConfigTest.class',
        'voxine/tests/VoxCommTest.class',
        'voxine/tests/VoxDefaultCommTest.class',
        'voxine/tests/VoxStringHelperTest.class',
        'voxine/tests/UserTest.class'
    ],
    function (
        $,
        VoxViewTest,
        VoxMediatorTest,
        VoxObjectTest,
        VoxObjectCollectionTest,
        VoxStorageTest,
        VoxControllerTest,
        VoxConfigTest,
        VoxCommTest,
        VoxDefaultCommTest,
        VoxStringHelperTest,
        UserTest
    ) {
        
        /**
         * Count the elements into the object
         */
        var countObjectElements = function(object) {
            var undefined;
            var objectLength = 0;
            if (object !== null && object !== undefined) {
               for (var element in object) {
                    objectLength++;
               }
            }
            return objectLength
        }
        
        /**
         * Runs the collection of tests specified by parameter
         *
         * @param {array} tests
         * @author Esteban S. Abait <esteban.abait@nextive.com>
        */
        var runTest = function(tests) {
            var i, l, testsLength, objectData, objectDataLength, groupLabel;
            
            console.group('New test run: ' + new Date());
            testsLength = tests.length;
            for (i=0, l = testsLength; i < l; ++i) {
                groupLabel = 'Running tests for ' + tests[i];
                objectData = this[tests[i]];
                objectDataLength = countObjectElements(objectData);
                
                //Checks if there are many elements and many tests.
                if (testsLength > 1 && testsLength * objectDataLength > 5 && i !== testsLength - 1) {
                    console.groupCollapsed(groupLabel);
                } else {
                    console.group(groupLabel);
                }
                
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
                          "VoxObjectCollection",
                          "VoxStorage",
                          "VoxController",
                          "VoxConfig",
                          "VoxStringHelper"
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
            VoxConfig: VoxConfigTest,
            VoxComm: VoxCommTest,
            VoxDefaultComm: VoxDefaultCommTest,
            VoxStringHelper: VoxStringHelperTest,
            UserTest: UserTest
        };
    }
);
