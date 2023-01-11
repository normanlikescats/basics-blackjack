// Define Player Array: To Hold All Players
let playerArray = [];
let numberOfPlayers = 0;

// Fill Player Array Function
let createPlayerObj = function (input) {
  let playerInput = Math.round(Number(input));
  if (isNaN(playerInput)) {
    outputMessage = `Please insert a number for the number of players.`;
  } else if (playerInput <= 0) {
    outputMessage = `Please insert a number larger than 0 for the number of players.`;
  } else {
    numberOfPlayers = playerInput;
    // For Loop to create a player object for every player
    for (let counter = 0; counter < numberOfPlayers; counter += 1) {
      playerArray[counter] = {
        Name: "",
        Hand: [],
        Score: 0,
        Bankroll: 0,
        Bet: 0,
        HandText: "",
        Blackjack: false,
      };
    }
    outputMessage = `You have selected ${numberOfPlayers} player(s). Let's introduce ourselves, shall we?<br></br> Player 1, what is your name?`;
    // To delete the initial instructions to start the game once number of players is input :)
    let openingTextElement = document.getElementById("Enter-your-name-text");
    openingTextElement.remove();
    gameMode = nameInputPhase;
  }
  return outputMessage;
};

// Define Computer Variables
let cpuObj = {
  Hand: [],
  Score: 0,
  Blackjack: false,
};

// Define Game Deck
let gameDeck = [];

// Define CPU & Player's Hand (Text)
let playerHandCards = "";
let cpuHandCards = "";

// Define Game Modes
const playerNumPhase = "playerNumPhase";
const nameInputPhase = "nameInputPhase";
const bankrollPhase = "bankrollPhase";
const betPhase = "betPhase";
const dealPhase = "dealPhase";
const playerActionPhase = "playerActionPhase";
const cpuActionPhase = "cpuActionPhase";
const compareScorePhase = "compareScorePhase";
const loserPhase = "loserPhase";
let gameMode = playerNumPhase;

// Define Make Deck Function
const suits = ["♠️", "♥️", "♣️", "♦️"];
let currentSuitCounter = 0;
let currentSuit = suits[0];
let deckOverallCounter = 1;
let deckInnerCounter = 1;

// Name Input Function
let nameCounter = 0;
const nameInput = function (input, nameCounter) {
  let outputMessage = "";
  playerArray[nameCounter].Name = input;
  // If singleplayer
  if (numberOfPlayers === 1) {
    outputMessage = `Welcome ${playerArray[nameCounter].Name}, let's play Blackjack!<br></br> Enter your initial bankroll!`;
    gameMode = bankrollPhase;
  }
  // If multiplayer
  if (nameCounter <= numberOfPlayers - 1) {
    outputMessage = `Welcome ${playerArray[nameCounter].Name}, let's play Blackjack!`;
  }
  if (nameCounter === numberOfPlayers - 1) {
    outputMessage += `<br></br> Let's decide our bankrolls. ${playerArray[0].Name}, what will your initial bankroll be?`;
    gameMode = bankrollPhase;
  } else if (nameCounter < numberOfPlayers - 1) {
    outputMessage += `<br></br> Player ${nameCounter + 2}, what's your name?`;
  }
  return outputMessage;
};

