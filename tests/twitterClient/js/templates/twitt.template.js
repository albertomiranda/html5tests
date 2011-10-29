define(['classHandler'], function(ClassHandler) {
    return ClassHandler.Class(
        'TwittTemplate',
        null,
        {
            getTwitt: function() {
                return "\
                    <li class='twitt' id='{{id_str}}' data-icon='false'>\
                            <a href=''\
                                <p>\
                                    <strong>@author </strong>{{from_user}}\
                                </p>\
                                <p>\
                                    {{text}}\
                                </p>\
                                <p class='ui-li-aside'>\
                                    <strong>@date </strong>{{created_at}}\
                                </p>\
                            </a>\
                    </li>\
                ";
            }
        });
});
