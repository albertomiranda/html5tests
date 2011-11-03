/**
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    [
     'voxine/config/VoxConfig.class'
     ],
    function(VoxConfig) {
        
        var getHostTest = function() {
            var config = new VoxConfig();
            console.log(config);
        };
    
        return  {
            getHostTest : getHostTest
        };
    }
);