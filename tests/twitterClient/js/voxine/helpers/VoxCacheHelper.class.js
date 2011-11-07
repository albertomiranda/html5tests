/**
 * Cache helper. All cache related methods should be here!
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['VoxClass'], 
    function(VoxClass) {
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
    
        //----------------------------------------------------------------------
        //PUBLIC INTERFACE
        return VoxClass.Class(
            'VoxTools',
            null,
            {
                checkCacheUpdate: checkCacheUpdate
            }
        //----------------------------------------------------------------------
    );
});
