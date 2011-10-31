/**
 * Here we define default app UI bindings.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
define(['VoxClass', 'app/twitter/controllers/TwitterController.class'], function(VoxClass, TwitterController) {
    return VoxClass.Class(
        'Bindings',
        null,
        {
            apply: function(){
                //define bindings here
                $('#getTwitts').click(function(){
                    //load twitts
                    var TwitterControllerInstance = new TwitterController();
                    TwitterControllerInstance.getTweets($('#searchTwitter').val());
                });
            }
        })
});
