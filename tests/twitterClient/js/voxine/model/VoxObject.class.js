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
            if (isValidStorage(storageLowered)) {
                this.storageType = storageLowered;
            }
            this.storageKey = storageKey;
            this.voxStorage = new VoxStorage();
            var mediator = new VoxMediator();
            mediator.mixin(this);
        };
        
        
        /**
         * Returns the object instance id
         * @public
         */
        var getObjectId = function() {
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
                getObjectId: getObjectId,
                getStorageKey: getStorageKey,
                save: save,
                load: load,
                remove: remove
            }
        );
            
        /*
         * Set static mehtod
         */
        createdClass.getInstance =  function(storageType, storageKey) {
            var myclass = new VoxObject(storageType, storageKey);
            objectId++;
            myclass.objectId = objectId;
            return myclass;
        };
        return createdClass;
});
