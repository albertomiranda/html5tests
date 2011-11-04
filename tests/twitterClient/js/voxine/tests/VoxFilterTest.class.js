/**
 * Framework Tests: VoxFilter
 * 
 * @author Juan Arribillaga <juan.arribillaga@globant.com>
 */
define(
    [
        'voxine/collection/VoxFilter.class'
    ],
    function(VoxFilter) {
        
        var filterInstance, jsonFilter;
        
        /**
         * Test of instance creation and init values.
         * @coverage: constructor, getId, setId, getName, 
         *            setName, parseFilter
         */
        var initValuesTest = function() {
            jsonFilter = {
                id: 1,
                name: "TestFilterName"
            }
            filterInstance = new VoxFilter(jsonFilter);
            console.assert(filterInstance.getId() === 1);
            console.assert(filterInstance.getName() === "TestFilterName");
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
