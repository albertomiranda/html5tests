/**
 * Framework Tests: VoxComm
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['app/models/User.class'],
    function(User) {
        /**
         * Default Comm test.
         * Just make it work as simple as possible.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var basic = function(){
            var user = new User('local', 'johnKey', null, 1, 'Johnny', 'john@voxine.com');
            user.name = "Johnny";
            console.log(user.name);
        };

        return  {
            basic: basic
        };
    }
);