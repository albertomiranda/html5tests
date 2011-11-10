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
         
        var storableObject ={
            prune : function(){return packet;},
            getStorageKey : function(){return "veryUniqueKey";},
            
            /* Remote Storage config, maybe it could be returned as
            a separate object thorough getRemoteConfig() or something like that
            */
            gatewayUrl: "www",
            commLayer: "default",
            onSuccess: function(response){
                console.log("Storage succeded: " + JSON.stringify(response));},
            onError: function(response){
                console.log("Storage error: " + JSON.stringify(response));}
            
        }
        
        var voxStorageTest = function() {
            test('local');
            test('session');
            test('remote');
        };
        
        var test = function(type){
            
            console.log("testing storage type : " + type);
            var stf = new VoxStorageFactory();
            var st = stf.getStorage(type);
            
            st.save(storableObject);
            console.log('recuperado: ' + JSON.stringify(st.load(storableObject)));
            st.erase(storableObject);
            console.log('recuperado: ' + JSON.stringify(st.load(storableObject)));
        }
                
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
