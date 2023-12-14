//for all the dom 
const DOM = (function(){
    const boardCont = document.querySelector(".cont");
    const btnRestart = document.querySelector(".btn-restart");

    function getBoardCont(){
        return boardCont;
    }

    function newSquare(){
        const square = document.createElement("div");
        square.className = "square";

        return square;
    }

    function reset(){
        btnRestart.addEventListener('click', function(){
            gameBoard.resetBoard();
            control.resetPlayerTrun();
            control.playingGame();
            console.log("clear");
        })
    }

    reset();

    return {
        getBoardCont: getBoardCont,
        newSquare: newSquare,
    };
})();

//creating board 
const gameBoard = (function(){
    const boardCont = DOM.getBoardCont();

    const board = new Array(9);

    function initBoard(){
        for(let i = 0; i < 9; i++){
            const square = DOM.newSquare();
            boardCont.appendChild(square);
        }
    }

    function resetBoard(){
        const squares = boardCont.querySelectorAll(".square");
        squares.forEach(square => {
            square.innerHTML = ""; 
        })
        //reset the array also
        for(let i = 0; i < board.length; i++){
            board[i] = undefined;
        }
    }

    initBoard();

    return{
        getBoard: function(){
            return board;
        },
        resetBoard: resetBoard
    };
})();

//controling game and playing game
const control = (function(){
    const player1 = {
        name: "Player 1",
        marker: "X",
    };
    
    const player2 = {
        name: "Player 2",
        marker: "O",
    };

    let playerTurn = true;
    const gameBoardArray = gameBoard.getBoard();
    const boardCont = DOM.getBoardCont();
    let squares = boardCont.querySelectorAll(".square");

    function checkWinner(board,player){
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for(const condition of winConditions){
            const[a, b, c] = condition;
            if(board[a] === player && board[b] === player && board[c] === player){
                return true;
            }
        }
        return false;
    }

    function checkTie(board) {
        return !board.includes(undefined);//if no empty array tie
    }

    function playingGame() {
        squares.forEach((square, index) => {
            square.addEventListener('click', function handleSquareClick(){
                if (!gameBoardArray[index]) {
                    const marker = document.createElement('span');
                    marker.textContent = playerTurn ? player1.marker : player2.marker;
                    square.appendChild(marker);
                    
                    gameBoardArray[index] = playerTurn ? player1.marker : player2.marker;
                    
                    if(checkWinner(gameBoardArray,player1.marker)){
                        removeEventListener();
                        console.log(`${player1.name} wins!`);
                        
                    }
                    else if(checkWinner(gameBoardArray,player2.marker)){
                        alert(`${player2.name} wins!`);
                        removeEventListener();
                    }
                    else if(checkTie(gameBoardArray)){
                        alert("tie!");
                        removeEventListener();
                    }
                    else{
                        console.log("gmae still going");
                    }
                    playerTurn = !playerTurn;

                    function removeEventListener(){
                        squares.forEach((square) => {
                            square.removeEventListener('click', handleSquareClick);
                        })
                    }
                }
            });
        });
    }

    playingGame();
    return{
        resetPlayerTrun: function(){
            playerTurn = true;
        },
        playingGame: playingGame
    };
})();