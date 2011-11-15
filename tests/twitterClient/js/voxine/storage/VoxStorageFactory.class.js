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
        'voxine/storage/VoxRemoteSingleStorage.class',
        'voxine/storage/VoxMultiStorage.class'
    ], 
    function(VoxClass, VoxStringHelper) {

/**
 * PRIVATE----------------------------------------------------------
 */
        var className = 'VoxStorageFactory';
        
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
        
        var remoteStorageCached = null;
        
        var getRemoteStorage = function(){
            if(remoteStorageCached == null){
                remoteStorageCached = new VoxSingleStorage();
                var child = new VoxRemoteSingleStorage();
                remoteStorageCached.setChild(child);
            }
            
            return remoteStorageCached;
        };
        
        var lsrStorageCached = null;
        
        var getLsrStorage = function(){
            if(lsrStorageCached == null){
                lsrStorageCached = new VoxMultiStorage();
                lsrStorageCached.addTarget(getLocalStorage());
                lsrStorageCached.addTarget(getSessionStorage());
                lsrStorageCached.addTarget(getRemoteStorage());
            }
            
            return lsrStorageCached;
        };
        
/*
 *Lista de funciones a llamar para no usar switch
 *NO OLVIDARSE DE ACTUALIZAR AL AGREGAR TIPOS NUEVOS
 *
 **/    
        var isValidStorageType = function(functionName){
            var res = false;
            
            for(var key in getSpecificStorage){
                if(key == functionName){
                    res = true;
                    break;
                }
            }
            
            return res;
        }
        
        var getSpecificStorage = {
            'getLocalStorage' : getLocalStorage,
            'getSessionStorage' : getSessionStorage,
            'getRemoteStorage' : getRemoteStorage,
            'getLsrStorage' : getLsrStorage
        }
        
        var getStorage = function(type) {
            var functionName = 'get' + VoxStringHelper.ucfirst(type) + 'Storage';
            var args = Array.prototype.slice.call(arguments).splice(1);
            
            if (!isValidStorageType(functionName)) {
                var msg = className + ": Invalid Storage Type: " + type;
                console.log(msg);
                throw msg;
            }
            
            return getSpecificStorage[functionName].apply(null, args);
        };
                        
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            className,
            null,
            {
                getStorage : getStorage
            }
        );
		
    }
);
