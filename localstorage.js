/*
 ___       ________  ________  ________  ___       ________  _________  ________  ________  ________  ________  _______      
|\  \     |\   __  \|\   ____\|\   __  \|\  \     |\   ____\|\___   ___\\   __  \|\   __  \|\   __  \|\   ____\|\  ___ \     
\ \  \    \ \  \|\  \ \  \___|\ \  \|\  \ \  \    \ \  \___|\|___ \  \_\ \  \|\  \ \  \|\  \ \  \|\  \ \  \___|\ \   __/|    
 \ \  \    \ \  \\\  \ \  \    \ \   __  \ \  \    \ \_____  \   \ \  \ \ \  \\\  \ \   _  _\ \   __  \ \  \  __\ \  \_|/__  
  \ \  \____\ \  \\\  \ \  \____\ \  \ \  \ \  \____\|____|\  \   \ \  \ \ \  \\\  \ \  \\  \\ \  \ \  \ \  \|\  \ \  \_|\ \ 
   \ \_______\ \_______\ \_______\ \__\ \__\ \_______\____\_\  \   \ \__\ \ \_______\ \__\\ _\\ \__\ \__\ \_______\ \_______\
    \|_______|\|_______|\|_______|\|__|\|__|\|_______|\_________\   \|__|  \|_______|\|__|\|__|\|__|\|__|\|_______|\|_______|
                                                     \|_________|          
                                          
*/

/* Créer une variable appelée S et lui attribuer la valeur de localStorage. */
var S = localStorage;

/**
 * Il renvoie une chaîne qui est une concaténation de la date et de l'heure actuelles.
 * @returns Un string.
 */
function getNewID() {
  let c = new Date();
  let cDate = c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate();
  let cTime = c.getHours() + ":" + c.getMinutes() + ":" + c.getSeconds();
  let id = "idMotus" + cDate + " " + cTime;
  return id;
}

/**
 * Il crée un nouvel ID, puis utilise cet ID pour stocker le résultat dans le stockage local.
 * @param result - Le résultat du calcul.
 */
function localstorage_addResult(result) {
  S.setItem(getNewID(), result);
}

/**
 * Il efface le stockage local, puis ajoute les valeurs par défaut au stockage local
 */
function deleteLocalStorage() {
  S.clear();
}

/**
 * Il renvoie un tableau de tableaux, chacun contenant les jetons d'un élément localStorage dont la clé
 * commence par "idMotus".
 * @returns Une liste de listes.
 */
function localstorage_getResult() {
  let list = [];
  for (var i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).startsWith("idMotus")) {
      tokens = localStorage.getItem(localStorage.key(i)).split(",");
      list.push(tokens);
    }
  }
  return list;
}

/**
 * Il crée une table, insère les données de la fonction localstorage_getResult() dans la table, puis
 * affiche la table dans un modal.
 */
function localstorage_displayResult() {
  let resArea = document.getElementById("resultZone");
  resArea.innerHTML = "";
  let result = localstorage_getResult();
  let table = document.createElement("table");
  table.id = "tableResult_localstorage";
  table.className = "resultTable";
  let row = table.insertRow();
  let cell = row.insertCell();
  cell.innerHTML = "mot";
  cell.className = "resultCell";
  cell = row.insertCell();
  cell.innerHTML = "nombre d\'essai";
  cell.className = "resultCell";
  for (let i = 0; i < result.length; i++) {
    row = table.insertRow();
    for (let j = 0; j < 2; j++) {
      cell = row.insertCell();
      cell.innerHTML = result[i][j];
      cell.className = "resultCell";
    }
  }
  let modal = document.getElementById("ModalResult");
  modal.style.display = "block";
  resArea.appendChild(table);
}
