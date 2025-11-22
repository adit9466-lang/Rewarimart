// --- IMPORTANT: Change this URL to your own Render backend URL! ---
const backendUrl = 'https://rewarimart.onrender.com'; // Replace this with your URL

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#register');

    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Stop the form from reloading the page

            const username = registerForm.querySelector('input[placeholder="Username"]').value;
            const email = registerForm.querySelector('input[placeholder="Email Address"]').value;
            const password = registerForm.querySelector('input[placeholder="Password"]').value;

            try {
                const response = await fetch(`${backendUrl}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message); // "User registered successfully!"
                    window.location.href = 'index.html'; // Go to login page after success
                } else {
                    alert(result.message); // "Error: Email already in use."
                }
            } catch (error) {
                alert('Could not connect to the server. Please try again later.');
            }
        });
    }
});
