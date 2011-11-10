/**
 * Description of VoxFilter.class
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass', 
    'voxine/helpers/VoxStringHelper.class'
    ], 
    function(VoxClass, VoxStringHelper) {

        /**
         * Class Constructor
         * @public
         */
        var constructor = function(jsonFilter) {
            this.jsonFilter = jsonFilter || {};
        };

        /**
         * Parses a jsonFilter calling setters for each member.
         * If an object attribute does not have a setter it will be ignored.
         * You can obtain the json filter by getJsonFilter getter.
         * @public
         */
        var parseFilter = function() {
            var undefined;
            for (var filterName in this.jsonFilter) {
                var setterName = "set" + VoxStringHelper.ucfirst(filterName);
                if (this[setterName] !== undefined) {
                    this[setterName](this.jsonFilter[filterName]);
                }
            }
        };

        /**
         * Returns the object filter passed as constructor parameter
         * @public
         */
        var getJsonFilter = function() {
            return this.jsonFilter;
        };
        
        /**
         * Mixes with the filter only the getters and setters
         * @param VoxObject: model to be mixed to filter.
         * @public
         */
        var mixWith = function(model) {
            var fn, prefix, rest, functionNameSize, undefined;
            
            for (fn in model) {
                functionNameSize = fn.length;
                if (functionNameSize > 3) {
                    prefix = fn.substring(0,3);
                    rest = fn.substring(3, functionNameSize);
                    rest = rest.toLowerCase();
                    if ((prefix === "get" || prefix === "set") && this.jsonFilter[rest] !== undefined) {
                        this[fn] = model[fn];
                    }
                }
            }
            this.parseFilter(this.filter);
        };

        /* Public Methods */
        return VoxClass.Class(
            'VoxFilter',
            null,
            {
                constructor: constructor,
                parseFilter: parseFilter,
                getJsonFilter: getJsonFilter,
                mixWith: mixWith
            }
        );
    }
);
