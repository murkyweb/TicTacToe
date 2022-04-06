const playerFactory = (name, marker) => {
    return { name, marker }
}

const Game = (function() {

    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let playerOne = playerFactory('Player1', 'X');
    let playerTwo = playerFactory('Player2', 'O');
    let currentPlayer = playerOne;
    let turns = 0;
    let gameResult = '';

    const renderBoard = () => {
        for (let i = 0; i < gameBoard.length; i++) {
            displayController.writeToDOM(`li:nth-child(${i+1})`, gameBoard[i]);
        }
    }

    const checkWinConditions = (marker) => {
        let winConditions = 
            [
               (gameBoard[0] === marker) && (gameBoard[0] === gameBoard[1]) && (gameBoard[0] === gameBoard[2]),
               (gameBoard[3] === marker) && (gameBoard[3] === gameBoard[4]) && (gameBoard[3] === gameBoard[5]),
               (gameBoard[6] === marker) && (gameBoard[6] === gameBoard[7]) && (gameBoard[6] === gameBoard[8]),
               (gameBoard[0] === marker) && (gameBoard[0] === gameBoard[3]) && (gameBoard[0] === gameBoard[6]),
               (gameBoard[1] === marker) && (gameBoard[1] === gameBoard[4]) && (gameBoard[1] === gameBoard[7]),
               (gameBoard[2] === marker) && (gameBoard[2] === gameBoard[5]) && (gameBoard[2] === gameBoard[8]),
               (gameBoard[0] === marker) && (gameBoard[0] === gameBoard[4]) && (gameBoard[0] === gameBoard[8]),
               (gameBoard[2] === marker) && (gameBoard[2] === gameBoard[4]) && (gameBoard[2] === gameBoard[6]),
            ];

        for (let i = 0; i < winConditions.length; i++) {
            if (winConditions[i]) {
                return true;
            } 
        }
    }

    const isGameOver = () => {
        turns++;
        if (checkWinConditions(currentPlayer.marker)) {
            return gameResult = `${currentPlayer.name} won!`;
        }
        else if (turns === 9) {
            return gameResult = 'Tie.';
        } else {
            changeTurn();
        }
    }

    const resetGame = () => {
        displayController.showPopUp();
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = playerOne;
        turns = 0;
        renderBoard();
    }

    const changeTurn = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else {
            currentPlayer = playerOne;
        }
    }

    const playGame = (e) => {
        let index = e.target.dataset.index;
        if (gameBoard[index]) {
            return;
        }
        gameBoard[index] = currentPlayer.marker;
        renderBoard();
        if (isGameOver()) {
            displayController.showPopUp();
            displayController.writeToDOM('.message', gameResult);
        }
    }

    return { resetGame, playGame };
})();


const displayController = (function() {

    const writeToDOM = (selector, message) => {
        document.querySelector(selector).innerText = message;
    }

    const showPopUp = () => {
        document.querySelector('.pop-up').classList.toggle('show');
        document.querySelector('.container').classList.toggle('hide');
    }

    document.addEventListener('click', (e) => {
        if (e.target.matches('li')) {
           Game.playGame(e);
        }
    });

    document.querySelector('.pop-up').addEventListener('click', Game.resetGame);

    return { writeToDOM, showPopUp };
})();

