
// Card Suit and Type
let cardSuit = ["♠", "♥", "♦", "♣"];
let cardType = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// Buttons
let check = document.getElementById('check');
let raise = document.getElementById('raise');
let fold = document.getElementById('fold');
let reset = document.getElementById('reset');

// Player start amount
let cardDeal = 3;

// Total sum of Cards
let pCardTotal = 0;
let dCardTotal = 0;

let count = 2;

// Card Suit and Number
let suit = 0;
let num = 0;

// Gets the deal number input
let dealType = document.getElementById('deal-type');

// Displays the Player Score
let score = document.getElementById('player-score');

// The players score
let originalScore = 100;

// Counts the wins, draw and losses
let win = 0;
let split = 0;
let lose = 0;

// Calculates the amount of points the player has
let userAmount = 0;

begin();

//Begins the game of Blackjack with the betting amount
function begin() {
  score.innerHTML = "Score: " + originalScore;
  reset.style.display = "none";
    check.disabled = true;
    raise.disabled = true;
    fold.disabled = true;
  cardDeal = 3;
  count = 2;
  hideCard("player");
  hideCard("dealer");
  if (win > 0 || split > 0 || lose > 0) {
    document.getElementById('dealer-suit2').style.display = "none";
  }
}

// Displays the first two cards of the player and dealer deck
function hideCard(holder) {
  let element = "";
  for (let i = 3; i <= 5; i++) {
  element = holder + i;
  document.getElementById(element).style.display = "none";
}
}

// Deals and counts the amount of cards in the dealer hand
function holderdealCard(holder, dealHold, counter) {
    element = holder + counter;
    let elements = dealHold + counter;
    let cardDisplay = document.getElementById(elements);
    document.getElementById(element).style.display = "block";

    // Checks the value of the dealer's Total cards
    if (dCardTotal < 21 && dCardTotal <= 16) {
    if (counter >  1) {
      suit = Math.floor(Math.random() * 4) + 0;
      num = Math.floor(Math.random() * 13) + 0;
      if (num === 0 || num === 10 || num === 11 && dCardTotal < 11 || num === 12) {
          dCardTotal += 10;
      } else {
          dCardTotal += num + 1;
      }
      let totals = cardSuit[suit]  + cardType[num];
      cardDisplay.innerText = totals;
      color(suit, cardDisplay);
      document.getElementById("dealer-hand-count").innerText = "Hand: " + dCardTotal;
    }
  } else {
      document.getElementById(element).style.display = "none";
  }
}

// Deals and counts the cards in the player hand
function dealCard(holder, holdsuit, counter) {
    element = holder + counter;
    let elements =  holdsuit + counter;
    var displayCard = document.getElementById(elements);
    document.getElementById(element).style.display = "block";
    if (counter > 2) {
      suit = Math.floor(Math.random() * 4) + 0;
      num = Math.floor(Math.random() * 13) + 0;
      if (num === 0 && pCardTotal < 11 || num === 10 || num === 11 || num === 12) {
          pCardTotal += 10;
      } else {
          pCardTotal += num + 1;
      }
      let totals = cardSuit[suit]  + cardType[num];
      color(suit, displayCard);
      displayCard.innerText = totals;
      document.getElementById("player-hand-count").innerText = "Hand: " + pCardTotal;
    }
    // Checks if player (and dealer) is greater than 21
    if (pCardTotal > 21 || pCardTotal > 21 && dCardTotal > 21) {
        document.getElementById('header-status').style.display = "block";
        document.getElementById("header-status").innerText = "You Lose";
        check.disabled = true;
        cardFold();
    }

    //Checks if player is equal to 21
    if (pCardTotal === 21) {
        document.getElementById('header-status').style.display = "block";
      document.getElementById("header-status").innerText = "You Win";
      check.disabled = true;
      cardFold();
    }
}
// Checkbutton function
check.addEventListener("click", deal);

// Foldbutton function
fold.addEventListener("click", cardFold);
// raise.addEventListener("click", update);

// Submits the amount of points betted
document.getElementById("deal-submit").addEventListener("click", start);
document.getElementById("raise-submit").addEventListener("click", updateBet);

// Gets the Original bet value
var scoreDisplay;

