/**
 * Manages a collection of VoxObjects.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass',
    'voxine/core/VoxMediator.class'
    ], 
    function(VoxClass, VoxMediator) {

        /* Private */
        var undefined;

        /**
         * Class Constructor.
         * @public
         */
        var constructor = function(filter, options) {
            this.setOptions(options);
            this.filter = filter;
            this.collection = [];
            this.length = 0;
            var mediator = new VoxMediator();
            mediator.mixin(this);
        };
        
        /**
         * Return collection options. Ex. {silentMode: false}
         * @public
         * @return Object
         */
        var getOptions = function() {
            return this.options;
        }
        
        /**
         * Set collection options. Ex. {silentMode: false}
         * @param Object options : {silentMode: true/false} used for event triggering.
         * @public
         */
        var setOptions = function(options) {
            this.options = (options === null || options === void 0) ? {} : options;
        }

        /**
         * Collection - Add method.
         * @param VoxObject object: Object to be added.
         * @return true if object could be added. Otherwise false.
         * @public
         */
        var addItem = function(/* VoxObject */ object) {
            if (this.getItem(object.getId())) {
                throw "Duplicate object. Object with Id = " + object.getId() + " already exists.";
            }
            this.collection[object.getId()] = object;
            this.length++;
            if (!this.getOptions().silentMode) {
                this.trigger('itemAdded');
            }
            return true;
        };
        
        /**
         * Returns collection size
         * @return Integer
         * @public
         */
        var getSize = function() {
            return this.length;
        }

        /**
         * Get an item from the collection
         * @param id:  Object Id
         * @return VoxObject: The object found, otherwise null.
         * @public
         */
        var getItem = function(id) {
            if (this.collection[id] !== undefined) {
                return this.collection[id];
            }
            return null;
        };
        
        /**
         * Removed an item from the collection.
         * @param id: Object Id
         * @return boolean: true if the item is removed, false if a problem exists.
         * @public
         */
        var removeItem = function(id) {
            if (this.collection[id] !== undefined) {
                var item = this.collection[id];
                this.collection[id] = undefined;
                if (!item.getOptions().silentMode) {
                    this.trigger('itemRemoved');
                }
                return true;
            }
            return false;
        };

        /**
         * Removes all items from the collection an set default values.
         * @public
         */
        var reset = function() {
            this.length = 0;
            this.collection = [];
            this.filter = null;
            //Collection silent mode.
            if (!this.options.silentMode) {
                this.trigger('collectionReseted');
            }
        };

        /**
         * Filters the object collection returning a new collection filtered.
         * @param VoxFilter filter
         * @return VoxObjectCollection filteredCollection.
         * @public
         */
        var filter = function(/* VoxFilter */ filter) {
            //TODO
        };
        
        return VoxClass.Class(
            'VoxObjectCollection',
            null,
            {
                constructor: constructor,
                getOptions: getOptions,
                setOptions: setOptions,
                addItem: addItem,
                getSize: getSize,
                getItem: getItem,
                removeItem: removeItem,
                reset: reset,
                filter: filter
            }
        );
});
