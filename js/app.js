

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
const boardSquareEls = document.querySelectorAll('.board-square');
const p1ShipGraveyardEl = document.querySelector('#p1-ship-graveyard');
const p2ShipGraveyardEl = document.querySelector('#p2-ship-graveyard');
const graveyardShipEls = document.querySelectorAll('.graveyard-ship');

/*-------------------------------- Setup Functions --------------------------------*/

function startGame() { // when start button is clicked, places 5 ships randomly on both boards and begins the games
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
    console.log(playerOneBoard); //console.log kept in for presentation.
    console.log(playerTwoBoard); //console.log kept in for presentation.
};

function createBoardOne() { //function that creates P1's board.
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
    for (let i = 0; i < 100; i++) { // This loops creates the grid for P1
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('board-square');
        boardSquare.id = i;
        playerOneBoardEl.append(boardSquare);
    };
    placeP1Ships();
};

function placeP1Ships() { // This functions decides whether to place a ship vertically or horizonally and the places the ship on P1s board.
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

function placeP1ShipVertically(ship) { //function that places a ship vertically on P1s board.
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
        };
    };
};

function placeP1ShipHorizonally(ship) { //function that places a ship horizonally on P1s board.
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
        };
    };
};

function checkP1VerticalValidity(ship, shipStartingPoint) { // runs in vertical placement function to ensure it is a valid space. 
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + (shipLength * 10)); i += 10) {
        if (playerOneBoard[i] !== '') {
            return false;
        };
    };
};

function checkP1HorizontalValidity(ship, shipStartingPoint) { // runs in horizonal placement function to ensure it is a valid space. 
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + shipLength); i++) {
        if (playerOneBoard[i] !== '') {
            return false;
        };
    };
};

function createBoardTwo() { // function creates P2s board
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

    for (let i = 0; i < 100; i++) { // this loop creates P2s grid.
        const boardSquare = document.createElement('div');
        boardSquare.classList.add('board-square');
        boardSquare.id = i;
        playerTwoBoardEl.append(boardSquare);
    };

    placeP2Ships();
};

function placeP2Ships() { // This functions decides whether to place a ship vertically or horizonally and the places the ship on P2s board.
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

function placeP2ShipVertically(ship) { //function that places a ship vertically on P2s board.
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
        };
    };
};


function placeP2ShipHorizonally(ship) { //function that places a ship horizonally on P2s board.
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
        };
    };
};

function checkP2VerticalValidity(ship, shipStartingPoint) { // runs in vertical placement function to ensure it is a valid space. 
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + (shipLength * 10)); i += 10) {
        if (playerTwoBoard[i] !== '') {
            return false;
        };
    };
};

function checkP2HorizontalValidity(ship, shipStartingPoint) { // runs in horizonal placement function to ensure it is a valid space. 
    let shipLength = sinkConditions[ship];
    for (let i = shipStartingPoint; i < (shipStartingPoint + shipLength); i++) {
        if (playerTwoBoard[i] !== '') {
            return false;
        };
    };
};

