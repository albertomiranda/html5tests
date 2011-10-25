/**
 * Controls Twitter class.
 * Obtains twitts from Twitter, creates a collection of Twitt objects and uses
 * renderer to display them.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(["app/twitter/models/Twitter.class", "app/twitter/models/Twitt.class", "lib/mustache"], function(Twitter, Twitt) {
    var getTweets = function(){
        Twitter.getTweets({q:"Handball"}, function(data) { Voxine.TwitterController.render(data) });
    };
    
    var render = function(data){
        var tweets = data.results;
        
        //render
        var html = '';
        var template = Voxine.templates.twitt;
        $.each(tweets, function(i, twitt){
            html+=Mustache.to_html(template, twitt);
        });
        $('#getTwitts').hide();
        $('#twitts').html(html);
        
        //attach events
        $('.twitt').click(function(){
            alert("Selected Twitt ID: " + this.id);
        });
    }
    
    return {
        "getTweets": getTweets,
        "render": render
    };
});