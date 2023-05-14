<?php
session_start();

require_once "commonVar.php";
require_once "db.php";

if (isset($_SESSION[$userSessionId])){
	$response->userSessionId = "test.php: " . $_SESSION[$userSessionId];
	//connect database
	$dbOpe = new DBOperate();
	if($dbOpe->connectDB()){
      	//check the user is in user_session_delete or not  
		$userSessionData = $dbOpe->selectDB($tableNameUserSessionDelete, $selectUserSessionId, $_SESSION[$userSessionId]);
		if($userSessionData != null){
			foreach ($userSessionData as $row) {
				if ($dbOpe->deleteDB($tableNameUserSessionDelete, $deleteUserSessionId, $row["userSessionId"])){

				} else{
					$response->result = $responseFail;
					$response->message = $responseFailDeleteUserSessionDeleteFail;
				}
			}

			require "logoutCode.php";

		} else{
			$response->result = $responseSuccess;
            $response->message = "No multiple users login the same account at the same time";
		}
	} else{
			$response->result = $responseFail;
			$response->message = $responseFailNotConnectDB;
		}
} else{
	$response->result = $responseFail;
			$response->message = "userSessionId is not set";
}





echo json_encode($response);
?>