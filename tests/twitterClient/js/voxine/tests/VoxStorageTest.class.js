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
            storageKey : "veryUniqueKey",
            
            /* Remote Storage config, maybe it could be returned as
            a separate object through getRemoteConfig() or something like that
            */
            gatewayUrl: "/persistence/persistence_1.php",
            commLayer: "default",
            onSaveSuccess: function(response){
                console.log("Object "+storableObject.oid+" Says: Remote Save Storage succeded: " 
                    + JSON.stringify(response));},
            onLoadSuccess: function(response){
                console.log("Object "+storableObject.oid+" Says: Remote Load Storage succeded: " 
                    + JSON.stringify(response));}
            
        }
        
        var voxStorageTest = function() {
            //test('nonValidType');
            //test('local');
            //test('session');
            test('remote');
            //test('lsr');
        };
        
        var test = function(type){
            
            console.group("Testing storage type : " + type);
            var stf = new VoxStorageFactory();
            var st = stf.getStorage(type);
            
            st.bind('onEraseSuccess', function(response){
                console.log('onEraseSuccess por defecto recibio: ' + response);});
            
            var sto = jQuery.extend(true, {}, storableObject);
            sto.oid = sto.oid++;
            //console.log(sto);
            
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
