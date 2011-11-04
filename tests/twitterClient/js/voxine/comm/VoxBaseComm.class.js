/**
 * VoxComm.class
 * 
 * Communication layer
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 * @author Alberto Miranda <alberto@nextive.com>
 */
define([    
    'VoxClass'
    ], 
    function(VoxClass) {

        /**
         * PRIVATE METHODS----------------------------------------------------------
         */
        var constructor = function() {
            
        };
        
        /**
         * Default success handler
         */
        var onSuccess = function() {
            
        };
        
        /**
         * Default error handler
         */
        var onError = function() {
            
        };
        
        /**
         * PUBLIC INTERFACE--------------------------------------------------------------
         */
        return VoxClass.Class(
            'VoxComm',
            null,
            {   
                constructor : constructor,
                onSuccess : onSuccess,
                onError : onError
            }
        );  
    }
);