type GameMove = 'Rock' | 'Paper' | 'Scissors';

enum GameMoves {
    ROCK = 'Rock',
    PAPER = 'Paper',
    SCISSORS = 'Scissors',
}

enum Results {
    FIRST_PLAYER = 'Player wins',
    SECOND_PLAYER = 'Computer wins',
    DRAW = 'Draw!',
}

let userChoice: GameMove;
let computerChoice: GameMove;
let winner: string;
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
if (rockButton) {
    rockButton.addEventListener('click', handlePlayerChoice);
}
if (paperButton) {
    paperButton.addEventListener('click', handlePlayerChoice);
}
if (scissorsButton) {
    scissorsButton.addEventListener('click', handlePlayerChoice);
}

// Get random move
function getRandomMove(): GameMove {
    const moves: GameMove[] = [
        GameMoves.ROCK,
        GameMoves.PAPER,
        GameMoves.SCISSORS,
    ];
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function handlePlayerChoice(event: MouseEvent) {
    const target = event.target as HTMLElement;
    computerChoice = getRandomMove();
    if (computerChoiceText) {
        computerChoiceText.textContent = `Computer move: ${computerChoice}`;
    }

    const clickedButtonId = target.id;

    // Determine which button was clicked
    if (userChoiceText) {
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
    }

    if (userChoice && computerChoice) {
        determineWinner(userChoice, computerChoice);
    }
}

const determineWinner = (firstFigure: GameMove, secondFigure: GameMove) => {
    const usedFigures = [firstFigure, secondFigure];

    const possibleChoices = Object.values(GameMoves) as GameMove[];

    const missingFigure = possibleChoices.find(
        (choice: GameMove) => !usedFigures.includes(choice)
    );

    if (firstFigure == secondFigure) {
        winner = Results.DRAW;
        if (result) {
            result.textContent = `${Results.DRAW}`;
        }
    } else {
        let winningFigure: string | undefined;
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
            if (playerScoreText) {
                playerScoreText.textContent = `Player score: ${playerScore}`;
            }
        } else {
            winner = 'Computer';
            computerScore += 1;
            if (computerScoreText) {
                computerScoreText.textContent = `Computer score: ${computerScore}`;
            }
        }

        if (result) {
            result.textContent = `${winner} wins!`;
        }
    }
};
