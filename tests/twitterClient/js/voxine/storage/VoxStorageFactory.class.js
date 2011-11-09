/**
 * VoxStorageFactory.class
 * 
 * Here is the Logic for creation of all Storage types
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass',
        'voxine/helpers/VoxStringHelper.class',
        'Modernizr',
        'voxine/storage/VoxSingleStorage.class',
        'voxine/storage/VoxLocalSingleStorage.class',
        'voxine/storage/VoxSessionSingleStorage.class',
        'voxine/storage/VoxRemoteSingleStorage.class'
    ], 
    function(VoxClass, VoxStringHelper) {

/**
 * PRIVATE----------------------------------------------------------
 */
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
            
            }      
        }());
        
        var localStorageCached = null;
        
        var getLocalStorage = function(){
            if(localStorageCached == null){
                localStorageCached = new VoxSingleStorage();
                var child = new VoxLocalSingleStorage();
                localStorageCached.setChild(child);
            }
            
            return localStorageCached;
        };
        
        var sessionStorageCached = null;
        
        var getSessionStorage = function(){
            if(sessionStorageCached == null){
                sessionStorageCached = new VoxSingleStorage();
                var child = new VoxSessionSingleStorage();
                sessionStorageCached.setChild(child);
            }
            
            return sessionStorageCached;
        };
        
        var getRemoteStorage = function(caller){
            var st = new VoxSingleStorage();
            var child = new VoxRemoteSingleStorage(caller);
            st.setChild(child);
            
            return st;
        };
        
/*
 *Lista de funciones a llamar para no usar switch
 *NO OLVIDARSE DE ACTUALIZAR AL AGREGAR TIPOS NUEVOS
 *
 **/    var getSpecificStorage = {
            'getLocalStorage' : getLocalStorage,
            'getSessionStorage' : getSessionStorage,
            'getRemoteStorage' : getRemoteStorage
        }
        
        var getStorage = function(type) {
            var functionName = 'get' + VoxStringHelper.ucfirst(type) + 'Storage';
            var args = Array.prototype.slice.call(arguments).splice(1);
            
            return getSpecificStorage[functionName].apply(null, args);
        };
                        
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxStorageFactory',
            null,
            {
                getStorage : getStorage
            }
        );
		
    }
);