// Bankroll Phase Function
let bankrollCounter = 0;
let bankrollError = false;
let roundCounter = 1;
const bankrollInitialInput = function (input, bankrollCounter) {
  let outputMessage = "";
  let playerInput = Number(input);
  if (isNaN(playerInput)) {
    outputMessage = `Please insert a number for your initial bankroll.`;
    bankrollError = true;
  } else if (bankrollCounter < numberOfPlayers - 1) {
    if (roundCounter === 1) {
      // Initial Bankroll for Round 1
      if (playerInput <= 0) {
        outputMessage = `Please insert a number larger than 0.`;
      } else {
        playerArray[bankrollCounter].Bankroll = playerInput;
        outputMessage = `Hi ${
          playerArray[bankrollCounter].Name
        }, your initial Bankroll is: $${
          playerArray[bankrollCounter].Bankroll
        } <br></br> ${
          playerArray[bankrollCounter + 1].Name
        }, please enter your bankroll.`;
      }
    } else {
      // For bet placing on Round 2 onwards
      outputMessage = `${playerArray[bankrollCounter].Name}, your current Bankroll is: $${playerArray[bankrollCounter].Bankroll} <br></br> Please place your bet for the next round.`;
      gameMode = betPhase;
    }
  } else {
    if (roundCounter === 1) {
      // Initial Bankroll for Round 1
      if (playerInput <= 0) {
        outputMessage = `Please insert a number larger than 0.`;
        bankrollError = true;
      } else {
        playerArray[bankrollCounter].Bankroll = playerInput;
        outputMessage = `Hi ${playerArray[bankrollCounter].Name}, your initial Bankroll is: $${playerArray[bankrollCounter].Bankroll} <br></br> Let's place our bets! <br></br> ${playerArray[0].Name}, please key in your bet!`;
        gameMode = betPhase;
      }
    } else {
      // For bet placing on Round 2 onwards
      outputMessage = `${playerArray[0].Name}, your current Bankroll is: $${playerArray[0].Bankroll} <br></br> Please place your bet for the next round.`;
      gameMode = betPhase;
    }
  }
  return outputMessage;
};

