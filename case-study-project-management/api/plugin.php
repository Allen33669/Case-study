<?php



$kanbanPlugin = [];

//register function plugin api
function registerPluginFunc($hooks, $pluginFunc){
    switch ($hooks){
    	case $GLOBALS["kanbanHook"]:
    		array_push($GLOBALS['kanbanPlugin'], $pluginFunc);
    		break;

    	default:
    	break;
    }
}



//kanban plugin api
function kanbanBoardColumnTitle($columnTitle){
    return $columnTitle;
}



//receive plugin files
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (isset($_FILES["file"])){
      $tmpName = $_FILES["file"]["tmp_name"];
      $content = file_get_contents($tmpName);

      $file = fopen('../plugin/plugin1.php', 'w');
      fwrite($file, $content);
      fclose($file);
  }
}



//require plugin files
$dir = "../plugin/";

//require the plugin file
if (file_exists('../plugin/plugin1.php')){
    require_once '../plugin/plugin1.php';
}
/*
$file = fopen('../plugin/plugin1.php', 'r');
echo 'fread:' . fread($file, 10);
fclose($file);
*/
/*
if (is_dir($dir)){
  if ($dh = opendir($dir)){
    while (($file = readdir($dh)) !== false){
        require_once $dir . $file;
    }
    closedir($dh);
  }
}
*/
?>