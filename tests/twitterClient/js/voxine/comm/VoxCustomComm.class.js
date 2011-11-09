/**
 * VoxCustomComm.class
 * 
 * Custom communication mechanism
 * Abstracts Ajax functionality provided by jQuery
 * 
 * @author Alberto Miranda <alberto@nextive.com>
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
            crossdomain : false
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
            
            /**
             * Private constructor.
             * Receives the configuration options to make the requests
             * 
             * config is an object with the following attributes
             * 
             * {string}  gatewayUrl: request Url
             * {string}  type: GET, POST
             * {boolean} crossdomain
             * {string}  dataType: json, jsonp, text, xml - if in doubt do not define this
             *           atributte, and let jQuery make an intelligent guess  
             * 
             * @param {object} config
             */
            constructor = function constructor(config) {
                
                if (instance) {
                    return instance;
                };
                
                instance = this;
            
                if (config.gatewayUrl) {
                    private.gatewayUrl = config.gatewayUrl;
                }
                else {
                    throw Error('The gatewayUrl property is not defined');
                };
                
                if (config.type) {
                    private.type = config.type;
                };
                
                if (config.crossdomain) {
                    private.crossdomain = config.crossdomain;
                };
                
                if (config.dataType) {
                    private.dataType = config.dataType;
                };
                
                console.log("constructed VoxDefaultComm; Gateway URL: " + private.gatewayUrl);
            }      
        }());
    
        /**
         * Sends passed data to gatewayUrl.
         * 
         * @param object data
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var send = function(data, caller){
            console.log("ON VoxCustomComm Layer");
            //console.log(data);
            
            var onSuccess = function(response){
                console.log('VoxCustomComm: RECEIVED RESPONSE: ' + response);
                //console.log(caller);
                if (caller !== undefined && caller.onSuccess !== undefined) {
                    caller.onSuccess(response);
                }
            };
            var onError = function(response){
                console.log('VoxCustomComm: RECEIVED ERROR: ' + response);
            };
            
            var ajaxConfig = {
                url: private.gatewayUrl,
                type: private.type,
                crossDomain: private.crossdomain,
                success: onSuccess,
                error: onError //de ser un request JSONP no estoy seguro que tome este callback en caso de error
            };
            
            if (private.dataType) {
                ajaxConfig.dataType = private.dataType;
            };
            
            if (data) {
                ajaxConfig.data = data;
            };
            
            $.ajax(ajaxConfig);
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
            'VoxCustomComm',
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
