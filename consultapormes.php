<?php
	header("Access-Control-Allow-Origin: *");
	
	// Connection
	$hostname="fdb34.awardspace.net";
    $username="4044523_matiasdb";
    $password="";
    $database="4044523_matiasdb";
    $table="ventas";
    $link = mysqli_connect($hostname, $username, $password);

    if (!$link) {
        die('Error connecting to the database');
    }
	mysqli_set_charset($link, 'utf8');
    mysqli_select_db($link, $database);

	//Query
	if (isset($_GET['name'])) {
		$campo = $_GET['name'];
	};
	
		
	if (isset($campo)) {
		$query = "SELECT DISTINCT mes, ventas FROM $table WHERE name='$campo'";
	};



    $result = mysqli_query($link, $query, MYSQLI_STORE_RESULT );
    $cursor = mysqli_fetch_all($result, MYSQLI_ASSOC);

	$js = json_encode($cursor,  DEFINED('JSON_INVALID_UTF8_IGNORE') ? JSON_INVALID_UTF8_IGNORE : 0);
    echo($js); //query results to be used on the app

    mysqli_free_result($result); 
    mysqli_close($link);
?>