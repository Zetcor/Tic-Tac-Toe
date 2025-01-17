var board;
var playerO = "O";
var playerX = "X";
var turns = 0;
var currPlayer = playerO;
var gameOver = false;

window.onload = function() {
    setGame();
}

function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            if (r == 0 || r == 1) {
                tile.classList.add("horizontal-line");
            }
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            tile.innerText = "";
            tile.addEventListener("click", setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function setTile() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html

    //change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
    }
    else {
        currPlayer = playerO;
    }

    turns += 1;

    //check winner
    checkWinner();

    if (turns === 9 && !gameOver) {
        checkTie();
    }
}


function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let row = 0; row < 3; row++) {
                if (row !== r) {  // If it's not the winning row
                    for (let col = 0; col < 3; col++) {
                        let tile = document.getElementById(row.toString() + "-" + col.toString());
                        tile.classList.add("other-tiles");
                    }
                }
            }

            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            for (let col = 0; col < 3; col++) {
                if (col !== c) {  // If it's not the winning row
                    for (let row = 0; row < 3; row++) {
                        let tile = document.getElementById(row.toString() + "-" + col.toString());
                        tile.classList.add("other-tiles");
                    }
                }
            }

            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (row !== col) {  // Skip the winning diagonal
                    let tile = document.getElementById(row.toString() + "-" + col.toString());
                    tile.classList.add("other-tiles");
                }
            }
        }

        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if ((row === 0 && col === 2) || (row === 1 && col === 1) || (row === 2 && col === 0)) {
                    // Skip the winning anti-diagonal tiles
                    continue;
                }
                let tile = document.getElementById(row.toString() + "-" + col.toString());
                tile.classList.add("other-tiles");
            }
        }

        gameOver = true;
        return;
    }
}

function checkTie() {
    if (turns == 9) {
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.classList.add("tie");
            }
        }
        gameOver = true;
        return;
    }
}

function newGame() {
    turns = 0;
    currPlayer = playerO;
    gameOver = false;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            board[r][c] = ' ';
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = ' ';
            tile.classList.remove("other-tiles", "tie");
        }
    }
}