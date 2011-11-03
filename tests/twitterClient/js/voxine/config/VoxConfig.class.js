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
    'app/config/AppConfig'
    ], 
    function(VoxClass, Config) {

        /**
         * PRIVATE METHODS----------------------------------------------------------
         */
        var getVoxineInfo = function(key) {
            return Config.config.voxine[key];
        };
        
        var getHostInfo = function(host) {
            return getVoxineInfo(host);    
        };
        
        /**
         * PUBLIC INTERFACE--------------------------------------------------------------
         */
        return VoxClass.Class(
            'VoxConfig',
            null,
            {   
                getVoxineInfo : getVoxineInfo,
                getHostInfo : getHostInfo
            }
        );  
    }
);