// Bet Phase Function
let betCounter = 0;
let betError = false;
const betInput = function (input, betCounter) {
  let outputMessage = "";
  if (isNaN(Number(input))) {
    // Check if number
    outputMessage = `Please insert a number for your initial bet.`;
    betError = true;
  } else if (Number(input) > playerArray[betCounter].Bankroll) {
    // Check if bet < bankroll
    outputMessage = `Your bet cannot be larger than your initial bankroll. Please re-enter your bet for the first round. Your initial bankroll is $${playerArray[betCounter].Bankroll}.`;
    betError = true;
  } else if (Number(input) <= 0) {
    // Check if bet > 0
    outputMessage = `Please enter a number larger than 0.`;
    betError = true;
  } else if (betCounter < numberOfPlayers - 1) {
    playerArray[betCounter].Bet = Number(input);
    // Assign bets for all players
    if (playerArray[betCounter].Bet === playerArray[betCounter].Bankroll) {
      // if all-in
      outputMessage = `${playerArray[betCounter].Name}'s Bet: $${
        playerArray[betCounter].Bet
      } <br></br> 🔥🔥🔥GG ALL IN! 🔥🔥🔥<br></br> ${
        playerArray[betCounter + 1].Name
      }, please enter your bet!`;
    } else {
      // normal bet size
      outputMessage = `${playerArray[betCounter].Name}'s Bet: $${
        playerArray[betCounter].Bet
      } <br></br> ${playerArray[betCounter + 1].Name}, please enter your bet!`;
    }
  } else {
    playerArray[betCounter].Bet = Number(input);
    // for last player
    if (playerArray[betCounter].Bet === playerArray[betCounter].Bankroll) {
      // if all-in
      outputMessage = `${playerArray[betCounter].Name}'s Bet: $${playerArray[betCounter].Bet} <br></br> 🔥🔥🔥GG ALL IN! 🔥🔥🔥<br></br>Let's play Blackjack! Hit Submit to Deal!`;
      gameMode = dealPhase;
    } else {
      // normal bet size
      outputMessage = `${playerArray[betCounter].Name}'s Bet: $${playerArray[betCounter].Bet} <br></br> Let's play Blackjack! Hit Submit to Deal!`;
      gameMode = dealPhase;
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
  cpuObj.Hand.push(drawCard(gameDeck));
  cpuObj.Hand.push(drawCard(gameDeck));
  // Write out CPU's Hand for Display Purposes
  cpuHandCards = `The Computer's cards are: ${cpuObj.Hand[0].name} ${cpuObj.Hand[0].suit}, ${cpuObj.Hand[1].name} ${cpuObj.Hand[1].suit}`;
  for (let counter = 0; counter < numberOfPlayers; counter += 1) {
    // Iterate through all players and deal 2 cards each
    playerArray[counter].Hand.push(drawCard(gameDeck));
    playerArray[counter].Hand.push(drawCard(gameDeck));
    // Write out Player's Hand for Display Purposes
    playerArray[
      counter
    ].HandText = `${playerArray[counter].Name}, your cards are: ${playerArray[counter].Hand[0].name} ${playerArray[counter].Hand[0].suit}, ${playerArray[counter].Hand[1].name} ${playerArray[counter].Hand[1].suit}`;
  }
  // Move to Action Phase once all cards are dealt
  gameMode = playerActionPhase;
  outputMessage =
    `It's ${playerArray[0].Name}'s turn! <br></br>` +
    playerArray[0].HandText +
    `<br></br>The Computer's first card is ${cpuObj.Hand[0].name} ${cpuObj.Hand[0].suit}.<br> </br><br> </br>If you would like to Hit, please press 'Hit'.<br> </br>If you wish to Stand, please press 'Stand'.`;
  return outputMessage;
};

// Create Buttons for Hit or Stand
const createButtons = function () {
  // Create button for Hit
  let hitButton = document.createElement("button");
  hitButton.setAttribute("id", "hit-button");
  hitButton.innerText = "Hit";
  let outputTextTag = document.getElementById("output-text");
  container.insertBefore(hitButton, outputTextTag);
  // Create button for Stand
  let standButton = document.createElement("button");
  standButton.setAttribute("id", "stand-button");
  standButton.innerText = "Stand";
  container.insertBefore(standButton, outputTextTag);
  // Assign Functions to Buttons on Click
  hitButton.addEventListener("click", playerHitAction);
  standButton.addEventListener("click", playerStandAction);
};

// CPU Blackjack Function
const checkCpuBlackjack = function () {
  // Sort CPU Hand to check Blackjack conditions easily
  cpuObj.Hand.sort(function (a, b) {
    return a.rank - b.rank;
  });
  // Check if CPU first card is Ace
  if (cpuObj.Hand[0].name === "Ace") {
    // Check if second card is any of the rank 10 cards
    if (cpuObj.Hand[1].rank === 10) {
      cpuObj.Blackjack = true;
    }
  }
};

// Player Blackjack Function
const checkPlayerBlackjack = function () {
  for (let counter = 0; counter < numberOfPlayers; counter += 1) {
    console.log(counter);
    // Sort Player Hand to check Blackjack conditions easily
    playerArray[counter].Hand.sort(function (a, b) {
      return a.rank - b.rank;
    });
    // Check if Player first card is Ace
    if (playerArray[counter].Hand[0].name === "Ace") {
      if (
        // Check if second card is any of the rank 10 cards
        playerArray[counter].Hand[1].rank === 10
      ) {
        playerArray[counter].Blackjack = true;
      }
    }
    console.log(`Blackjack?` + playerArray[counter].Blackjack);
  }
};

// Player Blackjack Message Function
let defeatedPlayersCount = 0;
const messageBlackjack = function (counter) {
  if (playerArray[counter].Blackjack === true && cpuObj.Blackjack === false) {
    // Player Blackjack only. Player wins!
    playerArray[counter].Bankroll += playerArray[counter].Bet * 1.5;
    outputMessage = `${playerArray[counter].HandText}<br></br>${cpuHandCards}<br></br>You got B L A C K J A C K! You won 1.5x your original bet!<br></br>Your current bankroll is $${playerArray[counter].Bankroll}`;
    actionCounter += 1;
  } else if (
    playerArray[counter].Blackjack === true &&
    cpuObj.Blackjack === true
  ) {
    // Both player and dealer Blackjack. Tie!
    outputMessage = `${playerArray[counter].HandText}<br></br>${cpuHandCards}<br></br>Both the dealer and player got B L A C K J A C K! It's a tie!<br></br>Your current bankroll is $${playerArray[counter].Bankroll}`;
    actionCounter += 1;
  } else if (
    playerArray[counter].Blackjack === false &&
    cpuObj.Blackjack === true
  ) {
    // CPU Blackjack only. CPU wins!
    playerArray[counter].Bankroll -= playerArray[counter].Bet;
    outputMessage = `${playerArray[counter].HandText}<br></br>${cpuHandCards}<br></br>The computer got B L A C K J A C K! You lost!`;
    actionCounter += 1;
    defeatedPlayersCount += 1;
  }
  // for Blackjack on last player
  if (counter < numberOfPlayers - 1) {
    outputMessage =
      outputMessage +
      `<br></br> Hit Submit for ${playerArray[counter + 1].Name}'s turn!`;
  } else if (counter === numberOfPlayers - 1) {
    if (defeatedPlayersCount === numberOfPlayers) {
      outputMessage =
        outputMessage +
        `<br></br> All players DEFEATED. Hit Submit to start another round of Blackjack!`;
    } else {
      outputMessage =
        outputMessage +
        `<br></br> Hit Submit for to see the outcomes of the remaining hands!`;
      gameMode = cpuActionPhase;
    }
  }
  return outputMessage;
};

/*if (playerArray[counter].Bankroll === 0) {
  outputMessage =
    outputMessage + `<br></br>Your bankroll is now $0. Thanks for playing :)`;
  gameMode = loserPhase;
  removeButtons();
  playerArray[counter].Hand = [];
  playerArray[counter].Score = 0;
  playerArray[counter].Bet = 0;
} else {
  outputMessage =
    outputMessage +
    `Your current bankroll is $${playerOne.Bankroll} <br></br>Hit Submit to go for another round!`;
  gameMode = bankrollPhase;
  removeButtons();
  playerArray[counter].Hand = [];
  playerArray[counter].Score = 0;
  playerArray[counter].Bet = 0;
}*/

// Player Hit Function
let actionCounter = 0;
const playerHitAction = function () {
  let drawPhaseOutput = "";
  playerArray[actionCounter].Hand.push(drawCard(gameDeck));
  playerArray[actionCounter].HandText =
    playerArray[actionCounter].HandText +
    `, ${
      playerArray[actionCounter].Hand[
        playerArray[actionCounter].Hand.length - 1
      ].name
    } ${
      playerArray[actionCounter].Hand[
        playerArray[actionCounter].Hand.length - 1
      ].suit
    }`;
  drawPhaseOutput = `${playerArray[actionCounter].Name}, you have drawn ${
    playerArray[actionCounter].Hand[playerArray[actionCounter].Hand.length - 1]
      .name
  } ${
    playerArray[actionCounter].Hand[playerArray[actionCounter].Hand.length - 1]
      .suit
  }. <br></br> ${
    playerArray[actionCounter].HandText
  }. <br></br>If you would like to draw another card, please press 'Hit' again.`;
  var output = document.querySelector("#output-div");
  output.innerHTML = drawPhaseOutput;
};

// Player Stand Function
const playerStandAction = function () {
  let drawPhaseOutput = "";
  if (actionCounter < numberOfPlayers - 1) {
    drawPhaseOutput = `You have chosen to Stand. <br></br> Time for ${
      playerArray[actionCounter + 1].Name
    } to decide their move.<br></br>${
      playerArray[actionCounter + 1].Name
    }, press 'Submit' to begin your turn.`;
    actionCounter += 1;
  } else if (actionCounter === numberOfPlayers - 1) {
    drawPhaseOutput = `You have chosen to Stand. Hit 'Submit' to see who won!`;
    gameMode = cpuActionPhase;
    removeButtons();
  }
  let output = document.querySelector("#output-div");
  output.innerHTML = drawPhaseOutput;
};

// CPU Action Function
const cpuHitOrStand = function () {
  let outputValue = "";
  let cpuScoreCounter = 0;
  // Convert all Aces to 11
  while (cpuScoreCounter < cpuObj.Hand.length) {
    if (cpuObj.Hand[cpuScoreCounter].name === "Ace") {
      cpuObj.Hand[cpuScoreCounter].rank = 11;
      cpuObj.Score += cpuObj.Hand[cpuScoreCounter].rank;
      cpuScoreCounter += 1;
    }
    cpuObj.Score += cpuObj.Hand[cpuScoreCounter].rank;
    cpuScoreCounter += 1;
  }
  cpuScoreCounter = 0;
  if (cpuObj.Score > 21) {
    // This only happens when Two Aces are in hand, resulting in 22 points
    cpuObj.Hand[0].rank = 1;
    cpuObj.Score -= 10;
    // Score will be 12 as a result lol
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
    // Sort to bring Ace to last element in array
    cpuObj.Hand.sort(function (a, b) {
      return a.rank - b.rank;
    });
    // If CPU is bust and last card (highest card) is an Ace, turn Ace into 1
    if (cpuObj.Score > 21 && cpuObj.Hand[cpuObj.Hand.length - 1].rank === 11) {
      cpuObj.Hand[cpuObj.Hand.length - 1].rank = 1;
      cpuObj.Score -= 10;
    }
  }
  // Once CPU Score > 17, enter evaluation mode
  gameMode = compareScorePhase;
  console.log(gameMode);
  computeAllPlayersScore();
  outputValue = compareScore();
  return outputValue;
};

// Button Removal Function
const removeButtons = function () {
  let hitButton = document.querySelector("#hit-button");
  hitButton = hitButton.remove();
  let standButton = document.querySelector("#stand-button");
  standButton.remove();
};

// Compute Player Score
const computePlayerScore = function (counter) {
  let playerScoreCounter = 0;
  // Convert all Aces to 11 and count total score
  while (playerScoreCounter < playerArray[counter].Hand.length) {
    if (playerArray[counter].Hand[playerScoreCounter].name === "Ace") {
      playerArray[counter].Hand[playerScoreCounter].rank = 11;
      playerArray[counter].Score +=
        playerArray[counter].Hand[playerScoreCounter].rank;
      playerScoreCounter += 1;
    }
    playerArray[counter].Score +=
      playerArray[counter].Hand[playerScoreCounter].rank;
    playerScoreCounter += 1;
  }
  // Sort hand to arrange Aces in front
  playerArray[counter].Hand.sort(function (a, b) {
    return a.rank - b.rank;
  });
  playerArray[counter].Hand.reverse();
  // Reset counter
  playerScoreCounter = 0;
  // If bust, Ace converts down to 1 point to prevent bust
  if (
    playerArray[counter].Score > 21 &&
    playerArray[counter].Hand[0].name === "Ace"
  ) {
    console.log("minus mode");
    playerArray[counter].Hand[0].rank = 1;
    playerArray[counter].Score -= 10;
  }
};

// Define Computation Function
let scoreCounter = 0;
let allBust = true;
const computeAllPlayersScore = function () {
  console.log("line 160" + " compare score run");
  // Compute Player Score
  computePlayerScore(scoreCounter);
  console.log(
    `player ${scoreCounter} score: ${playerArray[scoreCounter].Score}`
  );
};

// Define Compare Function
const compareScore = function () {
  // Base Message to display both hands
  let baseMessage = `${cpuHandCards} (${cpuObj.Score} points)<br></br> ${playerArray[scoreCounter].HandText} (${playerArray[scoreCounter].Score} points)<br></br>`;
  if (scoreCounter < numberOfPlayers - 1) {
    // Check if Blackjack
    if (playerArray[scoreCounter].Blackjack === true) {
      myOutputValue = `${
        playerArray[scoreCounter].Name
      }, you got B L A C K J A C K!<br></br>Your current bankroll is $${
        playerArray[scoreCounter].Bankroll
      }. <br></br> Hit 'Submit' to see how ${
        playerArray[scoreCounter + 1].Name
      } did!`;
    }
    // Check for > 21 points
    else if (playerArray[scoreCounter].Score > 21 && cpuObj.Score > 21) {
      myOutputValue =
        baseMessage +
        `Both ${playerArray[scoreCounter].Name} and dealer are bust! It's a tie!<br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else if (playerArray[scoreCounter].Score > 21 && cpuObj.Score < 22) {
      playerArray[scoreCounter].Bankroll =
        playerArray[scoreCounter].Bankroll - playerArray[scoreCounter].Bet;
      myOutputValue =
        baseMessage +
        `${playerArray[scoreCounter].Name}, you are bust! You lost! <br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else if (playerArray[scoreCounter].Score < 22 && cpuObj.Score > 21) {
      playerArray[scoreCounter].Bankroll =
        playerArray[scoreCounter].Bankroll + playerArray[scoreCounter].Bet;
      myOutputValue =
        baseMessage +
        `The dealer is bust! ${playerArray[scoreCounter].Name}, you won! <br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else {
      if (playerArray[scoreCounter].Score > cpuObj.Score) {
        // Player wins
        playerArray[scoreCounter].Bankroll =
          playerArray[scoreCounter].Bankroll + playerArray[scoreCounter].Bet;
        myOutputValue =
          baseMessage +
          `${playerArray[scoreCounter].Name}, you won!<br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
      } else if (playerArray[scoreCounter].Score < cpuObj.Score) {
        playerArray[scoreCounter].Bankroll =
          playerArray[scoreCounter].Bankroll - playerArray[scoreCounter].Bet;
        // Player loses
        myOutputValue =
          baseMessage +
          `${playerArray[scoreCounter].Name}, you lost!<br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
      } else {
        // Same value, tied
        myOutputValue =
          baseMessage +
          `It's a tie, ${playerArray[scoreCounter].Name}! <br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
      }
    }
    if (playerArray[scoreCounter].Bankroll === 0) {
      myOutputValue =
        myOutputValue +
        `<br></br>Your bankroll is now $0. Thanks for playing :) <br></br>Hit Submit for ${
          playerArray[scoreCounter + 1].Name
        }'s turn!`;
      scoreCounter += 1;
    } else {
      myOutputValue =
        myOutputValue +
        `<br></br>Hit Submit for ${playerArray[scoreCounter + 1].Name}'s turn!`;
      scoreCounter += 1;
    }
  } else if (scoreCounter === numberOfPlayers - 1) {
    // Check if Blackjack
    if (playerArray[scoreCounter].Blackjack === true) {
      myOutputValue = `${playerArray[scoreCounter].Name}, you got B L A C K J A C K!<br></br>Your current bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else if (playerArray[scoreCounter].Score > 21 && cpuObj.Score > 21) {
      myOutputValue =
        baseMessage +
        `Both ${playerArray[scoreCounter].Name} and dealer are bust! It's a tie!<br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else if (playerArray[scoreCounter].Score > 21 && cpuObj.Score < 22) {
      playerArray[scoreCounter].Bankroll =
        playerArray[scoreCounter].Bankroll - playerArray[scoreCounter].Bet;
      myOutputValue =
        baseMessage +
        `${playerArray[scoreCounter].Name}, you are bust! You lost! <br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else if (playerArray[scoreCounter].Score < 22 && cpuObj.Score > 21) {
      playerArray[scoreCounter].Bankroll =
        playerArray[scoreCounter].Bankroll + playerArray[scoreCounter].Bet;
      myOutputValue =
        baseMessage +
        `The dealer is bust! ${playerArray[scoreCounter].Name}, you won! <br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
    } else {
      if (playerArray[scoreCounter].Score > cpuObj.Score) {
        // Player wins
        playerArray[scoreCounter].Bankroll =
          playerArray[scoreCounter].Bankroll + playerArray[scoreCounter].Bet;
        myOutputValue =
          baseMessage +
          `${playerArray[scoreCounter].Name}, you won!<br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
      } else if (playerArray[scoreCounter].Score < cpuObj.Score) {
        playerArray[scoreCounter].Bankroll =
          playerArray[scoreCounter].Bankroll - playerArray[scoreCounter].Bet;
        // Player loses
        myOutputValue =
          baseMessage +
          `${playerArray[scoreCounter].Name}, you lost!<br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
      } else {
        // Same value, tied
        myOutputValue =
          baseMessage +
          `It's a tie, ${playerArray[scoreCounter].Name}! <br></br>Your remaining bankroll is $${playerArray[scoreCounter].Bankroll}.`;
      }
    }
    if (playerArray[scoreCounter].Bankroll === 0) {
      myOutputValue =
        myOutputValue +
        `<br></br>Your bankroll is now $0. Thanks for playing :) <br></br>Hit Submit for another round of Blackjack!`;
      scoreCounter += 1;
    } else {
      myOutputValue =
        myOutputValue + `<br></br>Hit 'Submit' for another round of Blackjack!`;
      scoreCounter += 1;
    }
  }
  console.log(myOutputValue);
  // Check if any player is still playing (i.e. Bankroll > 0)
  for (let counter = 0; counter < numberOfPlayers; counter += 1) {
    if (playerArray[counter].Bankroll === 0) {
      // Drop players that are Bankroll = 0
      playerArray.splice(counter, 1);
      console.log(playerArray);
    } else {
      // Change the allBust state to allow next round to continue
      allBust = false;
    }
  }
  if ((allBust = false)) {
    // Go back to betting stage if there are available players
    gameMode = bankrollPhase;
    // reset all other variables
    cpuObj.Hand = [];
    cpuObj.Score = 0;
    roundCounter += 1;
    for (let counter = 0; counter < playerArray.length; counter += 1) {
      playerArray[counter].Hand = [];
      playerArray[counter].Score = 0;
      playerArray[counter].Bet = 0;
    }
  }
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
  if (gameMode === playerNumPhase) {
    outputMessage = createPlayerObj(input);
    return outputMessage;
  } else if (gameMode === nameInputPhase) {
    outputMessage = nameInput(input, nameCounter);
    nameCounter += 1;
    return outputMessage;
  } else if (gameMode === bankrollPhase) {
    outputMessage = bankrollInitialInput(input, bankrollCounter);
    if (bankrollError === false) {
      bankrollCounter += 1;
    }
    return outputMessage;
  } else if (gameMode === betPhase) {
    outputMessage = betInput(input, betCounter);
    if (betError === false) {
      betCounter += 1;
    }
    return outputMessage;
  } else if (gameMode === dealPhase) {
    outputMessage = dealPhaseFunction();
    playerArray[1].Hand = testHand;
    // Check for Blackjack conditions, instant win!
    // CPU first
    checkCpuBlackjack();
    // Player next
    checkPlayerBlackjack();
    console.log(cpuHandCards);
    if (
      playerArray[actionCounter].Blackjack === true ||
      cpuObj.Blackjack === true
    ) {
      outputMessage = messageBlackjack(actionCounter);
    } else {
      // Create buttons for hit or stand if no Blackjack
      createButtons();
    }
    console.log(actionCounter);
    console.log(gameMode);
    return outputMessage;
  } else if (gameMode === playerActionPhase) {
    console.log(actionCounter);
    outputMessage = `${playerArray[actionCounter].HandText}<br></br>Please use either the Hit or Stand buttons to choose your action.`;
    if (
      playerArray[actionCounter].Blackjack === true ||
      cpuObj.Blackjack === true
    ) {
      outputMessage = messageBlackjack(actionCounter);
    } else {
      // Create buttons only if the buttons don't exist (using hit-button as a proxy for both)
      if (!document.getElementById("hit-button")) {
        createButtons();
      }
    }
    return outputMessage;
  } else if (gameMode === cpuActionPhase) {
    outputMessage = cpuHitOrStand();
    console.log(gameMode);
    return outputMessage;
  } else if (gameMode === compareScorePhase) {
    computeAllPlayersScore();
    outputMessage = compareScore();
    return outputMessage;
  } else if (gameMode === loserPhase) {
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

testHand = [
  (ace = {
    name: "Ace",
    rank: 1,
    suit: "clubs",
  }),
  (jack = {
    name: "Jack",
    rank: 10,
    suit: "spades",
  }),
];
