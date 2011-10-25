/**
 * Controls Twitter class.
 * Obtains twitts from Twitter, creates a collection of Twitt objects and uses
 * renderer to display them.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(["app/twitter/models/Twitter.class", "app/twitter/models/Twitt.class", "lib/mustache"], function(Twitter, Twitt) {
    var load = function(){
        var data = Voxine.Twitter.getTwitts();
        var twitts = data.results;
        //console.log(twitts);
        //Voxine.HtmlRenderer.render(twitts.results);
        
        //render
        var html = '';
        var template = Voxine.templates.twittTemplate;
        $.each(twitts, function(i, twitt){
            html+=Mustache.to_html(template, twitt);
        });
        $('#getTwitts').hide();
        $('#twitts').html(html);
    };
    
    return {
        "load": load
    };
});