function launch() {
    var duration = 8 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { 
        startVelocity: 30, 
        spread: 360, 
        ticks: 60, 
        zIndex: 0,
        colors: ["#89CFF0", "F5FAFF", "0275F4"]
    };

    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
        return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
}

document.addEventListener("DOMContentLoaded", (event) => {
    launch();
    const button = document.getElementById('confetti-button');
    const handleClick = () => {
        launch();
    }
    if (button) {
        button.addEventListener('click', handleClick);
    } else {
        console.error("Button with ID 'confetti-button' not found.");
    } 
});

document.getElementById("registration-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // Prevent the default form submission

    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;

    const info = {
        first_name,
        last_name
    };

    try {
        const response = await axios.post('http://127.0.0.1:5000/form', info);
        console.log(response.data); // Handle backend response
        if(response.data.message === "Success")
        {
            const updatedFirst = response.data.first;
            const updatedLast = response.data.last;
            const fullName = `${updatedFirst} ${updatedLast}`;
            console.log(fullName);

            document.getElementById('first_name').value = '';
            document.getElementById('last_name').value = '';

            localStorage.setItem('fullName', fullName);
            window.location.href = "submitted.html";
        }
        // Optionally display a success message or handle response
        console.log('Form submitted successfully!');
    } catch (error) {
        console.error('Error:', error);
        // Optionally display an error message
        console.log('An error occurred while submitting the form.');
    }
});

