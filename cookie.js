/*
________  ________  ________  ___  __    ___  _______      
|\   ____\|\   __  \|\   __  \|\  \|\  \ |\  \|\  ___ \     
\ \  \___|\ \  \|\  \ \  \|\  \ \  \/  /|\ \  \ \   __/|    
 \ \  \    \ \  \\\  \ \  \\\  \ \   ___  \ \  \ \  \_|/__  
  \ \  \____\ \  \\\  \ \  \\\  \ \  \\ \  \ \  \ \  \_|\ \ 
   \ \_______\ \_______\ \_______\ \__\\ \__\ \__\ \_______\
    \|_______|\|_______|\|_______|\|__| \|__|\|__|\|_______|
                                                            
*/

/**
 * Il divise la chaîne de cookie en un tableau de paires clé-valeur, puis trouve la paire clé-valeur
 * qui commence par la balise, puis divise cette paire clé-valeur en un tableau de deux éléments, puis
 * renvoie le deuxième élément de ce tableau.
 * @param tag - Le nom du cookie que vous souhaitez obtenir.
 * @returns La valeur du cookie avec la balise de nom.
 */
function getCookie(tag) {
  var cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(tag + "="))
    .split("=")[1];
  return cookieValue;
}

/**
 * Il définit un cookie
 * @param tag - Le nom du cookie.
 * @param value - La valeur du cookie.
 */
function setCookie(tag, value) {
  document.cookie = tag + "=" + value;
}

/**
 * Il obtient le cookie nommé "result" et renvoie la valeur du cookie sous la forme d'un objet
 * JavaScript.
 * @returns Le résultat de la fonction est le résultat de la fonction.
 */
function cookie_getResult() {
  let cookieString = getCookie("result");
  cookieString = cookieString.replace(/^"|"$/g, "");
  var resultX = JSON.parse(cookieString);
  return resultX;
}

/**
 * Il prend un tableau, y ajoute un élément, puis l'enregistre dans un cookie.
 * @param update - La mise à jour à ajouter au résultat.
 */
function cookie_addResult(update) {
  let result = cookie_getResult();
  result[result.length] = update;
  result = JSON.stringify(result);
  result = '"' + result + '"';
  setCookie("result", result);
}


/**
 * Il crée une table, insère les données du cookie dans la table, puis affiche la table dans un modal.
 */
function cookie_displayResult() {
  let resArea = document.getElementById("resultZone");
  resArea.innerHTML = "";
  let result = cookie_getResult();
  let table = document.createElement("table");
  table.id = "tableResult_cookie";
  table.className = "resultTable";
  for (let i = 0; i < result.length; i++) {
    let row = table.insertRow();
    for (let j = 0; j < 2; j++) {
      let cell = row.insertCell();
      cell.innerHTML = result[i][j];
      cell.className = "resultCell";
    }
  }
  let modal = document.getElementById("ModalResult");
  modal.style.display = "block";
  resArea.appendChild(table);
}

/**
 * Il positionne le cookie nommé "result" à la valeur "[["Mot","nombre d\'essai"]]".
 */
function deleteCookie() {
  setCookie('result=[["Mot","nombre d\'essai"]]');
}

/* Vérifier si le cookie est vide, et si c'est le cas, il définit le cookie à la valeur par défaut. */
if (document.cookie == "") {
  setCookie('result=[["Mot","nombre d\'essai"]]');
}
