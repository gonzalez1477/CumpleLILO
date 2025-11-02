const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8', '#fdcb6e', '#e17055'];
let musicPlaying = false;

// Sopa de letras
const words = [
    'RATA', 'MICHINITA', 'ENANA', 'DUENDE', 'ZORRA', 'PERRA',
    'MIAMOR', 'CARIÑOSA', 'BONITA', 'NINFÓMANA', 'LOCA',
    'REVELDE', 'CARISMÁTICA', 'PEQUEÑA'
];

const gridSize = 15;
let grid = [];
let selectedCells = [];
let foundWords = [];
let currentColor = 'green';
let isSelecting = false;

function initGrid() {
    grid = Array(gridSize).fill().map(() => Array(gridSize).fill(''));

    // Colocar palabras
    words.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            const direction = Math.floor(Math.random() * 3); // 0: horizontal, 1: vertical, 2: diagonal
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);

            if (canPlaceWord(word, row, col, direction)) {
                placeWord(word, row, col, direction);
                placed = true;
            }
            attempts++;
        }
    });

    // Rellenar espacios vacíos con letras aleatorias incluyendo Ñ
    const letters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j] === '') {
                grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }

    renderGrid();
}

function canPlaceWord(word, row, col, direction) {
    if (direction === 0) { // Horizontal
        if (col + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) return false;
        }
    } else if (direction === 1) { // Vertical
        if (row + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) return false;
        }
    } else { // Diagonal
        if (row + word.length > gridSize || col + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            if (grid[row + i][col + i] !== '' && grid[row + i][col + i] !== word[i]) return false;
        }
    }
    return true;
}

function placeWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        if (direction === 0) {
            grid[row][col + i] = word[i];
        } else if (direction === 1) {
            grid[row + i][col] = word[i];
        } else {
            grid[row + i][col + i] = word[i];
        }
    }
}

function renderGrid() {
    const gridElement = document.getElementById('wordGrid');
    gridElement.innerHTML = '';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'letter-cell';
            cell.textContent = grid[i][j];
            cell.dataset.row = i;
            cell.dataset.col = j;

            cell.addEventListener('mousedown', startSelection);
            cell.addEventListener('mouseenter', continueSelection);
            cell.addEventListener('mouseup', endSelection);

            gridElement.appendChild(cell);
        }
    }
}

function startSelection(e) {
    isSelecting = true;
    selectedCells = [];
    toggleCell(e.target);
}

function continueSelection(e) {
    if (isSelecting) {
        toggleCell(e.target);
    }
}

function endSelection() {
    isSelecting = false;
    checkWord();
    selectedCells = [];
}

function toggleCell(cell) {
    if (!selectedCells.includes(cell)) {
        selectedCells.push(cell);
        cell.classList.add('selected-temp');
    }
}

function checkWord() {
    const word = selectedCells.map(cell => cell.textContent).join('');

    if (words.includes(word) && !foundWords.includes(word)) {
        foundWords.push(word);
        selectedCells.forEach(cell => {
            cell.classList.remove('selected-temp');
            cell.classList.add(`selected-${currentColor}`);
        });

        document.getElementById('foundCount').textContent = foundWords.length;

        if (foundWords.length === words.length) {
            setTimeout(() => {
                alert('¡Has pasado al siguiente nivel, ahora eres una perra superior! 🎉');
                window.location.hash = '#carta';
            }, 500);
        }
    } else {
        selectedCells.forEach(cell => {
            cell.classList.remove('selected-temp');
        });
    }
}

function selectColor(color) {
    currentColor = color;
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-color="${color}"]`).classList.add('active');
}

// Inicializar sopa de letras cuando se cargue la página
window.addEventListener('load', initGrid);

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

setInterval(createConfetti, 300);
setInterval(createBalloon, 2000);

setTimeout(celebrate, 500);