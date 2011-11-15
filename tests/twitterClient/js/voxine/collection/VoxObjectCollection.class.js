/**
 * Manages a collection of VoxObjects.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass',
    'voxine/model/VoxObject.class',
    'voxine/helpers/VoxStringHelper.class'
    ], 
    function(VoxClass, VoxObject, VoxStringHelper) {

        /* Private */
        var undefined;

        /**
         * Class Constructor.
         * @public
         */
        var constructor = function(storageType, storageKey, options, filter) {
            this.filter = filter;
            this.collection = [];
        };

        /**
         * Collection - Add method.
         * @param VoxObject object: Object to be added.
         * @return true if object could be added. Otherwise false.
         * @public
         */
        var addItem = function(/* VoxObject */ object) {
            if (this.getItem(object.clientKey)) {
                throw "Duplicate object. Object with Id = " + object.clientKey + " already exists.";
            }
            this.collection.push(object);
            object.setCollection(this.clientKey);
            if (!this.getOptions().silentMode && !object.getOptions().silentMode) {
                this.trigger('collection:itemAdded', object.clientKey);
            }
            return true;
        };
        
        /**
         * Returns collection size
         * @return Integer
         * @public
         */
        var getSize = function() {
            return this.collection.length;
        };
        
        /**
         * Gives the position of an item.
         * @param int : key
         * @return integer or null
         * @public
         */
        var getItemPosition = function(key) {
            var i;
            var size = this.getSize();
            for (i = 0; i < size; ++i) {
                if (this.collection[i].clientKey === key) {
                    return i;
                }
            }
            return null
        };
        
        /**
         * Get an item from the collection
         * @param id:  Object Id
         * @return VoxObject: The object found, otherwise null.
         * @public
         */
        var getItem = function(key) {
            var position = this.getItemPosition(key);
            if (position !== null) {
                return this.collection[position];
            }
            return null;
        }
        
        /**
         * Removed an item from the collection.
         * @param id: Object Id
         * @return boolean: true if the item was removed.
         * @public
         */
        var removeItem = function(key) {
            var itemPosition = this.getItemPosition(key);
            if (itemPosition !== null) {
                var item = this.getItem(key);
                var itemStorageKey = item.clientKey;
                this.collection.splice(itemPosition, 1);
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
            this.collection = [];
            this.filter = null;
            //Collection silent mode.
            if (!this.getOptions().silentMode) {
                this.trigger('collection:reseted', this.clientKey);
            }
        };

        /**
         * Filters the object collection returning a new collection filtered.
         * @param VoxFilter filter
         * @param Boolean: if strict, will be search with equalTo method, otherwise contain.
         * @return VoxObjectCollection filteredCollection.
         * @public
         */
        var filterBy = function(/* VoxFilter */ filter, strict) {
            var method, filteredCollection, i;
            var searching = true;
            var searchType = strict || false
            
            //Connection to be generated
            filteredCollection = new VoxObjectCollection(this.getStorageType(), this.getStorageKey(), this.getOptions(), this.filter);
            for (i = 0; i < this.getSize(); ++i) {
                for (method in filter) {
                    if (method.substr(0,3) === "get" && method !== "getInherited" && method !== "getJsonFilter") {
                            if (!searchType) {
                                searching = searching && VoxStringHelper.contain(filter[method](), this.collection[i][method]());
                            } else {
                                searching = searching && VoxStringHelper.equalTo(filter[method](), this.collection[i][method]());
                            }
                            
                            if (!searching) {
                                //No matching method found, continues with next item.
                                break;
                            }
                    }
                }
                if (searching) {
                    //Object match with filter
                    filteredCollection.addItem(this.collection[i]);
                }
            }
            return filteredCollection
        };
        
        var toJSON = function() {
            return JSON.stringify({
                storageKey: this.getStorageKey(), 
                storageType: this.getStorageType(),
                clientKey: this.clientKey,
                serverKey: this.serverKey,
                collection: this.collection,
                filter: this.filter,
                options: this.getOptions()
            });
        }
        
        return VoxClass.Class(
            'VoxObjectCollection',
            VoxObject,
            {
                constructor: constructor,
                getSize: getSize,
                addItem: addItem,
                getItem: getItem,
                getItemPosition: getItemPosition,
                removeItem: removeItem,
                reset: reset,
                filterBy: filterBy,
                toJSON: toJSON
            }
        );
});
