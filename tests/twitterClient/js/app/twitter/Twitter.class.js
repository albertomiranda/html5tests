define(["jQuery", "app/twitter/Twitt.class"], function ($, Twitt) {
	
	var lastId = 0;
	
	var getTweets = function(searchConfig, callback) {
		var q = searchConfig.q;
		
		//Workaround to the "error callback" not called for JSONP
		//
		$.ajaxSetup({"error":function(XMLHttpRequest,textStatus, errorThrown) {   
			console.log("ERROR status: " + textStatus);
		    console.log("ERROR thrown error: " + errorThrown);
		    console.log("ERROR response text: " + XMLHttpRequest.responseText);
		    
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