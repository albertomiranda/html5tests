/**
 * VoxLocalStorage.class
 * 
 * Handle local storage operations
 * 
 * @author Leo Bianchi <leonardo.bianchi@nextive.com>
 */
define([    
        'VoxClass'
    ], 
    function(VoxClass) {

/**
 * PRIVATE----------------------------------------------------------
 */
        
    /**
     * Una de las cosas que tenés que hacer es testear si el dispositivo
     * soporta localStorage, para eso tenés que usar Modernizer, yo después hago
     * un wrapper así podés usar sus funciones acá adentro.
     * En caso de que el dispositivo/browser no soporte localStorage podríamos degradar a
     * cookies, o algo así. Investigar más sobre este punto.
     * 
     * Polyfills: https://github.com/Modernizr/Modernizr/wiki/HTML5-Cross-Browser-Polyfills
     * 
     * Esteban.
     */
    
        var persist = function(key, securedObject) {
            window.localStorage.setItem(key, securedObject);
        };
        
        var recover = function(key) {
            return window.localStorage.getItem(key);
        };
                
/**
 * PUBLIC INTERFACE--------------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxLocalStorage',
            'VoxStorage',
            {
            	load: this.load,
                save: this.save
            }
        );
		
    }
);
