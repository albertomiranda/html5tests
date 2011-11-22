/**
 * Twitter interface.
 * Provides methods to get data from Twitter.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define([
        'VoxClass',
        'voxine/model/VoxObject.class',
        'jQuery'
    ],
    function(VoxClass, VoxObject) {
    
        var private = {
            context: '',
            callback: ''
        };
    
        var constructor = function(storageType, storageId, options) {
            this.inherited(storageType, storageId, options);
        };
        
        /** 
         * Get tweets from Twitter's real-time search API
         * 
         * Search arguments must be specified as following
         * searchConfig = {q: query, sinceId: tweetId}
         * 
         * @param   Object searchConfig
         * @param   Function callback
         * @return  Applies a callback to a list of tweets.
         */
        var getTweets = function(searchConfig, context, callback) {
            var q = searchConfig.q;
            var sinceId = searchConfig.sinceId;
            var url = "http://search.twitter.com/search.json?q=%20" + q + "&since_id=" + sinceId;
            var config = {
                crossDomain: true,
                dataType: 'jsonp',
                gatewayUrl: url
            };
            
            this.commLayer = 'default';
            var comm = new VoxComm(this);
            
            private.context = context;
            private.callback = callback;
            
            //communicate with the outside world
            comm.send({}, config);
        };
        
        var onSuccess = function(response){
            private.context[private.callback](response);
        };
        
        var onError = function(response){
            console.log(response);
        };
        
        return VoxClass.Class(
            'Twitter',
            VoxObject,
            {
                constructor: constructor,
                getTweets: getTweets,
                onSuccess: onSuccess,
                onError: onError
            }
        );
});
