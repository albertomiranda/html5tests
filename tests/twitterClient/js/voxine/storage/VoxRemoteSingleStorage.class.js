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
        
        var constructor = function(caller) {
            comm = new VoxComm(caller);

            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(comm);
            comm.bind('onSuccess', onSuccess);
            comm.bind('onError', onError);
        };
        
        var persist = function(key, securedObject) {
            console.log('Guardando "' + key + '"="' + securedObject + '"');
            var packet = getPersistPacket(key, securedObject);
            comm.send(packet);
        };
        
        var recover = function(key) {
            console.log('Recuperando "' + key + '"');
            var packet = getRecoverPacket(key);
            comm.send(packet);
        };
                
        var remove = function(key) {
            console.log('Eliminando "' + key + '"');
            var packet = getRemovePacket(key);
            comm.send(packet);
        };
                

/**
 * Event-----------------------------------------------
 */
        var onSuccess = function(response){
            console.log("Success!!! :" + response);
        }

        var onError = function(response){
            console.log("Error :( :" + response);
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
