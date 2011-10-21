/**
 * Default global tools and required functionality
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */

//------------------------------------------------------------------------------
//INIT
$(document).ready(function(){
    Global.isMobile();
});
//------------------------------------------------------------------------------

var Global = {
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
    }
};