// Starts the game of Blackjack
function start() {
  // Checks if the uumber is valid
  if (isNaN(parseInt(dealType.value)) || parseInt(dealType.value) !== parseFloat(dealType.value) || parseInt(dealType.value) < 1 || parseInt(dealType.value) > originalScore) {
    document.getElementById("msg").innerHTML = "No Number";
    document.getElementById("msg").style.display = "block";
} else {
  modal.style.display = "none";
  twoCard("player-suit", "player-hand-count", pCardTotal);
  // twoCard("dealer", "dealer-hand-count", dCardTotal);
  document.getElementById("deal-submit").disabled = true;
  check.disabled = false;
  raise.disabled = false;
  fold.disabled = false;
      document.getElementById("msg").style.display = "none";
  dealerOne();
}
}
document.getElementById("raise-count").style.display = "none";
raise.addEventListener("click", pointRaise);

// Allows the player to raise their betting value
function pointRaise() {
  document.getElementById("raise-count").style.display = "block";
  document.getElementById("deal-submit").disabled = false;
  modal.style.display = "block";
  document.getElementById("deal-bet").style.display = "none";
}

// Updates the betting value
let update = document.getElementById('raise-type');
let updateNum = update.value;

// Checks and validates the betting value
function updateBet() {
  if (isNaN(parseInt(update.value)) || parseInt(update.value) !== parseFloat(update.value) || parseInt(update.value) < 1 || parseInt(update.value) > originalScore) {
    document.getElementById("msg").innerHTML = "No Update Number";
    document.getElementById("msg").style.display = "block";
  } else {
    modal.style.display = "none";
    document.getElementById("msg").style.display = "none";
    dealCard("player", "player-suit", cardDeal);
    cardDeal++;
  }
}

document.getElementById("msg").style.display = "none";

// Deals the cards for the player
function deal() {
    dealCard("player", "player-suit", cardDeal);
    cardDeal++;
}

// Deals two cards into the player deck
function twoCard(hand, hcount, total) {
  let element = "";
  let a = 0;
  for (let i = 1; i <= 2; i++) {
  suit = Math.floor(Math.random() * 4) + 0;
  num = Math.floor(Math.random() * 13) + 0;
  if (num === 0 || num === 10 || num === 11 || num === 12) {
      pCardTotal += 10;
  } else {
      pCardTotal += num + 1;
  }

  let totals = cardSuit[suit]  + cardType[num];
  element = hand + i;
  var cardShow = document.getElementById(element);
  color(suit, cardShow);
  cardShow.innerText = totals;
  }
  document.getElementById(hcount).innerText = "Hand: " + pCardTotal;
  console.log(total);
  return total;
}

