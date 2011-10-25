/**
 * Includes all required funcionality to interact with Twitter API.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(['Voxine/tools/Tools.class', 'app/twitter/data/Twitts.sample'], function (Tools, TwittsSample) {
        var getTwitts = function(){
            return TwittsSample;
        };
        
	return {
            "getTwitts": getTwitts
        };
});