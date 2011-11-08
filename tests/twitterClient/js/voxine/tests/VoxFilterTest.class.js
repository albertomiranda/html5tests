/**
 * Framework Tests: VoxFilter
 * 
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define(
    [
        'app/models/User.class',
        'app/models/filter/UserFilter.class'
    ],
    function(UserModel, UserFilter) {
        var filterInstance, jsonFilter;
        
        /**
         * Test of instance creation and init values.
         * @coverage: constructor, parseFilter, mixWith
         */
        var initValuesTest = function() {
            jsonFilter = {
                id: 1,
                name: "Juan Arribillaga",
                email: "juan.arribillaga@globant.com"
            };
            
            filterInstance = new UserFilter(jsonFilter);
            
            console.assert(filterInstance.getId() === 1);
            console.assert(filterInstance.getName() === "Juan Arribillaga");
            console.assert(filterInstance.getEmail() === "juan.arribillaga@globant.com");
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Test of filter getter
         * @coverage: getJsonFilter
         */
        var getJsonFilterTest = function() {
            console.assert(filterInstance.getJsonFilter().id === jsonFilter.id);
            console.assert(filterInstance.getJsonFilter().name === jsonFilter.name);
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        return  {
            initValuesTest: initValuesTest,
            getJsonFilterTest: getJsonFilterTest
        };
    }
);
