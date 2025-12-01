let currentWord = "";
let currentEmojis = [];
let guessCount = 0;
let maxGuesses = 6;

fetch('words.json')
  .then(response => response.json())
  .then(data => {
    let today = "2025-12-01"; // test günü, sonradan otomatik bugüne çevrilebilir
    currentWord = data[today].word.toUpperCase();
    currentEmojis = data[today].emojis;
    showEmojis(0);
    createGrid();
  });

function showEmojis(count) {
  let panel = document.getElementById("emoji-panel");
  panel.innerHTML = "";
  for(let i = 0; i < count + 2 && i < currentEmojis.length; i++) {
    panel.innerHTML += currentEmojis[i];
  }
}

function createGrid() {
  let grid = document.getElementById("grid");
  grid.innerHTML = "";
  for(let i=0;i<maxGuesses*6;i++){
    let cell = document.createElement("div");
    cell.className = "cell";
    grid.appendChild(cell);
  }
}

document.getElementById("submit-btn").addEventListener("click",()=>{
  let guess = document.getElementById("guess-input").value.toUpperCase();
  if(guess.length !== currentWord.length){
    document.getElementById("message").innerText="Kelime uzunluğu hatalı!";
    return;
  }
  checkGuess(guess);
  document.getElementById("guess-input").value = "";
});

function checkGuess(guess){
  let start = guessCount*6;
  for(let i=0;i<currentWord.length;i++){
    let cell = document.getElementsByClassName("cell")[start+i];
    cell.innerText = guess[i];
    if(guess[i] === currentWord[i]){
      cell.classList.add("correct");
    } else if(currentWord.includes(guess[i])){
      cell.classList.add("present");
    } else {
      cell.classList.add("absent");
    }
  }
  if(guess === currentWord){
    document.getElementById("message").innerText="Tebrikler! Kelimeyi buldun!";
  } else {
    guessCount++;
    showEmojis(guessCount);
    if(guessCount >= maxGuesses){
      document.getElementById("message").innerText=`Oyunu kaybettin! Kelime: ${currentWord}`;
    }
  }
}
