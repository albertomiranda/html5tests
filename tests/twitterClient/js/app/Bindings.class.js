/**
 * Here we define default app UI bindings.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
define(['classHandler', 'app/controllers/TwitterController.class'], function(ClassHandler, TwitterController) {
    return ClassHandler.Class(
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
