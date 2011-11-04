define([    
    'VoxClass',
    'voxine/tools/VoxTools.class'
    ], 
    function(VoxClass, VoxTools) {
        //default config
        var appDefaultConfig = {
            "setting1" : "value setting 1"
        };
        
        //app custom hosts config
        var appHostsConfig = {
            "localhost": {
                "Esteban" : "Q170",
                "Paul": "Ha7man"
            }
        };
        
        //MERGE CONFIGS
        var host = 'localhost'; //test, TODO: obtain actual hostname
        var tools = new VoxTools;
        var config = tools.mergeObject(appDefaultConfig, appHostsConfig[host]);
        
        //----------------------------------------------------------------------
        /**
         * PUBLIC INTERFACE
         */
        return config;
        //----------------------------------------------------------------------
    }
);
