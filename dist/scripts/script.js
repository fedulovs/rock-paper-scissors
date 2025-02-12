"use strict";
var GameMoves;
(function (GameMoves) {
    GameMoves["ROCK"] = "Rock";
    GameMoves["PAPER"] = "Paper";
    GameMoves["SCISSORS"] = "Scissors";
})(GameMoves || (GameMoves = {}));
var Results;
(function (Results) {
    Results["FIRST_PLAYER"] = "Player wins";
    Results["SECOND_PLAYER"] = "Computer wins";
    Results["DRAW"] = "Draw!";
})(Results || (Results = {}));
var userChoice;
var computerChoice;
var winner;
var playerScore = 0;
var computerScore = 0;
// Find elements
var rockButton = document.getElementById('rock-button');
var paperButton = document.getElementById('paper-button');
var scissorsButton = document.getElementById('scissors-button');
var computerChoiceText = document.getElementById('computer-choice');
var userChoiceText = document.getElementById('user-choice');
var result = document.getElementById('result');
var playerScoreText = document.getElementById('player-score');
var computerScoreText = document.getElementById('computer-score');
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
function getRandomMove() {
    var moves = [
        GameMoves.ROCK,
        GameMoves.PAPER,
        GameMoves.SCISSORS,
    ];
    var randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}
function handlePlayerChoice(event) {
    var target = event.target;
    computerChoice = getRandomMove();
    if (computerChoiceText) {
        computerChoiceText.textContent = "Computer move: ".concat(computerChoice);
    }
    var clickedButtonId = target.id;
    // Determine which button was clicked
    if (userChoiceText) {
        // Determine which button was clicked
        if (clickedButtonId === 'rock-button') {
            userChoice = GameMoves.ROCK;
            userChoiceText.textContent = "Your move: ".concat(GameMoves.ROCK);
        }
        else if (clickedButtonId === 'paper-button') {
            userChoice = GameMoves.PAPER;
            userChoiceText.textContent = "Your move: ".concat(GameMoves.PAPER);
        }
        else if (clickedButtonId === 'scissors-button') {
            userChoice = GameMoves.SCISSORS;
            userChoiceText.textContent = "Your move: ".concat(GameMoves.SCISSORS);
        }
    }
    if (userChoice && computerChoice) {
        determineWinner(userChoice, computerChoice);
    }
}
var determineWinner = function (firstFigure, secondFigure) {
    var usedFigures = [firstFigure, secondFigure];
    var possibleChoices = Object.values(GameMoves);
    var missingFigure = possibleChoices.find(function (choice) { return !usedFigures.includes(choice); });
    if (firstFigure == secondFigure) {
        winner = Results.DRAW;
        if (result) {
            result.textContent = "".concat(Results.DRAW);
        }
    }
    else {
        var winningFigure = void 0;
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
                playerScoreText.textContent = "Player score: ".concat(playerScore);
            }
        }
        else {
            winner = 'Computer';
            computerScore += 1;
            if (computerScoreText) {
                computerScoreText.textContent = "Computer score: ".concat(computerScore);
            }
        }
        if (result) {
            result.textContent = "".concat(winner, " wins!");
        }
    }
};
