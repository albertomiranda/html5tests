/**
 * Controls Twitter class.
 * Obtains twitts from Twitter, creates a collection of Twitt objects and uses
 * renderer to display them.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(["app/twitter/models/Twitter.class", 
        "app/twitter/models/Twitt.class", 
        "lib/mustache", 
        "jQueryMobile"], function(Twitter, Twitt) {
	
    var getTweets = function(query){
        $.mobile.showPageLoadingMsg();
        Twitter.getTweets({q:query}, function(data) { Voxine.TwitterController.render(data); $.mobile.hidePageLoadingMsg(); });
    };
    
    var render = function(data){
        var tweets = data.results;
        
        //render
        var html = '';
        var template = Voxine.templates.twitt;
        $.each(tweets, function(i, twitt){
        	var created_at = new Date(twitt.created_at);
        	twitt.created_at = created_at.getFullYear() + '/' + created_at.getMonth() + '/' + created_at.getDay();
            html+=Mustache.to_html(template, twitt);
        });
        
        //$('#getTwitts').hide();
        $('#twitts').html("<ul data-role='listview' data-theme='g' id='twittList'>" + html + "</ul>");
        $('#twittList').listview(); //apply jquery mobile's styles to the list
        //attach events
        $('.twitt').click(function() {
        	var id = this.id, i, tweet;
        	
        	for (i=0; i<tweets.length; i++) {
        		if (tweets[i].id == id) {
        			tweet = tweets[i];
        		}
        	}
        	$('#twitt-dialog-content').html('<p>' + tweet.text + '</p>');
        	$.mobile.changePage($('#twitt-dialog'), {transition: 'pop', role: 'dialog'});
        });
    }
    
    return {
        "getTweets": getTweets,
        "render": render
    };
});