// Allows the player to fold
function cardFold() {
  // Checks if win, lose, and draw values are valid
  if (win > 0 || split > 0 || lose > 0) {
    document.getElementById('dealer-suit2').style.display = "block";
  }
    scoreDisplay = parseInt(dealType.value);
    check.disabled = true;
    raise.disabled = true;
    fold.disabled = true;
    // dealerTotal(countDeal);
    document.getElementById("dealer-hand-count").innerText = "Hand: " + dCardTotal;

    // Generates cards
    for (let i=2; i <= 5; i++) {
    holderdealCard("dealer", "dealer-suit", i);
    }

    console.log(100 - parseInt(dealType.value));

    // Scoring Values validility
    if (pCardTotal <= 21 && dCardTotal > 21 || pCardTotal < 21 && pCardTotal > dCardTotal
      || pCardTotal === 21 && dCardTotal < 21) {
      document.getElementById("deal-bet").style.display = "none";
      document.getElementById("raise-count").style.display = "none";
      document.getElementById('header-status').style.display = "block";
      reset.style.display = "block";
      if (isNaN(parseInt(update.value))) {
        modal.style.display = "block";
        document.getElementById("header-status").innerText = "You Win";
        userAmount = originalScore + scoreDisplay;
        score.innerHTML = "Score: " + (originalScore + scoreDisplay);
        win++;
        document.getElementById("win").innerText = "Win: " + win;
      } else {
        modal.style.display = "block";
        document.getElementById('header-status').style.display = "block";
        document.getElementById("header-status").innerText = "You Win";
        userAmount = originalScore + scoreDisplay + parseInt(update.value);
        score.innerHTML = "Score: " + (originalScore + scoreDisplay + parseInt(update.value));
        win++;
        document.getElementById("win").innerText = "Win: " + win;
      }
    } else if (dCardTotal <= 21 && pCardTotal > 21 || dCardTotal < 21 && dCardTotal > pCardTotal
      || dCardTotal === 21 && pCardTotal < 21 || pCardTotal > 21 && dCardTotal > 21) {
        document.getElementById('header-status').style.display = "block";
        document.getElementById("deal-bet").style.display = "none";
        document.getElementById("raise-count").style.display = "none";
        reset.style.display = "block";
        if (isNaN(parseInt(update.value))) {
          modal.style.display = "block";
          document.getElementById("header-status").innerText = "You Lose";
          userAmount = originalScore - scoreDisplay;
          score.innerHTML = "Score: " + (originalScore - scoreDisplay);
          lose++;
          document.getElementById("lose").innerText = "Lose: " + lose;
        } else {
          modal.style.display = "block";
          document.getElementById("header-status").innerText = "You Lose";
          userAmount = originalScore - scoreDisplay - parseInt(update.value);
          score.innerHTML = "Score: " + (originalScore - scoreDisplay - parseInt(update.value));
          document.getElementById("lose").innerText = "Lose: " + lose;
          lose++;
        }
    }
    if (pCardTotal === dCardTotal && pCardTotal <= 21 && dCardTotal <= 21) {
      document.getElementById("deal-bet").style.display = "none";
      document.getElementById("raise-count").style.display = "none";
      reset.style.display = "block";
      modal.style.display = "block";
      document.getElementById('header-status').style.display = "block";
      document.getElementById("header-status").innerText = "Draw";
      userAmount = originalScore;
      score.innerHTML = "Score: " + originalScore;
      split++;
      document.getElementById("draw").innerText = "Draw: " + split;

    }
    originalScore = userAmount;
}

// Displays the dealers first card
function dealerOne() {
  let suitDeal = document.getElementById('dealer-suit1');
  suit = Math.floor(Math.random() * 4) + 0;
  num = Math.floor(Math.random() * 13) + 0;
  if (num === 0 || num === 10 || num === 11 || num === 12) {
      dCardTotal += 10;
  } else {
      dCardTotal += num + 1;
  }
  let totals = cardSuit[suit]  + cardType[num];
  suitDeal.innerText = totals;
  color(suit, suitDeal);
  document.getElementById("dealer-hand-count").innerText = "Hand: " + dCardTotal;
}
let countDeal = 2;

// Displays the dealers total once the player has folded
function dealerTotal(countDeal) {
  let totalel = "";
  let totals;
    if (dCardTotal < 21) {
    suit = Math.floor(Math.random() * 4) + 0;
    num = Math.floor(Math.random() * 13) + 0;
    if (num === 0 && dCardTotal < 11 || num === 10 || num === 11 || num === 12) {
        dCardTotal += 10;
    } else {
        dCardTotal += num + 1;
    }
    totalel = "dealer" + countDeal;
    totals = cardSuit[suit]  + cardType[num];
    document.getElementById(totalel).innerText = totals;
  }
}

// CHecks the suit and validates the color of the suit
function color(suit, deal) {
if (cardSuit[suit] === "♥" || cardSuit[suit] === "♦") {
  deal.style.color = "red";
} else {
  deal.style.color = "black";
}
}

// Modal display
var modal = document.getElementById("modal");

// Displays the window for the modal
window.onclick = function(event) {
  if (event.target ===  modal) {
    modal.style.display = "block";
  }
}

// Adds reset game functionality
reset.addEventListener("click", resetGame);

// Resets the game
function resetGame() {
  // Score validility
  if (originalScore === 0) {
    document.getElementById("msg").innerHTML = "No Money. Thanks For Playing.";
    document.getElementById("msg").style.display = "block";
    document.getElementById("deal-bet").style.display = "none";
    document.getElementById("header-status").style.display = "none";
    document.getElementById("reset").style.display = "none";
  } else {

  // Resetting information
  document.getElementById('header-status').style.display = "none";
  pCardTotal = 0;
  dCardTotal = 0;
  begin();
  document.getElementById('deal-bet').style.display = "block";
  document.getElementById('dealer-suit2').style.display = "none";
  document.getElementById('deal-submit').disabled = false;
}
}
