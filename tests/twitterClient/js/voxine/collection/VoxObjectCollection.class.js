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
            if (!this.options.silentMode && !object.options.silentMode) {
                this.trigger('collection:itemAdded', object.clientKey);
            }
            return true;
        };
        
        /**
         * Gives the position of an item.
         * @param int : key
         * @return integer or null
         * @public
         */
        var getItemPosition = function(key) {
            var i;
            var size = this.size;
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
                if (!this.options.silentMode && !item.options.silentMode) {
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
            if (!this.options.silentMode) {
                this.trigger('collection:reseted', this.clientKey);
            }
        };

        /**
         * Filters the object collection returning a new collection filtered.
         * @param Object filter : filter components must be named as VoxObject properties.
         * @param Boolean: if strict, will be search with equalTo method, otherwise contain.
         * @return VoxObjectCollection filteredCollection.
         * @public
         */
        var filterBy = function(filter, strict) {
            var prop, filteredCollection, i;
            var searching = true;
            var strictSearch = strict || false
            
            //Connection to be generated
            filteredCollection = new VoxObjectCollection(this.storageType, this.storageKey, this.options, this.filter);
            for (i = 0; i < this.size; ++i) {
                
                for (prop in filter) {
                    if (!strictSearch) {
                        searching = searching && VoxStringHelper.contain(filter[prop], this.collection[i][prop]);
                    } else {
                        searching = searching && VoxStringHelper.equalTo(filter[prop], this.collection[i][prop]);
                    }

                    if (!searching) {
                        //No matching method found, continues with next item.
                        break;
                    }
                }
                if (searching) {
                    //Object match with filter
                    filteredCollection.addItem(this.collection[i]);
                }
            }
            return filteredCollection
        };
        
        /**
         * Stringify can not be recursive. If the stringify method sees an 
         * object that contains a toJSON method, it calls that method, and 
         * stringifies the value returned. This allows an object to determine 
         * its own JSON representation.
         * 
         * Before persisted collection's objects are pruned in order to reduce
         * the amount of data to be saved.
         * 
         * @return {String} Object stringified.
         */
        var toJSON = function() {
            var collection = [];
            for (var i=0, l = this.collection.length; i<l; ++i) {
                collection[i] = this.collection[i].prune();
            };
            return JSON.stringify({
                storageKey: this.storageKey, 
                storageType: this.storageType,
                clientKey: this.clientKey,
                serverKey: this.serverKey,
                collection: collection,
                filter: this.filter,
                options: this.options
            });
        };
        
        var object = VoxClass.Class(
            'VoxObjectCollection',
            VoxObject,
            {
                constructor: constructor,
                addItem: addItem,
                getItem: getItem,
                getItemPosition: getItemPosition,
                removeItem: removeItem,
                reset: reset,
                filterBy: filterBy,
                toJSON: toJSON
            }
        );
        
        /**
         * Getter to return the size of the entire collection.
         * It is considered special because we can do the following:
         *    var collection = new VoxObjectCollection(...);
         *    console.log(collection.size)
         * instead of
         *    var collection = new VoxObjectCollection(...);
         *    var size = collection.collection.length;
         *    console.log(size);
         */
        object.prototype.__defineGetter__('size', function(){
            return this.collection.length;
        });
        
        return object;
});
