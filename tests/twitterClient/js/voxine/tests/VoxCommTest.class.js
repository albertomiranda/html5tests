/**
 * Framework Tests: VoxComm
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['voxine/comm/VoxComm.class'],
    function(VoxComm) {
        /**
         * Default Comm test.
         * Just make it work as simple as possible.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var basic = function(){
            //instantiate and communicate with the outside world
            var comm = new VoxComm(this);
            comm.send({"message": "hey!"});
        };
        
        var onSuccess = function(data){
            console.log('VoxComm.onSuccess:');
            console.log(data);
        }
        
        /**
         * Custom Comm layer test.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var customCommLayer = function(profiling) {
            if (profiling) {
                console.profile('VoxComm: custom layer test');
            }
            this.commLayer = 'custom';
            var comm = new VoxComm(this);

            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(comm);
            comm.bind('onSuccess', function(response){
                console.log("YEAH! There's life out there!\n" + response);
            });
            
            //communicate with the outside world
            comm.send({"message": "hey!"});
            
            if (profiling) {
                console.profileEnd();
            }
        };

        return  {
            basic: basic,
            customCommLayer: customCommLayer,
            onSuccess: onSuccess
        };
    }
);