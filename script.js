// Define Player Object
let playerOne = {
  Hand: [],
  Score: 0,
  Bankroll: 0,
  Bet: 0,
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
const nameInputPhase = "nameInputPhase";
const bankrollPhase = "bankrollPhase";
const betPhase = "betPhase";
const dealPhase = "dealPhase";
const playerActionPhase = "playerActionPhase";
const cpuActionPhase = "cpuActionPhase";
const compareScorePhase = "compareScorePhase";
const loserPhase = "loserPhase";
let gameMode = nameInputPhase;

// Define Make Deck Function
const suits = ["♠️", "♥️", "♣️", "♦️"];
let currentSuitCounter = 0;
let currentSuit = suits[0];
let deckOverallCounter = 1;
let deckInnerCounter = 1;

// Name Input Function
const nameInput = function (input) {
  let outputMessage = "";
  playerOne.name = input;
  gameMode = bankrollPhase;
  outputMessage = `Welcome ${playerOne.name}, let's play Blackjack! <br></br> What will your initial bankroll be?`;
  return outputMessage;
};

// Bankroll Phase Function
let roundCounter = 1;
const bankrollInitialInput = function (input) {
  console.log(roundCounter);
  let outputMessage = "";
  let playerInput = Number(input);
  if (isNaN(playerInput)) {
    outputMessage = `Please insert a number for your initial bankroll.`;
  } else {
    if (roundCounter === 1) {
      // Initial Bankroll for Round 1
      if (playerInput === 0) {
        outputMessage = `Please insert a number larger than 0.`;
      } else {
        playerOne.Bankroll = playerInput;
        gameMode = betPhase;
        outputMessage = `Initial Bankroll: $${playerOne.Bankroll} <br></br> Please place your bet for the first round.`;
        roundCounter += 1;
      }
    } else {
      // For bet placing on Round 2 onwards
      outputMessage = `Current Bankroll: $${playerOne.Bankroll} <br></br> Please place your bet for the first round.`;
      gameMode = betPhase;
    }
  }
  return outputMessage;
};

// Bet Phase Function
const betInput = function (input) {
  let outputMessage = "";
  if (isNaN(Number(input))) {
    outputMessage = `Please insert a number for your initial bet.`;
  } else {
    if (Number(input) > playerOne.Bankroll) {
      outputMessage = `Your bet cannot be larger than your initial bankroll. Please re-enter your bet for the first round. Your initial bankroll is $${playerOne.Bankroll}.`;
    } else {
      playerOne.Bet = Number(input);
      gameMode = dealPhase;
      if (playerOne.Bet === playerOne.Bankroll) {
        outputMessage = `Bet Placed: $${playerOne.Bet} <br></br> 🔥🔥🔥GG ALL IN! 🔥🔥🔥<br></br>Let's play Blackjack! Hit Submit to Deal!`;
      } else {
        outputMessage = `Bet Placed: $${playerOne.Bet} <br></br> Let's play Blackjack! Hit Submit to Deal!`;
      }
    }
  }
  return outputMessage;
};

// Generate Unshuffled Deck Function
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
  // Reset counters for subsequent round of dealing
  deckInnerCounter = 1;
  deckOverallCounter = 1;
  currentSuitCounter = 0;
  currentSuit = suits[currentSuitCounter];
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
  console.log(gameMode);
  return outputMessage;
};

