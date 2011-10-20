<?php 
    $title = "HTML5 Test";
    $subtitle = "Move Sprite"; 
?>
<!doctype html>
<html lang="en" manifest="html5tests.appcache">
    <head>
        <meta charset="utf-8">
        <title><?php echo "$title: $subtitle"; ?></title>
        <link href="../../css/default.css" rel="stylesheet" />
        
        <!-- jQuery -->
        <script src="http://www.google.com/jsapi"></script>
        <script> google.load("jquery", "1.6.3"); </script>
        
        <!-- Crafty -->
        <script src="js/crafty.js"></script>
        
        <!-- GAME -->
        <script src="js/game.js"></script>
        <script src="js/models/Player.class.js"></script>
    </head>
    <body>
        <header>
            <h1><?php echo "<span class='title'>$title</span>: <span class='subtitle'>$subtitle</span>"; ?></h1>
        </header>
    </body>
</html>