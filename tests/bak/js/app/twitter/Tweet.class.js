/**
 * Tweet object.
 * Represents one Tweet with all of its components.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(function () {
    //You can name this function here,
    //which can help in debuggers but
    //has no impact on the module name.
    var init = function (tweetData) {
        this.created_at = tweetData.created_at;
        this.profile_image_url = tweetData.profile_image_url;
        this.from_user_id_str = tweetData.from_user_id_str;
        this.id_str = tweetData.id_str;
        this.from_user = tweetData.from_user;
        this.text = tweetData.text;
        this.to_user_id = tweetData.to_user_id;
        this.metadata = tweetData.metadata;
        this.id = tweetData.id;
        this.geo = tweetData.geo;
        this.from_user_id = tweetData.from_user_id;
        this.iso_language_code = tweetData.iso_language_code;
        this.source = tweetData.source;
        this.to_user_id_str = tweetData.to_user_id_str;
    };
    return {
    	init : init,
        created_at : this.created_at,
        profile_image_url : this.profile_image_url,
        from_user_id_str : this.from_user_id_str,
        id_str : this.id_str,
        from_user : this.from_user,
        text : this.text,
        to_user_id : this.to_user_id,
        metadata : this.metadata,
        id : this.id,
        geo : this.geo,
        from_user_id : this.from_user_id,
        iso_language_code : this.iso_language_code,
        source : this.source,
        to_user_id_str : this.to_user_id_str
    };
});