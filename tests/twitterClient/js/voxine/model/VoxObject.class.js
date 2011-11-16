/**
 * Generalization of Models.
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define([
        'VoxClass', 
        'voxine/storage/VoxStorageFactory.class'
    ], 
    function(VoxClass, VoxStorageFactory) {

        var private = {
            options: {}
        }
        
        /**
         * Class Constructor.
         * @public
         */
        var constructor = function(storageType, storageKey, options) {
            this.associatedKeys = [];
            this.storageType = storageType;
            this.options = options;
            this.storageKey = storageKey;
            this.gatewayUrl = null;
            this.commLayer = null;
            
            //Storage loaded.
            var factory = new VoxStorageFactory();
            this.storage = factory.getStorage(this.storageType);
            
            //add Mediator methods
            var mediator = new VoxMediator();
            mediator.mixin(this);
            
            //Object Keys.
            ++this.statics.objectCount;
            this.serverKey = null;
            var now = new Date();
            this.clientKey = this.statics.objectCount + "" + now.getFullYear() + now.getMonth() + now.getDay() + now.getTime();
        };
        
        /**
         * Checks if the object belongs to a collection (by key)
         * @param String: Collection Key
         * @return Boolean | Integer: Element position if exists. Otherwise false. 
         */
        var belongsToCollection = function(collectionKey) {
            var i, size;
            size = this.associatedKeys.length;
            for (i = 0; i < size; ++i) {
                if (this.associatedKeys[i] === collectionKey) {
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
            return this.associatedKeys.length !== 0;
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
                     this.associatedKeys.push(associatedKey[i]);
                 }
             } else {
                 //Received an string with a key.
                 this.associatedKeys.push(associatedKey);
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
                        this.associatedKeys.splice(element, 1);
                        elementsRemoved++;
                    }
                }
                return (elementsRemoved === size);
            } else {
                element = this.belongsToCollection(associatedKey);
                if (Object.prototype.toString.call(element) == '[object Number]') {
                    this.associatedKeys.splice(element, 1);
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
            this.associatedKeys = [];
        };
        
        /**
         * Saves the object calling VoxStorage Class.
         * @public
         */
        var save = function() {
            this.storage.save(this);
        };

        /**
         * Loads the object calling VoxStorage Class.
         * @public
         */
        var load = function() {
            this.storage.load(this);
        };

        /**
         * Removes the object calling VoxStorage Class.
         * @public
         */
        var remove = function() {
            this.load();
            this.storage.erase(this);
        };
        
        /**
         * Prune method to select which properties shuould be exported.
         * By default is setted as this. (All object will be exported).
         * @public
         */
        var prune = function() {
            return this;
        };
        
        /**
         * @Overrideable
         * @param response
         * @public
         */
        var onLoadSuccess = function(response) {
            var undefined;
            if (response !== undefined) {
                this.associatedKeys = response['associatedKeys'] || [];
                this.storageType = response['storageType'];
                this.options = response['options'] || {};
                this.gatewayUrl = response['gatewayUrl'] || null;
                this.commLayer = response['commLayer'] || null;
                this.serverKey = response['serverKey'];
                this.clientKey = response['clientKey'];
            }
        };
        
        var object = VoxClass.Class(
            'VoxObject',
            null,
            {
                constructor: constructor,
                statics: {objectCount : 0},
                belongsToCollection: belongsToCollection,
                setCollection: setCollection,
                hasCollectionAssociation: hasCollectionAssociation,
                removeAssociation: removeAssociation,
                removeAllAssociations: removeAllAssociations,
                save: save, 
                load: load,
                remove: remove,
                prune: prune,
                onLoadSuccess: onLoadSuccess
            }
        );
          
          
        /**
         *  Setter for private options
         *  @param value: options object.
         *  For example:
         *      Object {
         *          silentMode: true|false
         *      }
         */
        object.prototype.__defineSetter__('options', function(/* Object */ value){
            private.options = value ||{};
        });
        
        /**
         * Getter for private options.
         * @return Object
         */
        object.prototype.__defineGetter__('options', function() {
            return private.options;
        });
        
        
        
        return object;
});
