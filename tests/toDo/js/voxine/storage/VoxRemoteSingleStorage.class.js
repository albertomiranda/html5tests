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
* POLYMORPHISM------------------------------------------------------
*/
    
    var setChild = function(chld){this.child = chld;}
        
/**
 * PRIVATE----------------------------------------------------------
 */
        var className = 'VoxRemoteSingleStorage';
        
        /**
         * Class constructor.
         */
        var comm;
        
        var constructor = function() {
            setComm();
            
            var Mediator = new VoxMediator();
            Mediator.mixin(this);;
        };
        
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
            console.log(className + ': Guardando "' + key + '"="' + securedObject + '"');
            var packet = getPersistPacket(key, securedObject);
            
            sendToComm(packet, extendedInfo);
        };
        
        var recover = function(key, extendedInfo) {
            console.log(className + ': Recuperando "' + key + '"');
            var packet = getRecoverPacket(key);
            
            sendToComm(packet, extendedInfo);
        };
                
        var remove = function(key, extendedInfo) {
            console.log(className + ': Eliminando "' + key + '"');
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
            var packet;
            
            if(this.child != null){ //Este child quien sería? QU170
                                //Por si quremos enchufar una clase q genere packetes
                                //p un storage especifico (memcached, vixen, etc)
                packet = this.child.getPersistPacket(key, securedObject);
            }else{
                packet = getDefaultPersistPacket(key, securedObject);
            }
            
            return packet;
        }
        
        var getRecoverPacket = function(key){
            var packet;
            
            if(this.child != null){
                packet = this.child.getRecoverPacket(key);
            }else{
                packet = getDefaultRecoverPacket(key);
            }
            
            return packet;
        }
        
        var getRemovePacket = function(key){
            var packet;
            
            if(this.child != null){
                packet = this.child.getRemovePacket(key);
            }else{
                packet = getDefaultRemovePacket(key);
            }
            
            return packet;
        }
        
/**
 * Default communication packets-----------------------------------------------
 */

        var getDefaultPersistPacket = function(key, securedObject){
            return {
                operation: 'persist',
                key: key,
                data: securedObject 
            }
        }
        
        var getDefaultRecoverPacket = function(key){
            return {
                operation: 'recover',
                key: key
            }
        }
        
        var getDefaultRemovePacket = function(key){
            return {
                operation: 'remove',
                key: key
            }
        }
        
/**
 * PUBLIC INTERFACE-----------------------------------------------------------
 */
        
        var toString = function(){
            return className;
        }
                
        return VoxClass.Class(
            className,
            null,
            {
                constructor : constructor,
                setChild : setChild,
                persist : persist,
                recover : recover,
                remove: remove,
                toString : toString
            }
        );
		
    }
);
