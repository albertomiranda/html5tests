/**
 * VoxDefaultComm.class
 * 
 * Default communication mechanism
 * Abstracts Ajax functionality provided by jQuery
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([    
    'VoxClass',
    'voxine/comm/VoxComm.class'
    'jQuery'
    ], 
    function(VoxClass, VoxComm, $) {

        /**
         * PRIVATE METHODS----------------------------------------------------------
         */
        var constructor = function() {
            
        };
    
        var send = function() {
            
        };
        
        /**
         * PUBLIC INTERFACE--------------------------------------------------------------
         */
        return VoxClass.Class(
            'VoxDefaultComm',
            VoxComm,
            {   
                constructor : constructor,
                send : send
            }
        );  
    }
);
