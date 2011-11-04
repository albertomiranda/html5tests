/**
 * VoxPolyfillsLoader.class
 * 
 * Provides a simple interface to asynchronically load scripts. 
 * Its main goal is to load polyfills.
 * Used in conjunction with Modernizr, for example:
 * 
 * var loader = new Polyfills();
 * loader.yepnope ([
 *     {
 *         test : Modernizr.localstorage,
 *         nope : 'lib/storage_polyfill/sessionstorage.1.4',
 *     }               
 * ]);
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    [
     'VoxClass'
    ], 
    function(VoxClass) {
        /**
         * PRIVATE METHODS----------------------------------------------------------
         */
        
        /**
         * Default callback. Just prints to the console the loaded
         * polyfills.
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var defaultCallback = function(toLoad) {
            var i, l;
            
            console.group("Loaded polifylls:");
            for (i = 0, l = toLoad.length; i < l; ++i) {
                console.log(toLoad[i]);
            };
            console.groupEnd();
        };
        
        /**
         * Uses require method to load polyfills.
         * Takes as input an array of objects with the following
         * structure
         * 
         * {
         *     test: {boolean}, //a feature detection test result such as: Modernizr.localstorage
         *     yep: {string},   //the path to the script to load in case test is true
         *     nope: {string},  //the path to the script to load in case test is false
         *     callback: {function} //a callback, if undefined the 'defaultCallback' will be used
         * }
         * 
         * @param   {array of object} 
         * @param   {function} callback on require success   
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var yepnope = function(testObjects, callback) {
            var test, yep, nope, i, l;
            var toLoad = [];
            
            for (i = 0, l = testObjects.length; i < l; ++i) {
                test = testObjects[i].test;
                yep = testObjects[i].yep;
                nope = testObjects[i].nope;
                
                if (test && yep) {
                    toLoad.push(yep);
                } else 
                    if (!test && nope) {
                        toLoad.push(nope);
                    }
            }
            var toCall = callback || defaultCallback;
            if (toLoad.length > 0) {
                require(toLoad, toCall(toLoad));
            }
        }
        
        /**
         * PUBLIC INTERFACE--------------------------------------------------------------
         */
        return VoxClass.Class(
            'VoxPolyfillsLoader',
            null,
            {   
                yepnope: yepnope
            }
        );  
    }
);
