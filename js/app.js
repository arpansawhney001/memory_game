/*
 * A list that holds cards
 */
const cards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb',
];



// Create HTML function for cards
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// keep track of moves taken by a user
let numMoves = 0;


// Dynamically Generate Cards
function initGame() {

    let deck = document.querySelector('.deck');

    // shuffle each card
    let cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
    });

    deck.innerHTML = cardHTML.join('');
}

initGame();

// Add Event Listeners
let allCards = document.querySelectorAll('.card');


// an array that will keep track of the opened cards
let openCards = [];


let numStars = document.querySelectorAll('.fa-star');


let timerElement = document.getElementById('timer');
let seconds = 0;
let minutes = 0;
let hours = 0;
let t;



// Stopwatch function:
// https://jsfiddle.net/Daniel_Hug/pvk6p/

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    timerElement.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

// a variable that keeps track whether the function is aleady running or not
let called = false;

function timer() {
    t = setTimeout(add, 1000);
    // when the function is run... change the variable to true
    called = true;
}
//timer();



function logic() {
    //flip card loop and push cards into an array
    allCards.forEach(function(card) {

        card.addEventListener('click', function() {

            // only run the timer function if not already running (basically just run it once)
            if (!called) {
                timer();
            }

            //fix double click Event
            if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match'))
                openCards.push(card);
            card.classList.add('open', 'show');

            // to hide cards if they don't match
            if (openCards.length == 2) {
                let incrementMoves = numMoves++; // increment num of moves by 1

                let numMovesTaken = document.getElementsByClassName('moves')[0].innerHTML = incrementMoves;
                //console.log(numMovesTaken);


                /*
		   Decrease count of stars based on the number of moves taken
			  */
                if (numMovesTaken > 10 && numMovesTaken < 20) {
                    for (i = 0; i < 3; i++) {
                        if (i > 1) {
                            // Remove star
                            numStars[i].remove();
                        }
                    }
                } else if (numMovesTaken > 20) {
                    for (j = 0; j < 3; j++) {
                        if (j > 0) {
                            // Remove star
                            numStars[j].remove();
                        }
                    }
                }

                //to see if it is a match
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    // match cards count

                    openCards[0].classList.add('match', 'open', 'show');
                    openCards[1].classList.add('match', 'open', 'show');

                    openCards = [];

                    /* Count the number of cards with class match
                    if count === 16, then it means all cards have been opened
                    */

                    let allCardsMatchedCount = document.querySelectorAll('.match').length;

                    //console.log(allCardsMatchedCount);
                    if (allCardsMatchedCount === 16) {
                        alert("Congratulations! All cards have been successfully matched. \nYour statistics: \nNumber of moves taken: " +
                            numMovesTaken +
                            "\nTime taken: " +
                            document.getElementById("timer").innerHTML +
                            "\nRating: " +
                            document.getElementsByClassName("stars")[0].childElementCount + " star(s)");

                        playGameAgain();


                        // end timer function when all cards match
                        window.timer = function() {
                            return false;
                        };


                    }


                } else {
                    numMovesTaken;
                    setTimeout(function() {
                        openCards.forEach(function(card) {
                            card.classList.remove('open', 'show');
                        });

                        openCards = [];
                    }, 200);
                }
            }

        });
    });
}

logic();



// Ask user if they would like to play the game again when all cards match
function playGameAgain() {
    let answer = confirm("Would you like to play the game again?");
    if (answer === true) {
        location.reload(false);
    } else {
        alert("Thanks for playing!");
    }

}



// Restart game when reset button is clicked

function restartGame() {
    let restartGame = document.getElementsByTagName('button');
    for (let i = 0; i < restartGame.length; i++) {
        restartGame[i].addEventListener("click", function() {
            location.reload(false);
        });
    }
}
restartGame();
