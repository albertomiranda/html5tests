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
     * Class Constructor
     * @public
     */
    var constructor = function(jsonFilter) {
        this.id = '';
        this.name = '';
        this.jsonFilter = jsonFilter;
        this.parseFilter(jsonFilter);
    };
    
    /**
     * Returns the string with capital letter.
     * Used by getters and setters.
     * @private
     */
    var capitalize = function(string) {
        return string.replace(/\w+/g, function(a) {
            return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
        });
    };

    /**
     * Parses a jsonFilter calling setters for each member.
     * If an object attribute does not have a setter it will be ignored.
     * You can obtain the json filter by getJsonFilter getter.
     * @private
     */
    var parseFilter = function() {
        var undefined;
        for (var filterName in this.jsonFilter) {
            var setterName = "set" + capitalize(filterName);
            if (this[setterName] !== undefined) {
                this[setterName](this.jsonFilter[filterName]);
            }
        }
    };
    
    /**
     * @public
     */
    var setId = function(id) {
        this.id = id;
    };
    
    /**
     * @public
     */
    var getId = function() {
        return this.id;
    };
    
    /**
     * @public
     */
    var setName = function(name) {
        this.name = name;
    };
    
    /**
     * @public
     */
    var getName = function() {
        return this.name;
    };

    /**
     * Returns the object filter passed as constructor parameter
     * @public
     */
    var getJsonFilter = function() {
        return this.jsonFilter;
    };
    
    /* Public Methods */
    return VoxClass.Class(
        'VoxFilter',
        null,
        {
            setId: setId,
            getId: getId,
            setName: setName,
            getName: getName,
            getJsonFitler: getJsonFilter
        }
    );
});
