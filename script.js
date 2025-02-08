const GameMoves = {
    ROCK: 'Rock',
    PAPER: 'Paper',
    SCISSORS: 'Scissors',
};

const Results = {
    FIRST_PLAYER: 'Player wins',
    SECOND_PLAYER: 'Computer wins',
    DRAW: 'Draw!',
};

let userChoice;
let computerChoice;
let winner;
let playerScore = 0;
let computerScore = 0;

// Find elements
const rockButton = document.getElementById('rock-button');
const paperButton = document.getElementById('paper-button');
const scissorsButton = document.getElementById('scissors-button');

const computerChoiceText = document.getElementById('computer-choice');
const userChoiceText = document.getElementById('user-choice');

const result = document.getElementById('result');

const playerScoreText = document.getElementById('player-score');
const computerScoreText = document.getElementById('computer-score');

// Add listeners
rockButton.addEventListener('click', handlePlayerChoice);
paperButton.addEventListener('click', handlePlayerChoice);
scissorsButton.addEventListener('click', handlePlayerChoice);

// Get random move
function getRandomMove() {
    const moves = Object.values(GameMoves);
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function handlePlayerChoice(event) {
    computerChoice = getRandomMove();
    computerChoiceText.textContent = `Computer move: ${computerChoice}`;

    const clickedButtonId = event.target.id;

    // Determine which button was clicked
    if (clickedButtonId === 'rock-button') {
        userChoice = GameMoves.ROCK;
        userChoiceText.textContent = `Your move: ${GameMoves.ROCK}`;
    } else if (clickedButtonId === 'paper-button') {
        userChoice = GameMoves.PAPER;
        userChoiceText.textContent = `Your move: ${GameMoves.PAPER}`;
    } else if (clickedButtonId === 'scissors-button') {
        userChoice = GameMoves.SCISSORS;
        userChoiceText.textContent = `Your move: ${GameMoves.SCISSORS}`;
    }

    determineWinner(userChoice, computerChoice);
}

const determineWinner = (firstFigure, secondFigure) => {
    let usedFigures = [firstFigure, secondFigure];

    const possibleChoices = Object.values(GameMoves);

    let missingFigure = possibleChoices.find(
        (choice) => !usedFigures.includes(choice)
    );

    if (firstFigure == secondFigure) {
        winner = Results.DRAW;
        result.textContent = `${Results.DRAW}`;
    } else {
        // Check if item is missing to minimize the conditions
        // e.g. if Scissors are missing paper wins
        switch (missingFigure) {
            case GameMoves.ROCK:
                winningFigure = 'Scissors';
                break;
            case GameMoves.PAPER:
                winningFigure = 'Rock';
                break;
            case GameMoves.SCISSORS:
                winningFigure = 'Paper';
                break;
        }

        if (firstFigure == winningFigure) {
            winner = 'Player';
            playerScore += 1;
            playerScoreText.textContent = `Player score: ${playerScore}`;
        } else {
            winner = 'Computer';
            computerScore += 1;
            computerScoreText.textContent = `Computer score: ${computerScore}`;
        }

        result.textContent = `${winner} wins!`;
    }
};
