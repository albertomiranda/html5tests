<?php 
    $title = "HTML5 Tests";
    $subtitle = "MAIN";
    
    //get tests navigation
    $testsDir = 'tests';
    $omit = array('.', '..');
    $testsNav = '';
    $dirContent = scandir($testsDir); //using scandir to get files and dirs ordered alphabethically
    foreach($dirContent as $dirName){
        //skip unwanted dirs and files
        if(in_array($dirName, $omit)) continue;
        
        $testsNav.="\t\t\t<a href='tests/$dirName/'>$dirName</a>\n";
    }
?>
<!doctype html>
<html lang="en" manifest="html5tests.appcache">
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
        
        <!-- jQuery -->
        <script src="http://www.google.com/jsapi"></script>
        <script> google.load("jquery", "1.6.3"); </script>
        
        <!-- default javascript content -->
        <script src="js/default.js"></script> 
    </head>
    <body>
        <header>
            <h1><?php echo "<span class='title'>$title</span>: <span class='subtitle'>$subtitle</span>"; ?></h1>
        </header>
        
        <nav>
            <?php echo $testsNav; ?>
        </nav>
        
        <footer>
            <div>HTML5 Tests v1.0</div>
            <div>@author Alberto Miranda <a href="mailto:alberto@nextive.com">&lt;alberto@nextive.com&gt;</a></div>
            <div>@author Esteban Abait <a href="mailto:esteban.abait@nextive.com">&lt;esteban.abait@nextive.com&gt;</a></div>
        </footer>
    </body>
</html>