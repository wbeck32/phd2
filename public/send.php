<!-- http://www.phpfunctionalism.com/functions/simple-php-mailgun-api-example/ -->
<!-- Permissions of 0644 needed -->
<!-- update with new API key -->
<?php
echo '<p>Hello World</p>';
send_mailgun('webeck@gmail.com');
function send_mailgun($email){

	$config = array();

	$config['api_key'] = "pubkey-228b87725d50c61dd024e21fb2f5758d";

	$config['api_url'] = "https://api.mailgun.net/v3/mg.perfectdaybreak.com/messages";

	$message = array();

	$message['from'] = "postmaster@mg.perfectdaybreak.com";

	$message['to'] = $email;

	// $message['h:Reply-To'] = "&lt;info@domain.com&gt;";

	$message['subject'] = "Eye-Catching Subject Line";

	$message['text'] = "How about some good news?";
	// $message['html'] = file_get_contents("http://www.domain.com/email/html");
	// echo $config;

	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, $config['api_url']);

	curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

	curl_setopt($ch, CURLOPT_USERPWD, "api:{$config['api_key']}");

	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);

	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);

	curl_setopt($ch, CURLOPT_POST, true);

	curl_setopt($ch, CURLOPT_POSTFIELDS,$message);
echo $ch;
	$result = curl_exec($ch);
echo $result;

	curl_close($ch);

	return $result;

}
?>