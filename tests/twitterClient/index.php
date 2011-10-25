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
        <link href="css/default.css" rel="stylesheet" />
    </head>
    <body>
        <header>
            <h1><?php echo "<span class='title'>$title</span>: <span class='subtitle'>$subtitle</span>"; ?></h1>
        </header>
        
        <section>
            <div id="twitts">
                No Twitts loaded
            </div>
            <input id="getTwitts" type="button" value="Get Twitts!" />
        </section>
        
        <footer>
            <div>HTML5 Tests v1.0</div>
            <div>@author Alberto Miranda <a href="mailto:alberto@nextive.com">&lt;alberto@nextive.com&gt;</a></div>
            <div>@author Esteban Abait <a href="mailto:esteban.abait@nextive.com">&lt;esteban.abait@nextive.com&gt;</a></div>
        </footer>
        
        <!-- default javascript content -->
        <script data-main="js/main" src="js/lib/require.js"></script>
    </body>
</html>