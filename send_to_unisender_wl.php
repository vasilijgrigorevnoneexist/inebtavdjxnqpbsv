<?php

$user_email = trim($_POST['emailWL']);
$user_tele = trim($_POST['teleWL']);
$user_phone = trim($_POST['phoneWL']);
$user_erc = trim($_POST['ercWL']);
$user_amo = trim($_POST['amoWL']);

	$csv_arr = array (
    	$user_email,
        $user_tele,
        $user_phone,
        $user_erc,
      	$user_amo
    );

$fp = fopen('./database.csv', 'a');

	fprintf($fp, chr(0xEF).chr(0xBB).chr(0xBF));
	fputcsv($fp, $csv_arr, $delimiter = ';');
	
	fclose($fp);

	mb_convert_encoding($fp, 'UTF-16LE', 'UTF-8');

?>