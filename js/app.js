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
    cruiser: 3,
    dingy: 2,
};

/*---------------------------- Variables (state) ----------------------------*/

let activeGame = false; // variable keeps track of if game is started. If 'true' start button is disabled. 

let playerTurn; // this variable keeps track of player turn

let gameOver = false; // this variable keeps track of if win condition is met. If 'true' game is over. 

let playerOneHits = []; // this variable will hold the P1 hits based on game status
let playerTwoHits = []; // this variable will hold the P2 hits based on game status

let playerOneSunkShips = []; // this variable will contain all ships the P1 has sunk. 
let playerTwoSunkShips = []; // this variable will contain all ships the P2 has sunk. 
// if either playerOneSunkShips or playerTwoSunkShips reaches the length of the total amount of ships, the game is over.

let playerOneBoard = []; // represent P1 board state before initialization
let playerTwoBoard = []; // represent P2 board state before initialization

/*------------------------ Cached Element References ------------------------*/

const turnDisplayEl = document.querySelector('#turn-display');

const gameInfoDisplayEl = document.querySelector('#game-info-display');

const playerOneBoardEl = document.querySelector('#player-one-board');

const playerTwoBoardEl = document.querySelector('#player-two-board');

const startButtonEl = document.querySelector('#start-button');

const resetButtonEl = document.querySelector('#reset-button');

/*-------------------------------- Functions --------------------------------*/

function startGame() { // when start button is clicked, places 5 ships randomly on both boards
    console.log('Start Game is initiated');
    activeGame = true;
    playerTurn = "Player One";
    gameOver = false;
    createBoardOne();
    createBoardTwo();
    updateTurnMessage();
    updateStartMessage();
    disableOppositePlayerBoard();
    disableStartButton();
};


function createBoardOne() {
    playerOneBoard = [
        '', '', '', '', '', '', '', '', '', '',
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
    };
    placeP1Ships();
};

function placeP1Ships() {
    for (const ship in sinkConditions) {
        let randomBoolean = Math.random() < 0.5;
        let placeHorizonally = randomBoolean;
        if (placeHorizonally === true) {
            placeP1ShipHorizonally(ship);
        } else {
            placeP1ShipVertically(ship);
        };
    };
};

function placeP1ShipVertically(ship) {
    let possiblePlacements = verticalShipPlacements[ship];
    let shipLength = sinkConditions[ship];
    let shipStartingPoint;
    let isShipPlaced = false;
    while (isShipPlaced === false) {
        shipStartingPoint = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
        const isInvalidPlacement = (checkP1VerticalValidity(ship, shipStartingPoint) === false);
        if (isInvalidPlacement) {
        } else {
            for (let i = shipStartingPoint; i < (shipStartingPoint + (shipLength * 10)); i += 10) {
                playerOneBoard.splice(i, 1, ship);
                isShipPlaced = true;
            };
            console.log(playerOneBoard);
        };
    };
};


function placeP1ShipHorizonally(ship) {
    let possiblePlacements = horizontalShipPlacements[ship];
    let shipLength = sinkConditions[ship];
    let shipStartingPoint;
    let isShipPlaced = false;
    while (isShipPlaced === false) {
        shipStartingPoint = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
        const isInvalidPlacement = (checkP1HorizontalValidity(ship, shipStartingPoint) === false);
        if (isInvalidPlacement) {
        } else {
            for (let i = shipStartingPoint; i < (shipStartingPoint + shipLength); i++) {
                playerOneBoard.splice(i, 1, ship);
                isShipPlaced = true;
            };
            console.log(playerOneBoard);
        };
    };
};

function checkP1VerticalValidity(ship, shipStartingPoint) {
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + (shipLength * 10)); i += 10) {
        if (playerOneBoard[i] !== '') {
            return false;
        };
    };
};

function checkP1HorizontalValidity(ship, shipStartingPoint) {
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + shipLength); i++) {
        if (playerOneBoard[i] !== '') {
            return false;
        };
    };
};

function createBoardTwo() { // function to place in start game to create game board for P2
    playerTwoBoard = [
        '', '', '', '', '', '', '', '', '', '',
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
    };

    placeP2Ships();
};

function placeP2Ships() {
    for (const ship in sinkConditions) {
        let randomBoolean = Math.random() < 0.5;
        let placeHorizonally = randomBoolean;
        if (placeHorizonally === true) {
            placeP2ShipHorizonally(ship);
        } else {
            placeP2ShipVertically(ship);
        };
    };
};

