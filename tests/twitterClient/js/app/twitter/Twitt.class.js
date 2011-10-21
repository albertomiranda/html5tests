/**
 * Tweet object.
 * Represents one Tweet with all of its components.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
Voxine.twitter = {};
Voxine.twitter.Twitt = function(twittData){
    var data = twittData;
    return {
        /**
         * Returns Twitt in HTML format, ready to display.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @return string
         */
        "getHtml": function(){
            var template = Voxine.templates.twitt;
            return Mustache.to_html(template, data);
        },
        
        "created_at": data.created_at,
        "profile_image_url": data.profile_image_url,
        "from_user_id_str": data.from_user_id_str,
        "id_str": data.id_str,
        "from_user": data.from_user,
        "text": data.text,
        "to_user_id": data.to_user_id,
        "metadata": data.metadata,
        "id": data.id,
        "geo": data.geo,
        "from_user_id": data.from_user_id,
        "iso_language_code": data.iso_language_code,
        "source": data.source,
        "to_user_id_str": data.to_user_id_str
    };
};