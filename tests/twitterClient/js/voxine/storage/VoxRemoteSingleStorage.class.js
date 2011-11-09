/**
 * VoxRemoteSingleStorage.class
 * 
 * Handle remote storage operations
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
         * Class constructor.
         */
        var comm;
        
        var constructor = function() {
            setComm();
            enableEvents();
        };
        
        var enableEvents = function(){
            var Mediator = new VoxMediator();
            Mediator.mixin(this);
        }
        
        var setComm = function(){
            comm = new VoxComm();

            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(comm);
            comm.bind('onSuccess', commSuccess);
            comm.bind('onError', commError);
        }
        
/**
 * Event-----------------------------------------------
 */
        var commSuccess = function(response){
            console.log("Comm layer Success!!! :" + response);
            console.log("Let's tell to our subscribers");
            this.trigger('onSuccess', response);
        }

        var commError = function(response){
            console.log("Comm layer Error :( :" + response);
            console.log("Let's tell to our subscribers");
            this.trigger('onError', response);
        }
        
/**
 * -----------------------------------------------
 */
        var persist = function(key, securedObject, extendedInfo) {
            console.log('Guardando "' + key + '"="' + securedObject + '"');
            var packet = getPersistPacket(key, securedObject);
            
            sendToComm(packet, extendedInfo);
        };
        
        var recover = function(key, extendedInfo) {
            console.log('Recuperando "' + key + '"');
            var packet = getRecoverPacket(key);
            
            sendToComm(packet, extendedInfo);
        };
                
        var remove = function(key, extendedInfo) {
            console.log('Eliminando "' + key + '"');
            var packet = getRemovePacket(key);
            
            sendToComm(packet, extendedInfo);
        };
        
        var sendToComm = function(packet, connSetup){
            comm.loadConfig(connSetup);
            comm.send(packet);
        }
                

/**
 * Build communication packets-----------------------------------------------
 */

        var getPersistPacket = function(key, securedObject){
            return {
                operation: 'persist',
                key: key,
                data: securedObject 
            }
        }
        
        var getRecoverPacket = function(key){
            return {
                operation: 'recover',
                key: key
            }
        }
        
        var getRemovePacket = function(key){
            return {
                operation: 'remove',
                key: key
            }
        }
        
/**
 * PUBLIC INTERFACE-----------------------------------------------------------
 */
        return VoxClass.Class(
            'VoxRemoteSingleStorage',
            null,
            {
                constructor : constructor,
                persist : persist,
                recover : recover,
                remove: remove
            }
        );
		
    }
);
