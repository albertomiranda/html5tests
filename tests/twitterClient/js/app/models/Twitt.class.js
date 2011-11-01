/**
 * Twitt object.
 * Represents one Twitt with all of its components.
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 * @author Esteban Abait <esteban.abait@nextive.com>
 */

define(['VoxClass', "templates/twitt.template", 'mustache'], function(VoxClass, TwittTemplate) {
    return VoxClass.Class(
        'Twitt',
        null,
        {
            constructor: function(data) {
                this.data = data;
                this.created_at = data.created_at;
                this.profile_image_url = data.profile_image_url;
                this.from_user_id_str = data.from_user_id_str;
                this.id_str = data.id_str;
                this.from_user = data.from_user;
                this.text = data.text;
                this.to_user_id = data.to_user_id;
                this.metadata = data.metadata;
                this.id = data.id;
                this.geo = data.geo;
                this.from_user_id = data.from_user_id;
                this.iso_language_code = data.iso_language_code;
                this.source = data.source;
                this.to_user_id_str = data.to_user_id_str;
            },
            
            /**
             * Returns Twitt in HTML format, ready to display.
             * 
             * @author Alberto Miranda <alberto@nextive.com>
             * @return string
             */
            getHtml: function() {
                var template = new TwittTemplate();
                return Mustache.to_html(template.getTwitt(), this.data);
            }
        })
});
