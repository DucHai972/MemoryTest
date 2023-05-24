var currentWord; // Current word to display
var score = 0; // Player's score
var lives = 3; // Player's lives
var languageSelected = false;
var words = []; // Vocabulary array based on language selection
var begin = false;
var wordElement = document.getElementById("word");
var scoreElement = document.getElementById("score");
var livesElement = document.getElementById("lives");
var newBtn = document.getElementById("newBtn");
var seenBtn = document.getElementById("seenBtn");
var seenWords = [];
var initialContainerHTML = document.querySelector(".container").innerHTML;
var rank = 0;

// Generate a random word from the vocabulary array
function getRandomWord() {
    var index;
    if (seenWords.length >= 10) {
      // Lấy từ ngẫu nhiên từ mảng seenWords với tỉ lệ 25%
      if (Math.random() < 0.35) {
        index = Math.floor(Math.random() * seenWords.length);
        return seenWords[index];
      }
    }
    // Lấy từ ngẫu nhiên từ mảng words với tỉ lệ 80%
    index = Math.floor(Math.random() * words.length);
    return words[index];
}

// Update the word element with a new word
function updateWord() {
  currentWord = getRandomWord();
  wordElement.textContent = currentWord;
}

// Check if the answer is correct and update score and lives
function checkAnswer(answer) {
  if ((answer === "New" && seenWords.indexOf(currentWord) === -1) ||
      (answer === "Seen" && seenWords.indexOf(currentWord) !== -1)) {
    score++;
    scoreElement.textContent = "Score: " + score;
    seenWords.push(currentWord);
  } else {
    lives--;
    livesElement.textContent = "Lives: " + lives;
  }

  // End the game if lives run out
  if (lives === 0) {
    endGame();
  } else {
    updateWord();
  }
}

// End the game and display the final score
function endGame() {
    wordElement.textContent = "Game Over";
    newBtn.disabled = true;
    seenBtn.disabled = true;
    document.getElementById("gameOver").style.display = "block";
  
    // Clear the seen words array
    seenWords = [];
    if (score < 10)  {
        rank = 0 + 0.853 * (score);
    } else if (score < 20)  {
        rank = 10 + (0.75 * (score - 10));
    } else if (score < 30)  {
        rank = 20 + (1.25 * (score - 20));
    } else if (score < 40)  {
        rank =  31.25 + (1.2 * (score - 30));
    } else if (score < 50)  {
        rank = 42.05 + (1.25 * (score - 40));
    } else if (score < 60)  {
        rank = 53.3 + (1.3 * (score - 50));
    } else if (score < 100)  {
        rank = 65 + (0.43 * (score - 60));
    } else if (score < 120)  {
        rank = 80 + (0.62 * (score - 100));
    } else if (score < 135)  {
        rank = 92 + (0.44 * (score - 120));
    } else if (score < 220)  {
        rank = 98.6 + (0.015 * (score - 135));
    } else
        rank = 99.9 + (0.0015 * (score - 220));

    if (rank >= 100)
        rank = 100;

    // Create a new container element
    var newContainer = document.createElement("div");
    newContainer.classList.add("container");
  
    // Append the gameOver element to the new container
    var gameOverElement = document.getElementById("gameOver");
  
    // Display the final score
    var finalScoreElement = document.createElement("p");
    finalScoreElement.classList.add("game-over");
    finalScoreElement.innerHTML = "Your Score Is: " + score + "<br><p class='game-over' style='font-size: 10px;'>Bạn vượt qua " + rank + "% người dùng</p>";

    gameOverElement.appendChild(finalScoreElement);
  
    newContainer.appendChild(gameOverElement);
  
    // Replace the old container with the new container
    var oldContainer = document.querySelector(".container");
    oldContainer.parentNode.replaceChild(newContainer, oldContainer);
  
}

// Event listeners for button clicks
newBtn.addEventListener("click", function() {
    if (score != 0 || lives != 3)  {
        document.getElementById("englishBtn").style.display = "none";
        document.getElementById("germanBtn").style.display = "none";
    }
    checkAnswer("New");
});

