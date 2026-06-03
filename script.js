const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionText = document.getElementById('question');
const mainImage = document.getElementById('main-image');

// Add "running away" logic for No button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton); // In case they tap it on mobile

function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 50);
    
    // Switch button to fixed positioning so it can fly anywhere on the screen
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${Math.max(20, x)}px`;
    noBtn.style.top = `${Math.max(20, y)}px`;
}

// Logic for clicking Yes
yesBtn.addEventListener('click', () => {
    questionText.innerHTML = "Yay! I'm the luckiest! 🥰<br>You're my sweet rasmalai forever!";
    mainImage.src = 'assets/rasmalai_happy.png';
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
