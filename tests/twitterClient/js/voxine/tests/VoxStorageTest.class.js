/**
 * Framework Tests: VoxMediator
 * 
 * @author Leonardo Bianchi <leonardo.bianchi@nextive.com>
 */
define(
    [
        'voxine/storage/VoxStorage.class',
        'voxine/storage/VoxLocalStorage.class'
    ],
    function() {
        var voxStorageTest = function() {
            var st = new VoxStorage();
            st.setSubType('local');
            
            st.save("key", "value_001");
            console.log(st.load("key"));
        };
        
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
