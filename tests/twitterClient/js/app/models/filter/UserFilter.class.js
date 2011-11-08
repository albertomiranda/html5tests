/**
 * Description of UserFilter
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass',
    'voxine/collection/VoxFilter.class',
    'app/models/User.class'
    ],
    
    function(VoxClass, VoxFilter, UserModel) {
        
        var constructor = function(jsonFilter) {
            var userModel = new UserModel('local', 'f1', {silentMode: true}, "","","");
            this.mixWith(userModel);
        }
    
        return VoxClass.Class(
            'UserFilter',
            VoxFilter,
            {
                constructor: constructor
            }
            );
    }
    );
