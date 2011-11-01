/**
 * Description of VoxFilter.class
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(['VoxClass'], function(VoxClass) {
    var id = '';
    var name = '';


    /* Private Methods */

    /**
     * Returns the string with capital letter.
     * Used by getters and setters.
     */
    var capitalize = function(string) {
        return string.replace(/\w+/g, function(a) {
            return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
        });
    }
    
    /* Public Methods */
    return VoxClass.Class(
        'VoxFilter',
        null,
        {
            constructor: function(jsonFilter) {
                this.id = '';
                this.name = '';
                this.jsonFilter = jsonFilter;
                this.parseFilter(jsonFilter);
            },
            
            /**
             * Parses a jsonFilter calling setters for each member.
             * If an object attribute does not have a setter it will be ignored.
             * You can obtain the json filter by getJsonFilter getter.
             */
            parseFilter: function() {
                var undefined;
                for (var filterName in this.jsonFilter) {
                    var setterName = "set" + capitalize(filterName);
                    if (this[setterName] !== undefined) {
                        this[setterName](this.jsonFilter[filterName]);
                    }
                }
            },
            setId: function(id) {
                this.id = id;
            },
            getId: function() {
                return this.id;
            },
            setName: function(name) {
                this.name = name;
            },
            getName: function() {
                return this.name;
            },
            
            /**
             * Returns the object filter passed as constructor parameter
             */
            getJsonFilter: function() {
                return this.jsonFilter;
            }
        }
    );
});
