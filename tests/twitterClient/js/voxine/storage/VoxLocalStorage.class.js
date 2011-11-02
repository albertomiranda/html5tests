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
     * Una de las cosas que ten�s que hacer es testear si el dispositivo
     * soporta localStorage, para eso ten�s que usar Modernizer, yo despu�s hago
     * un wrapper as� pod�s usar sus funciones ac� adentro.
     * En caso de que el dispositivo/browser no soporte localStorage podr�amos degradar a
     * cookies, o algo as�. Investigar m�s sobre este punto.
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