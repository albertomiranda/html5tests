/**
 * Here we define default app UI bindings.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
define(['classHandler', 'app/twitter/controllers/TwitterController.class'], function(ClassHandler, TwitterController) {
    return ClassHandler.Class(
        'Bindings',
        null,
        {
            apply: function(){
                //define bindings here
                $('#getTwitts').click(function(){
                    //load twitts
                    TwitterController.getTweets($('#searchTwitter').val());
                });
            }
        })
});
