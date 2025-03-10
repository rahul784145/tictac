let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");
const resultScreen = document.getElementById("result-screen");
const resultMessage = document.getElementById("result-message");
const newGameButton = document.getElementById("new-game");

cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
newGameButton.addEventListener("click", restartGame);

function handleCellClick(event) {
    const index = event.target.getAttribute("data-index");

    if (gameBoard[index] !== "" || gameOver) return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
        gameOver = true;
        showResult(`${currentPlayer} wins!`);
        return;
    }

    if (gameBoard.every(cell => cell !== "")) {
        gameOver = true;
        showResult("It's a tie!");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        return pattern.every(index => gameBoard[index] === player);
    });
}

function showResult(messageText) {
    resultMessage.textContent = messageText;
    resultScreen.style.display = "block";
    document.querySelector(".game-container").style.display = "none";
}

function restartGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOver = false;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
    });
    message.textContent = "";
    resultScreen.style.display = "none";
    document.querySelector(".game-container").style.display = "block";
}
