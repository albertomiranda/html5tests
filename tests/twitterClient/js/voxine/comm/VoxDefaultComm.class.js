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
    'voxine/comm/VoxBaseComm.class',
    'jQuery'
    ], 
    function(VoxClass, VoxBaseComm, $) {
        var private = {
            "gatewayUrl": null
        };
        
        //----------------------------------------------------------------------
        /**
         * PRIVATE METHODS
         */
        var constructor = function(config) {
            private.gatewayUrl = config.gatewayUrl;
            console.log("constructed VoxDefaultComm; Gateway URL: " + private.gatewayUrl);
        };
    
        /**
         * Sends passed data to gatewayUrl.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object data
         */
        var send = function(data, caller){
            console.log("ON VoxDefaultComm Layer");
            console.log(data);
            
            var onSuccess = function(response){
                console.log('VoxDefaultComm: RECEIVED RESPONSE: ' + response);
                console.log(caller);
                if (caller !== undefined && caller.onSuccess !== undefined) {
                    caller.onSuccess(response);
                }
            };
            var onError = function(response){
                console.log('VoxDefaultComm: RECEIVED ERROR: ' + response);
            };
            
            $.ajax({
               url: private.gatewayUrl,
               type: 'POST',
               data: data,
               success: onSuccess,
               error: onError
            });
        };
        //----------------------------------------------------------------------
        
        //----------------------------------------------------------------------
        /**
         * PUBLIC INTERFACE
         */
        return VoxClass.Class(
            'VoxDefaultComm',
            VoxBaseComm,
            {   
                constructor : constructor,
                send : send
            }
        );
        //----------------------------------------------------------------------
    }
);
