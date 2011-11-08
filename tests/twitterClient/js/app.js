Vox = {};

// Filename: app.js
define([
    'app/VoxApplication.class',
    'voxine/tests/VoxTests.class',
    'Modernizr',
    'voxine/core/VoxPolyfillsLoader.class'
    ], 
    function(App, VoxTests, Modernizr, Polyfills) {
        Vox.tests = VoxTests;
        
        /**
         * Eventually, we could handle at this point loading different
         * application versions according to some device detection
         * technique
         * 
         *   var loader = new Polyfills();
         *   loader.yepnope ([
         *       {
         *           test : test device is a table,
         *           yep : 'load table version'
         *       }
         *   ]);
        */
    
        return App;
    }
);