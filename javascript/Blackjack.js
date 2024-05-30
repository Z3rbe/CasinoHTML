var dealerSum = 0;
var yourSum = 0;
var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; 
var mise = 0;

function refresh(){
    location.reload();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["T", "Ca", "Co", "P"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../Image/cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../Image/cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("dealer-sum").innerText = dealerSum - getValue(hidden);
    document.getElementById("your-sum").innerText = yourSum;

}

function hit() {
    if (yourSum > 21) {
        canHit = false;
    }
    if (!canHit) {
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "../Image/cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    yourSum = reduceAce(yourSum, yourAceCount);
    document.getElementById("your-cards").append(cardImg);
    document.getElementById("your-sum").innerText = yourSum;
}

function delay(milliseconds, callback) {
    setTimeout(callback, milliseconds);
}

function stay() {
    let interval = setInterval(()=> {
        if(dealerSum < 17) {
            let cardImg = document.createElement("img");
            let card = deck.pop();
            cardImg.src = "../Image/cards/" + card + ".png";
            dealerSum += getValue(card);
            dealerAceCount += checkAce(card);
            document.getElementById("dealer-cards").append(cardImg);
            document.getElementById("dealer-sum").innerText = dealerSum; 
        }
        else {
            clearInterval(interval);
            document.getElementById("hit").style.display = "none";
            document.getElementById("stay").style.display = "none";
            dealerSum = reduceAce(dealerSum, dealerAceCount);
            yourSum = reduceAce(yourSum, yourAceCount);
            canHit = false;
            document.getElementById("hidden").src = "../Image/cards/" + hidden + ".png";
            let message = "";
            if (yourSum > 21) {
                message = "Perdu !";
            }
            else if (dealerSum > 21) {
                message = "Gagner !";
            }
            else if (yourSum == dealerSum) {
                message = "Egalite !";
                currentPlayer.addToken(mise);
            }
            else if (yourSum > dealerSum) {
                message = "Gagner !";
            }
            else if (yourSum < dealerSum) {
                message = "Perdu !";
            }
            
            if(message == "Gagner !"){
                currentPlayer.addToken(mise*2);
            } 
            else if (yourSum == 21){
                currentPlayer.addToken(((mise*2)+(mise*0.5)));
            }
            document.getElementById("dealer-sum").innerText = dealerSum;
            document.getElementById("your-sum").innerText = yourSum;
            document.getElementById("result").innerText = message;
            document.getElementById("reset").style.display = "inline-block";
            document.getElementById("result").style.display = "inline-block";
        }
    },500);
}


function getValue(card) {
    let data = card.split("-");
    let value = data[0];
    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        } return 10;
    } return parseInt(value);

}
function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById("Menu-mise");
    const closeBtn = document.getElementById("closeBtn");
    const scoreDisplay = document.getElementById("score");
    const buttons = document.querySelectorAll("button[id]")
    scoreDisplay.textContent = "Mise : " + mise + " €";

    menu.classList.remove("off");

    closeBtn.addEventListener("click", function() {
        if(!currentPlayer.checkToken(mise)){
            alert("Solde Inferieur à la mise");
        }
        else{
            currentPlayer.removeToken(mise);
            printTokenUse();
            menu.classList.add("off");
            buildDeck();
            shuffleDeck();
            startGame();
        }
    });

    buttons.forEach(button => {
        button.addEventListener("click", function(){
            const value = parseInt(button.id, 10);
            if (!isNaN(value)) {
                if(value == 0){
                    mise = 0;
                }
                else{
                    mise += value;
                }
                scoreDisplay.textContent = "Mise : " + mise + " €";
            }
        });
    });
});

function printTokenUse(){
    document.getElementById("Token-use").style.display = "block";
    document.getElementById("Token-use").innerText = "Mise : " + mise +" €";
}