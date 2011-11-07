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
        /**
         * Ajax configuration default values
         */
        var private = {
            gatewayUrl: null,
            type : 'GET',
            crossdomain : false,
            dataType : 'json'
        };
        
        //----------------------------------------------------------------------
        /**
         * PRIVATE METHODS
         */
        
        /**
         * Singleton Pattern
         * Wraps the constructor in an immediate function
         */
        var constructor;
        
        (function(config) {
            
            var instance;
            
            constructor = function constructor(config) {
                
                if (instance) {
                    return instance;
                };
                
                instance = this;
            
                if (config.gatewayUrl != null) {
                    private.gatewayUrl = config.gatewayUrl;
                }
                else {
                    throw Error('The gatewayUrl property is not defined');
                }
                
                if (config.type != null) {
                    private.type = config.type;
                }
                
                if (config.crossdomain != null) {
                    private.crossdomain = config.crossdomain;
                }
                
                if (config.dataType != null) {
                    private.dataType = config.dataType;
                }
                
                console.log("constructed VoxDefaultComm; Gateway URL: " + private.gatewayUrl);
            }      
        }());
    
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
               type: private.type,
               crossDomain: private.crossdomain,
               dataType: private.dataType,
               data: data,
               success: onSuccess,
               error: onError
            });
        };
        
        var getGatewayURL = function() {
            return private.gatewayUrl;  
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
                getGatewayURL : getGatewayURL,
                send : send
            }
        );
        //----------------------------------------------------------------------
    }
);
