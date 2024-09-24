console.log('Project 1 - Battleship');

/*-------------------------------- User Stories --------------------------------*/

/*
As a user, I want a clear landing page showing the game I will be playing, the board, and instructions so I know where I am.

As a user I want to see a clear start button so I know how to begin the game.

As a user I want visual feedback on each players move, showing if the move was a hit, miss or sink, so I know how the game is progressing.

As a user, I want a visual indication of which player's turn it is, so I know how to proceed with the game. 

As a user, I want a visual indication of a winner when all ships are destroyed, so I know what the outcome of the game is. 

As a user, I want a way to reset the game so my opponent and I can rematch. 
*/

/*-------------------------------- Basic Game Logic --------------------------------*/

/*
1. Start code has the basic outline of 100px X 100px board. There is also an instruction dive, game info display, and turn display. 

2. Clicking on the "Start" button should create 10 square by 10 square grid on each gameboard AND place 5 ship objects of varying length on the board. Initially these will be harded coded locations. This is a 2 player game, so the location of the ships should not be visible to the player. 
        There are 5 ships: 
        Carrier: 5 squares long
        Battleship: 4 squares long
        Submarine: 3 squares long
        Cruiser: 3 squares long
        Dingy: 2 squares long

        When placed, each of these ships will place a string associated with that that ship in the playerOne(orTwo)Board arrays below the indexs below that correspond to the same id as square in the HTML. 

        A key challenge with this will be ensuring that ships are being placed in "valid" locations. Meaning two ships can't occupy the same space AND all squares represent that "ship" must be in a straight line (vertically or horizonally) on the same row or column. 

3. On the players turn, they can click on a square on the opposing players board. On click, the game board will update by highlighting the square red (for a hit on a ship), or white (for a miss). The display will also reflect the game status.

4. Each hit will store the string name of the ship (ie carrier, battleship, submarine etc) in an array of player hits as strings. 

5. When the same string appears in the array the same amount of times === length of that boat, that boats is "sunk" and the name of that boat is added to the SunkShips array and the game display will update based on game status.  

6. When the SunkShips array length === 5 (the total number of ships) that will trigger the win condition for the player and the game is over. 

7. A reset button is available to restart the game if the player wants to play again.
*/

/*-------------------------------- Stretch Goals --------------------------------*/

/*
1. Adding audio feedback for hits, misses, and sinks.

2. Adding a display that shows the player which ships they have sunk of the opposing player. 

3. Each reset of the game place the ships in a new position. 

4. Allow players to pick their ship locations. 

5. Adding animation feedback for hits, misses, and sinks.

6. Add computer player functionality. 
*/
/*-------------------------------- Constants --------------------------------*/
const sinkConditions = { // This object hold the sink conditions for the various ships to be compared against in the handle click functions. 
    submarine: 3,
    carrier: 5,
    battleship: 4,
    crusier: 3,
    dingy: 2,
};
/*---------------------------- Variables (state) ----------------------------*/

let activeGame = false;

let playerTurn; // this variable keeps track of player turn

let gameOver = false; // this variable keeps track of if win condition is met

let playerOneHits = []; // this variable will hold the player hits based on game status
let playerTwoHits = []; // this variable will old the computer hits based on game status

let playerOneSunkShips = []; // this variable will contain all ships the player has sunk. 
let playerTwoSunkShips = []; // this variable will contain all ships the computer has sunk. 
// if either playerOneSunkShips or playerTwoSunkShips reaches the length of the total amount of ships, the game is over.
let playerOneBoard = [];
let playerTwoBoard = [];

/*------------------------ Cached Element References ------------------------*/

const turnDisplayEl = document.querySelector('#turn-display');
// console.dir(turnDisplayEl); checks to make sure turnDisplayEl is active.
const gameInfoDisplayEl = document.querySelector('#game-info-display');
// console.dir(gameInfoDisplayEl);
const playerOneBoardEl = document.querySelector('#player-one-board');

const playerTwoBoardEl = document.querySelector('#player-two-board');

const startButtonEl = document.querySelector('#start-button');

