/**
 * Description of VoxFilter.class
 *
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */

define(['VoxClass', 'voxine/tools/VoxTools.class'], function(VoxClass, VoxTools) {

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
            constructor: constructor,
            parseFilter: parseFilter,
            setId: setId,
            getId: getId,
            setName: setName,
            getName: getName,
            getJsonFilter: getJsonFilter
        }
    );
});
