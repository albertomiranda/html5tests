/**
 * VoxLocalStorage.class
 * 
 * Handle local storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass',
        'voxine/storage/VoxStorage.class'
    ], 
    function(VoxClass, VoxStorage) {

/**
 * PRIVATE----------------------------------------------------------
 */
        
    /**
     * Una de las cosas que ten�s que hacer es testear si el dispositivo
     * soporta localStorage, para eso ten�s que usar Modernizer, yo despu�s hago
     * un wrapper as� pod�s usar sus funciones ac� adentro.
     * En caso de que el dispositivo/browser no soporte localStorage podr�amos degradar a
     * cookies, o algo as�. Investigar m�s sobre este punto.
     * 
     * Polyfills: https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
     * 
     * Esteban.
     */
    
        var persist = function(key, securedObject) {
        console.log("entre a persist redefinido, bueno, bueno");
            window.localStorage.setItem(key, securedObject);
        };
        
        var recover = function(key) {
        console.log("entre a recover redefinido, bueno, bueno");
            return window.localStorage.getItem(key);
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxLocalStorage',
            VoxStorage,
            {
            }
        );
		
    }
);
