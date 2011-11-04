/**
 * VoxStorageFactory.class
 * 
 * Here is the Logic for creation of all Storage types
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass',
        'Modernizr',
        'voxine/storage/VoxStorage.class'
    ], 
    function(VoxClass) {

/**
 * PRIVATE----------------------------------------------------------
 */
        /*
         *
         *TODO: obviamente esto deberia ser singleton, ver como implementar
         *
         **/
        
        
        var ucfirststrict = function(str){
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };
        
        var getLocalStorage = function(){
            var st = null
            
            if(Modernizr.localstorage){
                console.log('Local Storage soportado, creando...');
                
                st = new VoxStorage();
                st.setSubType('local');
            }else if(Modernizr.sessionStorage){
                console.log('Session Storage soportado, creando...');
                
                st = new VoxStorage();
                st.setSubType('session');
            }
            else{
                console.log('Ninguna clase de local storage disponible es soportado, buhh erns...');
            }
            
            return st;
        };
        
/*
 *Lista de funciones a llamar para no usar switch
 *NO OLVIDARSE DE ACTUALIZAR AL AGREGAR TIPOS NUEVOS
 *
 **/    var getSpecificStorage = {
            'getLocalStorage' : getLocalStorage
        }
        
        var getStorage = function(type) {
            var functionName = 'get' + ucfirststrict(type) + 'Storage';
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
