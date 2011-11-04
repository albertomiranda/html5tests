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
        var objectId = 0;
        
        /**
         * Class Constructor.
         * Singleton.
         * @private
         */
        var constructor = function(storageType, storageKey) {
            var storageLowered = storageType.toLowerCase();
            this.associatedCollectionKeys = [];
            if (isValidStorage(storageLowered)) {
                this.storageType = storageLowered;
            } else {
                throw "Invalid Storage Type";
            }
            this.storageKey = storageKey;
            this.voxStorage = new VoxStorage();
            var mediator = new VoxMediator();
            mediator.mixin(this);
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
            this.options = (options === null || options === void 0) ? {} : options;
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
         * @return boolean: 
         */
        var belongsToCollection = function(collectionKey) {
            var i, size;
            size = this.associatedCollectionKeys.length;
            for (i = 0; i < size; ++i) {
                if (this.associatedCollectionKeys[i] === collectionKey) {
                    return true;
                }
            }
            return false;
        }
        
        /**
         * Used when you need check if the object has been associated to a collection.
         * @return boolean
         * @public
         */
        var hasCollectionAssociation = function() {
            return this.associatedCollectionKeys.length === 0;
        }
        
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
         }
        
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
        
        /* Public Methods */
        var createdClass = VoxClass.Class(
            'VoxObject',
            null,
            {
                constructor: constructor,
                getOptions: getOptions,
                setOptions: setOptions,
                getAssociatedCollectionKeys: getAssociatedCollectionKeys,
                belongsToCollection: belongsToCollection,
                setCollection: setCollection,
                hasCollectionAssociation: hasCollectionAssociation,
                getId: getId,
                getStorageKey: getStorageKey,
                getStorageType: getStorageType,
                save: save,
                load: load,
                remove: remove
            }
        );

        /*
         * Set static mehtod
         */
        createdClass.getInstance =  function(storageType, storageKey, options) {
            var myclass = new VoxObject(storageType, storageKey);
            myclass.setOptions(options);
            objectId++;
            myclass.objectId = objectId;
            return myclass;
        };
        
        return createdClass;
});
