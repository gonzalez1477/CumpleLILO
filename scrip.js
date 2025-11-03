const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055'];
let musicPlaying = false;

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    confetti.style.opacity = Math.random();
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.textContent = '🎈';
    balloon.style.left = Math.random() * 90 + 'vw';
    balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';
    document.body.appendChild(balloon);

    setTimeout(() => {
        balloon.remove();
    }, 8000);
}

function celebrate() {
    for (let i = 0; i < 30; i++) {
        setTimeout(createConfetti, i * 50);
    }
}

function playMusic() {
    const music = document.getElementById('bgMusic');
    const btn = document.getElementById('musicBtn');
    if (!musicPlaying) {
        music.play();
        musicPlaying = true;
        btn.textContent = '⏸️ Pausar Música';
    } else {
        music.pause();
        musicPlaying = false;
        btn.textContent = '🎵 Reproducir Música';
    }
}

// Animaciones automáticas
if (document.querySelector('.container')) {
    setInterval(createConfetti, 300);
    setInterval(createBalloon, 2000);
    setTimeout(celebrate, 500);
}