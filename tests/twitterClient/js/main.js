/**
 * This is the app entry point.
 * Here we'll define the initial structure and require needed javascript 
 * building blocks.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */

//------------------------------------------------------------------------------
//REQUIRES
require(["app/twitter/Twitt.class", "lib/mustache", "templates/twitt.template"], function() {
    //required js files was just loaded
});
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//INIT
$(document).ready(function(){
    Voxine.tools.isMobile();
    Voxine.tools.runTests();
});
//------------------------------------------------------------------------------

Voxine = {};
Voxine.templates = {};
Voxine.tools = {
    "isMobile": function(){
        //mobile detection
        var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));  
        if (mobile) {  
            alert('Enjoy your mobile experience!');
            // Hides mobile browser's address bar when page is done loading.
            window.addEventListener('load', function(e) {
                setTimeout(function() {window.scrollTo(0, 1);}, 1);
            }, false);
        }
    },

    "checkCacheUpdate": function(){
        window.applicationCache.addEventListener('updateready', function(e) {
          if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            window.applicationCache.swapCache();
            if (confirm('A new version of this site is available. Load it?')) {
              window.location.reload();
            }
          }
        }, false);
    },
    
    "runTests": function(){
        var twittData = {
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
        
        var Twitt = new Voxine.twitter.Twitt(twittData);
        console.log(Twitt.getHtml());
    }
};