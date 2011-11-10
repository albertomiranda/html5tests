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
            var comm = new VoxComm;

            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(comm);
            comm.bind('onSuccess', function(response){
                console.log("YEAH! There's life out there!\n" + response);
            });
            
            //communicate with the outside world
            comm.send({"message": "hey!"});
        };
        
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
            customCommLayer: customCommLayer
        };
    }
);