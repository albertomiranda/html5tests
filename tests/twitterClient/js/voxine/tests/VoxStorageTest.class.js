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
            oid : 0,
            prune : function(){return packet;},
            getStorageKey : function(){return "veryUniqueKey";},
            
            /* Remote Storage config, maybe it could be returned as
            a separate object thorough getRemoteConfig() or something like that
            */
            gatewayUrl: "/persistence/persistence_1.php",
            commLayer: "default",
            onSaveSuccess: function(response){
                console.log("Object "+storableObject.oid+" Says: Remote Save Storage succeded: " 
                    + JSON.stringify(response));},
            onLoadError: function(response){
                console.log("Object "+storableObject.oid+" Says: Remote Load Storage error: " 
                    + JSON.stringify(response));}
            
        }
        
        var voxStorageTest = function() {
            //test('nonValidType');
            test('local');
            //test('session');
            //test('remote');
            //test('lsr');
        };
        
        var test = function(type){
            
            console.group("Testing storage type : " + type);
            var stf = new VoxStorageFactory();
            var st = stf.getStorage(type);
            var sto = jQuery.extend(true, {}, storableObject);
            sto.oid = sto.oid++;
            console.log(sto);
            
            st.save(sto);
            st.load(sto);
            st.erase(sto);
            st.load(sto);
            console.groupEnd();
        }
                
        return  {
            voxStorageTest: voxStorageTest
        };
    }
);
