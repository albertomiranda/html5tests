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
        }
        
        /**
         * Set object options. Ex. {silentMode: false}
         * @param Object options : {silentMode: true/false} used for event triggering.
         * @public
         */
        var setOptions = function(options) {
            this.options = (options === null || options === void 0) ? {} : options;
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
