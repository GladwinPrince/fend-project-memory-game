/*
 * Create a list that holds all of your cards
 */
var cardDeck=['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 var deck=document.getElementsByClassName('deck')[0];
var movesCounter=0;//Variable that keeps track of moves
var starCount=3;//Variable that keeps track of star rating
var initTime;//initial start time of game is stored in it.
var time=0;
var Timer;
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


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

//Function that initialise the basic operations of the game
function setupGame(){
    //resetting and updating various parameters
    movesCounter=0;
    moveManager();
    time=0;
    //Deck is shuffled
    var shuffledDeck=shuffle(cardDeck);
    deck.innerHTML="";
    card=document.getElementsByClassName('fa');
    //Cards are added to the deck
    for(var i=0, len=shuffledDeck.length; i<len; i++){
        deck.innerHTML+="<li class=\"card\" onclick=\"clickTrigger(this)\">\n<i class=\"fa\"></i>\n</li>";
        card[card.length-1].classList.add(shuffledDeck[i]);
    }
};

//Function that takes care of click on any tile
function clickTrigger(tile){
    //opening the Tile
    tile.classList.add("open","show");
    //Checking for a match
    checkMatch();
    //Checking for the game completion
    checkWin();
};

function toggleOverlay(){
    document.getElementById("overlay").classList.toggle("invisible");
    document.getElementById("overlay").classList.toggle("visible");
}

//Function that checks for match of cards
function checkMatch(){
    var openCards=document.getElementsByClassName('open show');
    //Starting the timer if this is the first card opened
    if(movesCounter==0 && openCards.length==1){
        Timer=setInterval(TimeManager, 1000);
    }
    //2 cards are required to check for a match, so the length is checked
    if(openCards.length==2){
        toggleOverlay();
        updateMove();
        if(openCards[0].children[0].className==openCards[1].children[0].className){
            //If cards match, they are marked as match
            for(var i=openCards.length-1; i>=0; i--){
                openCards[i].classList.add("match");
                openCards[i].classList.remove("open","show");
            }
            toggleOverlay();
        }
        else{
            //if cards don't match, 500 millisecond delay is provided for the user to see the card and then they are close
            setTimeout(function() {
                for(var i=openCards.length-1; i>=0; i--){
                openCards[i].classList.remove("open","show");
                }
                toggleOverlay();
            }, 500);
        }
    }
};

function TimeManager(){
    time++;
}

//Function that checks for a win
function checkWin(){
    var allCards=document.getElementsByClassName("card");
    var matchedCards=document.getElementsByClassName("match");
    //if all cards are matched, its a win
    if(allCards.length==matchedCards.length){
        clearInterval(Timer);
        var s=time;
        var m=Math.floor(s/60);
        s=s%60;
        var h=Math.floor(m/60);
        m=m%60;
        //parameters are calculated and assigned
        var starResult=document.getElementById("stars");
        starResult.innerHTML="";
        for(var i=0; i<starCount; i++){
            starResult.innerHTML+="<li><i class=\"fa fa-star\"></i></li>"
        }
        for(var i=starCount; i<3; i++){
            starResult.innerHTML+="<li><i class=\"fa fa-star-o\"></i></li>"
        }
        document.getElementById("moves").innerHTML=String(movesCounter);
        document.getElementById("time").innerHTML=String(h+":"+m+":"+s);
        $("#victory").modal("show");
    }
}
//The function that updates moves and star rating
function updateMove(){
    movesCounter++;
    moveManager();
};

//function that updates star rating
function moveManager(){
    var moves=document.getElementsByClassName("moves")[0];
    moves.innerHTML=String(movesCounter);
    if(movesCounter<12){
        starCount=3;
    }
    else if(movesCounter<18){
        starCount=2;
    }
    else if(movesCounter<24){
        starCount=1;
    }
    else{
        starCount=0;
    }
    updateStars();
};

//function that does the require change in html for star rating
function updateStars(){
    var stars=document.getElementsByClassName("fa-star");
    if(stars.length!=starCount){
        var starPanel=document.getElementsByClassName("stars")[0];
        starPanel.innerHTML="";
        for(var i=0; i<starCount; i++){
            starPanel.innerHTML+="<li><i class=\"fa fa-star\"></i></li>"
        }
        for(var i=starCount; i<3; i++){
            starPanel.innerHTML+="<li><i class=\"fa fa-star-o\"></i></li>"
        }
    }
};
//initialising Game for first run
setupGame();
