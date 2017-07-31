<?php
include '../data/var.php';
send_mailgun($_POST);

function send_mailgun($mailObject) {

	$msg = implode(" , ", $mailObject);

	$config = array();

	$config['api_key'] = getenv("api-key");

	$config['api_url'] = getenv("api-url");

	$mailObject = array();

	$mailObject['from'] = "postmaster@mg.perfectdaybreak.com";

	$mailObject['to'] = "webeck@gmail.com";

	$mailObject['h:Reply-To'] = "webeck@gmail.com";

	$mailObject['subject'] = "Eye-Catching Subject Line";

	$mailObject['text'] = $msg;

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $config['api_url']);

	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

	curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

	curl_setopt($ch, CURLOPT_POST, true);

	curl_setopt($ch, CURLOPT_POSTFIELDS,$mailObject);
echo $ch;
	$result = curl_exec($ch);
echo $result;

	curl_close($ch);

	return $result;

}
?>