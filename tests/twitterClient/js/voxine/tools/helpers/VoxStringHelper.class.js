/**
 * Helper for string handling.
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass'
    ], 
    
    function(VoxClass) {
        
        var instance = Object();
        
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
        
        instance.contain = contain;
        instance.equalTo = equalTo;
        
        return instance;
    }
    );