function updateTurnMessage() { // function to update turn display based on game state.
    if (gameOver === false) {
        return turnDisplayEl.textContent = `It's ${playerTurn}'s turn.`;
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

/*-------------------------------- P1 Turn Functions --------------------------------*/

function handlePlayerOneTurn(event) {     // function that handles a click for Player 1; 
    const clickedElementId = event.target.id;
    const hitSquare = playerTwoBoard[clickedElementId];
    if (gameOver === true || event.target.classList.contains('hit') || event.target.classList.contains('empty')) {
        return; // if playerTwoBoard[clickedElementID] has a class of .hit || .empty, do nothing.
    } else if (hitSquare !== '') { // check playerOneBoardArray at the index === clickedElementId
        playerOneHits.push(hitSquare);
        event.target.classList.add('hit');  // add the .hit class to the selected element for styling. 
        console.log(`Player One Hits: ${playerOneHits}`) //console.log kept in for presentation.
        gameInfoDisplayEl.textContent = `Player 1 hit one of Player 2's ships!`;
        checkP1SunkShips(event); // check to see if ship sinks and game ends;
        return;
    } else {
        event.target.classList.add('empty'); // if the space contains an empty string and has not been clicked before, apply .empty class for styling. 
        playerTurn = 'Player Two';
        gameInfoDisplayEl.textContent = 'Player 1 missed their shot!';
    };
    updateTurnMessage()
    disableOppositePlayerBoard();
};

function checkP1SunkShips(event) { //function that checks if a ships sink condition is met after a hit for P1
    const clickedElementId = event.target.id;
    const hitShip = playerTwoBoard[clickedElementId]; // assign the hit ship to a variable. 
    const hitShipArr = playerOneHits.filter((ship) => ship === hitShip); // check to see if the hit ship meets the sink ship requirement. 
    if (hitShipArr.length === sinkConditions[hitShip]) {
        playerOneSunkShips.push(hitShip); // if the ship is sunk, add to P1 sunk ships array
        gameInfoDisplayEl.textContent = `Player 1 hit and SUNK Player 2's ${hitShip[0].toUpperCase() + hitShip.substring(1)}!`;
        updateP2Graveyard(hitShip);
        checkGameStatus(); // check to see if the most recent sink ends the game.
        console.log(`Player One Sunk Ships: ${playerOneSunkShips}`); //console.log kept in for presentation.
        console.log(`Is the Game Over?: ${gameOver}`); //console.log kept in for presentation.
    };
};

function updateP2Graveyard(hitShip) { //updates styling for P2s graveyard when a ship is sunk.
    for (const child of p2ShipGraveyardEl.children) {
        if (child.classList.contains(hitShip)) {
            child.classList.remove("unsunk-ship");
        };
    };
};

/*-------------------------------- P2 Turn Functions --------------------------------*/

function handlePlayerTwoTurn(event) {     // function that handles a click for Player 2;
    const clickedElementId = event.target.id;
    const hitSquare = playerOneBoard[clickedElementId];
    if (gameOver === true || event.target.classList.contains('hit') || event.target.classList.contains('empty')) {
        return; // if playerOneBoard[clickedElementID] has a class of .hit || .empty, do nothing.
    } else if (hitSquare !== '') { // check playerOneBoardArray at the index === clickedElementId
        playerTwoHits.push(hitSquare);
        event.target.classList.add('hit');     // add the .hit class to the selected element for styling.
        console.log(`Player Two Hits: ${playerTwoHits}`); //console.log kept in for presentation.
        gameInfoDisplayEl.textContent = `Player 2 hit one of Player 1's ships!`;
        checkP2SunkShips(event); // check to see if ship sinks and game ends.
        return;
    } else {
        event.target.classList.add('empty');  // if the space contains an empty string and has not been clicked before, apply .empty class for styling. 
        playerTurn = 'Player One';
        gameInfoDisplayEl.textContent = 'Player 2 missed their shot!';
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
        updateP1Graveyard(hitShip);
        checkGameStatus(); // check to see if the most recent sink ends the game.
        console.log(`Player 2 Sunk Ships: ${playerTwoSunkShips}`); //console.log kept in for presentation.
        console.log(`Is the Game Over?: ${gameOver}`); //console.log kept in for presentation.
    };
};

function updateP1Graveyard(hitShip) { //updates styling for P1s graveyard when a ship is sunk.
    for (const child of p1ShipGraveyardEl.children) {
        if (child.classList.contains(hitShip)) {
            child.classList.remove("unsunk-ship");
        };
    };
};

/*-------------------------------- Reset Game Functions --------------------------------*/

function resetGame(event) { // Function that resets the game when the "Restart Button is Pressed"
    Array.from(document.querySelectorAll('.board-square')).forEach( // removes styling for hit ships
        (el) => el.classList.remove('hit')
    );
    Array.from(document.querySelectorAll('.board-square')).forEach( // removes styling for missed squares.
        (el) => el.classList.remove('empty')
    );
    playerTurn = 'Player One';
    gameOver = false;
    playerOneHits = [];
    playerTwoHits = [];
    playerOneSunkShips = [];
    playerTwoSunkShips = [];
    gameInfoDisplayEl.textContent = 'The game has been restarted!'
    resetGraveyards(); // resets styling for graveyards
    resetPlayerOneBoard();
    resetPlayerTwoBoard();
    updateTurnMessage();
    disableOppositePlayerBoard();
    console.log(playerOneBoard); //console.log kept in for presentation.
    console.log(playerTwoBoard); //console.log kept in for presentation.
};

function resetPlayerOneBoard() { // function to put in reset function to reset P1s board
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

function resetPlayerTwoBoard() { // function to put in reset function to reset P2s board
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

function resetGraveyards() { // placed in reset function to reset styling on graveyards
    Array.from(graveyardShipEls).forEach((el) => {
        if (el.classList.contains("unsunk-ship")) {
        } else {
            el.classList.add("unsunk-ship");
        };
    });
};

/*----------------------------- Event Listeners -----------------------------*/

startButtonEl.addEventListener('click', startGame); // event listener for start game button
resetButtonEl.addEventListener('click', resetGame); // event listener needed for reset button