function placeP2ShipVertically(ship) {
    let possiblePlacements = verticalShipPlacements[ship];
    let shipLength = sinkConditions[ship];
    let shipStartingPoint;
    let isShipPlaced = false;
    while (isShipPlaced === false) {
        shipStartingPoint = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
        const isInvalidPlacement = (checkP2VerticalValidity(ship, shipStartingPoint) === false);
        if (isInvalidPlacement) {
        } else {
            for (let i = shipStartingPoint; i < (shipStartingPoint + (shipLength * 10)); i += 10) {
                playerTwoBoard.splice(i, 1, ship);
                isShipPlaced = true;
            };
            console.log(playerTwoBoard);
        };
    };
};


function placeP2ShipHorizonally(ship) {
    let possiblePlacements = horizontalShipPlacements[ship];
    let shipLength = sinkConditions[ship];
    let shipStartingPoint;
    let isShipPlaced = false;
    while (isShipPlaced === false) {
        shipStartingPoint = possiblePlacements[Math.floor(Math.random() * possiblePlacements.length)];
        const isInvalidPlacement = (checkP2HorizontalValidity(ship, shipStartingPoint) === false);
        if (isInvalidPlacement) {
        } else {
            for (let i = shipStartingPoint; i < (shipStartingPoint + shipLength); i++) {
                playerTwoBoard.splice(i, 1, ship);
                isShipPlaced = true;
            };
            console.log(playerTwoBoard);
        };
    };
};

function checkP2VerticalValidity(ship, shipStartingPoint) {
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + (shipLength * 10)); i += 10) {
        if (playerTwoBoard[i] !== '') {
            return false;
        };
    };
};

function checkP2HorizontalValidity(ship, shipStartingPoint) {
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + shipLength); i++) {
        if (playerTwoBoard[i] !== '') {
            return false;
        };
    };
};

function updateTurnMessage() { // function to update turn display based on game state.
    if (gameOver === false) {
        return turnDisplayEl.textContent = `It is ${playerTurn}'s turn.`;
    };
};

function updateStartMessage() { // Function that updates the game info display to signify the game has started. 
    const hitEls = Array.from(document.querySelectorAll('.hit'));
    const emptyEls = Array.from(document.querySelectorAll('.empty'));
    if (activeGame === true && hitEls.length === 0 && emptyEls.length === 0) {
        gameInfoDisplayEl.textContent = 'The game has started';
    };
};

function disableOppositePlayerBoard() { // function placed each players handleTurn that disables their own board from being clicked. 
    if (playerTurn === 'Player One') {
        playerTwoBoardEl.addEventListener('mousedown', handlePlayerOneTurn);
        playerOneBoardEl.removeEventListener('mousedown', handlePlayerTwoTurn);
    } else if (playerTurn === 'Player Two') {
        playerOneBoardEl.addEventListener('mousedown', handlePlayerTwoTurn);
        playerTwoBoardEl.removeEventListener('mousedown', handlePlayerOneTurn);
    };
};

function disableStartButton() { // function to disable start button. Should run when there is an active game. 
    if (activeGame === true) {
        startButtonEl.disabled = true;
    } else {
        startButtonEl.disabled = false;
    };
};

function checkGameStatus() { // function nested in each players SunkShips function that checks if win condition is met.
    if (playerOneSunkShips.length === 5 || playerTwoSunkShips.length === 5) {
        gameOver = true;
        turnDisplayEl.textContent = `${playerTurn} has sunk all enemy ships and won the game!`;
        return;
    };
};

function handlePlayerOneTurn(event) {     // function that handles a click for Player 1; 
    const clickedElementId = event.target.id;     // checks id of clicked element and assigns it to clickedElementId (which is a number);
    const hitSquare = playerTwoBoard[clickedElementId];
    if (gameOver === true || event.target.classList.contains('hit') || event.target.classList.contains('empty')) {
        return; // if playerTwoBoard[clickedElementID] has a class of .hit || .empty, do nothing.
    } else if (hitSquare !== '') { // check playerOneBoardArray at the index === clickedElementId
        playerOneHits.push(hitSquare);  // if playerTwoBoard[clickedElementID] !== empty string, then push the contained string to playerOneHits;
        event.target.classList.add('hit');  // add the .hit class to the selected element for styling. 
        console.log(`Player One Hits: ${playerOneHits}`)
        gameInfoDisplayEl.textContent = `Player 1 hit one of Player 2's ships!`;
        checkP1SunkShips(event); // check to see if ship sinks and game ends;
        playerTurn = 'Player Two';
    } else {
        event.target.classList.add('empty'); // if the space contains an empty string and has no been clicked before, apply .empty class for styling. 
        playerTurn = 'Player Two';
        gameInfoDisplayEl.textContent = 'Player 1 missed their shot!';
        console.log('Player 1 missed!')
    };
    updateTurnMessage()
    disableOppositePlayerBoard();
};

