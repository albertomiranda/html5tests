/**
 * Generalization of Models.
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define([
    'VoxClass', 
    'voxine/storage/VoxStorage.class',
    'voxine/core/VoxMediator.class'
    ], 
    function(VoxClass, VoxStorage, VoxMediator) {

        var validStorages = ["memory", "local", "remote"];
        var validStoragesCount = validStorages.length;

        /**
         * Class Constructor.
         * @public
         */
        var constructor = function(storageType, storageKey) {
            var storageLowered = storageType.toLowerCase();

            if (isValidStorage(storageLowered)) {
                this.storageType = storageLowered;
            } else {
                //FIXME: Use it with object who handles exceptions.
                throwException("Storage type not supported yet.");
            }

            this.storageKey = storageKey;
            this.voxStorage = new VoxStorage();

            var mediator = new VoxMediator();
            mediator.mixin(this);
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
         * FIXME: This method should be removed and be managed into an exception
         * class handler.
         * @private
         */
        var throwException = function(message) {
            var customEvent = jQuery.Event("exception");
            customEvent.errorMessage = message;
            $(document).trigger(customEvent);
        }

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
        return VoxClass.Class(
            'VoxObject',
            null,
            {
                constructor: constructor,
                getStorageKey: getStorageKey,
                save: save,
                load: load,
                remove: remove
            }
    );
});