const resetButtonEl = document.querySelector('#reset-button');

/*-------------------------------- Functions --------------------------------*/

function init() {

};

function startGame() { // when start button is clicked, places 5 ships randomly on both boards
    console.log('Start Game is initiated');
    activeGame = true;
    playerTurn = "Player One";
    gameOver = false;
    createBoardOne();
    createBoardTwo();
    disableStartButton();
};

function createBoardOne() { // function to place in start game to create the board grid. 
    playerOneBoard = [ //array representing the player one board; 
        '', '', 'carrier', 'carrier', 'carrier', 'carrier', 'carrier', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''
    ];

    for (let i = 0; i < 100; i++) {
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('board-square');
        boardSquare.id = i;
        playerOneBoardEl.append(boardSquare);
    }

    playerOneBoard.forEach((square, index) => {
        let currentSquare
        if (playerOneBoard[index] !== '') {
            currentSquare = document.getElementById('player-one-board').getElementsByClassName('board-square')[index];
            currentSquare.style.backgroundColor = 'blue';
        }
    })
}

function createBoardTwo() { // function to place in start game to create the board grid. 
    playerTwoBoard = [ //array representing the player one board; 
        '', '', 'carrier', 'carrier', 'carrier', 'carrier', 'carrier', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '', ''
    ];

    for (let i = 0; i < 100; i++) {
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('board-square');
        boardSquare.id = i;
        playerTwoBoardEl.append(boardSquare);
    }

    playerOneBoard.forEach((square, index) => {
        let currentSquare
        if (playerOneBoard[index] !== '') {
            currentSquare = document.getElementById('player-two-board').getElementsByClassName('board-square')[index];
            currentSquare.style.backgroundColor = 'blue';
        }
    })
}

function disableStartButton() {
    if (activeGame === true) {
        startButtonEl.disabled = true;
    };
};

function placeShips() {
    //function to place in start ships that places ships on the board
};

function handlePlayerTwoTurn(event) {     // function that handles a click on the games board
    const clickedElementId = event.target.id;     // checks id of clicked element and assigns it to clickedElementId (which is a number);
    if (event.target.classList.contains('hit') || event.target.classList.contains('empty')) {
        return;
    } else if (playerOneBoard[clickedElementId] !== '') {
        playerTwoHits.push(playerOneBoard[clickedElementId]);
        console.log(playerTwoHits);
    }
    // check playerOneBoardArray at the index === clickedElementId
    // if playerOneBoard[clickedElementID] has a class of .hit || .empty, return.
    // else if playerOneBoard[clickedElementID] !== empty string, then
    // add the returned string to playerOneHits array.  
    // check the number of times playerOneBoard[clickledElementID] occurs in playerOneHits array (with .reduce()).

    // if boats[playerOneBoard[clickedElementID]] === result of tally from playerOneHits.reduce, then: 
    // sinkShip(); in sinkShip() checkGameStatus();


    // if playOneBoardArray[clickedElementID] is true, give the clicked element a class of '.hit', which would syle the clicked element red. 
    // else give the clicked element a class of .empty, which would style it white. 

    // if win condition is met, end game.
    // if !gameOver and hit; switch turn
    // else mark empty and switch turn
    // update display
};

function checkGameStatus() {
    // function to be placed in handleClick that checks if win condition is met.
};

function render() {
    // function to update display based on game state
};

function updateDisplay() {
    // function to update display based on game state.
};

function updateBoard() {
    // function to update the boards based on game state
};

function resetGame() {
    console.log('The game has been reset');
    // function to reset the game when reset button is pressed.
};

init();
/*----------------------------- Event Listeners -----------------------------*/

playerOneBoardEl.addEventListener('mousedown', handlePlayerTwoTurn);

// playerTwoBoardEl.addEventListener('mousedown', handlePlayerOneTurn);
// event listener needed for each board and its elements.
startButtonEl.addEventListener('click', startGame);
// event listener for start game button
resetButtonEl.addEventListener('click', resetGame);
// even listener needed for reset button


