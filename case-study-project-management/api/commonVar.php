<?php
//common response, error messages
$response = new stdClass();
$responseSuccess = "success";
$responseFail = "fail";

$responseSuccessRegister = "register successfully";
$responseFailEmailNotValidate = "email is not validate";
$responseFailAddUserFail = "add user fail";
$responseFailRepeatUserName = "user name repeat";
$responseFailNoPassword = "password is empty";

$responseSuccessLogin = "login successfully";
$responseFailUserNotExist = "the user is not exist";
$responseFailWrongPassword = "password is not correct";

$responseSuccessLogout = "Log out successfully";

$responseSuccessSelectKanbanBoard = "select kanban board successfully";
$responseFailSelectKanbanBoard = "select kanban board fail";
$responseSuccessInsertKanbanBoard = "insert kanban board successfully";
$responseFailInsertKanbanBoard = "insert kanban board fail";
$responseSuccessUpdateKanbanBoard = "update kanban board successfully";
$responseFailUpdateKanbanBoard = "update kanban board fail";



$responseFailNotConnectDB = "connet database fail";

$responseFailAddUserSessionFail = "add user session fail";
$responseFailAddUserSessionDeleteFail = "add user session delete fail";
$responseFailDeleteUserSessionDeleteFail = "delete user session delete fail";




//common cookie, session variables
$userCookieId = "user";
$userSessionId = "userSessionId";

//common database table
$tableName = "member";
$tableNameUserSession = "user_session";
$tableNameUserSessionDelete = "user_session_delete";

$tableNameKanban = "kanban";
$updateKanbanBoardState = "updateKanbanBoardState";
$selectKanbanBoard = "selectKanbanBoard";

//common database actions

$selectUser = "selectUser";
$selectUserSessionId = "selectUserSessionId";
$deleteUser = "deleteUser";
$deleteUserSessionId = "deletetUserSessionId";



//plugin hooks
$kanbanHook ='kanbanHook';


?>