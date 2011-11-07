/**
 * Generalization of Models.
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define([
    'VoxClass', 
    'voxine/storage/VoxStorageFactory.class'
    ], 
    function(VoxClass, VoxStorageFactory) {

        var validStorages = ["local", "session"];
        var validStoragesCount = validStorages.length;

        /**
         * Class Constructor.
         * @private
         */
        var constructor = function(storageType, storageKey, options) {
            this.associatedCollectionKeys = [];
            this.setStorageType(storageType);
            this.setStorageKey(storageKey);
            this.setOptions(options);
            
            //Storage loaded.
            var factory = new VoxStorageFactory();
            this.storage = factory.getStorage(this.getStorageType());
            
            //add Mediator methods
            var mediator = new VoxMediator();
            mediator.mixin(this);
            
            //update objectIds
            if (!this.options.loadedFromStorage) {
                ++this.statics.objectId;
                this.setId(this.statics.objectId);
            }
            
        };
        
        /**
         * Return object options. Ex. {silentMode: false}
         * @public
         * @return Object
         */
        var getOptions = function() {
            return this.options;
        };
        
        /**
         * Set object options. Ex. {silentMode: false}
         * @param Object options : {silentMode: true/false} used for event triggering.
         * @public
         */
        var setOptions = function(options) {
            this.options = options || {};
        };
        
        /**
         * If the object belongs to a collection it will return the key associated.
         * @return String | Array if is not empty. Otherwise, null.
         * @public
         */
        var getAssociatedCollectionKeys = function() {
            return this.associatedCollectionKeys;
        };
        
        /**
         * Checks if the object belongs to a collection (by key)
         * @param String: Collection Key
         * @return Boolean | Integer: Element position if exists. Otherwise false. 
         */
        var belongsToCollection = function(collectionKey) {
            var i, size;
            size = this.associatedCollectionKeys.length;
            for (i = 0; i < size; ++i) {
                if (this.associatedCollectionKeys[i] === collectionKey) {
                    return i;
                }
            }
            return false;
        };
        
        /**
         * Used when you need check if the object has been associated to a collection.
         * @return boolean
         * @public
         */
        var hasCollectionAssociation = function() {
            return this.associatedCollectionKeys.length !== 0;
        };
        
        /**
         * Associates the object with a collection key.
         * @param String or Array : Collection key/s value/s.
         * @public
         */
         var setCollection = function(associatedKey) {
             var i, size;
             if (Object.prototype.toString.call(associatedKey) == '[object Array]') {
                 //Array ok keys received.
                 size = associatedKey.length;
                 for (i = 0; i < size; ++i) {
                     this.associatedCollectionKeys.push(associatedKey[i]);
                 }
             } else {
                 //Received an string with a key.
                 this.associatedCollectionKeys.push(associatedKey);
             }
         };
         
       /**
        * Remove a dependence with a collection.
        * @param String | Array: Association/s
        * @return boolean: true if all elements were removed.
        * @public
        */
        var removeAssociation = function(associatedKey) {
            var i, size, element;
            var elementsRemoved = 0;
            if (Object.prototype.toString.call(associatedKey) == '[object Array]') {
                size = associatedKey.length;
                for (i = 0; i < size; ++i) {
                    element = this.belongsToCollection(associatedKey[i]);
                    if (Object.prototype.toString.call(element) == '[object Number]') {
                        this.associatedCollectionKeys.splice(element, 1);
                        elementsRemoved++;
                    }
                }
                return (elementsRemoved === size);
            } else {
                element = this.belongsToCollection(associatedKey);
                if (Object.prototype.toString.call(element) == '[object Number]') {
                    this.associatedCollectionKeys.splice(element, 1);
                    return true;
                }
            }
            return false;
        };
        
        /**
         * Removes all associations.
         * @public
         */
        
        var removeAllAssociations = function() {
            this.associatedCollectionKeys = [];
        };
        
        /**
         * Returns the object instance id
         * @return Integer: VoxObject id.
         * @public
         */
        var getId = function() {
            return this.objectId;
        };
        
        /**
         * Sets object id.
         * @param integer: Id
         * @public
         */
        var setId = function(id) {
            this.objectId = id;
        };
        
        /**
         * Check if the storage is valid.
         * @private
         */
        var isValidStorage = function(storageType) {
            for (var i = 0; i < validStoragesCount; ++i) {
                if (validStorages[i] === storageType) {
                    return true;
                }
            }
            return false;
        };
        
        /**
         * Get storage key
         * @return String
         * @public
         */
        var getStorageKey = function() {
            return this.storageKey;
        };
        
        /**
         * Set storage key value.
         * @param String : Key
         * @public
         */
        var setStorageKey = function(key) {
            this.storageKey = key;
        };
        
        /**
         * Get storage type
         * @return String
         * @public
         */
        var getStorageType = function() {
            return this.storageType;
        };


        /**
         * Set storage type value
         * @param [local | session]
         * @public
         */
        var setStorageType = function(storageType) {
            var storageLowered = storageType.toLowerCase();
            if (isValidStorage(storageLowered)) {
                this.storageType = storageLowered;
            } else {
                throw "Invalid Storage Type";
            }
        };
        
        /**
         * Saves the object calling VoxStorage Class.
         * @public
         */
        var save = function() {
            this.storage.save(this.getStorageKey(), this);
        };

        /**
         * Loads the object calling VoxStorage Class.
         * @public
         */
         var load = function() {
            this.storage.load(this.getStorageKey());
        };

        /**
         * Removes the object calling VoxStorage Class.
         * @public
         */
        var remove = function() {
            this.storage.erase(this.getStorageKey());
        };
        
        return VoxClass.Class(
            'VoxObject',
            null,
            {
                constructor: constructor,
                statics: {objectId : 0},
                getOptions: getOptions,
                setOptions: setOptions,
                getAssociatedCollectionKeys: getAssociatedCollectionKeys,
                belongsToCollection: belongsToCollection,
                setCollection: setCollection,
                hasCollectionAssociation: hasCollectionAssociation,
                removeAssociation: removeAssociation,
                removeAllAssociations: removeAllAssociations,
                getId: getId,
                setId: setId,
                getStorageKey: getStorageKey,
                setStorageKey: setStorageKey,
                getStorageType: getStorageType,
                setStorageType: setStorageType,
                save: save, 
                load: load,
                remove: remove
            }
        );
});
