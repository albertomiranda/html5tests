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
            commLayer: "Default",
            gatewayUrl: "",
            callbacks : {}
        };
        
        //----------------------------------------------------------------------
        /**
         * PRIVATE METHODS
         */
        
        /**
         * Constructor.
         * Gets configuration options form the object using
         * this class.
         * The <pre>caller</pre> shall provide the following properties:
         * - {string} getGatewayUrl
         * - {VoxComm} getCommLayer
         * 
         * @param {VoxObject} caller client of this class
         */
        var constructor = function(caller) {
            loadConfig(caller);
        };
        
        var loadConfig = function(caller){
            private.commLayer = getCommLayer(caller);
            private.gatewayUrl = getGatewayUrl(caller);
            
            setCallbacks(caller);
        };
        
        /**
         * 
         */
        var setCallbacks = function(caller){
            var callbacks = private.callbacks;
            
            if (caller !== undefined && caller.onSuccess !== undefined) {
                callbacks.onSuccess = caller.onSuccess;
            }else{
                callbacks.onSuccess = onSuccess;
            }; 
                
            if (caller !== undefined && caller.onError !== undefined) {
                callbacks.onError = caller.onError;
            }else{
                callbacks.onError = onError;
            };       
        };
        
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
                gatewayUrl: private.gatewayUrl
            };
            
            //require set comm layer module and redirect to its send method
            
            /**
             * FIXME Cache objects already created
             */
            //var context = this;
            require(
                [
                    'voxine/comm/Vox' + private.commLayer + 'Comm.class'
                ], 
                function(VoxCommLayer) {
                    console.log("USING COMM LAYER: " + private.commLayer);
                    var comm = new VoxCommLayer(config);
                    comm.send(data, private.callbacks);
                }
            );
        };
        
        /**
         * Default success handler
         * 
         * This is never called since this is kinda Singleton and is
         * reconfigured before each call.
         * 
         */
        var onSuccess = function(response) {
            //console.log("VoxComm: SUCCESS!");
            this.trigger('onSuccess', response);
        };
        
        /**
         * Default error handler
         */
        var onError = function() {
            throw Error('VoxComm: an error has happened.');
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