seenBtn.addEventListener("click", function() {
    if (score != 0 || lives != 3)  {
        document.getElementById("englishBtn").style.display = "none";
        document.getElementById("germanBtn").style.display = "none";
    }
    checkAnswer("Seen");
});

var restartBtn = document.getElementById("restartBtn");

// RESTART
restartBtn.addEventListener("click", function() {
  restartGame();
});

// Restart the game
function restartGame() {
    // Reset score and lives
    score = 0;
    lives = 3;
    scoreElement.textContent = "Score: " + score;
    livesElement.textContent = "Lives: " + lives;
    // Hide the gameOver element
    document.getElementById("gameOver").style.display = "none";
  
    // Enable the buttons
    newBtn.disabled = false;
    seenBtn.disabled = false;
  
    // Update the word
    updateWord();
  
    // Remove the current container
    var currentContainer = document.querySelector(".container");
    currentContainer.parentNode.removeChild(currentContainer);
  
    // Create a new container element
    var newContainer = document.createElement("div");
    newContainer.classList.add("container");
  
    // Add the HTML content to the new container
    newContainer.innerHTML = `
    <h1>Memory Game</h1>
    <div id="score">Score: 0</div>
    <div id="lives">Lives: 3</div>
    <div id="word"></div>
    <div id="options">
      <button id="newBtn">New</button>
      <button id="seenBtn">Seen</button>
    </div>
    <div id="gameOver" style="display: none;">
      <p class="game-over">Game Over</p>
      <img src="./img/statistic.png" alt="Chart" style="width: 300px; height: auto;">
      <p class="game-over" id="finalScore"></p>
      <button id="restartBtn">Restart</button>
    </div>

    <div id="languageOptions">
      <button id="englishBtn">English</button>
      <button id="germanBtn">Deutsch</button>
    </div>
    `;
  
    // Replace the body's content with the new container
    document.body.appendChild(newContainer);
  
    // Update the references to the DOM elements
    wordElement = document.getElementById("word");
    scoreElement = document.getElementById("score");
    livesElement = document.getElementById("lives");
    newBtn = document.getElementById("newBtn");
    seenBtn = document.getElementById("seenBtn");
    restartBtn = document.getElementById("restartBtn");
    newBtn.disabled = true;
    seenBtn.disabled = true;
    begin = false;
    // Add event listeners to the new buttons
    newBtn.addEventListener("click", function() {
      checkAnswer("New");
    });
  
    seenBtn.addEventListener("click", function() {
      checkAnswer("Seen");
    });
  
    restartBtn.addEventListener("click", restartGame);

    // Add event listeners to the language buttons
    englishBtn = document.getElementById("englishBtn");
    germanBtn = document.getElementById("germanBtn");

    englishBtn.addEventListener("click", function() {
        german = false;
        begin = true;
          document.getElementById("englishBtn").style.display = "none";
          document.getElementById("germanBtn").style.display = "none";
        
        initializeGame();
      });
      

      germanBtn.addEventListener("click", function() {
        german = true;
        begin = true;
          document.getElementById("englishBtn").style.display = "none";
          document.getElementById("germanBtn").style.display = "none";
        initializeGame();
      });

    // Initialize the game with the selected language
    initializeGame();
}

