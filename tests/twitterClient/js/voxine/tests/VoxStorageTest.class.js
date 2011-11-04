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
            test('local');
            test('session');
        };
        
        var test = function(type){
            var key = type + '001';
            
            var stf = new VoxStorageFactory();
            
            var st = stf.getStorage(type);
            st.save(key, {var1:'value 1',var2:{var21:'value 21', var22: null},var3:'value 3'});
            console.log('recuperado: ' + JSON.stringify(st.load(key)));
            st.erase(key);
            console.log('recuperado: ' + JSON.stringify(st.load(key)));
        }
        
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
