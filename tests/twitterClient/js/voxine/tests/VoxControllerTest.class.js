/**
 * Framework Tests: VoxController
 * 
 * @author Pablo Martinez Dorr <pablo.martinez@nextive.com>
 */
define([
     'voxine/controller/VoxController.class'
], function(VoxController) {
        /**
         * Test VoxController Creation.
         */
        var voxControllerTest = function() {
            var voxController = new VoxController();
            var data = {
                "testName": "VoxControllerTest",
                "subtitle": "This test worked just fine. Enjoy!",
                "url": "albertomiranda.com.ar/html5",
                "urlName": "HTML5 Tests"
            };
            
            voxController.bindingsMap({
                "testView1.view.php": {
                    "getTwitts": {
                        "click": function() { alert('test!'); }
                    }
                }
            });
            
            voxController.render('testView1.view.php', '#tweets', data);
            
            /*this.bind('parsed', function(output){
                console.log("VoxControllerTest finished\n" + output);
            });*/
        };
        
        return {
            defaultTest: voxControllerTest
        };
    }
);
