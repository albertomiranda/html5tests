/**
 * Generic helper. Not sure how to name your helper? Put your methods here! =P
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['VoxClass'], 
    function(VoxClass) {
        /**
         * Merges object2 inside object1 overwriting properties already on
         * object1.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object obj1
         * @param object obj2
         * @return object
         */
        var mergeObject = function(obj1, obj2){
            for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
            return obj1;
        };
    
        //----------------------------------------------------------------------
        //PUBLIC INTERFACE
        return VoxClass.Class(
            'VoxTools',
            null,
            {
                mergeObject: mergeObject
            }
        //----------------------------------------------------------------------
    );
});
