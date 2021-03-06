 // creating array for choices
 var computerChoices = ["Harry Potter","Ron Weasley","Hermione Granger","Albus Dumbledore","Voldemort","Severus Snape","Draco Malfoy","Rubeus Hagrid","Neville Longbottom","Dobby","Mad Eye Moody","Remus Lupin","Bellatrix Lestrange","Minerva McGonagall","Sirius Black","Ginny Weasley","Fred Weasley","George Weasley","Hedwig"];
            
 // creating variables for wins, losses, guesses left, current word and computer guesses
 var computerGuess = "";
 var computerGuessLower = "";
 var currentWord = "";
 var wins = 0;
 var losses = 0;
 var guessesLeft = 0;

 //array to hold guessed letters
 var guessed = []
 
 //randomly selects a character
 function hpPerson() {
     computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
         console.log("computer guess: " + computerGuess);
     computerGuessLower = computerGuess.toLowerCase();
         console.log(computerGuessLower);
 };

 //run function to randomly select character for initial run through game
 hpPerson();
 
 //create variable that replaces letters in the computer word with underscores
 function currentWordSpaces() {
     currentWord = "";
     for(var i = 0; i < computerGuess.length; i++) {
         if (computerGuess[i] === " ") {
             currentWord = currentWord + " ";
         } else currentWord = currentWord + "_";
     }
     console.log(currentWord);

     document.getElementById('current-word').innerHTML = "Current word: " + currentWord;

 };

 //run currentWordSpaces function for intial run through game
 currentWordSpaces();
 
 //function to reset guesses remaining
  function guessesReset() {
     guessesLeft = 6;
     document.getElementById('guesses-left').innerHTML = "Guesses remaining: " + guessesLeft;
 };

 //run function to set guesses left for initial run through game
 guessesReset();

 //funtion that compiles all of the reset functions to run at once. adds code to reset the guessed array. don't run here, only use further down.
  function reset() {
     guessed = [];
     document.getElementById('letters-guessed').innerHTML = "Letters already guessed: " + guessed;
     hpPerson();
     currentWordSpaces();
     guessesReset();
 };

 // function runs when user presses a key
 document.onkeyup = function(event) {
 
     // determines which key was pressed
     var userGuess = event.key;
     console.log("user guess: " + userGuess);
     
     //compares user guess to computer guess. if letter is in computer guess it returns array of positions. if not the array stays blank.
     var indexes = [];
     function indexesOf(computerGuessLower,userGuess) {
         // var indexes = [];
         for(var i = 0; i < computerGuessLower.length; i++) {
             if(computerGuessLower.charAt(i) == userGuess) {
                 indexes.push(i);
             }
         }
         return indexes;
     }

     console.log("indexes: " + indexesOf(computerGuessLower,userGuess));
     console.log("indexes length: " + indexes.length);

     
     //if the indexes array has values in it (there was a match between user guess and the computer guess) it updates the current word variable and html
     if (indexes.length != 0 && currentWord != computerGuessLower) {
         for(var i = 0; i < indexes.length; i++) {
             var compare = computerGuessLower.indexOf(userGuess);
             console.log("compare: " + compare);

                 console.log("correct");
                 currentWord = currentWord.substring(0, indexes[i]) + userGuess + currentWord.substring(indexes[i]+1);
                 console.log(currentWord);
                 document.getElementById('current-word').innerHTML = "Current word: " + currentWord;
             
                 console.log(currentWord.length);
                 console.log(computerGuessLower.length);

                 //win condition. if words match wins increase and game resets
                 if (currentWord === computerGuessLower) {
                     console.log("MATCH");

                     //alert
                    alert("You're right, it was " + computerGuess + "!")

                     //increase wins
                     wins +=1;
                     document.getElementById('wins').innerHTML = "Wins: " + wins;

                    //reset the game
                     reset();
                 }
         }
     } 
     //if the indexes array is blank (no match) it starts the loss conditions
     else  {console.log("LOSER");
         //if there are still guesses left it decreases number of guesses by 1 and updates the html, adds the incorrect letter to the guessed array and updates the html
         if (guessesLeft > 1) {
             console.log("more guesses left");
             guessesLeft = guessesLeft -1;
             document.getElementById('guesses-left').innerHTML = "Guesses remaining: " + guessesLeft;
             guessed.push(userGuess);
             console.log(guessed);
             document.getElementById('letters-guessed').innerHTML = "Letters already guessed: " + guessed;
         } 
         //if there are no more guesses left it alerts that the game is over and resets the game
         else {alert("GAME OVER. The correct guess was " + computerGuess + ".");
            // reset the game
             reset();
             
         }
     }
 }