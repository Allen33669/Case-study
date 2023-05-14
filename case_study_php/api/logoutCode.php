<?php 

require_once "commonVar.php";
require_once "db.php";



//delete user cookie
if(isset($_COOKIE[$userCookieId])) {
    setcookie($userCookieId, null, time() + (-86400 * 30), "/"); // 86400 = 1 day
} 



//delete user session info in database
if(isset($_SESSION[$userSessionId])) {
    $dbOpe = new DBOperate();
    if($dbOpe->connectDB()){
        if ($dbOpe->deleteDB($tableNameUserSession, $deleteUserSessionId, $_SESSION[$userSessionId])){

        }
    }
} 



//delete session
session_unset();
session_destroy();

$response->result = $responseSuccess;
$response->message = $responseSuccessLogout;

echo json_encode($response);

exit();
?>