console.log('Project 1 - Battleship');

/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let playerTurn; // this variable keeps track of player turn
let gameOver = false // this variable keeps track of if win condition is met
let playerHits = []; // this variable will hold the player hits based on game status
let computerHits = []; // this variable will old the computer hits based on game status
let playerSunkShips = []; // this variable will contain all ships the player has sunk. 
let computerSunkShips = []; // this variable will contain all ships the computer has sunk. 

// if either playerSunkShips or computerSunkShips reaches the length of the total amount of ships, the game is over.


/*------------------------ Cached Element References ------------------------*/

// CERs for start button, reset button and the two boards. 

/*-------------------------------- Functions --------------------------------*/

function init() {

};

function startGame() {
    // when start button is clicked, places 5 ships randomly on both boards
};

function buildGameboards() {
    // this function will build the squares in the game board.
}

function createShips() {
    // function to place in start game to create ships to place on board.
}

function placeShips() {
    // function to place in start ships that places ships on the board
};

function handleClick() {
    // function that handles a click on the games board
    // checks current space, 
    // if occupied, marks a hit, 
    // if hit checks if game ends
    // if win condition is met, end game.
    // if !gameOver and hit; switch turn
    // else mark empty and switch turn
    // update display
};

function checkGameStatus() {
    // function to be placed in handleClick that checks if win condition is met.
};

function computerTurn() {
    // this function will allow the 'Computer' player to attack our board at random. 
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
    // function to reset the game when reset button is pressed.
};


/*----------------------------- Event Listeners -----------------------------*/

// event listener needed for each board and its elements.

// event listener needed for start game button

// even listener needed for reset button


