/**
 * VoxConfig.class
 * 
 * Provides access to the application configuration object
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 * @author Alberto Miranda <alberto@nextive.com>
 */
define([    
    'VoxClass',
    'app/config/AppConfig',
    'voxine/tools/VoxTools.class'
    ], 
    function(VoxClass, AppConfig, VoxTools) {
        //----------------------------------------------------------------------
        /**
         * PRIVATE
         */
        //init configs
        var voxineConfig = {};
        var appConfig = {};
        
        //default config
        var voxineDefaultConfig = {
            "gatewayUrl": "index.php",
            "default": "test"
        };
        
        //voxine custom hosts config
        var voxineHostsConfig = {
            "localhost": {
                "gatewayUrl": "index.custom.php",
                "host": "localhost"
            }
        };
        
        //MERGE CONFIGS
        var host = 'localhost'; //test
        var tools = new VoxTools;
        var voxineConfig = tools.mergeObject(voxineDefaultConfig, voxineHostsConfig[host]);
        console.log(voxineConfig);
        //----------------------------------------------------------------------
        
        //----------------------------------------------------------------------
        /**
         * PUBLIC INTERFACE
         */
        return VoxClass.Class(
            'VoxConfig',
            null,
            {   
                voxine: voxineConfig,
                app: appConfig
            }
        );
        //----------------------------------------------------------------------
    }
);