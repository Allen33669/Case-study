<?php
//common response, error messages
$response = new stdClass();
$responseSuccess = "success";
$responseSuccessRegister = "register successfully";
$responseSuccessLogin = "login successfully";
$responseSuccessLogout = "Log out successfully";



$responseFail = "fail";
$responseFailNotConnectDB = "connet database fail";
$responseFailUserNotExist = "the user is not exist";
$responseFailWrongPassword = "password is not correct";
$responseFailAddUserSessionFail = "add user session fail";
$responseFailAddUserSessionDeleteFail = "add user session delete fail";
$responseFailDeleteUserSessionDeleteFail = "delete user session delete fail";
$responseFailEmailNotValidate = "email is not validate";
$responseFailAddUserFail = "add user fail";
$responseFailRepeatUserName = "user name repeat";
$responseFailNoPassword = "password is empty";



//common cookie, session variables
$userCookieId = "user";
$userSessionId = "userSessionId";

//common database table
$tableName = "member";
$tableNameUserSession = "user_session";
$tableNameUserSessionDelete = "user_session_delete";

//common database actions
$selectUser = "selectUser";
$selectUserSessionId = "selectUserSessionId";
$deleteUser = "deleteUser";
$deleteUserSessionId = "deletetUserSessionId";

?>