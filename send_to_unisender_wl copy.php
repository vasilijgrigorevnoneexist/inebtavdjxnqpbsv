<?php
$api_key = "6naiuu6dmt4bt69k48j8jc39c3jsmxbxq9csn3oe";

$user_email = trim($_POST['emailWL']);
$user_tele = trim($_POST['teleWL']);
$user_phone = trim($_POST['phoneWL']);
$user_erc = trim($_POST['ercWL']);
$user_amo = trim($_POST['amoWL']);
$user_lists = "13485390";



	$csv_arr = array (
    	$user_email,
        $user_tele,
        $user_phone,
        $user_erc,
      	$user_amo
    );

$fp = fopen('database.csv', 'a');

	fprintf($fp, chr(0xEF).chr(0xBB).chr(0xBF));
	fputcsv($fp, $csv_arr, $delimiter = ';');
	
	fclose($fp);

	mb_convert_encoding($fp, 'UTF-16LE', 'UTF-8');















$POST = array (
  'api_key' => $api_key,
  'list_ids' => $user_lists,
  'fields[email]' => $user_email,
  'fields[telegram]' => $user_tele,
  'fields[phone]' => $user_phone,
  'fields[erc20]' => $user_erc,
  'fields[amount]' => $user_amo,
  'double_optin' => 3
);

$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $POST);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_URL, 
            'https://api.unisender.com/ru/api/subscribe?format=json');
$result = curl_exec($ch);

if ($result) {
  $jsonObj = json_decode($result);

  if(null===$jsonObj) {
    echo "Invalid JSON";

  }
  elseif(!empty($jsonObj->error)) {
    echo "An error occured: " . $jsonObj->error . "(code: " . $jsonObj->code . ")";

  } else {
    echo "Added. ID is " . $jsonObj->result->person_id;

  }
} else {
  echo "API access error";
}
?>