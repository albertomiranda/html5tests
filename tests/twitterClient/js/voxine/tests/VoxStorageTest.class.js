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
            var st = new VoxLocalStorage();
            st.save("key", "value_001");
            alarm(st.load("key"));
        };
        
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
