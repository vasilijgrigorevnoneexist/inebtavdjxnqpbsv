<?php
$api_key = "6naiuu6dmt4bt69k48j8jc39c3jsmxbxq9csn3oe";

$user_email = trim($_POST['email']);
$user_lists = "13477738";

$POST = array (
  'api_key' => $api_key,
  'list_ids' => $user_lists,
  'fields[email]' => $user_email,
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