// Initialize the game with the selected language
function initializeGame() {
    if (begin)  {
        newBtn.disabled = false;
        seenBtn.disabled = false;
    }
  // Set the vocabulary array based on the selected language
  if (!german) {
    words = [
        "apple", "banana", "car", "dog", "elephant", "flower", "guitar", "house", "island", "jungle",
        "kangaroo", "lemon", "mountain", "noodle", "ocean", "piano", "queen", "river", "sun", "tiger",
        "umbrella", "violet", "watermelon", "xylophone", "yacht", "zebra", "airplane", "ball", "cat",
        "desk", "eagle", "fire", "garden", "hat", "ice cream", "jacket", "key", "laptop", "moon", "nest",
        "orange", "penguin", "quilt", "rainbow", "snake", "table", "unicorn", "volcano", "window", "xylophone",
        "yogurt", "zeppelin", "anchor", "butterfly", "cactus", "dolphin", "eclipse", "feather", "globe",
        "honey", "iguana", "jigsaw", "kite", "lighthouse", "mango", "ninja", "oasis", "palm", "quail", "rocket",
        "sandwich", "tornado", "umbrella", "violet", "waterfall", "xylophone", "yogurt", "zeppelin", "apple",
        "banana", "car", "dog", "elephant", "flower", "guitar", "house", "island", "jungle", "kangaroo", "lemon",
        "mountain", "noodle", "ocean", "piano", "queen", "river", "sun", "tiger", "umbrella", "violet", "watermelon",
        "xylophone", "yacht", "zebra", "airplane", "ball", "cat", "desk", "eagle", "fire", "garden", "hat",
        "ice cream", "jacket", "key", "laptop", "moon", "nest", "orange", "penguin", "quilt", "rainbow",
        "snake", "table", "unicorn", "volcano", "window", "xylophone", "yogurt", "zeppelin", "anchor",
        "butterfly", "cactus", "dolphin", "eclipse", "feather", "globe", "honey", "iguana", "jigsaw", "kite",
        "lighthouse", "mango", "ninja", "oasis", "palm", "quail", "rocket", "sandwich", "tornado", "umbrella",
        "violet", "waterfall", "xylophone", "yogurt", "zeppelin", "sun", "book", "tree", "flower", "house", "river", 
        "music", "computer", "chair", "table", "pencil", "school", "teacher", "student", "phone", "city", "country", 
        "ocean", "beach", "mountain", "camera", "coffee", "rain", "snow", "summer", "winter", "spring", "autumn", 
        "movie", "popcorn", "pizza", "guitar", "painting", "elephant", "lion", "tiger", "butterfly", "airplane", 
        "train", "bicycle", "soccer", "basketball", "tennis", "swimming", "library", "newspaper", "radio", 
        "television", "internet", "science", "history", "mathematics", "language", "friendship", "love", "happiness", 
        "success", "health", "dream", "adventure", "journey", "laughter", "smile", "kindness", "courage", "honesty", 
        "patience", "gratitude", "freedom", "imagination", "inspiration", "knowledge", "creativity", "passion", 
        "beauty", "sunrise", "sunset", "star", "moon", "galaxy", "universe", "beach", "forest", "park", "garden", 
        "bridge", "castle", "museum", "cathedral", "monument", "statue", "island", "musician", "dance", "art", 
        "photography", "friend", "family", "job", "travel", "food", "restaurant", "coffee", "tea", "chocolate", 
        "ice cream", "cookie", "hobby", "sport", "exercise", "yoga", "meditation", "adventure", "nature", "wildlife", 
        "safari", "festival", "celebration", "party", "holiday", "birthday", "anniversary", "gift", "shopping", 
        "fashion", "style", "culture", "tradition", "language", "education", "learning", "knowledge", "experience", 
        "memory", "dream", "imagination", "inspiration", "creativity", "innovation", "technology", "science", 
        "discovery", "invention", "health", "wellness", "medicine", "doctor", "nurse", "patient", "hospital", 
        "volunteer", "charity", "help", "support", "community", "environment", "sustainability", "planet", "world", 
        "global", "peace", "love", "kindness", "compassion", "missionary", "equality", "justice", "freedom", "democracy", 
        "leadership", "success", "achievement", "challenge", "opportunity", "motivation", "perseverance", "teamwork", 
        "communication", "listening", "empathy", "understanding", "respect", "tolerance", "challenge", "solution", 
        "strength", "positive", "exercise", "creative", "support", "analysis", "process", "account", "provide", "control", 
        "patient", "message", "balance", "complex", "science", "picture", "wonder", "imagine", "network", "vortex", "quartz",
        "jigsaw", "zealot", "mirthful", "cortex", "behoove", "brogue", "plinth", "guffaw", "fjord", "klaxon", "pyxides", "furbish", 
        "guerdon", "czarist", "quandary", "zephyr", "ululate", "brolly", "glyptic", "comfort", "motive", "design", "wealth", "expect",
        "demand", "follow", "result", "advice", "master", "belief", "memory", "chance", "simple", "growth", "moment", "invite", "legacy", "sudden", "remain", "strike",
        "ability", "burden", "choice", "decade", "editor", "famous", "global", "height", "income", "jungle", "knight", "lesson", "moment", "number", "object", "people", 
        "quirky", "reward", "sudden", "together", "straigher", "optimistic", "grateful", "disbelief", "intelligence", "rapidly"
    ];
      
  } else {
    words = [
        "Apfel", "Banane", "Auto", "Hund", "Katze", "Haus", "Tisch", "Stuhl", "Lampe", "Fenster", "Tür", "Schule", 
        "Buch", "Straße", "Wald", "Blume", "Wasser", "Himmel", "Mond", "Sonne", "Feuer", "Erde", "Luft", "Stein", 
        "Gras", "Vogel", "Fisch", "Wolke", "Schnee", "Regen", "Wind", "Berg", "See", "Fluss", "Brücke", "Schiff", 
        "Bahnhof", "Flughafen", "Zug", "Bus", "Fahrrad", "Motorrad", "Hose", "Kleid", "Schuhe", "Hut", 
        "Handschuhe", "Mütze", "Jacke", "Mantel", "Koffer", "Tasche", "Geld", "Uhr", "Schlüssel", "Telefon", 
        "Computer", "Internet", "Musik", "Film", "Bild", "Buchstabe", "Zahl", "Farbe", "Essen", "Trinken", "Obst", 
        "Gemüse", "Fleisch", "Käse", "Milch", "Ei", "Brot", "Kuchen", "Schokolade", "Kaffee", "Tee", "Suppe", 
        "Salat", "Nudeln", "Reis", "Pizza", "Burger", "Pommes", "Süßigkeiten", "Freund", "Familie", "Liebe", 
        "Glück", "Lachen", "Traurigkeit", "Angst", "Wut", "Hoffnung", "Frieden", "Reise", "Abenteuer", "Urlaub", 
        "Schule", "Studium", "Arbeit", "Beruf", "Chef", "Kollege", "Kunde", "Gesundheit", "Sport", "Musik", 
        "Kunst", "Buch", "Film", "Spiel", "Party", "Feier", "Natur", "Garten", "Park", "Strand", "Berg", "Wald", 
        "Fluss", "Meer", "Reise", "Erinnerung", "Träume", "Zukunft", "Vergangenheit", "Gegenwart", "Entscheidung", 
        "Herausforderung", "Erfolg", "Fehler", "Lernen", "Wachstum", "Inspiration", "Kreativität", "Mut", 
        "Hoffnung", "Freiheit", "Freundschaft", "Liebe", "Vertrauen", "Respekt", "Gerechtigkeit", "Toleranz", 
        "Hilfe", "Zusammenarbeit", "Gemeinschaft", "Nachbar", "Recht", "Pflicht", "Verantwortung", "Ziel", 
        "Leidenschaft", "Leben", "beenden", "entdecken", "Geschichte", "verlassen", "schnell", "wunderbar", 
        "glücklich", "schwierig", "erfolgreich", "leidenschaftlich", "geheimnisvoll", "wissenschaft", "schönheit", 
        "gefährlich", "vergessen", "bekommen", "verändern", "Gesellschaft", "wichtig", "spielen", "entwickeln", "gefühle", 
        "erfahrung", "vertrauen", "zusammen", "entscheiden", "freundschaft", "spannend", "wissen", "verantwortung", "interessant", 
        "möglichkeit", "erinnerung", "lieblings", "überraschen", "schwester", "unglaublich", "unterricht", "lebensmittel", "hoffnung", 
        "träumen", "herausforderung", "zufrieden", "entspannen", "weitermachen", "versuchen", "verstehen", "gelegenheit", "erfolg", "reise", 
        "erzählen", "gefühle", "schön", "klar", "neu", "hell", "gut", "weit", "warm", "bald", "hart", "fest", "toll", "klug", "wild", "wahr", 
        "frei", "satt", "laut", "mutig", "klug", "hart", "reif", "hoch", "dumm", "kalt", "knapp", "dicht", "klug", "dank", "stark", "rein", "schön", 
        "ganz", "hell", "schwach", "alt", "süß", "echt", "gleich", "voll", "spät", "heiß", "scharf", "klug", "dunkel", "leer", "glatt", "fern", "dicht", 
        "falsch", "leer", "klug", "dank", "stark", "rein", "schön", "ganz", "hell", "schwach", "alt", "süß", "echt", "gleich", "voll", "spät", 
        "heiß", "scharf", "klug", "dunkel", "leer", "glatt", "fern", "dicht", "falsch", "leer", "bunt", "eng", "frech", "glück", "klug", "nett", 
        "ruhig", "satt", "weit", "klar", "hart", "wild", "laut", "schön", "mutig", "klug", "gut", "weit", "warm", "bald", "fest", "toll", "klug", 
        "wahr", "frei", "neu", "grün", "blau", "gelb", "schön", "klug", "dankbar", "mutig", "scharf", "leer", "laut", "hoch", "groß", "weich", 
        "sauer", "frech", "lange", "bunt", "engel", "fleiß", "satt", "traum", "liebe", "stark", "ruhig", "freud", "junge", "weite", "klare", 
        "schön", "reizvoll", "voller", "lustig", "dunkel", "klug", "große", "ruhig", "frohe", "reine", "süße", "gefährlich", "sanft", "fröhlich",
        "still", "herz", "sorge", "lange", "sicher", "leben", "stolz", "ernst", "ruhig", "sauber", "voll", "leben", "ruhe", "falle", "ruhe", "ehre", 
        "eisig", "schwach", "alt", "hell", "wertvoll", "freudig", "eigen", "engel", "klug", "froh", "sonne", "klug", "reizend", "freud", "warm", "helle", 
        "falle", "glatt", "treu", "reich", "herz", "dankbar", "kluge", "dicht", "warme", "schlau", "junge", "satt", "frisch", "frech", "scharf", "mutig", 
        "freie", "kluge", "heiter", "mutig", "süße", "harte", "rein", "junge", "leise", "klare", "helle", "süße", "kluge", "grün", "blau", "gelb", 
        "schön", "klug", "dankbar", "mutig", "scharf", "leer", "laut", "hoch", "groß", "weich", "sauer", "frech", "lange", "bunt", "engel", "fleiß", 
        "satt", "traum", "liebe", "stark", "ruhig", "freud", "junge", "weite", "klare", "schön", "reizvoll", "voller", "lustig", "dunkel", "klug", "große", 
        "ruhig", "frohe", "reine", "süße", "gefährlich", "sanft", "fröhlich", "still", "herz", "sorge", "lange", "sicher", "leben", "stolz", "ernst", "ruhig", 
        "sauber", "voll", "leben", "ruhe", "falle", "ruhe", "ehre", "eisig", "schwach", "alt", "hell", "wertvoll", "freudig", "eigen", "engel", "klug", "froh", 
        "sonne", "klug", "reizend", "freud", "warm", "helle", "falle", "glatt", "treu", "reich", "herz", "dankbar", "kluge", "dicht", "warme", "schlau", "junge", 
        "satt", "frisch", "frech", "scharf", "mutig", "freie", "kluge", "heiter", "mutig", "süße", "harte", "rein", "junge", "leise", "klare", "helle", "süße", "kluge", "stolz"
    ];
      
  }

  // Update the word immediately
  updateWord();
}

// Event listeners for language buttons
var englishBtn = document.getElementById("englishBtn");
var germanBtn = document.getElementById("germanBtn");

englishBtn.addEventListener("click", function() {
  german = false;
  begin = true;
    document.getElementById("englishBtn").style.display = "none";
    document.getElementById("germanBtn").style.display = "none";
  
  initializeGame();
});

germanBtn.addEventListener("click", function() {
  german = true;
  begin = true;
    document.getElementById("englishBtn").style.display = "none";
    document.getElementById("germanBtn").style.display = "none";
  initializeGame();
});

newBtn.disabled = true;
seenBtn.disabled = true;
// Initialize the game with the default language (English)
initializeGame();
