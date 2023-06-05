<?php

require_once "../api/commonVar.php";
require_once "../api/plugin.php";



function plugin1(){
	return kanbanBoardColumnTitle('plugin1');
}



registerPluginFunc($kanbanHook, 'plugin1');





?>