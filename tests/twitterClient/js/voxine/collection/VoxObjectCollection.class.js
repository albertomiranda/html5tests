/**
 * Manages a collection of VoxObjects.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(['VoxClass', 'voxine/model/VoxObject.class'], function(VoxClass, VoxObject) {
    
    /* Private */
    var undefined;
    
    /**
     * Class Constructor.
     * @public
     */
    var constructor = function(filter) {
        this.filter = filter;
        this.collection = [];
    };

    /**
     * @public
     */
    var addItem = function(id, /* VoxObject */ object) {
        this.collection.push[id];
        this.collection[id] = object;
    };

    /**
     * @public
     */
    var getItem = function(id) {
        if (this.collection[id] !== undefined) {
            return this.collection[id];
        }
        return null;
    };
    
    /**
     * @public
     */
    var removeItem = function(id) {
        if (this.collection[id] !== undefined) {
            this.collection[id] = undefined;
            return true;
        }
        return false;
    };
    
    /**
     * @public
     */ 
    var setCollection = function(/* Array */ elements) {
        var elementsCount = elements.length;
        for (var i = 0; i < elementsCount; ++i) {

        }
    };
    

    return VoxClass.Class(
        'VoxObjectCollection',
        VoxObject,
        {
            constructor: constructor,
            addItem: addItem,
            getItem: getItem,
            removeItem: removeItem,
            setCollection: setCollection
        }
    );
});

/*
 * + reset()
 * + filter(VoxFilter):VoxObjectCollection
 */
