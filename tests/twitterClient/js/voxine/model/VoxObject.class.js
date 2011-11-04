/**
 * Generalization of Models.
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define([
    'VoxClass', 
    'voxine/storage/VoxStorage.class'
    ], 
    function(VoxClass, VoxStorage) {

        var validStorages = ["memory", "local", "remote"];
        var validStoragesCount = validStorages.length;

        /**
         * Class Constructor.
         * @private
         */
        var constructor = function(storageType, storageKey, options) {
            var storageLowered = storageType.toLowerCase();
            this.associatedCollectionKeys = [];
            if (isValidStorage(storageLowered)) {
                this.storageType = storageLowered;
            } else {
                throw "Invalid Storage Type";
            }
            this.storageKey = storageKey;
            this.voxStorage = new VoxStorage();
            this.setOptions(options);
            
            //add Mediator methods
            var mediator = new VoxMediator();
            mediator.mixin(this);
            
            //update objectIds
            ++this.statics.objectId;
            this.objectId = this.statics.objectId;
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
            this.options = (options == null) ? {} : options;
        };
        
        /**
         * If the object belongs to a collection it will return the key associated.
         * @return String/null
         * @public
         */
        var getAssociatedCollectionKeys = function() {
            return this.associatedCollectionKeys;
        };
        
        /**
         * Checks if the object belongs to a collection (by key)
         * @param String: Collection Key
         * @return boolean or element position: 
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
         * @public
         */
        var getId = function() {
            return this.objectId;
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
         * @public
         */
        var getStorageKey = function() {
            return this.storageKey;
        };
        
        /**
         * @public
         */
        var getStorageType = function() {
            return this.storageType;
        };

        /**
         * Saves the object calling VoxStorage Class.
         * @public
         */
        var save = function() {
            this.voxStorage.save(this.storageKey, this);
        };

        /**
         * Loads the object calling VoxStorage Class.
         * @public
         */
         var load = function() {
            this.voxStorate.load(this.storageKey);
        };

        /**
         * Removes the object calling VoxStorage Class.
         * @public
         */
        var remove = function() {
            this.voxStorage.remove(this.storageKey);
        };

        return VoxClass.Class(
            'VoxObject',
            null,
            {
                constructor: constructor,
                statics: { objectId : 0 },
                getOptions: getOptions,
                setOptions: setOptions,
                getAssociatedCollectionKeys: getAssociatedCollectionKeys,
                belongsToCollection: belongsToCollection,
                setCollection: setCollection,
                hasCollectionAssociation: hasCollectionAssociation,
                removeAssociation: removeAssociation,
                removeAllAssociations: removeAllAssociations,
                getId: getId,
                getStorageKey: getStorageKey,
                getStorageType: getStorageType,
                save: save, 
                load: load,
                remove: remove
            }
        );
});
