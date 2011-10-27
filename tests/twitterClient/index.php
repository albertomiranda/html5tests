<?php 
    $title = "HTML5 Tests";
    $subtitle = "Twitter Client";
?>
<!doctype html>
<html lang="en" manifest="appcache.php">
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
				<h1><?php echo $title . ": " . $subtitle; ?></h1>
				<a href="../../index.html" data-icon="home" data-iconpos="notext" data-direction="reverse" class="ui-btn-right jqm-home">Home</a>
			</div>

			<div data-role="content">
				<div data-role="fieldcontain" class="ui-hide-label">
		         	<label for="search">Search twitter:</label>
		         	<input type="search" name="searchTwitter" id="searchTwitter" value=""  />
		         	<a href="javascript:void(0)" id="getTwitts" data-role="button">Get Twitts!</a>
				</div>
				
			   	<div id="twitts">
				</div>
        	</div>
	        <div data-role="footer">
	            <h6>HTML5 Tests v1.0</h6>
	            <h6>@author Alberto Miranda <a href="mailto:alberto@nextive.com">&lt;alberto@nextive.com&gt;</a></h6>
	            <h6>@author Esteban Abait <a href="mailto:esteban.abait@nextive.com">&lt;esteban.abait@nextive.com&gt;</a></h6>
	        </div>
        </div>
       	<!-- DIALOGS -->
	    <div data-role="dialog" role="dialog" id="twitt-dialog">
			<div data-role="header" data-theme="b">
				<h1 id="twitt-dialog-header">Tweet</h1>
			</div>
			<div data-role="content">
				<div id='twitt-dialog-content'></div>
			</div>
		</div>
        <!-- default javascript content -->
        <script data-main="js/main" src="js/lib/require.js"></script>
    </body>
</html>