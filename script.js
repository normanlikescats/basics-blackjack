// Define Player Object
let playerOne = {
  Hand: [],
  Score: 0,
};

// Define Computer Variables
let cpuObj = {
  Hand: [],
  Score: 0,
};

// Define Game Deck
let gameDeck = [];

// Define CPU & Player's Hand (Text)
let playerHandCards = "";
let cpuHandCards = "";

// Define Game Modes
const dealPhase = "dealPhase";
const playerActionPhase = "playerActionPhase";
const cpuActionPhase = "cpuActionPhase";
const compareScorePhase = "compareScorePhase";
let gameMode = dealPhase;

// Define Make Deck Function
const suits = ["♠️", "♥️", "♣️", "♦️"];
let currentSuitCounter = 0;
let currentSuit = suits[0];
let deckOverallCounter = 1;
let deckInnerCounter = 1;

const generateDeck = function () {
  let deck = [];
  while (deckOverallCounter <= 52) {
    //to make 52 cards
    while (deckInnerCounter <= 13) {
      //check inner counter to run through one suit
      let cardName = deckInnerCounter;
      if (deckInnerCounter === 1) {
        cardName = "Ace";
      } else if (deckInnerCounter === 11) {
        cardName = "Jack";
      } else if (deckInnerCounter === 12) {
        cardName = "Queen";
      } else if (deckInnerCounter === 13) {
        cardName = "King";
      }
      let card = {
        name: cardName,
        rank: deckInnerCounter,
        suit: currentSuit,
      };
      // Set rank of picture cards to 10 instead of 11, 12 and 13
      if (
        deckInnerCounter === 11 ||
        deckInnerCounter === 12 ||
        deckInnerCounter === 13
      ) {
        card.rank = 10;
      }
      deck.push(card);
      deckOverallCounter += 1;
      deckInnerCounter += 1;
    }
    deckInnerCounter = 1;
    currentSuitCounter += 1;
    currentSuit = suits[currentSuitCounter];
  }
  return deck;
};

