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
        'voxine/storage/VoxSingleStorage.class'
    ], 
    function(VoxClass, VoxTools) {

/**
 * PRIVATE----------------------------------------------------------
 */
        /*
         *
         *TODO: obviamente esto deberia ser singleton, ver como implementar
         *
         **/
        
        var getLocalStorage = function(){
            var st = new VoxSingleStorage();
            st.setSubType('local');
            
            return st;
        };
        
        var getSessionStorage = function(){
            var st = new VoxSingleStorage();
            st.setSubType('session');
            
            return st;
        };
        
/*
 *Lista de funciones a llamar para no usar switch
 *NO OLVIDARSE DE ACTUALIZAR AL AGREGAR TIPOS NUEVOS
 *
 **/    var getSpecificStorage = {
            'getLocalStorage' : getLocalStorage,
            'getSessionStorage' : getSessionStorage
        }
        
        var getStorage = function(type) {
            var tools = new VoxTools();
            var functionName = 'get' + tools.ucfirst(type) + 'Storage';
            return getSpecificStorage[functionName]();
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
