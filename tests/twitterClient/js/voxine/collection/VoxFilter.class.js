/**
 * Description of VoxFilter.class
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define([
    'VoxClass', 
    'voxine/tools/VoxTools.class'
    ], 
    function(VoxClass, VoxTools) {

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
                var tools = new VoxTools();
                var setterName = "set" + tools.ucfirst(filterName);
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
            var fn, prefix;
            for (fn in model) {
                prefix = fn.substring(0,3);
                if (prefix === "get" || prefix === "set") {
                    this[fn] = model[fn];
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
