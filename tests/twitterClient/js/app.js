Vox = {};

// Filename: app.js
define([
  'VoxClass',
  'voxine/core/VoxMediator.class',
  'jQuery',
  'voxine/tools/Tools.class',
  'app/Bindings.class',
  'app/controllers/TwitterController.class',
  'voxine/tests/VoxTests.class',
  'lib/mustache'
], function(VoxClass, VoxMediator, $, Tools, Bindings, TwitterController, VoxTests) {
    Vox.tests = VoxTests;
    return VoxClass.Class(
        'App',
        null,
        {
            initialize: function() {
                var ToolsInstance;
                //start
                $(document, this).ready(function(){
                    //set default bindings
                    var bindingInstance = new Bindings();
                    bindingInstance.apply();
                    
                    //detect mobile
                    ToolsInstance = new Tools();
                    if(ToolsInstance.isMobile()) ToolsInstance.welcomeMobile();
                    //ToolsInstance.runTests();

                    //----------------------------------------------------------
                    //run tests
                    //VoxTests.mediator();
                    //VoxTests.view1();
                    //VoxTests.view2();
                    //VoxTests.view3();
                    VoxTests.voxObjectTest();
                    //----------------------------------------------------------
                });
            }
        })
});
