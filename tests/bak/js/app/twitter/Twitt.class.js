/**
 * Twitt object.
 * Represents one Twitt with all of its components.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */
define(function (data) {
    return function(data){
        /**
         * Returns Twitt in HTML format, ready to display.
         * 
         * @author Alberto Miranda <alberto@nextive.com>
         * @return string
         */
        this.getHtml = function(){
            var template = Voxine.templates.twitt;
            return Mustache.to_html(template, this.data);
        }
        
        this.created_at = data.created_at,
        this.profile_image_url = data.profile_image_url,
        this.from_user_id_str = data.from_user_id_str,
        this.id_str = data.id_str,
        this.from_user = data.from_user,
        this.text = data.text,
        this.to_user_id = data.to_user_id,
        this.metadata = data.metadata,
        this.id = data.id,
        this.geo = data.geo,
        this.from_user_id = data.from_user_id,
        this.iso_language_code = data.iso_language_code,
        this.source = data.source,
        this.to_user_id_str = data.to_user_id_str
    };
});