/**
 * Tools.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(['VoxClass', 'app/twitter/models/Twitt.class'], function(VoxClass, Twitt) {
    return VoxClass.Class(
        'Tools',
        null,
        {
           /**
         * Returns true if we are currently running in a mobile device.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @return boolean
         */
        isMobile: function() {
            //mobile detection
            var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
            return mobile;
        },
        
        /**
         * Runs a display change to make evident you're on certain mobile device.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        welcomeSpecificMobile: function() {
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
        },
        
        /**
         * Runs a display change to make evident you're on a mobile device.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        welcomeMobile: function() {
            alert('Enjoy your mobile experience!');
            // Hides mobile browser's address bar when page is done loading.
            window.addEventListener('load', function(e) {
                setTimeout(function() {window.scrollTo(0, 3);}, 1);
            }, false);
        },
        
        /**
         * Checks if a appcache was updated.
         * If updated asks the user to reload the page.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        checkCacheUpdate: function() {
            window.applicationCache.addEventListener('updateready', function(e) {
              if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
                window.applicationCache.swapCache();
                if (confirm('A new version of this site is available. Load it?')) {
                  window.location.reload();
                }
              }
            }, false);
        },
        
        /**
         * Runs a predefined set of tests.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         */
        runTests: function() {
            var data = {
                "created_at": "Wed, 19 Jan 2011 21:16:37 +0000",
                "profile_image_url": "http://a2.twimg.com/sticky/default_profile_images/default_profile_1_normal.png",
                "from_user_id_str": "191709163",
                "id_str": "27836852555751424",
                "from_user": "DanLabTesting",
                "text": "Twitter api: 1234455",
                "to_user_id": null,
                "metadata": {
                    "result_type": "recent"
                },
                "id": 27836852555751424,
                "geo": null,
                "from_user_id": 191709163,
                "iso_language_code": "en",
                "source": "&lt;a href=&quot;http://www.danlabgames.com/index.php?computer=ipad&quot; rel=&quot;nofollow&quot;&gt;Wacka Monsta&lt;/a&gt;",
                "to_user_id_str": null
            };
            var Twitt1 = new Twitt(data);
            console.log(Twitt1);
        }
           
           
        })
});
