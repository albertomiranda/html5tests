/**
 * Controls Twitter class.
 * Obtains twitts from Twitter, creates a collection of Twitt objects and uses
 * renderer to display them.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([    
        'VoxClass',
        'app/models/Twitter.class', 
        'app/models/Twitt.class',
        'app/views/templates/twitt.template',
        'mustache', 
        'jQueryMobile'
    ], 
    function(VoxClass, TwitterModel, Twitt, TwittTemplate) {
        return VoxClass.Class(
            'TwitterController',
            null,
            {
                getTweets: function(query){
                    $.mobile.showPageLoadingMsg();
                    var TwitterInstance = new TwitterModel();
                    TwitterInstance.getTweets({q:query}, this, "onTweetsLoaded");
                },
                
                /***
                 * Callback when twitts are loaded.
                 * @author Juan Arribillaga <juan.arribillaga@globant.com>
                 */
                onTweetsLoaded: function(data) {
                    this.render(data);
                    $.mobile.hidePageLoadingMsg(); 
                },
                
                render: function(data){
                    var html = '';
                    var tweetResults = data.results;
                    var tweetsSize = tweetResults.length;
                    for (var i = 0; i < tweetsSize; i++) {
                        var created_at = new Date(tweetResults[i].created_at);
                        tweetResults[i].created_at = created_at.getFullYear() + '/' + created_at.getMonth() + '/' + created_at.getDay();
                        html += Mustache.to_html(TwittTemplate, tweetResults[i]);
                    }
                    $('#tweets').html("<ul data-role='listview' data-theme='g' id='twittList'>" + html + "</ul>");
                    $('#twittList').listview(); //apply jquery mobile's styles to the list
                    //attach events
                    $('.twitt').bind('click', function(event) {
                            var id = this.id, i, tweet;
                            for (var i = 0; i < tweetsSize; i++) {
                                    if (tweetResults[i].id == id) {
                                            tweet = tweetResults[i];
                                    }
                            };
                            $('#twitt-dialog-content').html('<p>' + tweet.text + '</p>');
                            $.mobile.changePage($('#twitt-dialog'), {transition: 'pop', role: 'dialog'});
                    });
                }
            }
        );
});
