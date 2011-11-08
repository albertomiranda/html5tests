/**
 * VoxStorageFactory.class
 * 
 * Here is the Logic for creation of all Storage types
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass',
        'voxine/tools/VoxTools.class',
        'Modernizr',
        'voxine/storage/VoxSingleStorage.class',
        'voxine/storage/VoxLocalSingleStorage.class',
        'voxine/storage/VoxSessionSingleStorage.class',
        'voxine/storage/VoxRemoteSingleStorage.class'
    ], 
    function(VoxClass, VoxTools) {

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
        
        
        var getLocalStorage = function(){
            var st = new VoxSingleStorage();
            var child = new VoxLocalSingleStorage();
            st.setChild(child);
            
            return st;
        };
        
        var getSessionStorage = function(){
            var st = new VoxSingleStorage();
            var child = new VoxSessionSingleStorage();
            st.setChild(child);
            
            return st;
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
            var tools = new VoxTools();
            
            var functionName = 'get' + tools.ucfirst(type) + 'Storage';
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
