define("app/twitter/models/Twitter.class", ["jQuery"], function ($) {
	var lastId = 0;
	
	/**
	 * This method makes a JSONP call to the
	 * Twitter's API, and then calls a callback on the results.
	 * 
	 * @method 	ajaxCall
	 * @param 	String url
	 * @param 	Function callback
	 * @return 	applies the callback to the results of the twitter call or
	 * 		   	{error: errorThrown} in case of an error.
	 */
	var ajaxCall = function (url, callback) {
		//Workaround to the "error callback" not called for JSONP
		$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
		    callback({error: errorThrown});
		}});
		
		$.ajax({
			type: 'GET',
			url: url, 
			crossDomain: true,
			success: function (data) {
				callback(data);
			},
			dataType: 'jsonp'
		});
	};
	
	/** 
	 * Get tweets from Twitter's real-time search API
	 * 
	 * Search arguments must be specified as following
	 * searchConfig = {q: query, sinceId: tweetId}
	 * 
	 * @method 	getTweets
	 * @param 	Object searchConfig
	 * @param 	Function callback
	 * @return  Applies a callback to a list of tweets.
	 */
	var getTweets = function(searchConfig, callback) {
		var q = searchConfig.q;
		var sinceId = searchConfig.sinceId;
		var url = "http://search.twitter.com/search.json?q=%40" + q + "&since_id=" + sinceId;
		this.ajaxCall(url, callback);
	};
	
	 /** 
	 * UNTESTED METHOD
	 * 
	 * Return up to 100 users worth of extended information
	 * 
	 * Search arguments must be specified as following
	 * searchConfig = {q: [userID | username | both] }
	 * 
	 * @method 	getTweets
	 * @param 	Object searchConfig
	 * @param 	Function callback
	 * @return  Applies a callback to a list of tweets.
	 */
	var getUser = function(searchConfig, callback) {
		var q = searchConfig.q;
		var url = "http://api.twitter.com/1/users/lookup.json?q=%40" + q;
		this.ajaxCall(url, callback);
	};
	
	return {
		getTweets : getTweets,
		getUser : getUser
	}
});