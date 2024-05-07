<?php
// Retrieve payment details from the request body
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

// Retrieve payment ID from the request data
$payment_id = $data['payment_id'];

// Here you can fetch payment details from your database or any other source
// For demonstration purposes, let's assume the payment details are hardcoded
$payment_details = array(
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'pin' => '123456',
    'mobile_number' => '1234567890',
    'amount' => '100', // You may fetch this from the database as well
    'currency' => 'INR', // You may fetch this from the database as well
    'description' => 'Education', // You may fetch this from the database as well
);

// Generate HTML for the receipt
$html = '
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Receipt</title>
    <style>
        /* Your CSS styles for the receipt */
    </style>
</head>
<body>
    <h1>Payment Receipt</h1>
    <h2>Payer Details:</h2>
    <p>Name: ' . $payment_details['name'] . '</p>
    <p>Email: ' . $payment_details['email'] . '</p>
    <p>Pin: ' . $payment_details['pin'] . '</p>
    <p>Mobile Number: ' . $payment_details['mobile_number'] . '</p>
    <h2>Payment Details:</h2>
    <p>Amount: ' . $payment_details['amount'] . ' ' . $payment_details['currency'] . '</p>
    <p>Description: ' . $payment_details['description'] . '</p>
    <p>Payment ID: ' . $payment_id . '</p>
</body>
</html>
';

// Set the content type to HTML
header('Content-Type: text/html');

// Output the HTML
echo $html;
?>
