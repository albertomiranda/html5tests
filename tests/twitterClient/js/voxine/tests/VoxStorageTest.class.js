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
        
        var packet = {var1:'value 1',var2:{var21:'value 21', var22: null},var3:'value 3'};
        var connConfig = {
            gatewayUrl: "www",
            commLayer: "default",
            onSuccess: function(response){console.log("Storage succeded: " + response);},
            onError: function(response){console.log("Storage error: " + response);}
        };
        
        var voxStorageTest = function() {
            test('local');
            test('session');
            testRemote();
        };
        
        var test = function(type){
            var key = type + '001';
            
            var stf = new VoxStorageFactory();
            var st = stf.getStorage(type);
            
            st.save(key, packet);
            console.log('recuperado: ' + JSON.stringify(st.load(key)));
            st.erase(key);
            console.log('recuperado: ' + JSON.stringify(st.load(key)));
        }
        
        var testRemote = function(){
            var type = "remote";
            var key = type + '001';
            
            var stf = new VoxStorageFactory();
            var st = stf.getStorage(type);
            
            st.save(key, packet, connConfig);
            console.log('recuperado: ' + JSON.stringify(st.load(key, connConfig)));
            st.erase(key, connConfig);
            console.log('recuperado: ' + JSON.stringify(st.load(key, connConfig)));
        }
        
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
