/**
 * Tools.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['VoxClass'], 
    function(VoxClass) {
        /**
         * Returns true if we are currently running in a mobile device.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @return boolean
         */
        var isMobile = function() {
            //mobile detection
            var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
            return mobile;
        };

        /**
         * Runs a display change to make evident you're on certain mobile device.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var welcomeSpecificMobile = function() {
            var deviceAgent = navigator.userAgent.toLowerCase();
            //var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
            //if(agentID==null) return false;
            alert("Detected agent : " + deviceAgent);
            return false;
            if(agentID.indexOf("iphone")>=0){
                alert("Hello iPhone");
            }
            if(agentID.indexOf("ipod")>=0){
                alert("Hello iPod");
            }
            if(agentID.indexOf("ipad")>=0){
                alert("Hello iPad");
            }
            if(agentID.indexOf("android")>=0){
                alert("Hello Android");
            }
        };

        /**
         * Runs a display change to make evident you're on a mobile device.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var welcomeMobile = function() {
            alert('Enjoy your mobile experience!');
            // Hides mobile browser's address bar when page is done loading.
            window.addEventListener('load', function(e) {
                setTimeout(function() {window.scrollTo(0, 3);}, 1);
            }, false);
        };

        /**
         * Checks if a appcache was updated.
         * If updated asks the user to reload the page.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        var checkCacheUpdate = function() {
            window.applicationCache.addEventListener('updateready', function(e) {
              if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                if (confirm('A new version of this site is available. Load it?')) {
                  window.location.reload();
                }
              }
            }, false);
        };
        
        /**
         * Merges object2 inside object1 overwriting properties already on
         * object1.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @param object obj1
         * @param object obj2
         * @return object
         */
        var mergeObject = function(obj1, obj2){
            for (var attrname in obj2) { obj1[attrname] = obj2[attrname]; }
            return obj1;
        };
        
        //----------------------------------------------------------------------
        //PUBLIC INTERFACE
        return VoxClass.Class(
            'VoxTools',
            null,
            {
                isMobile: isMobile,
                welcomeSpecificMobile: welcomeSpecificMobile,
                welcomeMobile: welcomeMobile,
                checkCacheUpdate: checkCacheUpdate,
                mergeObject: mergeObject
            }
        //----------------------------------------------------------------------
    )
});
