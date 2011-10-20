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
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title><?php echo "$title: $subtitle"; ?></title>
        <link href="css/default.css" rel="stylesheet" />
        
        <!-- jQuery -->
        <script src="http://www.google.com/jsapi"></script>
        <script> google.load("jquery", "1.6.3"); </script>
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