<?php

require_once "commonVar.php";

class DBOperate
{
	private $servername;
	private $dbname;
	private $username;
	private $password;
	private $port;
	private $conn;
	private $statement;
	
	function __construct()
	{
		$this->servername = "localhost";
		$this->dbname = "case_study_project_management";
		$this->username = "root";
		$this->password = "root";
		$this->port = 10001;
		$this->conn;
		$this->statement;
	}

    //connect DB, if success, return true, otherwise, return false
	public function connectDB(){
		try {
			$this->conn = new PDO("mysql:host=$this->servername;port=$this->port;dbname=$this->dbname", $this->username, $this->password);
            // set the PDO error mode to exception
			$this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		} catch(PDOException $e){
			echo "Connection failed: " . $e->getMessage();
			return false;
		}

		return true;
	}

    //insert data into database, 
    //add member: table: member, if success, return user_cookie, otherwise return false
    //add user session: table: user_session, if success, return true, otherwise return false
    //add user session delete: table: user_session_delete, if success, return true, otherwise return false
    //add kanban board: table: kanban, if success, return true, otherwise return false
    public function insertDB($table, ...$datas){
        switch ($table) {
        	case $GLOBALS["tableName"]:
        	    try{
        	    	$userCookie = $datas[0] . rand(1, 1000000000);
        		  $statement = $this->conn->prepare("insert into member (user, password, user_cookie, email) values (:user, :password,:user_cookie, :email)");
        		  $statement->bindParam(":user", $datas[0]);
        		  $statement->bindParam(":password", $datas[1]);
        		  $statement->bindParam(":user_cookie", $userCookie);
        		  $statement->bindParam(":email", $datas[2]);
        		  $statement->execute();
        		  return $userCookie;
        	    } catch(Exception $e){
        	    	echo $e->getMessage();
        	    	return false;
        	    }

        	case $GLOBALS["tableNameUserSession"]:
        	try {
        		  $statement = $this->conn->prepare("insert into user_session (user, userSessionId) values (:user, :userSessionId)");
        		  $statement->bindParam(":user", $datas[0]);
        		  $statement->bindParam(":userSessionId", $datas[1]);
        		  $statement->execute();
        		  return true;
        	} catch(PDOException $e){
        		echo $e->getMessage();
        		return false;
        	}

        	case $GLOBALS["tableNameUserSessionDelete"]:
        	try {
        		  $statement = $this->conn->prepare("insert into user_session_delete (user, userSessionId) values (:user, :userSessionId)");
        		  $statement->bindParam(":user", $datas[0]);
        		  $statement->bindParam(":userSessionId", $datas[1]);
        		  $statement->execute();
        		  return true;
        	} catch(PDOException $e){
        		echo $e->getMessage();
        		return false;
        	}

        	case $GLOBALS["tableNameKanban"]:
        	try {
        		  $statement = $this->conn->prepare("insert into kanban (kanbanBoard) values (:kanbanBoardState)");
        		  $statement->bindParam(":kanbanBoardState", $datas[0]);
        		  $statement->execute();
        		  return true;
        	} catch(PDOException $e){
        		echo $e->getMessage();
        		return false;
        	}
        	    
        	default:
        		// code...
        		return false;
        }
    }

