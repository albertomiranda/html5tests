<?php
/**
 * Dynamic generation of Appcache
 * 
 * @author Alberto Miranda <alberto@nextive.com>
 */
require_once "classes/VoxineAppcache.class.php";
$Appcache = new VoxineAppcache;
$Appcache->setHeaders();
$appcache = $Appcache->get();
echo $appcache; //prints appcache to standard output