// Random Index Function (for Deck Shuffling)
const getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Define Shuffle Deck Function
const shuffleDeck = function (cardDeck) {
  let currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    let randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    let randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    let currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// Define Draw Card Function
const drawCard = function (shuffledDeck) {
  let drawnCard = shuffledDeck.pop();
  return drawnCard;
};

// Deal Phase Function
const dealPhaseFunction = function () {
  // Generate and Shuffle Deck
  let unshuffledDeck = generateDeck();
  gameDeck = shuffleDeck(unshuffledDeck);
  // Draw Cards
  playerOne.Hand.push(drawCard(gameDeck));
  playerOne.Hand.push(drawCard(gameDeck));
  cpuObj.Hand.push(drawCard(gameDeck));
  cpuObj.Hand.push(drawCard(gameDeck));
  // Write out Player's Hand for Display Purposes
  playerHandCards = `Your cards are: ${playerOne.Hand[0].name} ${playerOne.Hand[0].suit}, ${playerOne.Hand[1].name} ${playerOne.Hand[1].suit}`;
  // Write out CPU's Hand for Display Purposes
  cpuHandCards = `The Computer's cards are: ${cpuObj.Hand[0].name} ${cpuObj.Hand[0].suit}, ${cpuObj.Hand[1].name} ${cpuObj.Hand[1].suit}`;
  gameMode = playerActionPhase;
  outputMessage =
    playerHandCards +
    `<br></br>The Computer's first card is ${cpuObj.Hand[0].name} ${cpuObj.Hand[0].suit}.<br> </br><br> </br>If you would like to Hit, please input 'h'.<br> </br>If you wish to Stand, input 's'`;
  return outputMessage;
};

// Player Action Function
const playerHitOrStand = function (playerAction) {
  let drawPhaseOutput = "";
  if (typeof playerAction === "string") {
    playerInput = playerAction.toLowerCase();
    if (playerInput === "h") {
      playerOne.Hand.push(drawCard(gameDeck));
      playerHandCards =
        playerHandCards +
        `, ${playerOne.Hand[playerOne.Hand.length - 1].name} ${
          playerOne.Hand[playerOne.Hand.length - 1].suit
        }`;
      drawPhaseOutput = `You have drawn ${
        playerOne.Hand[playerOne.Hand.length - 1].name
      } ${
        playerOne.Hand[playerOne.Hand.length - 1].suit
      }. <br></br> ${playerHandCards}. <br></br>If you would like to draw another card, please input 'h'.<br></br>If not, input 's'.`;
    } else if (playerInput === "s") {
      drawPhaseOutput = `You have chosen to Stand. Click submit to see who won!`;
      gameMode = cpuActionPhase;
    } else {
      drawPhaseOutput = `You drew ${playerOne.Hand[0].name} ${playerOne.Hand[0].suit} and ${playerOne.Hand[1].name} ${playerOne.Hand[1].suit}. <br></br>The Computer's first card is ${cpuObj.Hand[0].name} ${cpuObj.Hand[0].suit}.<br> </br><br> </br>Please input either 'h' or 's'.`;
    }
  } else {
    drawPhaseOutput = `You drew ${playerOne.Hand[0].name} ${playerOne.Hand[0].suit} and ${playerOne.Hand[1].name} ${playerOne.Hand[1].suit}. <br></br>The Computer's first card is ${cpuObj.Hand[0].name} ${cpuObj.Hand[0].suit}.<br> </br><br> </br>Please input either 'h' or 's'.`;
  }
  console.log(gameMode);
  return drawPhaseOutput;
};

// CPU Action Function
const cpuHitOrStand = function () {
  let outputValue = "";
  let cpuScoreCounter = 0;
  let cpuAceCounter = 0;
  cpuObj.Hand.sort();
  console.log(cpuObj.Hand);
  // Compute CPU score
  while (cpuScoreCounter < cpuObj.Hand.length) {
    // Handling 2 aces???
    console.log();
    while (
      cpuObj.Hand.length === 2 &&
      cpuObj.Hand[cpuScoreCounter].name === "Ace" &&
      cpuAceCounter === 0
    ) {
      console.log("we ran line 1");
      cpuObj.Hand[cpuScoreCounter].rank = 11;
      cpuObj.Score += cpuObj.Hand[cpuScoreCounter].rank;
      cpuScoreCounter += 1;
      cpuAceCounter += 1;
    }
    console.log("we ran line2");
    console.log("cpu card 2 rank =" + cpuObj.Hand[cpuScoreCounter].rank);
    cpuObj.Score += cpuObj.Hand[cpuScoreCounter].rank;
    cpuScoreCounter += 1;
    console.log(cpuObj.Score);
  }
  // While  CPU Score < 17, hit
  while (cpuObj.Score < 17) {
    cpuObj.Hand.push(drawCard(gameDeck));
    cpuObj.Score += cpuObj.Hand[cpuObj.Hand.length - 1].rank;
    cpuHandCards =
      cpuHandCards +
      `, ${cpuObj.Hand[cpuObj.Hand.length - 1].name} ${
        cpuObj.Hand[cpuObj.Hand.length - 1].suit
      }`;
  }
  // Once CPU Score > 17, enter evaluation mode
  gameMode = compareScorePhase;
  console.log(gameMode);
  outputValue = compareScore();
  return outputValue;
};

// Define Comparison Function
const compareScore = function () {
  console.log("line 160" + " compare score run");
  let myOutputValue = "";
  let playerAceCounter = 0;
  // Sort Player's Hand to Find Aces
  playerOne.Hand.sort().reverse();
  // Iterate through Player's Hand to compute score
  let playerScoreCounter = 0;
  while (playerScoreCounter < playerOne.Hand.length) {
    if (
      playerOne.Hand[playerOne.Hand.length - 1].name === "Ace" &&
      playerAceCounter === 0
    ) {
      playerOne.Hand[playerOne.Hand.length - 1].rank = 11;
    }
    playerOne.Score += playerOne.Hand[playerScoreCounter].rank;
    playerScoreCounter += 1;
  }
  console.log("player score: " + playerOne.Score);
  // Base Message to display both hands
  let baseMessage = `${cpuHandCards} (${cpuObj.Score} points)<br></br> ${playerHandCards} (${playerOne.Score} points)<br></br>`;
  console.log(baseMessage);
  // Check for > 21 points
  if (playerOne.Score > 21 && cpuObj.Score > 21) {
    myOutputValue =
      baseMessage + `Both player and dealer are bust! It's a tie!`;
  } else if (playerOne.Score > 21 && cpuObj.Score < 22) {
    myOutputValue =
      baseMessage +
      `You are bust! You lost! <br></br> Hit Submit to go for another round!`;
  } else if (playerOne.Score < 22 && cpuObj.Score > 21) {
    myOutputValue =
      baseMessage +
      `The dealer is bust! You won! <br></br> Hit Submit to go for another round!`;
  } else {
    if (playerOne.Score > cpuObj.Score) {
      // Player wins
      myOutputValue =
        baseMessage +
        "You won!" +
        `<br></br> Hit Submit to go for another round!`;
    } else if (playerOne.Score < cpuObj.Score) {
      // Player loses
      myOutputValue =
        baseMessage +
        "You lost!" +
        `<br></br> Hit Submit to go for another round!`;
    } else {
      // Same value, tied
      myOutputValue =
        baseMessage +
        "It's a tie!" +
        `<br></br> Hit Submit to go for another round!`;
    }
  }
  console.log(myOutputValue);
  gameMode = dealPhase;
  // reset hands
  playerOne.Hand = [];
  cpuObj.Hand = [];
  return myOutputValue;
};

// Define main function
const main = function (input) {
  let outputMessage = "";
  console.log(gameMode);
  if (gameMode === dealPhase) {
    outputMessage = dealPhaseFunction();
    console.log(cpuHandCards);
    return outputMessage;
  } else if (gameMode === playerActionPhase) {
    outputMessage = playerHitOrStand(input);
    return outputMessage;
  } else if (gameMode === cpuActionPhase) {
    outputMessage = cpuHitOrStand();
    console.log(gameMode);
    return outputMessage;
  }
};

// Variables for testing
/*.
.
.
.
.


aceObject = {
  name: "Ace",
  rank: 1,
  suit: "♠️",
};

aceObject2 = {
  name: "Ace",
  rank: 1,
  suit: "♣️",
};
*/
