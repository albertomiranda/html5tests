/**
 * VoxPolyfillsLoader.class
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
        
        var defaultCallback = function(toLoad) {
            var i, l;
            
            console.group("Loaded polifylls:");
            for (i = 0, l = toLoad.length; i < l; ++i) {
                console.log(toLoad[i]);
            };
            console.groupEnd();
        };
        
        /**
         * 
         * @param   {array of object} 
         * @param   {function} callback on require success   
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
            var toCall = (typeof callback == 'undefined') ? defaultCallback : callback;
            if (toLoad.length > 0)
                require(toLoad, toCall(toLoad));
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
