   // Get elements from the DOM
   const playerScoreElement = document.getElementById('player-score');
   const computerScoreElement = document.getElementById('computer-score');
   const resultMessageElement = document.getElementById('result-message');
   const rulesButton = document.getElementById('rules');
   const rulesPopup = document.getElementById('rules-popup');
   const closeButton = document.getElementById('close');
   const options = ['rock', 'paper', 'scissors'];
   let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
   let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

   // Update scores on the UI
   playerScoreElement.textContent = playerScore;
   computerScoreElement.textContent = computerScore;

   // Event listeners
   rulesButton.addEventListener('click', () => {
       // Load rules from rules.txt
       fetch('rules.txt')
           .then(response => response.text())
           .then(rules => {
               // Split the rules into an array
               const rulesArray = rules.split('\n');

               // Create an unordered list element
               const ul = document.createElement('ul');

               // Populate the list with rules as list items
               rulesArray.forEach(rule => {
                   const li = document.createElement('li');
                   li.textContent = rule;
                   ul.appendChild(li);
               });

               // Display rules in popup
               const popupContent = document.querySelector('.popup-content p');
               popupContent.innerHTML = ''; // Clear existing content
               popupContent.appendChild(ul);

               rulesPopup.style.display = 'block';
           })
           .catch(error => console.error('Error loading rules:', error));
   });


   closeButton.addEventListener('click', () => {
       rulesPopup.style.display = 'none';
   });

   document.querySelectorAll('.btn').forEach(button => {
       button.addEventListener('click', () => {
           const playerChoice = button.id;
           const computerChoice = options[Math.floor(Math.random() * options.length)];
           const result = getResult(playerChoice, computerChoice);
           updateScores(result);
           showResultMessage(playerChoice, computerChoice, result);
           comp_img(computerChoice);
           user_img(playerChoice);


       });
   });

   // Function to determine the winner
   function getResult(playerChoice, computerChoice) {

       if (playerChoice === computerChoice) {
           // showBox2(option);
           return 'draw';
       } else if (
           (playerChoice === 'rock' && computerChoice === 'scissors') ||
           (playerChoice === 'paper' && computerChoice === 'rock') ||
           (playerChoice === 'scissors' && computerChoice === 'paper')
       ) {
           showNextButton();
           showCircles(1);
           document.querySelector('.show_data2').style.display = 'block';
           document.querySelector('.show_data1').style.display = 'none';
           return 'player';
       } else {
           showCircles(2);
           document.querySelector('.show_data1').style.display = 'block';
           document.querySelector('.show_data2').style.display = 'none';
           return 'computer';
       }
   }

   // Function to update scores and store them in local storage
   function updateScores(result) {
       if (result === 'player') {
           playerScore++;
       } else if (result === 'computer') {
           computerScore++;
       }
       playerScoreElement.textContent = playerScore;
       computerScoreElement.textContent = computerScore;

       // Store scores in local storage
       localStorage.setItem('playerScore', playerScore);
       localStorage.setItem('computerScore', computerScore);
   }

   // Function to show result message
   function showResultMessage(playerChoice, computerChoice, result) {
       const choices = {
           'rock': 'Rock',
           'paper': 'Paper',
           'scissors': 'Scissors'
       };

       const message = result === 'draw' ? 'TIE UP' :
           `${result === 'player' ? 'YOU WIN ' : 'YOU LOST'}`;

       resultMessageElement.textContent = message;
   }

   function showBox2(option) {
       document.querySelector('.container').style.display = 'none';
       document.querySelector('.result_container').style.display = 'flex';
       const pics = document.querySelectorAll('.pics');
       pics.forEach(pic => {
           pic.style.display = 'none';
       });
       document.getElementById(`${option}Img`).style.display = 'block';
   }

   function hideBox2() {
       document.querySelector('.container').style.display = 'block';
       document.querySelector('.result_container').style.display = 'none';
       location.reload();
   }

   function comp_img(data) {
       var imgSrc = "";
       switch (data) {
           case 'rock':
               imgSrc = "/images/ROCK.png";
               break;
           case 'paper':
               imgSrc = "/images/PAPER.png";
               break;
           case 'scissors':
               imgSrc = "/images/SCISER.png";
               break;
           default:
               break;
       }
       // Update the image source
       document.getElementById("cpt").src = imgSrc;
       document.getElementById("xyz").src = imgSrc;

   }
   function user_img(data) {
       var imgSrc = "";
       switch (data) {
           case 'rock':
               imgSrc = "/images/ROCK.png";
               break;
           case 'paper':
               imgSrc = "/images/PAPER.png";
               break;
           case 'scissors':
               imgSrc = "/images/SCISER.png";
               break;
           default:
               break;
       }
       // Update the image source
       // document.getElementById("cpt").src = imgSrc;
       document.getElementById("xyz1").src = imgSrc;

   }
   function showNextButton() {
       var button = document.getElementById('next-button');
       button.style.display = 'block';
   }
   document.getElementById("next-button").addEventListener("click", function () {
       window.location.href = "win.html";
   });
   document.getElementById("play-again-button-css").addEventListener("click", function () {
       refreshPage();
   });
   function showCircles(setNumber) {
       // Hide all sets
       document.querySelectorAll('concentric-circles').forEach(function (el) {
           el.style.display = 'none';
       });

       // Show the selected set
       document.querySelector('.set' + setNumber).style.display = 'block';
   }

