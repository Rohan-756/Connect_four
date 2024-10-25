const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let board = Array.from({ length: rows }, () => Array(cols).fill(null));
let gameActive = true; // Track if the game is still active

const gameElement = document.getElementById('game');
const restartButton = document.getElementById('restart');

function createBoard() {
    gameElement.innerHTML = '';
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.col = c;
            cell.addEventListener('click', handleCellClick);
            gameElement.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    if (!gameActive) return; // Ignore clicks if the game is not active

    const col = event.target.dataset.col;
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            renderBoard();
            if (checkWin(r, col)) {
                alert('${currentPlayer.toUpperCase()} wins!');
                gameActive = false; // End the game
            } else {
                currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            }
            break;
        }
    }
}

function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);
        if (board[row][col]) {
            cell.classList.add(board[row][col]);
        } else {
            cell.classList.remove('red', 'yellow');
        }
    });
}

function checkWin(row, col) {
    return (
        checkDirection(row, col, 1, 0) || // Horizontal
        checkDirection(row, col, 0, 1) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, 1, -1)   // Diagonal \
    );
}

function checkDirection(row, col, rowStep, colStep) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        const r = row + i * rowStep;
        const c = col + i * colStep;
        if (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
            count++;
            if (count === 4) return true;
        } else {
            count = 0;
        }
    }
    return false;
}

function resetGame() {
    board = Array.from({ length: rows }, () => Array(cols).fill(null));
    currentPlayer = 'red';
    gameActive = true; // Reset game state to active
    renderBoard();
}

restartButton.addEventListener('click', resetGame);

createBoard();
