const Game = (() => {
    const createBoard = () => {
        const board = ["", "", "", "", "", "", "", "", ""];
        return { board };
    };

    const createPlayer = (name, symbol) => {
        return { name, symbol };
    };

    const playGame = (board, player1, player2) => {
        let currentPlayer = player1;
        let finishGame = false;

        const makeMove = (position) => {
            if (board.board[position] === "" && !finishGame) {
                board.board[position] = currentPlayer.symbol;
                printBoard(board);

                if (checkWin(board, currentPlayer)) {
                    printTurn(currentPlayer, 'win');
                    finishGame = true;
                    return;
                }
                if (checkDraw(board)) {
                    printTurn(currentPlayer, 'draw')
                    finishGame = true;
                    return;
                }

                currentPlayer = currentPlayer === player1 ? player2 : player1;
                printTurn(currentPlayer, '');
            } else {
                console.log('Invalid move');
                console.log(finishGame);
            }
        };

        const setFinishGame = (value) => {
            finishGame = value;
        };
        const getCurrentPlayer = () => currentPlayer;

        return { makeMove, setFinishGame, getCurrentPlayer };
    };

    const checkWin = (board, currentPlayer) => {
        for (let i = 0; i < 3; i++) {
            if (board.board[i] === currentPlayer.symbol &&
                board.board[3 + i] === currentPlayer.symbol &&
                board.board[6 + i] === currentPlayer.symbol
                ) { 
                return true; //ganador en columna
            }
        }
        for (let i = 0; i < 3; i++) {
            if (board.board[3 * i] === currentPlayer.symbol &&
                board.board[1 + (3 * i)] === currentPlayer.symbol &&
                board.board[2 + (3 * i)] === currentPlayer.symbol
                ) { 
                return true; //ganador en fila
            }
        }
        for (let i = 0; i < 3; i += 2) {
            if (board.board[i] === currentPlayer.symbol &&
                board.board[4] === currentPlayer.symbol && 
                board.board[8 - i] === currentPlayer.symbol
                ) {
                return true; //ganador en diagonal
            }
        }

        return false; //no hay ganador
    };

    const checkDraw = (board) => {
        if(board.board.includes("")) {
            return false;
        }
        return true;
    };

    const printBoard = (board) => {
        for (let i = 0; i < board.board.length; i++) {
            const boardContainer = document.getElementById(i);
            boardContainer.textContent = board.board[i];
        }
    };

    const printTurn = (currentPlayer, state) => {
        const turnText = document.querySelector(".result-game-text");
        const appearButton = document.querySelector(".button-reset");
        if(state == '') {
            turnText.textContent = `${currentPlayer.name}'s turn`;
        }
        else if (state == 'win') {
            turnText.textContent = `${currentPlayer.name} wins!`;
            appearButton.style.display = "flex";
        }
        else if (state == 'draw') {
            turnText.textContent = `It\'s a draw!`;
            appearButton.style.display = "flex";
        }

    };

    const initialize = () => {

      
        document.getElementById("loginForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const usernameOne = document.getElementById("username-one").value;
            const usernameTwo = document.getElementById("username-two").value;
            document.querySelector('.form-container').style.display = 'none';

            const board = createBoard();
            const player1 = createPlayer(usernameOne, 'X');
            const player2 = createPlayer(usernameTwo, 'O');
            const game = playGame(board, player1, player2);
            printTurn(player1, '');

            document.querySelector(".button-reset").addEventListener("click", function() {
                board.board.fill(""); 
                game.setFinishGame(false);
                printBoard(board);
                this.style.display = 'none';
                printTurn(game.getCurrentPlayer(), '');
            });

            for (let i = 0; i < board.board.length; i++) {
                const boardContainer = document.getElementById(i);
    
                boardContainer.addEventListener('click', (event) => {
                    game.makeMove(i);
                });
            }
        });

    };

    return { initialize };
})();

Game.initialize();
