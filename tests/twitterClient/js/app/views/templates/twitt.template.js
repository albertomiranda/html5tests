define(function () {
    return "\
        <li class = 'twitt' id = {{id}}>\
            <p><strong>@{{from_user}}</strong></p>\
            <p>{{text}}</p>\
            <p class='ui-li-aside'><strong>{{created_at}}</strong></p>\
        </li>\
    ";
});