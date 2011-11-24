/**
 * Framework Tests: VoxDefaultComm
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(
    ['voxine/comm/VoxDefaultComm.class'],
    function(VoxComm) {
        var comm;
        
        var setUp = function() {
            comm = new VoxDefaultComm({
                gatewayUrl: 'http://search.twitter.com/search.json?q=%20HTML5',
                type: 'GET',
                dataType: 'jsonp',
                crossdomain: true
            });
        }
        
        /**
         * Test VoxDefaultComm constructor returning
         * always the same instance
         * 
         * @author Esteban Abait <esteban.abait@nextive.com>
         */
        var testSingleton = function() {
            this.setUp();
            
            var instance1 = new VoxDefaultComm({gatewayUrl:"www"}),
                instance2 = new VoxDefaultComm({gatewayUrl:"xxx"});
            
            console.assert(instance1.getGatewayURL() === 'http://search.twitter.com/search.json?q=%20HTML5');
            console.assert(instance2.getGatewayURL() === 'http://search.twitter.com/search.json?q=%20HTML5');
            
            console.log('%cFinished', 'color: green; font-weight:bold;');
        };
        
        /**
         * Test VoxDefaultComm JSONP request
         */
        var testJSONrequest = function() {  
            this.setUp();
            comm.send(null, { 
                onSuccess : function(data) {
                    var results = data.results, i, l;
                    console.group('Tweets');
                    for (i=0, l=results.length; i < l; i++) {
                        console.log(results[i].text); 
                    };
                    console.groupEnd();
                }
            });
        };

        return  {
            setUp: setUp,
            testSingleton: testSingleton,
            testJSONrequest: testJSONrequest
        };
    }
);