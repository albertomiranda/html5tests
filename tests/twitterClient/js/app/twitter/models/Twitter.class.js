define("app/twitter/models/Twitter.class", ["jQuery"], function ($) {
	var lastId = 0;
	
	/**
	 * This method makes a JSONP call to the
	 * Twitter's API, and then calls a callback on the results.
	 * 
	 * Takes as input a config object, more parameters can
	 * be added to reflect the Twitter API.
	 * 
	 * @method 	getTweets
	 * @param 	Object {q: query}
	 * @param 	Function callback
	 * @return 	the result of applying the callback to the twitter call or
	 * 		   	{error: errorThrown} in case of an error.
	 */
	var getTweets = function(searchConfig, callback) {
		var q = searchConfig.q;
		
		//Workaround to the "error callback" not called for JSONP
		//
		$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
		    callback({error: errorThrown});
		}});
		
		$.ajax({
			type: 'GET',
			url: "http://search.twitter.com/search.json?q=%40" + q, 
			crossDomain: true,
			success: function (data) {
				callback(data);
			},
			dataType: 'jsonp'
		});
	}
	return {
		getTweets : getTweets
	}
});