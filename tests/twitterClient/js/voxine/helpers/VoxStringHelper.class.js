/**
 * String helper. All string related methods should be here!
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['VoxClass'], 
    function(VoxClass) {        
        // http://kevin.vanzonneveld.net
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   bugfixed by: Onno Marsman
        // +   improved by: Brett Zamir (http://brett-zamir.me)
        // *     example 1: ucfirst('kevin van zonneveld');
        // *     returns 1: 'Kevin van zonneveld'
        var ucfirst = function ucfirst (str) {
            str += '';
            var f = str.charAt(0).toUpperCase();
            return f + str.substr(1);
        };
    
        //----------------------------------------------------------------------
        //PUBLIC INTERFACE
        return VoxClass.Class(
            'VoxTools',
            null,
            {
                ucfirst: ucfirst
            }
        //----------------------------------------------------------------------
    );
});
