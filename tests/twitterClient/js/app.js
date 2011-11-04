Vox = {};

// Filename: app.js
define([
  'VoxClass',
  'voxine/core/VoxMediator.class',
  'jQuery',
  'voxine/tools/VoxTools.class',
  'app/Bindings.class',
  'app/controllers/TwitterController.class',
  'voxine/tests/VoxTests.class',
  'lib/mustache'
], function(VoxClass, VoxMediator, $, VoxTools, Bindings, TwitterController, VoxTests) {
    Vox.tests = VoxTests;
    return VoxClass.Class(
        'App',
        null,
        {
            initialize: function() {
                //start
                $(document, this).ready(function(){
                    //set default bindings
                    var bindingInstance = new Bindings();
                    bindingInstance.apply();
                    
                    //detect mobile
                    var tools = new VoxTools;
                    if(tools.isMobile()) tools.welcomeMobile();
                });
            }
        })
});