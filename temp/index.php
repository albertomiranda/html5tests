<?php 
    $title = "HTML5 Test";
    $subtitle = "Move Sprite"; 
?>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
        <title><?php echo "$title: $subtitle"; ?></title>
        <link href="css/default.css" rel="stylesheet" type="text/css" />
        
        <!-- jQuery -->
        <script type="text/javascript" src="http://www.google.com/jsapi"></script>
        <script type="text/javascript"> google.load("jquery", "1.6.3"); </script>
        
        <!-- Crafty -->
        <script src="js/crafty.js" type="text/javascript"></script>
        
        <!-- GAME -->
        <script src="js/game.js" type="text/javascript"></script>
        <script src="js/models/Player.class.js" type="text/javascript"></script>
    </head>
    <body>
        <div id="header">
            <h1><?php echo "<span class='title'>$title</span>: <span class='subtitle'>$subtitle</span>"; ?></h1>
        </div>
        
        <div id="menu">
            <a href="">Reload</a>
            <a href="">Credits</a>
        </div>
    </body>
</html>