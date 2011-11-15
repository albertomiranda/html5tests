<ul data-role='listview' data-theme='g' id='twittList'>
{{#results}}
<li class = 'twitt' id = {{id}}>
    <p><strong>@{{from_user}}</strong></p>
    <p>{{text}}</p>
    <p class='ui-li-aside'><strong>{{created_at}}</strong></p>
</li>
{{/results}}
</ul>