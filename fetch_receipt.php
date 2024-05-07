<?php
// fetch_receipt.php

// Retrieve payment ID from the request
$payment_id = $_POST['payment_id'];

// Here, you would typically generate the receipt based on the payment ID
// For demonstration purposes, let's assume a simple receipt format
$receipt_content = "Receipt for Payment ID: $payment_id\n";
$receipt_content .= "Name: " . $_POST['name'] . "\n";
$receipt_content .= "Email: " . $_POST['email'] . "\n";
$receipt_content .= "Amount Paid: INR " . $_POST['amount'] / 100 . "\n"; // Convert amount back to rupees

// Send the receipt content as response
echo $receipt_content;
?>
