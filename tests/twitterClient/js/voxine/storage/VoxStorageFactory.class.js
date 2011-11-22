/**
 * VoxStorageFactory.class
 * 
 * Here is the Logic for creation of all Storage types
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass',
        'voxine/storage/VoxSingleStorage.class',
        'voxine/storage/VoxLocalSingleStorage.class',
        'voxine/storage/VoxSessionSingleStorage.class',
        'voxine/storage/VoxRemoteSingleStorage.class',
        'voxine/storage/VoxMultiStorage.class'
    ], 
    function(VoxClass) {

        /**
         * PRIVATE----------------------------------------------------------
         */
        
        var className = 'VoxStorageFactory';
        var storageTypes;
        
        /**
         * Singleton Pattern
         * Wraps the constructor in an immediate function
         */
        var constructor;
        
        (function() {
            
            var instance;
            
            constructor = function constructor() {
                if (instance) {
                    return instance;
                };
                
                instance = this;
                
                storageTypes = {};
                storageTypes['local'] = new VoxSingleStorage(new VoxLocalSingleStorage());
                storageTypes['session'] = new VoxSingleStorage(new VoxSessionSingleStorage());
                storageTypes['remote'] = new VoxSingleStorage(new VoxRemoteSingleStorage());
                storageTypes['lsr'] = new VoxMultiStorage();
                storageTypes['lsr'].addTarget(storageTypes['local']);
                storageTypes['lsr'].addTarget(storageTypes['session']);
                storageTypes['lsr'].addTarget(storageTypes['remote']);
            };      
        }()); 
        
        //
        var isValidStorageType = function(type){
            return storageTypes.hasOwnProperty(type);
        };
        
        var getStorage = function(type) {
            var msg = className + " : Invalid Storage Type: " + type;
            
            if (!isValidStorageType(type)) {
                console.log(msg);
                throw msg;
            }else{
                msg = className + " : Created: " + storageTypes[type].toString();
                console.log(msg);
            }
            
            return storageTypes[type];
        };
                        
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxStorageFactory',
            null,
            {
                constructor : constructor,
                getStorage : getStorage
            }
        );
		
    }
);
