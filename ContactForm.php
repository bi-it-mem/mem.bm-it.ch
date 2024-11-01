<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") { /* function that tells the server to send the mail */
    $name = htmlspecialchars($_POST['name']); /* $name/email/message= entered data from the user*/
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);
 
    $to = "martim.mena.251@gmail.com";/* this part shows where the mail goes and how the incoming mail looks upon reception*/
    $subject = "You've got new Mail from $name";
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";
 
    $headers = "From: $email";
 
    if (mail($to, $subject, $body, $headers)) { /* This part insures the user knows that his message has been sent or not */
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again.";
    }
} else {
    echo "Invalid request.";
}
?>