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
            this.private = {
                "name": "Vox Comm Test"
            };
            var comm = new VoxComm();

            //add mediator
            var Mediator = new VoxMediator();
            Mediator.mixin(comm);
            comm.bind('onSuccess', function(response){
                console.log("YEAH! There's life out there!\n" + response);
            });
        };

        return  {
            basic: basic
        };
    }
);