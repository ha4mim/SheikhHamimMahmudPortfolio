// Initialize EmailJS with your User ID
(function() {
    emailjs.init("YOUR_EMAILJS_USER_ID"); // Replace with your actual EmailJS user ID
    
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        Swal.fire({
            title: 'Sending your message...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        // Send email using EmailJS
        emailjs.sendForm('service_2lxf3w5', 'template_v85kpjb', this)
            .then(function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you for your message. I will contact you soon.',
                    confirmButtonColor: '#3498db'
                });
                document.getElementById('contactForm').reset();
            }, function(error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    confirmButtonColor: '#3498db'
                });
                console.error('EmailJS Error:', error);
            });
    });
})();