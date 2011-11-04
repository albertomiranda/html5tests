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
        //----------------------------------------------------------------------
        /**
         * PRIVATE METHODS
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
        
        var send = function(){
            console.log("BASE COMM SEND");
        }
        //----------------------------------------------------------------------
        
        //----------------------------------------------------------------------
        /**
         * PUBLIC INTERFACE
         */
        return VoxClass.Class(
            'VoxBaseComm',
            null,
            {   
                constructor : constructor,
                onSuccess : onSuccess,
                onError : onError,
                send: send
            }
        );
        //----------------------------------------------------------------------
    }
);