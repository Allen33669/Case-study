<?php
session_start();

require_once "commonVar.php";
require_once "db.php";


require_once 'plugin.php';


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $dbOpe = new DBOperate();
	if($dbOpe->connectDB()){
		$kanbanBoardState = $dbOpe->selectDB($tableNameKanban, $selectKanbanBoard, null);
		if ($kanbanBoardState != null){
			if (count($kanbanPlugin) > 0) {
				$jsonObj = json_decode($kanbanBoardState[0]['kanbanBoard'], true);

				if (count($jsonObj['columns']) > 0){
					foreach ($jsonObj['columns'] as &$col) {
						$col['title']['content'] = $kanbanPlugin[0]();
					}
				}
				
				echo json_encode($jsonObj);
			} else{
				echo $kanbanBoardState[0]['kanbanBoard'];
			}
		} else {
			$response->result = $responseFail;
		    $response->message = responseFailSelectKanbanBoard;
		    echo json_encode($response);
		}
	} else{
		$response->result = $responseFail;
		$response->message = $responseFailNotConnectDB;
		echo json_encode($response);
	}
}



if ($_SERVER["REQUEST_METHOD"] == "POST") {
	$dbOpe = new DBOperate();
	if($dbOpe->connectDB()){
		$kanbanBoardState = file_get_contents("php://input");
		$response->kanbanBoardState = $kanbanBoardState;
		if ($dbOpe->selectDB($tableNameKanban, $selectKanbanBoard, null) == null){
			if ($dbOpe->insertDB($tableNameKanban, $kanbanBoardState)){
				$response->result = $responseSuccess;
				$response->message = $responseSuccessInsertKanbanBoard;
			} else{
				$response->result = $responseFail;
				$response->message = $responseFailInsertKanbanBoard;
			}
		} else{
			if ($dbOpe->updateDB($tableNameKanban, $updateKanbanBoardState, $kanbanBoardState) == false){
				$response->result = $responseFail;
				$response->message = $responseFailUpdateKanbanBoard;
			} else{
				$response->result = $responseSuccess;
				$response->message = $responseSuccessUpdateKanbanBoard;
			}
		}

	} else{
		$response->result = $responseFail;
		$response->message = $responseFailNotConnectDB;
	}
    
    
	
	echo json_encode($response);
}



?>