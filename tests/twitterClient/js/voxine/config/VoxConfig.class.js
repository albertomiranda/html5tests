/**
 * VoxConfig.class
 * 
 * Provides access to the application configuration object
 * 
 * @author Esteban Abait <esteban.abait@nextive.com>
 * @author Alberto Miranda <alberto@nextive.com>
 */
define([    
    'app/config/AppConfig',
    'voxine/tools/VoxTools.class'
    ], 
    function(appConfig, VoxTools) {
        //----------------------------------------------------------------------
        /**
         * PRIVATE
         */
        //default config
        var voxineDefaultConfig = {
            "gatewayUrl": "index.php"
        };
        
        //voxine custom hosts config
        var voxineHostsConfig = {
            "localhost": {
                "gatewayUrl": "index.custom.php"
            }
        };
        
        //MERGE CONFIGS
        var host = 'localhost'; //test, TODO: obtain actual hostname
        var tools = new VoxTools;
        var voxineConfig = tools.mergeObject(voxineDefaultConfig, voxineHostsConfig[host]);
        
        var config = {   
            voxine: voxineConfig,
            app: appConfig
        };
        console.log(config);
        //----------------------------------------------------------------------
        
        //----------------------------------------------------------------------
        /**
         * PUBLIC INTERFACE
         */
        return config;
        //----------------------------------------------------------------------
    }
);