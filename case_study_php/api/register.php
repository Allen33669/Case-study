<?php
session_start();

require_once "commonVar.php";
require_once "db.php";



if ($_SERVER["REQUEST_METHOD"] == "POST") {
	//validate email
	$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$response->result = $responseFail;
		$response->message = $responseFailEmailNotValidate;

	}else{
		//validate user inputs
		$user = htmlentities($_POST['user']);
		$password = htmlentities($_POST['password']);
		$email = htmlentities($email);

		if (isset($password)){
			//create password hash
			$passwordHash = password_hash($password, PASSWORD_DEFAULT);
			$dbOpe = new DBOperate();
			if($dbOpe->connectDB()){
				//check user name is used or not
				if ($dbOpe->selectDB($tableName, $selectUser, $user) == null){
					//insert user data into database and get user cookie
					$userCookie = $dbOpe->insertDB($tableName, $user, $passwordHash, $email);
					if($userCookie != false){
						//set user session and user cookie
						$userSessionIdString = $user . $_SERVER['REMOTE_ADDR'] . time();
						if($dbOpe->insertDB($tableNameUserSession, $user, $userSessionIdString)){
							$response->result = "success";
						  $response->message = "register successfully";
						  $response->userCookie = $userCookie;
						  setcookie($userCookieId, $userCookie, time() + (86400 * 30), "/");
						  $_SESSION[$userSessionId] = $user . $_SERVER['REMOTE_ADDR'] . time();
						} else{
							$response->result = "fail";
			                $response->message = "add user session fail";
						}
					} else{
						$response->result = "fail";
			            $response->message = "add user fail";
					}
				} else{
					$response->result = "fail";
			        $response->message = "user name repeat";
				}
			} else{
				$response->result = "fail";
			    $response->message = "cannot connect database";
			}
		} else{
			$response->result = "fail";
			$response->message = "password is empty";
		}
	}	
}



echo json_encode($response);
?>