function checkP1SunkShips(event) { //function that checks if a ships sink condition is met after a hit for P1
    const clickedElementId = event.target.id;
    const hitShip = playerTwoBoard[clickedElementId]; // assign the hit ship to a variable. 
    const hitShipArr = playerOneHits.filter((ship) => ship === hitShip); // check to see if the hit ship meets the sink ship reuirement. 
    if (hitShipArr.length === sinkConditions[hitShip]) {
        playerOneSunkShips.push(hitShip); // if the ship is sunk, add to P1 sunk ships array
        gameInfoDisplayEl.textContent = `Player 1 hit and SUNK Player 2's ${hitShip[0].toUpperCase() + hitShip.substring(1)}!`;
        checkGameStatus(); // check to see if the most recent sink ends the game.
        console.log(`Player One Sunk Ships: ${playerOneSunkShips}`);
        console.log(`Is the Game Over?: ${gameOver}`);
    };
};

function handlePlayerTwoTurn(event) {     // function that handles a click for Player 2;
    const clickedElementId = event.target.id;     // checks id of clicked element and assigns it to clickedElementId (which is a number);
    const hitSquare = playerOneBoard[clickedElementId];
    if (gameOver === true || event.target.classList.contains('hit') || event.target.classList.contains('empty')) {
        return; // if playerOneBoard[clickedElementID] has a class of .hit || .empty, do nothing.
    } else if (hitSquare !== '') { // check playerOneBoardArray at the index === clickedElementId
        playerTwoHits.push(hitSquare);  // if playerOneBoard[clickedElementID] !== empty string, then push the contained string to playerTwoHits;
        event.target.classList.add('hit');     // add the .hit class to the selected element for styling.
        console.log(`Player Two Hits: ${playerTwoHits}`);
        gameInfoDisplayEl.textContent = `Player 2 hit one of Player 1's ships!`;
        checkP2SunkShips(event); // check to see if ship sinks and game ends.
        playerTurn = 'Player One';
    } else {
        event.target.classList.add('empty');  // if the space contains an empty string and has no been clicked before, apply .empty class for styling. 
        playerTurn = 'Player One';
        gameInfoDisplayEl.textContent = 'Player 2 missed their shot!';
        console.log('Player 2 missed!')
    };
    updateTurnMessage();
    disableOppositePlayerBoard();
};

function checkP2SunkShips(event) { //function that checks if a ships sink condition is met after a hit for P2
    const clickedElementId = event.target.id;
    const hitShip = playerOneBoard[clickedElementId]; // assign the hit ship string to a variable. 
    const hitShipArr = playerTwoHits.filter((ship) => ship === hitShip); // check to see if the hit ship meets the sink ship requirement. 
    if (hitShipArr.length === sinkConditions[hitShip]) {
        playerTwoSunkShips.push(hitShip); // if the ship is sunk, add to P1 sunk ships array
        gameInfoDisplayEl.textContent = `Player 2 hit and SUNK Player 1's ${hitShip[0].toUpperCase() + hitShip.substring(1)}!`;
        checkGameStatus(); // check to see if the most recent sink ends the game.
        console.log(`Player 2 Sunk Ships: ${playerTwoSunkShips}`);
        console.log(`Is the Game Over?: ${gameOver}`);
    };
};

function resetGame(event) { // Function that resets the game when the "Restart Button is Pressed"
    console.log('The game has been reset');
    Array.from(document.querySelectorAll('.board-square')).forEach(
        (el) => el.classList.remove('hit')
    );
    Array.from(document.querySelectorAll('.board-square')).forEach(
        (el) => el.classList.remove('empty')
    );
    playerTurn = 'Player One';
    gameOver = false;
    playerOneHits = [];
    playerTwoHits = [];
    playerOneSunkShips = [];
    playerTwoSunkShips = [];
    gameInfoDisplayEl.textContent = 'The game has been restarted!'
    resetPlayerOneBoard();
    resetPlayerTwoBoard();
    updateTurnMessage();
    disableOppositePlayerBoard();
};

function resetPlayerOneBoard() {
    playerOneBoard = [
        '', '', '', '', '', '', '', '', '', '',
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
    placeP1Ships();
};

function resetPlayerTwoBoard() {
    playerTwoBoard = [
        '', '', '', '', '', '', '', '', '', '',
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
    placeP2Ships();
};

/*----------------------------- Event Listeners -----------------------------*/

startButtonEl.addEventListener('click', startGame);
// event listener for start game button
resetButtonEl.addEventListener('click', resetGame);
// event listener needed for reset button


