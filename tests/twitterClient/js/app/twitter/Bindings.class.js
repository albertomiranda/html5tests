/**
 * Here we define default app UI bindings.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
define(['app/twitter/controllers/TwitterController.class'], function(TwitterController){
    return {
        "apply": function(){
            //define bindings here
            $('#getTwitts').click(function(){
                //alert('Loading Twitts...');
                
                //load twitts
                TwitterController.getTweets();
            });
        }
    };
});