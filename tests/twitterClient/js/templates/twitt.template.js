define(function () {
return "\
<div class='twitt'>\
    <div>\
        <span class='title'>@author</span> <span class='author'>{{from_user}}</span>\
    </div>\
    <div>\
        <span class='title'>@date</span> <span class='timestamp'>{{created_at}}</span>\
    </div>\
    <div>\
        {{text}}\
    </div>\
</div>\
";
});