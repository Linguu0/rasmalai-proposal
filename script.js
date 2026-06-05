const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionText = document.getElementById('question');
const mainImage = document.getElementById('main-image');

let noBtnCount = 0;

// Add "running away" logic for No button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent actual tap from registering if they manage to touch it
    moveNoButton();
});
noBtn.addEventListener('click', moveNoButton); // fallback

function moveNoButton() {
    noBtnCount++;
    
    // Grow the Yes button
    const newScale = 1 + (noBtnCount * 0.2);
    yesBtn.style.transform = `scale(${newScale})`;
    
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
    questionText.innerHTML = "I promise to make all your tomorrows as beautiful as your smile! ❤️";
    mainImage.src = 'assets/tapasya_happy.png?v=2';
    yesBtn.style.display = 'none';
    noBtn.style.display = 'none';
    
    createHearts();
});

// Cute floating hearts animation (CSS)
function createHearts() {
    for (let i = 0; i < 40; i++) {
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
        }, i * 120);
    }
}

// --------------------------------------------------------
// Three.js Background Particle System
// --------------------------------------------------------
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create Heart Shape
const x = 0, y = 0;
const heartShape = new THREE.Shape();
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

const geometry = new THREE.ShapeGeometry( heartShape );
const material = new THREE.MeshBasicMaterial({ color: 0xff4757, transparent: true, opacity: 0.4, side: THREE.DoubleSide });

const hearts = [];
for (let i = 0; i < 60; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    
    // Scale down the heart
    const s = Math.random() * 0.04 + 0.02;
    mesh.scale.set(s, s, s);
    // Rotate it to be upright
    mesh.rotation.x = Math.PI;
    
    mesh.position.x = (Math.random() - 0.5) * 50;
    mesh.position.y = (Math.random() - 0.5) * 50;
    mesh.position.z = (Math.random() - 0.5) * 20 - 10;
    
    // Give each heart a random upward velocity and sway
    mesh.userData = {
        speed: Math.random() * 0.03 + 0.01,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmount: Math.random() * 0.5 + 0.1,
        swayOffset: Math.random() * Math.PI * 2
    };
    
    scene.add(mesh);
    hearts.push(mesh);
}

camera.position.z = 15;

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    hearts.forEach((heart) => {
        heart.position.y += heart.userData.speed;
        heart.position.x += Math.sin(time * heart.userData.swaySpeed * 100 + heart.userData.swayOffset) * 0.01;
        
        // Interactive repelling from mouse
        const dx = heart.position.x - (mouseX * 25);
        const dy = heart.position.y - (mouseY * 25);
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 5) {
            heart.position.x += dx * 0.03;
            heart.position.y += dy * 0.03;
        }
        
        // Reset if it goes too high
        if (heart.position.y > 25) {
            heart.position.y = -25;
            heart.position.x = (Math.random() - 0.5) * 50;
        }
    });
    
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
