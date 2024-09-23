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

2. Clicking on the "Start" button should create 10 square by 10 square grid on each gameboard AND place 5 ship objects of varying length on the board at random. This is a 2 player game, so the location of the ships should not be visible to the player. 
        There are 5 ships: 
        Carrier: 5 squares long
        Battleship: 4 squares long
        Submarine: 3 squares long
        Cruiser: 3 squares long
        Dingy: 2 squares long

        A key challenge with this will be ensuring that ships are being placed in "valid" locations. Meaning two ships can't occupy the same space AND all squares represent that "ship" must be in a straight line (vertically or horizonally) on the same row or column. 

3. On the players turn, they can click on a square on the opposing players board. On click, the game board will update by highlighting the square red (for a hit on a ship), or white (for a miss). The display will also reflect the game status.

4. Each hit will store the class name of the ship (ie carrier, battleship, submarine etc) in an array of player hits as strings. 

5. When the same string appears in the array the same amount of times === length of that boat, that boats is "sunk" and the name of that boat is added to the SunkShips array and the game display will update based on game status.  

6. When the SunkShips array length === 5 (the total number of ships) that will trigger the win condition for the player and the game is over. 

7. A reset button is available to restart the game if the play wants to play again.
*/

/*-------------------------------- Stretch Goals --------------------------------*/

/*
1. Adding audio feedback for hits, misses, and sinks.

2. Adding a display that shows the player which ships they have sunk of the opposing player. 

3. Allow players to pick their ship locations. 

4. Adding animation feedback for hits, misses, and sinks. 
*/
/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/

let playerTurn; // this variable keeps track of player turn
let gameOver = false // this variable keeps track of if win condition is met
let playerOneHits = []; // this variable will hold the player hits based on game status
let playerTwoHits = []; // this variable will old the computer hits based on game status
let playerOneSunkShips = []; // this variable will contain all ships the player has sunk. 
let playerTwoSunkShips = []; // this variable will contain all ships the computer has sunk. 

// if either playerOneSunkShips or playerTwoSunkShips reaches the length of the total amount of ships, the game is over.


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


