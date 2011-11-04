/**
 * Framework Tests: VoxMediator
 * 
 * @author Leonardo Bianchi <leonardo.bianchi@nextive.com>
 */
define(
    [
        'voxine/storage/VoxStorageFactory.class'
    ],
    function() {
        var voxStorageTest = function() {
            var stf = new VoxStorageFactory();
            var st = stf.getStorage('local');
            
            st.save('key', 'value_002');
            console.log('recuperado: ' + st.load('key'));
        };
        
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