    //update data, success return true, error return false
    //table: kanban, $action: updateKanbanBoard, $datas: kanbanBoardState 
    public function updateDB($table, $action, ...$datas){
    	switch ($table){
    		case $GLOBALS["tableNameKanban"]:
    		switch($action){
    			case $GLOBALS["updateKanbanBoardState"]:
    			try {
    				$statement = $this->conn->prepare('update kanban set kanbanBoard = (:kanbanBoardState)');
    				$statement->bindParam(":kanbanBoardState", $datas[0]);
    				$statement->execute();
    				return true;
    			} catch(Exception $e){
    				echo $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}

    		default:
    		return false;
    	}
    }

    //if database has selected data, return data, otherwise return null, error return false
    //table: member, $action: selectUser, $datas: user 
    //table: user_session, $action: selectUser, $datas: user 
    //table: user_session_delete, $action: selectUserSessionId, $datas: userSessionId 
    public function selectDB($table, $action, ...$datas){
    	switch ($table){
    		case $GLOBALS["tableName"]:
    		switch($action){
    			case $GLOBALS["selectUser"]:
    			try {
    				$statement = $this->conn->prepare("select * from member where user=:user;");
    				$statement->bindParam(":user", $datas[0]);
    				$statement->execute();

    				$datas = array();
    				if ($row = $statement->fetch()){
    					do{
    						$obj = array("id" => $row["id"], "user" => $row["user"], "password" => $row["password"], "user_cookie" => $row["user_cookie"], "email" => $row["email"], );
    						array_push($datas, $obj);
    					} while ($row = $statement->fetch());
    				} else{
    					return null;
    				}

    				return $datas;

    			} catch(Exception $e){
    				echo $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}

    		

    		case $GLOBALS["tableNameUserSession"]:
    		switch($action){
    			case $GLOBALS["selectUser"]:
    			try {
    				$statement = $this->conn->prepare("select * from user_session where user=:user;");
    				$statement->bindParam(":user", $datas[0]);
    				$statement->execute();

    				$datas = array();
    				if ($row = $statement->fetch()){
    					do{
    						$obj = array("user" => $row["user"], "userSessionId" => $row["userSessionId"]);
    						array_push($datas, $obj);
    					} while ($row = $statement->fetch());
    				} else{
    					return null;
    				}

    				return $datas;

    			} catch(Exception $e){
    				echo $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}
    		

    		case $GLOBALS["tableNameUserSessionDelete"]:
    		switch($action){
    			case $GLOBALS["selectUserSessionId"]:
    			try {
    				$statement = $this->conn->prepare("select * from user_session_delete where userSessionId=:userSessionId;");
    				$statement->bindParam(":userSessionId", $datas[0]);
    				$statement->execute();

    				$datas = array();
    				if ($row = $statement->fetch()){
    					do{
    						$obj = array("user" => $row["user"], "userSessionId" => $row["userSessionId"]);
    						array_push($datas, $obj);
    					} while ($row = $statement->fetch());
    				} else{
    					return null;
    				}

    				return $datas;

    			} catch(Exception $e){
    				echo "selectDB, tableNameUserSessionDelete, selectUserSessionId: " . $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}

    		case $GLOBALS["tableNameKanban"]:
    		switch($action){
    			case $GLOBALS["selectKanbanBoard"]:
    			try {
    				$statement = $this->conn->prepare("select * from kanban;");
    				$statement->execute();

    				$datas = array();
    				if ($row = $statement->fetch()){
    					do{
    						$obj = array("kanbanBoard" => $row["kanbanBoard"]);
    						array_push($datas, $obj);
    					} while ($row = $statement->fetch());
    				} else{
    					return null;
    				}

    				return $datas;

    			} catch(Exception $e){
    				echo "selectDB, tableNameKanban, selectKanbanBoard: " . $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}

    		default:
    		return null;
    	}
    }

    //delete data from database, if delete successfully, return true, otherwise, return false
    public function deleteDB($table, $action, ...$datas){
    	switch ($table){
    		case $GLOBALS["tableName"]:
    		return false;

    		case $GLOBALS["tableNameUserSession"]:
    		switch($action){
    			case $GLOBALS["deleteUser"]:
    			try {
    				$statement = $this->conn->prepare("delete from user_session where user=:user;");
    				$statement->bindParam(":user", $datas[0]);
    				$statement->execute();
    				return true;
    			} catch(Exception $e){
    				echo $e->getMessage();
    				return false;
    			}

    			case $GLOBALS["deleteUserSessionId"]:
    			try {
    				$statement = $this->conn->prepare("delete from user_session where userSessionId=:userSessionId;");
    				$statement->bindParam(":userSessionId", $datas[0]);
    				$statement->execute();
    				return true;
    			} catch(Exception $e){
    				echo $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}

    		case $GLOBALS["tableNameUserSessionDelete"]:
    		switch($action){
    			case $GLOBALS["deleteUserSessionId"]:
    			try {
    				$statement = $this->conn->prepare("delete from user_session_delete where userSessionId=:userSessionId;");
    				$statement->bindParam(":userSessionId", $datas[0]);
    				$statement->execute();
    				return true;
    			} catch(Exception $e){
    				echo "deleteDB, tableNameUserSessionDelete, deleteUserSessionId: " . $e->getMessage();
    				return false;
    			}

    			default:
    			return false;
    		}
    		
    		default:
    		return false;
    	}
    }

    //delete connection and database statement
    public function __destruct() {
    	$this->conn = null;
    	$this->statement = null;
    }

}
?>