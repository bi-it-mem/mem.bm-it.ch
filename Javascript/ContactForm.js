document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting via diffrent site
 
    const formData = new FormData(this); // Gather form data
 
    fetch('send_email.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const responseMessage = document.getElementById("responseMessage");
        responseMessage.innerText = data; // Show response message
        responseMessage.style.display = "block"; // Make the message pop up
        responseMessage.classList.remove('hidden'); // Remove hidden class
        this.reset(); // reset the forum
       
        // Optionally hide after a few seconds
        setTimeout(() => {
            responseMessage.classList.add('hidden'); // Add hidden class
            setTimeout(() => {
                responseMessage.style.display = "none"; // Hide it completely
            }, 500); // Wait for fade out effect
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        const responseMessage = document.getElementById("responseMessage");
        responseMessage.innerText = "Failed to send message. Please try again.";
        responseMessage.style.display = "block"; // Make the fail message pop up
    });
});