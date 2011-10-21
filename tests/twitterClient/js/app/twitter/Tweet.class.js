/**
 * Tweet object.
 * Represents one Tweet with all of its components.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
Voxine.twitter = {};
Voxine.twitter.Tweet = function(tweetData){
    return {
        "created_at": tweetData.created_at,
        "profile_image_url": tweetData.profile_image_url,
        "from_user_id_str": tweetData.from_user_id_str,
        "id_str": tweetData.id_str,
        "from_user": tweetData.from_user,
        "text": tweetData.text,
        "to_user_id": tweetData.to_user_id,
        "metadata": tweetData.metadata,
        "id": tweetData.id,
        "geo": tweetData.geo,
        "from_user_id": tweetData.from_user_id,
        "iso_language_code": tweetData.iso_language_code,
        "source": tweetData.source,
        "to_user_id_str": tweetData.to_user_id_str
    };
};