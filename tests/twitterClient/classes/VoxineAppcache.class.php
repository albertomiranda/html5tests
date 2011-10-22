<?php
/**
 * Automatically generates appcache.
 *
 * @author Alberto Miranda <alberto@nextive.com>
 */
class VoxineAppcache {
    /**
     * Files and dirs to be excluded from cache
     * @var array 
     */
    private $excluded = array(
        '.', 
        '..', 
        'appcache.php', 
        '.htaccess', 
        'VoxineAppcache.class.php',
        'appcache.template.php'
    );
    
    /**
     * Template used to generate appcache
     * @var string
     */
    private $appcacheTemplate = '';
    
    /**
     * Cummulative hash for each cached file.
     * Used to hash the appcache file and determine if an update is needed.
     * @var string
     */
    private $hashes = '';
    
    /**
     * Constructor.
     * Gets appcache template.
     * 
     * @author Alberto Miranda <alberto@nextive.com>
     */
    public function __construct($appcacheTemplate='templates/appcache.template.php') {
        if(!file_exists($appcacheTemplate)) die('ERROR: APPCACHE TAMPLATE DO NOT EXIST!');
        $this->appcacheTemplate = file_get_contents($appcacheTemplate);
    }
    
    /**
     * Returns full appcache content.
     * 
     * @author Alberto Miranda <alberto@nextive.com>
     * @return string
     */
    public function get(){
        $cache = $this->getCache();
        $hash = md5($this->hashes);
        
        //return parsed template
        $output = str_replace('{cache}', $cache, $this->appcacheTemplate);
        $output = str_replace('{hash}', $hash, $output);
        return $output;
    }
    
    /**
     * Returns string of cached files.
     * Each array key is the md5 hash of the file.
     * 
     * @author Alberto Miranda <alberto@nextive.com>
     * @param string $path
     * @return string
     */
    private function getCache($path='.'){
        $cache = array();
        $dir = new RecursiveDirectoryIterator($path);
        /* @var $file FilesystemIterator */
        foreach(new RecursiveIteratorIterator($dir) as $file) {
            if(in_array($file->getFilename(), $this->excluded)) continue;
            if ($file->isFile()){
                $this->hashes.=md5_file($file);
                $cache[] = $file->getPathname();
            }
        }
        return implode("\n", $cache);
    }
    
    /**
     * Set headers required by appcache.
     * 
     * @author Alberto Miranda <alberto@nextive.com>
     */
    public function setHeaders(){
        header('Content-Type: text/cache-manifest');
        header('Cache-Control: no-cache');
    }
}
