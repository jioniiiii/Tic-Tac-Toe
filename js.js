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
            if(!gameBoardIsEmpty()){
                gameBoard.resetBoard();
                control.resetPlayerTrun();
                control.addEventListener();
                console.log("clear");
            }
        });
    }

    function gameBoardIsEmpty() {
        return gameBoard.getBoard().every(square => square === undefined);
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
        let squares = boardCont.querySelectorAll(".square");
        squares.forEach(square => {
            square.innerHTML = ""; 
        })
        //reset the array also
        for(let i = 0; i < board.length; i++){
            board[i] = undefined;
        }
        squares = boardCont.querySelectorAll(".square");
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
    let clickHandlers = [];
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

    
    function handleSquareClick(index){
        const clickHandler = function(){
            if(!gameBoardArray[index]){

                const marker = document.createElement("span");
                marker.textContent = playerTurn ? player1.marker : player2.marker;
                squares[index].appendChild(marker);
    
                gameBoardArray[index] = playerTurn ? player1.marker : player2.marker;
    
                if(checkWinner(gameBoardArray, player1.marker)){
                    alert(`${player1.name} wins!`);
                    removeEventListener();
                }
                else if(checkWinner(gameBoardArray, player2.marker)){
                    alert(`${player2.name} wins!`);
                    removeEventListener();
                } 
                else if(checkTie(gameBoardArray)){
                    alert("Tie!");
                    removeEventListener();
                } 
                else{
                    console.log("Game still going");
                }
    
                playerTurn = !playerTurn;
            }
        };
        clickHandlers[index] = clickHandler;
    
        return clickHandler;
    }

    function addEventListener(){
        squares.forEach((square, index) => {
            const clickHandler = handleSquareClick(index);
            clickHandlers.push(clickHandler);
            square.addEventListener('click', clickHandler);
        });
    }
    
    function removeEventListener(){
        clickHandlers.forEach((clickHandler, index) => {
            if(squares[index]){
                squares[index].removeEventListener('click', clickHandler);
            }
        });
        clickHandlers = [];
    }

    addEventListener();

    return{
        resetPlayerTrun: function(){
            playerTurn = true;
        },
        addEventListener: addEventListener
    };
})();