// Player Hit Function
const playerHitAction = function () {
  console.log(playerOne.Hand);
  let drawPhaseOutput = "";
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
  }. <br></br> ${playerHandCards}. <br></br>If you would like to draw another card, please press 'Hit' again.`;
  var output = document.querySelector("#output-div");
  output.innerHTML = drawPhaseOutput;
};

// Player Stand Function
const playerStandAction = function () {
  console.log("hi");
  let drawPhaseOutput = "";
  drawPhaseOutput = `You have chosen to Stand. Click submit to see who won!`;
  gameMode = cpuActionPhase;
  var output = document.querySelector("#output-div");
  output.innerHTML = drawPhaseOutput;
  var hitButton = document.querySelector("#hit-button");
  hitButton = hitButton.remove();
  var standButton = document.querySelector("#stand-button");
  standButton.remove();
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
    // Handling 2 aces
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
    console.log(cpuObj.Hand);
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
  // Check for > 21 points
  if (playerOne.Score > 21 && cpuObj.Score > 21) {
    myOutputValue =
      baseMessage +
      `Both player and dealer are bust! It's a tie!<br></br>Your remaining bankroll is $${playerOne.Bankroll}.`;
  } else if (playerOne.Score > 21 && cpuObj.Score < 22) {
    playerOne.Bankroll = playerOne.Bankroll - playerOne.Bet;
    myOutputValue =
      baseMessage +
      `You are bust! You lost! <br></br>Your remaining bankroll is $${playerOne.Bankroll}.`;
  } else if (playerOne.Score < 22 && cpuObj.Score > 21) {
    playerOne.Bankroll = playerOne.Bankroll + playerOne.Bet;
    myOutputValue =
      baseMessage +
      `The dealer is bust! You won! <br></br>Your remaining bankroll is $${playerOne.Bankroll}.`;
  } else {
    if (playerOne.Score > cpuObj.Score) {
      // Player wins
      playerOne.Bankroll = playerOne.Bankroll + playerOne.Bet;
      myOutputValue =
        baseMessage +
        `You won!<br></br>Your remaining bankroll is $${playerOne.Bankroll}.`;
    } else if (playerOne.Score < cpuObj.Score) {
      playerOne.Bankroll = playerOne.Bankroll - playerOne.Bet;
      // Player loses
      myOutputValue =
        baseMessage +
        `You lost!<br></br>Your remaining bankroll is $${playerOne.Bankroll}.`;
    } else {
      // Same value, tied
      myOutputValue =
        baseMessage +
        `It's a tie! <br></br>Your remaining bankroll is $${playerOne.Bankroll}.`;
    }
  }
  if (playerOne.Bankroll === 0) {
    myOutputValue =
      myOutputValue + `<br></br>Your bankroll is now $0. Thanks for playing :)`;
    gameMode = loserPhase;
  } else {
    myOutputValue =
      myOutputValue + `<br></br>Hit Submit to go for another round!`;
    gameMode = bankrollPhase;
  }
  console.log(myOutputValue);
  // Reset game for another round
  playerOne.Hand = [];
  cpuObj.Hand = [];
  playerOne.Score = 0;
  cpuObj.Score = 0;
  playerOne.Bet = 0;
  return myOutputValue;
};

// Create GIF element
let loserCounter = 1;
const gifCreate = function () {
  let gifElement = document.createElement("img");
  gifElement.src =
    "https://media.tenor.com/mZZoOtDcouoAAAAM/stop-it-get-some-help.gif";
  gifElement.setAttribute("id", "gif1");
  let divElement = document.getElementById("container");
  divElement.appendChild(gifElement);
};

// Create 2nd GIF Element
let gifCounter = 1;
const gifCreatev2 = function () {
  if (gifCounter === 1) {
    let gifElement = document.getElementById("gif1");
    gifElement.remove();
  }
  let gifElementv2 = document.createElement("img");
  gifElementv2.src =
    "https://preview.redd.it/xootmxfxet181.gif?s=a6b98cf0b3a8aa5acadf36df08ff25e537afaa4b";
  let divElement = document.getElementById("container");
  divElement.appendChild(gifElementv2);
  gifCounter += 1;
};

// Define main function
const main = function (input) {
  let outputMessage = "";
  console.log(gameMode);
  if (gameMode === nameInputPhase) {
    outputMessage = nameInput(input);
    console.log(outputMessage);
    // To delete the initial instructions to start the game once name is input :)
    let openingTextElement = document.getElementById("Enter-your-name-text");
    openingTextElement.remove();
    return outputMessage;
  } else if (gameMode === bankrollPhase) {
    outputMessage = bankrollInitialInput(input);
    return outputMessage;
  } else if (gameMode === betPhase) {
    outputMessage = betInput(input);
    return outputMessage;
  } else if (gameMode === dealPhase) {
    outputMessage = dealPhaseFunction();
    // Create button for Hit or Stand
    var hitButton = document.createElement("button");
    hitButton.setAttribute("id", "hit-button");
    hitButton.innerText = "Hit";
    let outputTextTag = document.getElementById("output-text");
    container.insertBefore(hitButton, outputTextTag);
    var standButton = document.createElement("button");
    standButton.setAttribute("id", "stand-button");
    standButton.innerText = "Stand";
    container.insertBefore(standButton, outputTextTag);
    hitButton.addEventListener("click", playerHitAction);
    standButton.addEventListener("click", playerStandAction);
    console.log(cpuHandCards);
    return outputMessage;
  } else if (gameMode === playerActionPhase) {
    outputMessage = `${playerHandCards}<br></br>Please use either the Hit or Stand buttons to choose your action.`;
    return outputMessage;
  } else if (gameMode === cpuActionPhase) {
    outputMessage = cpuHitOrStand();
    console.log(gameMode);
    return outputMessage;
  } else if ((gameMode = loserPhase)) {
    outputMessage = `You're just not that good, please stop gambling.`;
    if (loserCounter === 1) {
      console.log(loserCounter);
      gifCreate();
      loserCounter += 1;
    } else {
      outputMessage = `I won't say it twice.`;
      gifCreatev2();
    }
    return outputMessage;
  }
};
