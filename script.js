const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionText = document.getElementById('question');
const mainImage = document.getElementById('main-image');

// Add "running away" logic for No button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent actual tap from registering if they manage to touch it
    moveNoButton();
});
noBtn.addEventListener('click', moveNoButton); // fallback

function moveNoButton() {
    // Keep the button well within the screen boundaries
    const maxX = window.innerWidth - noBtn.offsetWidth - 40;
    const maxY = window.innerHeight - noBtn.offsetHeight - 40;
    
    const x = Math.max(20, Math.random() * maxX);
    const y = Math.max(20, Math.random() * maxY);
    
    // Switch button to fixed positioning so it can fly anywhere on the screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${Math.max(20, x)}px`;
    noBtn.style.top = `${Math.max(20, y)}px`;
}

// Logic for clicking Yes
yesBtn.addEventListener('click', () => {
    questionText.innerHTML = "Yay! I'm the luckiest! 🥰<br>You're my sweet rasmalai forever!";
    mainImage.src = 'assets/tapasya_happy.png?v=2';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    createHearts();
});

// Cute floating hearts animation
function createHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 3) + 's';
            document.body.appendChild(heart);
            
            // Clean up hearts after animation
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 150);
    }
}
