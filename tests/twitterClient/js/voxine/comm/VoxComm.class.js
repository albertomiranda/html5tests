/**
 * VoxComm.class
 * 
 * Communication layer handler.
 * Chooses which comm component to use based on caller class config or global
 * setting.
 * All comm components extends from VoxBaseComm.
 * Comm components are the ones directly used to establish communication with
 * the outside world.
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 * @author Alberto Miranda <alberto@nextive.com>
 */
define([    
    'VoxClass',
    'voxine/config/VoxConfig.class',
    'voxine/tools/VoxTools.class'
    ], 
    function(VoxClass, VoxConfig, VoxTools) {
        var private = {
            "commLayer": "Default",
            "gatewayUrl": ""
        };
        
        var subscribers;
        
        //----------------------------------------------------------------------
        /**
         * PRIVATE METHODS
         */
        
        /**
         * Class constructor.
         */
        var constructor = function(caller) {
            loadConfig(caller);
        };
        
        var loadConfig = function(caller){
            private.commLayer = getCommLayer(caller);
            private.gatewayUrl = getGatewayUrl(caller);
            
            loadSubscribers(caller);
        }
        
       var loadSubscribers = function(caller){
            subscribers = {};
            
            if (caller !== undefined && caller.onSuccess !== undefined) {
                subscribers.onSuccess = caller.onSuccess;
            }else{
                subscribers.onSuccess = onSuccess;
            } 
            
            if (caller !== undefined && caller.onError !== undefined) {
                subscribers.onError = caller.onError;
            }else{
                subscribers.onError = onError;
            }
           
       }
        
        /**
         * Returns gateway url from global config or caller.
         * Caller config overwrites global config.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object caller
         * @return string
         */
        var getGatewayUrl = function(caller){
            //set default value
            var gatewayUrl = '';
            
            //first check caller config
            if (caller !== undefined && caller.gatewayUrl !== undefined) {
                gatewayUrl = caller.gatewayUrl;
            } else {
                //get global config if available
                if (VoxConfig.voxine.gatewayUrl !== undefined) {
                    gatewayUrl = VoxConfig.voxine.gatewayUrl;
                }
            }
            return gatewayUrl;
        };
        
        /**
         * Returns comm layer to be used from global config or caller.
         * Caller config overwrites global config.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object caller
         * @return string
         */
        var getCommLayer = function(caller){
            //set default value
            var commLayer = 'default';
            
            //first check caller config
            if (caller !== undefined && caller.commLayer !== undefined) {
                commLayer = caller.commLayer;
            } else {
                //get global config if available
                if (VoxConfig.voxine.commLayer !== undefined) {
                    commLayer = VoxConfig.voxine.commLayer;
                }
            }
            
            var tools = new VoxTools;
            return tools.ucfirst(commLayer.toLowerCase());
        };
        
        /**
         * Sends passed data to gatewayUrl using set commLayer.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object data
         */
        var send = function(data){
            var config = {
                "gatewayUrl": private.gatewayUrl
            };
            
            //require set comm layer module and redirect to its send method
            
            /**
             * Me preocupa el costo en performance de esto por cada request 
             * hacia el backend.
             * Capaz que podr�amos guardar comm y testear si ya fue definido
             * o no. Como para hacer el 'require' s�lo la primera vez
             * 
             * Esteban.
             */
            var context = this;
            require(
                [
                    'voxine/comm/Vox' + private.commLayer + 'Comm.class'
                ], 
                function(VoxCommLayer) {
                    console.log("USING COMM LAYER: " + private.commLayer);
                    var comm = new VoxCommLayer(config);
                    comm.send(data, subscribers);
                }
            );
        }
        
        /**
         * Default success handler
         * 
         * This is never called since this is kinda Singleton and is
         * reconfigured before each call.
         * 
         */
        var onSuccess = function(response) {
            console.log("VoxComm: SUCCESS!");
            this.trigger('onSuccess', response);
        };
        
        /**
         * Default error handler
         */
        var onError = function() {
            
        };
        //----------------------------------------------------------------------
        
        //----------------------------------------------------------------------
        /**
         * PUBLIC INTERFACE
         */
        return VoxClass.Class(
            'VoxComm',
            null,
            {   
                constructor : constructor,
                onSuccess : onSuccess,
                onError : onError,
                send: send,
                loadConfig: loadConfig
            }
        );
        //----------------------------------------------------------------------
    }
);