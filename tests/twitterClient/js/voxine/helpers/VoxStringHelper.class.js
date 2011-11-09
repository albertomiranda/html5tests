/**
 * String helper. All string related methods should be here!
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['VoxClass'], 
    function(VoxClass) {        
 
        var instance = Object();
        
        /**
         * Capitalize the string;
         * @param String str: str to be handled.
         * @return String
         */
        var ucfirst = function (str) {
            str += '';
            var f = str.charAt(0).toUpperCase();
            return f + str.substr(1);
        };
        
        /**
         * Checks if source string contains the pattern param.
         * @param String: pattern to check
         * @param String: source
         * @return Boolean
         * @static
         * 
         */
        var contain = function (pattern, source) {
            var patternToCheck = pattern || "";
            var sourceToCheck = source || "";
            if (patternToCheck !== "") {
                return (sourceToCheck.indexOf(patternToCheck) !== -1);
            }
            return false;
        };
        
        /**
         * Checks if two strings are equal or not.
         * @param String: source
         * @param String: destiny
         * @return Boolean
         * @static
         */
        var equalTo = function (source, destiny) {
            var sourceToCheck = source || "";
            var destinyToCheck = destiny || "";
            return (sourceToCheck === destinyToCheck);
        }
        
        instance.ucfirst = ucfirst;
        instance.contain = contain;
        instance.equalTo = equalTo;
        
        return instance;
});
