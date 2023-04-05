/*
 _____ ______   ________  _________  ___  ___  ________      
|\   _ \  _   \|\   __  \|\___   ___\\  \|\  \|\   ____\     
\ \  \\\__\ \  \ \  \|\  \|___ \  \_\ \  \\\  \ \  \___|_    
 \ \  \\|__| \  \ \  \\\  \   \ \  \ \ \  \\\  \ \_____  \   
  \ \  \    \ \  \ \  \\\  \   \ \  \ \ \  \\\  \|____|\  \  
   \ \__\    \ \__\ \_______\   \ \__\ \ \_______\____\_\  \ 
    \|__|     \|__|\|_______|    \|__|  \|_______|\_________\
                                                 \|_________|

*/

/* Initialisation de variables. */
var isWait = false;
var i = 0;
var ir = 0;
var isFind = true;
var isEnd = false;
var isInGame = false;

word = "INIT_"
nbLetter = 5;

generateTable(nbLetter);

/* Obtenir les lignes et les cellules du tableau. */
var R = document.querySelector("#tableMotus").rows;
var cells = R[0].cells;




var val = "";

const input = document.createElement("input");
input.type = "text";
input.size = 1;


/* événement d'Écoute lors de l'ecriture dans l'input de  */
input.addEventListener("input", function (event) {
  val = event.target.value.toUpperCase();
  if(verifInput(val) == true){
    cells[i].classList.add("G");
    cells[i].textContent = val;
    i += 1;
    if (i >= cells.length) {
      for (ix = 0; ix <= cells.length - 1; ix++) {
        (function (ix) {
          window.setTimeout(function () {
            soundValue = "Bad";
            cells[ix].classList.add("F");
            cells[ix].classList.remove("G");
            cells[ix].classList.remove("N");
            cells[ix].classList.remove("O");
            val = cells[ix].textContent.toUpperCase();
            if (word.includes(val)) {
              soundValue = "Semi";
              cells[ix].classList.remove("F");
              cells[ix].classList.add("N");
              if (val == word[ix]) {
                soundValue = "Ok";
                cells[ix].classList.remove("F");
                cells[ix].classList.remove("N");
                cells[ix].classList.add("O");
              } else {
                isFind = false;
              }
            } else {
              isFind = false;
            }
            playSound(soundValue);
          }, ix * 300);
        })(ix);
      }
      isWait = true;
      setTimeout(function () {
        ir += 1;
        if (isFind == true) {
          playSound("Victory");
          endGame(1, ir);
        } else if (ir == 6 && isFind == false) {
          playSound("Fail");
          endGame(0, "non trouve");
        } else {
          isFind = true;
        } 
        if (isEnd != true) {
          cells = R[ir].cells;
        }

        i = 0;
      }, (cells.length * 300)+80);
    }
  }

  
  if (isWait == true) {
    setTimeout(function () {
      cells[i].appendChild(input);

      input.value = "";
      input.focus();
      isWait = false;
    }, (cells.length * 300)+100);
  } else {
    R = document.querySelector("#tableMotus").rows;
    cells = R[ir].cells;
    cells[i].appendChild(input);
    input.value = "";
    input.focus();
  }
});

/**
 * Il crée un nouvel élément audio, définit la source sur le fichier son et le lit
 * @param sound - Le nom du fichier son à jouer.
 */
function playSound(sound) {
  var audio = new Audio("sound/Sound_" + sound + ".mp3");
  audio.play();
}

/**
 * Il supprime le tableau, puis il en génère un nouveau, puis il réinitialise les variables, puis il
 * obtient la première lettre du mot, puis il ajoute le champ de saisie à la deuxième cellule, puis il
 * efface le champ de saisie, puis il définit le valeur du champ de saisie en une chaîne vide.
 */
function resetBoard() {
  document.getElementById("tableMotus").remove();
  randomArray = getRandomWord();
  nbLetter = randomArray[1];
  generateTable(nbLetter);
  i = 1;
  ir = 0;
  isFind = true;

  R = document.querySelector("#tableMotus").rows;
  cells = R[0].cells;
  word = randomArray[0];
  console.log("mot a trouver :",word);
  cells[0].innerHTML = word[0];
  cells[0].classList.add("O");
  cells[1].appendChild(input);

  input.value = "";
  val = "";
}

/**
 * Il démarre le jeu.
 */
function startGame() {
  isEnd = false;
  isInGame = true;
  resetBoard();
  document.getElementById("loseButton").disabled = false;
  document.getElementById("newGameButton").disabled = true;
  input.removeAttribute("type");
}

/**
 * C'est une fonction qui termine le jeu, et affiche un modal avec un message en fonction du résultat
 * du jeu.
 * @param result - 1 = gagner, 0 = perdre, 2 = abandonner
 * @param nb - nombre d'essais
 */
function endGame(result, nb) {
  isInGame = false;
  input.setAttribute("type", "hidden");
  let mod = document.getElementById("textEndModal");
  mod.textContent = "";
  let modal = document.getElementById("ModalEnd");
  isEnd = true;
  localstorage_addResult([word, nb]);
  cookie_addResult([word, nb]);
  switch (result) {
    case 1:
      mod.textContent = "Bravo vous avez gagner";
      break;
    case 0:
      mod.textContent = "Vous avez perdu le mot a trouver etait : " + word;
      break;
    case 2:
      mod.textContent = "Vous avez abandonner le mot a trouver etait : " + word;
      break;
  }

  modal.style.display = "block";
  document.getElementById("loseButton").disabled = true;
  document.getElementById("newGameButton").disabled = false;
}

/**
 * Il prend un nombre comme argument et renvoie un mot aléatoire à partir d'une liste de mots qui ont
 * le même nombre de lettres que le nombre qui a été passé à la fonction.
 * @param NBletter - le nombre de lettres dans le mot
 * @returns Un mot aléatoire du tableau dictionary_list.
 */
function getRandomWord() {
  nb = Math.floor(Math.random() * 6);
  word_list = dictionary_list[nb];
  randomWord = word_list[Math.floor(Math.random() * word_list.length)];
  result = [randomWord, nb+5];
  return result;
}

/**
 * Il prend une chaîne comme argument et renvoie vrai si la chaîne contient au moins une lettre, et
 * faux si ce n'est pas le cas.
 * @param value - la valeur de l'entrée
 * @returns Une valeur booléenne.
 */
function verifInput(value) {
  let regex = new RegExp('[A-Za-z]{1}');
  return regex.test(value)
}



/**
 * Il crée une table avec 6 lignes et des colonnes NBletter, et l'ajoute à la div avec l'id
 * "gameContainer".
 * @param NBletter - nombre de lettres dans le mot
 */
function generateTable(NbLetter) {
  let table = document.createElement("table");
  table.id = "tableMotus";
  for (let i = 0; i < 6; i++) {
    let row = table.insertRow();
    for (let j = 0; j < NbLetter; j++) {
      let cell = row.insertCell();
      cell.classList.add("td_gameBase");
    }
  }
  document.getElementById("gameContainer").appendChild(table);
}

/* Affiche la réponse si le joueur est en partie */
var cheatResult = document.getElementById("cheatResultButton");
cheatResult.addEventListener(
  "mouseenter",
  function (event) {
    if (isInGame == false) {
      document.getElementById("cheatResult").innerHTML =
        "Veuillez lancer une partie";
    } else {
      document.getElementById("cheatResult").innerHTML = "Reponse :<br>" + word;
    }
  },
  false
);
  