
<?php 
session_start();

require_once "commonVar.php";
require_once "db.php";



if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //validate user inputs
    $user = htmlentities($_POST['user']);
    $password = htmlentities($_POST['password']);

    if (isset($user)){
      //connect database
      $dbOpe = new DBOperate();
      if($dbOpe->connectDB()){

        //check the user is registered or not  
        $userData = $dbOpe->selectDB($tableName, $selectUser, $user);
        if($userData != null){

          //check user password
          if (password_verify($password, $userData[0]["password"])){
            

            //check if another user use the same account to login
            $userSessionData = $dbOpe->selectDB($tableNameUserSession, $selectUser, $user);
            if ($userSessionData != null){
              //move old repeat user session into user_session_delete in database
              foreach ($userSessionData as $row) {
                if ($dbOpe->insertDB($tableNameUserSessionDelete, $row["user"], $row["userSessionId"])){
                  $response->insertDBlogin = "login.php: move old repeat user session into user_session_delete in database" . $row["user"] . $row["userSessionId"]; 

                } else{
                  $response->result = $responseFail;
                  $response->message = $responseFailAddUserSessionDeleteFail;
                  $response->insertDBlogin = "login.php: fail move old repeat user session into user_session_delete in database" . $row["user"] . $row["userSessionId"]; 
                }
              }

              //delete old repeat user session from user_session in database
              if ($dbOpe->deleteDB($tableNameUserSession, $deleteUser, $user)){

              } else{
                  $response->result = $responseFail;
                  $response->message = $responseFailDeleteUserSessionDeleteFail;
              }
            }

           //register user session
           $userSessionIdString = $user . $_SERVER['REMOTE_ADDR'] . time();
           if($dbOpe->insertDB($tableNameUserSession, $user, $userSessionIdString)){
            $response->result = "success";
            $response->message = "login successfully";
            $response->userCookie = $userData[0]["user_cookie"];
            setcookie($userCookieId, $userData[0]["user_cookie"], time() + (86400 * 30), "/");
            $_SESSION[$userSessionId] = $userSessionIdString;
            $response->userSessionId = "login.php: " . $_SESSION[$userSessionId];
          } else{
            $response->result = "fail";
            $response->message = "add user session fail";
          }
        } else{
          $response->result = "fail";
          $response->message = "password is not correct";
        }
      } else{
        $response->result = "fail";
        $response->message = "the user is not exist";
      }

    } else{
      $response->result = "fail";
      $response->message = "connet database fail";
    }
  }
}



echo json_encode($response);
?>

