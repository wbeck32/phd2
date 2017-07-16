<?php


$configurator = new HttpClientConfigurator();
$configurator->setEndpoint('http://bin.mailgun.net/0f149341');
$configurator->setDebug(true);
$mg = Mailgun::configure($configurator);

# Now, compose and send your message.
$mg->messages()->send('example.com', [
  'from'    => 'bob@example.com',
  'to'      => 'sally@example.com',
  'subject' => 'The PHP SDK is awesome!',
  'text'    => 'It is so simple to send a message.'
]);


# Include the Autoloader (see "Libraries" for install instructions)



// require 'vendor/autoload.php';
// use Mailgun\Mailgun;
// $mailgun = new Mailgun('api_key', new \Http\Adapter\Guzzle6\Client());

// $mailgun = new \Mailgun\Mailgun('api_key', $client);
// $client = new \Http\Adapter\Guzzle6\Client();
//
// $mailgun = new Mailgun('api_key', new \Http\Adapter\Guzzle6\Client());


# Instantiate the client.
// $mgClient = new Mailgun('pubkey-228b87725d50c61dd024e21fb2f5758d');
// $domain = "mg.perfectdaybreak.com";
//
// # Make the call to the client.
// $result = $mgClient->sendMessage($domain, array(
//     'from'    => 'Excited User <mailgun@YOUR_DOMAIN_NAME>',
//     'to'      => 'Baz <wendy@webeck.net>',
//     'subject' => 'Hello',
//     'text'    => 'Testing some Mailgun awesomness!'
// ));


# First, instantiate the SDK with your API credentials
// $mg = Mailgun::create('key-example');
//
// # Now, compose and send your message.
// # $mg->messages()->send($domain, $params);
// $mg->messages()->send('example.com', [
//   'from'    => 'bob@example.com',
//   'to'      => 'sally@example.com',
//   'subject' => 'The PHP SDK is awesome!',
//   'text'    => 'It is so simple to send a message.'
// ]);
?>
