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
var movesCounter=0;
var starCount=3;
var initTime;
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

function setupGame(){
    document.getElementsByClassName("deck")[0].style.display="";
    document.getElementById("scorepage").style.display="none";
    movesCounter=0;
    moveManager();
    var shuffledDeck=shuffle(cardDeck);
    deck.innerHTML="";
    for(var i=0, len=shuffledDeck.length; i<len; i++){
        deck.innerHTML+="<li class=\"card\" onclick=\"clickTrigger(this)\">\n<i class=\"fa\"></i>\n</li>";
        card=document.getElementsByClassName('fa');
        card[card.length-1].classList.add(shuffledDeck[i]);
    }
};

function clickTrigger(tile){
    tile.classList.add("open");
    tile.classList.add("show");
    checkMatch();
    checkWin();
};

function checkMatch(){
    var openCards=document.getElementsByClassName('open show');
    if(movesCounter==0 && openCards.length==1){
        initTime= new Date().getTime();
    }
    if(openCards.length>1){
        updateMove();
        if(openCards[0].children[0].className==openCards[1].children[0].className){
            for(var i=openCards.length-1; i>=0; i--){
                openCards[i].classList.add("match");
                openCards[i].classList.remove("open","show");
            }
        }
        else{
            setTimeout(function() {
                for(var i=openCards.length-1; i>=0; i--){
                openCards[i].classList.remove("open","show");
                }
            }, 500);
        }
    }
};

function checkWin(){
    var allCards=document.getElementsByClassName("card");
    var matchedCards=document.getElementsByClassName("match");
    if(allCards.length==matchedCards.length){
        $("#victory").modal('show');
        var endTime=new Date().getTime();
        var Time=endTime-initTime;
        var s=Math.floor(Time/1000);
        var m=Math.floor(s/60);
        s=s%60;
        var h=Math.floor(m/60);
        m=m%60;
        document.getElementById("stars").innerHTML=String(starCount);
        document.getElementById("moves").innerHTML=String(movesCounter);
        document.getElementById("time").innerHTML=String(h+":"+m+":"+s);
        document.getElementsByClassName("deck")[0].style.display="none";
        document.getElementById("scorepage").style.display="block";
    }
};

function updateMove(){
    movesCounter++;
    moveManager();
};

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

setupGame();
