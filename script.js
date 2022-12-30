// Define main function
const main = function () {
  let outputMessage = "";
  // Generate and Shuffle Deck
  let unshuffledDeck = generateDeck();
  let gameDeck = shuffleDeck(unshuffledDeck);
  // Draw Cards
  playerCardOne = drawCard(gameDeck);
  playerCardTwo = drawCard(gameDeck);
  cpuCardOne = drawCard(gameDeck);
  cpuCardTwo = drawCard(gameDeck);
  outputMessage = compareScore();
  return outputMessage;
};

// Define Player Variables
let playerCardOne = "";
let playerCardTwo = "";
let playerScore = "";

// Define Computer Variables
let cpuCardOne = "";
let cpuCardTwo = "";
let cpuScore = "";

// Define Game Mode

// Define Make Deck Function
const suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
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
        console.log(cardName);
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

// Define Comparison Function
const compareScore = function () {
  let myOutputValue = "";
  playerScore = playerCardOne.rank + playerCardTwo.rank;
  cpuScore = cpuCardOne.rank + cpuCardTwo.rank;
  console.log(playerScore);
  console.log(cpuScore);
  let baseMessage = `The Computer drew ${cpuCardOne.name} of ${cpuCardOne.suit} and ${cpuCardTwo.name} of ${cpuCardTwo.suit}. <br> </br> You drew ${playerCardOne.name} of ${playerCardOne.suit} and ${playerCardTwo.name} of ${playerCardTwo.suit}. <br></br>`;
  if (playerScore > cpuScore) {
    myOutputValue = baseMessage + "You won!";
  } else if (playerScore < cpuScore) {
    myOutputValue = baseMessage + "You lost!";
  } else {
    myOutputValue = baseMessage + "It's a tie!";
  }
  return myOutputValue;
};
