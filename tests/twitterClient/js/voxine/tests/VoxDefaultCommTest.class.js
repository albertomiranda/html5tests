/**
 * Framework Tests: VoxDefaultComm
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['voxine/comm/VoxDefaultComm.class'],
    function(VoxComm) {
        
        /**
         * Test VoxDefaultComm constructor returning
         * always the same instance
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var testSingleton = function() {
            var instance1 = new VoxDefaultComm({gatewayUrl:"www"}),
                instance2 = new VoxDefaultComm({gatewayUrl:"xxx"});
            
            console.assert(instance1.getGatewayURL() === "www");
            console.assert(instance2.getGatewayURL() === "www");
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };

        return  {
            testSingleton: testSingleton,
        };
    }
);