window.addEventListener('scroll', function() {
    const nav = document.getElementById('nav');
    const scrollHeight = 800; // Height after which the navbar should disappear

    if (window.scrollY > scrollHeight) {
        nav.style.display = 'none'; // Hide navbar
    } else {
        nav.style.display = 'flex'; // Show navbar (adjust as per your CSS display style)
    }
});

function animateText(selector, delay = 0) {
    const element = document.querySelector(selector);
    const words = element.textContent.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');

    gsap.fromTo(".word", 
        { opacity: 0, y: 50 }, // Starting animation: words are below and invisible
        { 
            opacity: 1, 
            y: 0, 
            stagger: 0.2,  // Delay between each word
            delay: delay,  // Optional delay for stagger effect
            duration: 1,   // Time it takes for each word to appear
            ease: "power2.out",
            onComplete: function() {
                // When the animation completes, restart it
                gsap.to(".word", {
                    opacity: 0,
                    y: -50,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power2.in",
                    onComplete: () => animateText(selector, delay)  // Call again for the next loop
                });
        }
    }
    );
}

// Call animation on both titles
animateText('#title-1', 0);  // No delay
animateText('#title-2', 1.5);  // Delay the second title a bit