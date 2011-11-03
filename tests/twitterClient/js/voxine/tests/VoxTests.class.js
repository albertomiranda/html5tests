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
        'voxine/tests/VoxViewTest.class',
        'voxine/tests/VoxMediatorTest.class',
        'voxine/tests/VoxObjectTest.class'
    ],
    function (
        VoxViewTest,
        VoxMediatorTest,
        VoxObjectTest
    ) {
        /**
         * Runs the collection of tests specified by parameter
         * 
         * @param {array} tests
         * @author Esteban S. Abait <esteban.abait@nextive.com>
         */
        var runTest = function(tests) {
            var i, l, test, filter, isUndef, isFunct;
            
            for (i=0, l = tests.length; i < l; ++i) {
                test = tests[i];
                
                if (test == void 0) continue;
                
                for (var t in test) {
                    isUndef = (t == void 0);
                    isFunct = Object.prototype.toString.call(test[t]) == '[object Function]';
                    if (!isUndef && isFunct)
                        test[t].call(test);
                };
            };
        };
        var runAll = function() {
            this.runTest([VoxViewTest,
                          VoxMediatorTest,
                          VoxObjectTest
                          ]);
        }
        return  {
            runTest : runTest,
            runAll : runAll,
            View: VoxViewTest,
            Mediator: VoxMediatorTest,
            Object: VoxObjectTest
        };
    }
);