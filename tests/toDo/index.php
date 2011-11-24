<?php 
    $title = "Voxine App Example";
    $subtitle = "ToDo application";
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        
        <!-- mobile meta tags -->
        <meta class="meta_disable_zoom" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <link rel="apple-touch-icon" href="images/identity/HTML5_Badge_64.png" />
        <link rel="apple-touch-icon-precomposed" href="images/identity/HTML5_Badge_64.png" />
        
        <title><?php echo "$title: $subtitle"; ?></title>
        
        <!-- TODO Update cache manifest with this as well -->
        <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0rc2/jquery.mobile-1.0rc2.min.css" />
    </head>
    <body>
    	<div data-role="page">
    	
    		<div data-role="header">
				<h1>Todos</h1>
				<a href="../../index.html" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a>
			</div>

			<div id="content" data-role="content">
        	</div>
        	
	        <div data-role="footer" class="ui-bar" data-position="inline">
		        <div data-role="controlgroup" data-type="horizontal">
		            <a href="#" data-role="button" data-icon="delete" id="removeBtn">Remove selected</a>
		            <a href="#" data-role="button" data-icon="plus" id="addBtn">Add new todo</a>
		            <a href="#" data-role="button" data-icon="gear" id="saveBtn">Save list</a>
		        </div>
	        </div>
        </div>
        <!-- default javascript content -->
        <script data-main="js/main" src="js/lib/require.js"></script>
    </body>
</html>