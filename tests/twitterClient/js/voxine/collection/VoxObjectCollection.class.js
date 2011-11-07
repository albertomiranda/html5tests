/**
 * Manages a collection of VoxObjects.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass',
    'voxine/model/VoxObject.class'
    ], 
    function(VoxClass, VoxObject) {

        /* Private */
        var undefined;

        /**
         * Class Constructor.
         * @public
         */
        var constructor = function(storageType, storageKey, options, filter) {
            this.filter = filter;
            this.collection = [];
            this.length = 0;
        };

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
            object.setCollection(this.getStorageKey);
            this.length++;
            if (!this.getOptions().silentMode && !object.getOptions().silentMode) {
                this.trigger('collection:itemAdded', object.getStorageKey());
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
        };

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
         * @return boolean: true if the item was removed.
         * @public
         */
        var removeItem = function(id) {
            var item = this.getItem(id);
            var itemStorageKey = item.getStorageKey();
            if (item !== null) {
                this.collection.splice(id, 1);
                if (!this.getOptions().silentMode && !item.getOptions().silentMode) {
                    this.trigger('collection:itemRemoved', itemStorageKey);
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
            if (!this.getOptions().silentMode) {
                this.trigger('collection:reseted', this.getStorageKey());
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
        
        /**
         * Parses a json object and load a collection.
         * @param Object: Json to parse.
         * @public
         */
        var loadCollectionFromJson = function(json) {
            //TODO
        }
        
        
        return VoxClass.Class(
            'VoxObjectCollection',
            VoxObject,
            {
                constructor: constructor,
                addItem: addItem,
                getSize: getSize,
                getItem: getItem,
                removeItem: removeItem,
                reset: reset,
                filter: filter,
                loadCollectionFromJson: loadCollectionFromJson
            }
        );
});
